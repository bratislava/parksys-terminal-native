import {
  LocalDateTime,
  Instant,
  nativeJs,
  DateTimeFormatter,
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
