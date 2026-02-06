import { departmentGet, sonetGroupGet } from '~/api/company'
import { userGet, userCurrent } from '~/api/user'
import { taskElapseditemGetlist, tasksTaskList, taskChecklistitemGetlist } from '~/api/task'
import { callBatchPromise } from '~/api/core'
import { getMonthDateRange, getTaskUrl, getReportDateRange, type ReportPeriod } from '~/tools'

// Список подразделений c учётом постранички (start/next) и батчами
export const getDepartments = () =>
  departmentGet(null, null, null, null, 'ID', 'ASC')

export interface TaskElapsedItemParams {
  userId?: number
  month?: number
  year?: number
  /** Явный диапазон дат (приоритет над month/year) */
  dateFrom?: string
  dateTo?: string
  taskId?: number
  order?: Record<string, 'asc' | 'desc'>
  filter?: Record<string, any>
}


export const getUsers = () =>
  userGet()


export const getTaskElapsedItems = async (params: TaskElapsedItemParams) => {
  let dateFrom: string
  let dateTo: string
  if (params.dateFrom && params.dateTo) {
    dateFrom = params.dateFrom
    dateTo = params.dateTo
  } else if (params.year != null && params.month != null) {
    const range = getMonthDateRange(params.year, params.month)
    dateFrom = range.dateFrom
    dateTo = range.dateTo
  } else {
    const now = new Date()
    const range = getMonthDateRange(now.getFullYear(), now.getMonth() + 1)
    dateFrom = range.dateFrom
    dateTo = range.dateTo
  }

  const order = params.order || { ID: 'desc' }
  const filter = {
    ...(params.userId ? { USER_ID: params.userId } : {}),
    '>=CREATED_DATE': dateFrom,
    '<=CREATED_DATE': dateTo,
    ...(params.taskId ? { TASK_ID: params.taskId } : {}),
    ...(params.filter || {}),
  }
  // Bitrix24 не разрешает COMMENT в SELECT для task.elapseditem.getlist — используем дефолтный набор полей
  const select: string[] = []

  const rawItems = await taskElapseditemGetlist(filter, select, order)

  // На всякий случай устраним возможные дубли по ID (если Bitrix вернет их из‑за
  // изменений данных между страницами).
  const byId = new Map<string | number, any>()
  for (const item of rawItems) {
    if (item && typeof item === 'object' && item !== null) {
      const itemObj = item as Record<string, unknown>
      const id = ('ID' in itemObj ? itemObj.ID : 'id' in itemObj ? itemObj.id : undefined) as string | number | undefined
      if (id !== undefined) {
        byId.set(id, item)
      } else {
        // элементы без ID тоже сохраняем, чтобы ничего не потерять
        byId.set(Symbol('no-id') as unknown as string, item)
      }
    }
  }

  const uniqueItems = Array.from(byId.values())

  return {
    result: uniqueItems,
    total: uniqueItems.length,
  }
}

export interface ProjectTimeData {
  projectId: number
  projectName: string
  employees: Array<{
    id: number
    name: string
    timeEntries: Array<{
      date: string
      hours: number
      minutes: number
    }>
  }>
}

