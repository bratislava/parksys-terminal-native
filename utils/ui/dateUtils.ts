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
 * It returns duration in minutes & hours, rounding up every started minute
 * e.g 1hour = hours:1 minutes:0
 * e.g 1hour 30 min 2 seconds = hours:1 minutes:31
 * @param start start date
 * @param end end date
 * @returns hours, minutes
 */
export function calculateTimeDifference(start: Date, end: Date) {
  const startDate = ZonedDateTime.parse(start.toISOString())
  const endDate = ZonedDateTime.parse(end.toISOString())

  let hours = startDate.until(endDate, ChronoUnit.HOURS)
  let minutes = startDate.plusHours(hours).until(endDate, ChronoUnit.MINUTES)
  const seconds = startDate
    .plusHours(hours)
    .plusMinutes(minutes)
    .until(endDate, ChronoUnit.SECONDS)

  // round up
  if (seconds > 0) minutes += 1
  if (minutes > 59) {
    minutes %= 60
    hours += 1
  }

  return { hours, minutes }
}
