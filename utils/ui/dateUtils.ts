import {
  LocalDateTime,
  Instant,
  nativeJs,
  DateTimeFormatter,
  ZonedDateTime,
  ChronoUnit,
} from '@js-joda/core'

/**
 * Format JS date with js-joda
 * @param date date
 * @returns string value
 */
export function formatNativeDate(date: Date, format: string) {
  return LocalDateTime.ofInstant(Instant.from(nativeJs(date))).format(
    DateTimeFormatter.ofPattern(format)
  )
}

/**
 * Calculate how many time is between given dates.
 * It returns duration in minutes, hours and seconds cumulatively
 * e.g 1hour = hours:1 minutes:0 seconds:0
 * e.g 1hour 30 min = hours:1 minutes:30 seconds:0
 * @param start start date
 * @param end end date
 * @returns hours, minutes, seconds
 */
export function calculateTimeDifference(start: Date, end: Date) {
  const startDate = ZonedDateTime.parse(start.toISOString())
  const endDate = ZonedDateTime.parse(end.toISOString())

  const hours = startDate.until(endDate, ChronoUnit.HOURS)
  const minutes = startDate.plusHours(hours).until(endDate, ChronoUnit.MINUTES)
  const seconds = startDate
    .plusHours(hours)
    .plusMinutes(minutes)
    .until(endDate, ChronoUnit.SECONDS)

  return { hours, minutes, seconds }
}
