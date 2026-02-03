/**
 * Парсит строку длительности в формате "HH:MM:SS" в количество секунд
 * @param duration - строка длительности в формате "HH:MM:SS"
 * @returns количество секунд
 */
export function parseDuration(duration: string): number {
  const [h, m, sec] = duration.split(':').map(Number)
  return (h ?? 0) * 3600 + (m ?? 0) * 60 + (sec ?? 0)
}