export const getProjectsWithTime = async (params: TaskElapsedItemParams) => {
  // Получаем записи о времени
  const elapsedItemsResponse = await getTaskElapsedItems(params)
  const elapsedItems = elapsedItemsResponse.result as any[]

  if (!elapsedItems || elapsedItems.length === 0) {
    return []
  }

  // Извлекаем уникальные TASK_ID
  const taskIds = new Set<number>()
  for (const item of elapsedItems) {
    const taskId = Number(item.TASK_ID || item.taskId || item.TASK_ID)
    if (taskId && taskId > 0) {
      taskIds.add(taskId)
    }
  }

  // Получаем информацию о задачах для получения GROUP_ID (проекта)
  const taskIdsArray = Array.from(taskIds)
  const tasksMap = new Map<number, any>()
  const projectIds = new Set<number>()

  // Получаем задачи батчами
  const batchSize = 50
  for (let i = 0; i < taskIdsArray.length; i += batchSize) {
    const batch = taskIdsArray.slice(i, i + batchSize)
    const batchParams: unknown[] = batch.map(taskId => [
      'tasks.task.get',
      {
        taskId,
        select: ['ID', 'TITLE', 'GROUP_ID']
      }
    ])

      try {
        const tasks = await callBatchPromise(batchParams) as any[]
      for (const task of tasks) {
        if (task && typeof task === 'object') {
          // Проверяем наличие ошибки
          if ((task as any).error) {
            console.warn('Error in batch task request:', (task as any).error)
            continue
          }
          
          const taskObj = task as any
          // Извлекаем данные из результата batch
          // Структура ответа: { result: { task: {...} } } или просто task
          let taskData = taskObj
          if (taskObj.result && taskObj.result.task) {
            taskData = taskObj.result.task
          } else if (taskObj.task) {
            taskData = taskObj.task
          } else if (taskObj.result && typeof taskObj.result === 'object' && !taskObj.result.task) {
            taskData = taskObj.result
          }
          
          const id = Number(taskData.ID || taskData.id)
          const groupId = Number(taskData.GROUP_ID || taskData.groupId || taskData.group_id)
          if (id && id > 0) {
            tasksMap.set(id, taskData)
            if (groupId && groupId > 0) {
              projectIds.add(groupId)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error fetching tasks in batch:', error)
      // Продолжаем работу даже если не удалось получить задачи
    }
  }

  // Получаем информацию о проектах
  const projectIdsArray = Array.from(projectIds)
  const projectsMap = new Map<number, any>()

  if (projectIdsArray.length > 0) {
    // Получаем проекты батчами
    const projects: any[] = []
    const projectBatchSize = 50
    for (let i = 0; i < projectIdsArray.length; i += projectBatchSize) {
      const batch = projectIdsArray.slice(i, i + projectBatchSize)
      const batchParams: unknown[] = batch.map(projectId => [
        'sonet_group.get',
        {
          FILTER: { ID: projectId },
          ORDER: { NAME: 'ASC' }
        }
      ])

      try {
        const batchProjects = await callBatchPromise(batchParams) as any[]
        if (Array.isArray(batchProjects)) {
          for (const project of batchProjects) {
            if (project && typeof project === 'object') {
              // Проверяем наличие ошибки
              if ((project as any).error) {
                console.warn('Error in batch project request:', (project as any).error)
                continue
              }
              
              // Извлекаем данные из результата batch
              // Структура ответа: { result: [...] } или просто массив
              let projectData = project
              if (project.result && Array.isArray(project.result)) {
                projectData = project.result
              } else if (project.result && typeof project.result === 'object') {
                projectData = project.result
              }
              
              if (Array.isArray(projectData)) {
                projects.push(...projectData)
              } else if (projectData && typeof projectData === 'object') {
                projects.push(projectData)
              }
            }
          }
        }
      } catch (error) {
        console.error('Error fetching projects in batch:', error)
        // Продолжаем работу даже если не удалось получить проекты
      }
    }

    for (const project of projects) {
      if (project && typeof project === 'object') {
        const projectObj = project as any
        const id = Number(projectObj.ID || projectObj.id)
        if (id && id > 0) {
          projectsMap.set(id, projectObj)
        }
      }
    }
  }

  // Группируем время по проектам и сотрудникам
  const projectsData = new Map<number, ProjectTimeData>()

  for (const item of elapsedItems) {
    const taskId = Number(item.TASK_ID || item.taskId)
    const userId = Number(item.USER_ID || item.userId)
    const createdDate = String(item.CREATED_DATE || item.createdDate || '')
    const date = createdDate.split('T')[0] // Берем только дату без времени

    if (!taskId || !userId || !date) continue

    const task = tasksMap.get(taskId)
    // Если задача не получена (нет прав), пропускаем эту запись
    if (!task) continue

    const groupId = Number(task.GROUP_ID || task.groupId || task.group_id)
    if (!groupId || groupId === 0) continue // Пропускаем задачи без проекта

    const project = projectsMap.get(groupId)
    // Если проект не получен (нет прав), используем ID проекта как название
    const projectName = project 
      ? String(project.NAME || project.name || `Проект #${groupId}`)
      : `Проект #${groupId}`
    const projectId = groupId

    // Вычисляем время
    const totalMinutes = item.MINUTES !== undefined
      ? Number(item.MINUTES)
      : Math.round(Number(item.SECONDS || 0) / 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    // Инициализируем проект если его еще нет
    if (!projectsData.has(projectId)) {
      projectsData.set(projectId, {
        projectId,
        projectName,
        employees: []
      })
    }

    const projectData = projectsData.get(projectId)!
    
    // Находим или создаем сотрудника
    let employee = projectData.employees.find(e => e.id === userId)
    if (!employee) {
      employee = {
        id: userId,
        name: `#${userId}`, // Имя будет получено из usersMap
        timeEntries: []
      }
      projectData.employees.push(employee)
    }

    // Добавляем запись о времени
    employee.timeEntries.push({
      date,
      hours,
      minutes
    })
  }

  return Array.from(projectsData.values())
}

export interface TaskWithTimeData {
  taskId: number
  taskTitle: string
  timeEntries: Array<{
    date: string
    hours: number
    minutes: number
    employeeId: number
    employeeName: string
  }>
}

export const getTasksWithTime = async (params: TaskElapsedItemParams) => {
  // Получаем записи о времени
  const elapsedItemsResponse = await getTaskElapsedItems(params)
  const elapsedItems = elapsedItemsResponse.result as any[]

  if (!elapsedItems || elapsedItems.length === 0) {
    return []
  }

  // Извлекаем уникальные TASK_ID
  const taskIds = new Set<number>()
  for (const item of elapsedItems) {
    const taskId = Number(item.TASK_ID || item.taskId)
    if (taskId && taskId > 0) {
      taskIds.add(taskId)
    }
  }

  // Получаем информацию о задачах для получения названий
  const taskIdsArray = Array.from(taskIds)
  const tasksMap = new Map<number, any>()

  // Получаем задачи батчами
  const batchSize = 50
  for (let i = 0; i < taskIdsArray.length; i += batchSize) {
    const batch = taskIdsArray.slice(i, i + batchSize)
      const batchParams: unknown[] = batch.map(taskId => [
        'tasks.task.get',
        {
          taskId,
          select: ['ID', 'TITLE']
        }
      ])

      try {
        const tasks = await callBatchPromise(batchParams) as any[]
      for (const task of tasks) {
        if (task && typeof task === 'object') {
          // Проверяем наличие ошибки
          if ((task as any).error) {
            console.warn('Error in batch task request:', (task as any).error)
            continue
          }
          
          const taskObj = task as any
          // Извлекаем данные из результата batch
          let taskData = taskObj
          if (taskObj.result && taskObj.result.task) {
            taskData = taskObj.result.task
          } else if (taskObj.task) {
            taskData = taskObj.task
          } else if (taskObj.result && typeof taskObj.result === 'object' && !taskObj.result.task) {
            taskData = taskObj.result
          }
          
          const id = Number(taskData.ID || taskData.id)
          if (id && id > 0) {
            tasksMap.set(id, taskData)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching tasks in batch:', error)
      // Продолжаем работу даже если не удалось получить задачи
    }
  }

  // Группируем время по задачам
  const tasksData = new Map<number, TaskWithTimeData>()

  for (const item of elapsedItems) {
    const taskId = Number(item.TASK_ID || item.taskId)
    const userId = Number(item.USER_ID || item.userId)
    const createdDate = String(item.CREATED_DATE || item.createdDate || '')
    const date = createdDate.split('T')[0] // Берем только дату без времени

    if (!taskId || !userId || !date) continue

    // Вычисляем время (нужно сделать это до проверки task, так как используется в обоих случаях)
    const totalMinutes = item.MINUTES !== undefined
      ? Number(item.MINUTES)
      : Math.round(Number(item.SECONDS || 0) / 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const task = tasksMap.get(taskId)
    // Если задача не получена (нет прав), используем ID задачи как название
    if (!task) {
      // Создаем задачу с ID вместо названия, если нет прав на получение
      if (!tasksData.has(taskId)) {
        tasksData.set(taskId, {
          taskId,
          taskTitle: `Задача #${taskId}`,
          timeEntries: []
        })
      }
      const taskData = tasksData.get(taskId)!
      taskData.timeEntries.push({
        date,
        hours,
        minutes,
        employeeId: userId,
        employeeName: `#${userId}`
      })
      continue
    }

    const taskTitle = String(task.TITLE || task.title || `Задача #${taskId}`)

    // Инициализируем задачу если её еще нет
    if (!tasksData.has(taskId)) {
      tasksData.set(taskId, {
        taskId,
        taskTitle,
        timeEntries: []
      })
    }

    const taskData = tasksData.get(taskId)!
    
    // Добавляем запись о времени
    taskData.timeEntries.push({
      date,
      hours,
      minutes,
      employeeId: userId,
      employeeName: `#${userId}` // Имя будет получено из usersMap на клиенте
    })
  }

  return Array.from(tasksData.values())
}

/**
 * Получает задачи по их ID через tasks.task.list
 * @param taskIds - массив ID задач
 * @returns Массив задач с полной информацией
 */
export const getTasksByIds = async (taskIds: number[]) => {
  if (!taskIds || taskIds.length === 0) {
    return []
  }

  // Фильтруем задачи по ID
  // Согласно документации, для фильтрации по нескольким ID можно использовать массив
  const filter: Record<string, unknown> = {}
  
  if (taskIds.length === 1) {
    filter.ID = taskIds[0]
  } else {
    // Для нескольких ID используем фильтр с массивом
    filter.ID = taskIds
  }

  // Выбираем нужные поля
  const select = [
    'ID',
    'TITLE',
    'DESCRIPTION',
    'STATUS',
    'DEADLINE',
    'CREATED_DATE',
    'RESPONSIBLE_ID',
    'CREATED_BY',
    'ACCOMPLICES',
    'AUDITORS',
    'GROUP_ID'
  ]

  try {
    const tasks = await tasksTaskList(filter, select, { ID: 'desc' })
    return Array.isArray(tasks) ? tasks : []
  } catch (error) {
    console.error('Error fetching tasks by IDs:', error)
    return []
  }
}

/** Возвращает маппинг ID группы -> название (для проектов/разделов задач) */
export const getGroupNamesMap = async (groupIds: number[]): Promise<Map<number, string>> => {
  const unique = [...new Set(groupIds)].filter(id => id > 0)
  if (unique.length === 0) return new Map()

  const map = new Map<number, string>()
  try {
    const filter: Record<string, unknown> = unique.length === 1 ? { ID: unique[0] } : { ID: unique }
    const groups = await sonetGroupGet(filter) as Array<Record<string, unknown>>
    for (const g of groups || []) {
      const id = Number(g.ID ?? g.id)
      const name = String(g.NAME ?? g.name ?? `Проект #${id}`)
      if (id) map.set(id, name)
    }
  } catch (e) {
    console.warn('getGroupNamesMap:', e)
  }
  return map
}

export interface ElapsedItemParsed {
  taskId: number
  date: string
  hours: number
  minutes: number
  comment: string
}

/** Возвращает маппинг taskId -> пункты чек-листа (название и признак выполнения) */
export const getChecklistsForTasks = async (taskIds: number[]): Promise<Map<number, Array<{ title: string; isComplete: boolean }>>> => {
  const map = new Map<number, Array<{ title: string; isComplete: boolean }>>()
  if (!taskIds.length) return map
  const results = await Promise.all(
    taskIds.map(async (taskId) => {
      const raw = await taskChecklistitemGetlist(taskId) as Array<Record<string, unknown>>
      const items = (raw || []).map((item) => ({
        title: String(item.TITLE ?? item.title ?? ''),
        isComplete: item.IS_COMPLETE === '1' || item.IS_COMPLETE === 1 || item.isComplete === true || item.isComplete === '1'
      })).filter((item) => item.title)
      return [taskId, items] as const
    })
  )
  for (const [taskId, items] of results) {
    if (items.length) map.set(taskId, items)
  }
  return map
}

/** Парсит сырые elapsed items в структуру с датой, временем и комментарием */
export function parseElapsedItems (raw: any[]): ElapsedItemParsed[] {
  const out: ElapsedItemParsed[] = []
  for (const item of raw || []) {
    const taskId = Number(item.TASK_ID ?? item.taskId)
    const created = String(item.CREATED_DATE ?? item.createdDate ?? '')
    const date = created.split('T')[0]
    const totalMinutes = item.MINUTES !== undefined
      ? Number(item.MINUTES)
      : Math.round(Number(item.SECONDS ?? 0) / 60)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    const comment = String(
      item.COMMENT_TEXT ?? item.COMMENT ?? item.TEXT ?? item.TITLE ?? item.DESCRIPTION ??
      item.comment_text ?? item.comment ?? item.text ?? item.title ?? item.description ?? ''
    ).trim()
    if (taskId && date) {
      out.push({ taskId, date, hours, minutes, comment })
    }
  }
  return out
}

/** Формирует отчёт "Выполненные задачи" за период для текущего пользователя */
export const buildMyReport = async (period: ReportPeriod): Promise<string> => {
  const { dateFrom, dateTo } = getReportDateRange(period)
  return buildMyReportByDateRange(dateFrom.slice(0, 10), dateTo.slice(0, 10))
}

/** Формирует отчёт по выбранному диапазону дат (даты в формате YYYY-MM-DD) */
export const buildMyReportByDateRange = async (dateFromStr: string, dateToStr: string): Promise<string> => {
  const current = await userCurrent()
  const userId = current ? Number(current.ID ?? current.id) : 0
  if (!userId) {
    throw new Error('Не удалось определить текущего пользователя')
  }

  const dateFrom = `${dateFromStr} 00:00:00`
  const dateTo = `${dateToStr} 23:59:59`
  const elapsedResponse = await getTaskElapsedItems({
    userId,
    dateFrom,
    dateTo
  })
  const rawItems = elapsedResponse.result as any[]
  const periodLabel = `${dateFromStr} — ${dateToStr}`
  if (!rawItems || rawItems.length === 0) {
    return `Учёт времени (${periodLabel}):\n\nНет записей о затраченном времени за выбранный период.`
  }

  const parsed = parseElapsedItems(rawItems)
  const taskIds = [...new Set(parsed.map(p => p.taskId))]
  const tasks = await getTasksByIds(taskIds) as Array<Record<string, unknown>>
  const tasksMap = new Map<number, Record<string, unknown>>()
  for (const t of tasks) {
    const id = Number(t.ID ?? t.id)
    if (id) tasksMap.set(id, t)
  }

  const groupIds = [...new Set(tasks.map(t => Number(t.GROUP_ID ?? t.groupId ?? 0)).filter(Boolean))]
  const groupNames = await getGroupNamesMap(groupIds)
  const checklistsMap = await getChecklistsForTasks(taskIds)

  const byGroup = new Map<number, Array<{ task: Record<string, unknown>; entries: ElapsedItemParsed[] }>>()
  const noGroup: Array<{ task: Record<string, unknown>; entries: ElapsedItemParsed[] }> = []

  for (const p of parsed) {
    const task = tasksMap.get(p.taskId)
    if (!task) continue
    const groupId = Number(task.GROUP_ID ?? task.groupId ?? 0)
    const groupName = groupNames.get(groupId) ?? (groupId ? `Проект #${groupId}` : '')
    const list = groupId ? (byGroup.get(groupId) ?? (() => {
      const arr: Array<{ task: Record<string, unknown>; entries: ElapsedItemParsed[] }> = []
      byGroup.set(groupId, arr)
      return arr
    })()) : noGroup

    let existing = list.find(x => Number(x.task.ID ?? x.task.id) === p.taskId)
    if (!existing) {
      existing = { task, entries: [] }
      list.push(existing)
    }
    existing.entries.push(p)
  }

  const stripHtml = (s: string) => s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
  /** Убирает BBCode ([url], [table] и т.д.) и оставляет читаемый текст/ссылки */
  const stripBbcode = (s: string): string => {
    if (!s || !s.trim()) return ''
    let t = s
      .replace(/\[url=(.+?)\](.+?)\[\/url\]/gi, '$2 ($1)')
      .replace(/\[url\](.+?)\[\/url\]/gi, '$1')
      .replace(/\[\/?(?:table|tr|td|th|b|i|u|list|li|code|quote)\s*\]/gi, ' ')
      .replace(/\[[^\]]*\]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
    return t
  }
  const statusLabels: Record<number, string> = {
    1: 'Новая',
    2: 'Ждет выполнения',
    3: 'Выполняется',
    4: 'Ждет контроля',
    5: 'Завершена',
    6: 'Отложена',
    7: 'Отменена'
  }

  const lines: string[] = [
    `Учёт времени (${periodLabel}):`,
    ''
  ]

  const emitGroup = (groupName: string, items: Array<{ task: Record<string, unknown>; entries: ElapsedItemParsed[] }>) => {
    if (!items.length) return
    lines.push(`${groupName}:`)
    for (const { task, entries } of items) {
      const taskId = Number(task.ID ?? task.id)
      const title = String(task.TITLE ?? task.title ?? `Задача #${taskId}`)
      const desc = stripBbcode(stripHtml(String(task.DESCRIPTION ?? task.description ?? '')))
      const statusNum = Number(task.STATUS ?? task.status ?? 0)
      const statusStr = statusLabels[statusNum] ?? `Статус ${statusNum}`
      const totalMin = entries.reduce((s, e) => s + e.hours * 60 + e.minutes, 0)
      const totalH = Math.floor(totalMin / 60)
      const totalM = totalMin % 60
      const taskUrl = getTaskUrl(taskId)

      lines.push(`- ${title}`)
      lines.push(`  ${taskUrl}`)
      if (desc) lines.push(`  Описание: ${desc.slice(0, 200)}${desc.length > 200 ? '...' : ''}`)
      lines.push(`  Затраченное время: ${totalH}ч ${totalM}м`)
      lines.push(`  Статус: ${statusStr}`)
      const checklist = checklistsMap.get(taskId)
      if (checklist && checklist.length > 0) {
        lines.push(`  Чек-лист:`)
        for (const item of checklist) {
          lines.push(`    ${item.isComplete ? '✓' : '○'} ${item.title}`)
        }
      }
      for (const e of entries) {
        const [y, m, d] = e.date.split('-')
        const dateStr = `${d}.${m}.${y}`
        const timeStr = `${e.hours}ч ${e.minutes}м`
        const commentClean = stripBbcode(stripHtml(e.comment))
        if (commentClean) {
          lines.push(`  — ${dateStr}: ${timeStr}`)
          lines.push(`    Описание при списании: ${commentClean}`)
        } else {
          lines.push(`  — ${dateStr}: ${timeStr}`)
        }
      }
      lines.push('')
    }
  }

  const sortedGroupIds = [...byGroup.keys()].sort((a, b) => {
    const na = groupNames.get(a) ?? ''
    const nb = groupNames.get(b) ?? ''
    return na.localeCompare(nb)
  })
  for (const gid of sortedGroupIds) {
    const name = groupNames.get(gid) ?? `Проект #${gid}`
    emitGroup(name, byGroup.get(gid)!)
  }
  if (noGroup.length) {
    emitGroup('Без проекта', noGroup)
  }

  return lines.join('\n').trim()
}

