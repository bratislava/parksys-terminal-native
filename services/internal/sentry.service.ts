import * as Sentry from 'sentry-expo'

// if set to false, logs errors locally instead of sending them to Sentry
// should equal !__DEV__ in most cases, override to test Sentry logging
export const ENABLE_SENTRY_LOGGING = !__DEV__

/**
 * Captures an exception event and sends it to Sentry.
 *
 * @param exception An exception-like object.
 * @returns The generated eventId.
 */
export const captureException: typeof Sentry.Native.captureException = (
  ...params
) => {
  if (!ENABLE_SENTRY_LOGGING) {
    console.error(...params)
    return 'fake-sentry-event-id'
  } else {
    return Sentry.Native.captureException(...params)
  }
}

/**
 * Captures a message event and sends it to Sentry.
 *
 * @param message The message to send to Sentry.
 * @param level Define the level of the message.
 * @returns The generated eventId.
 */
export const captureMessage: typeof Sentry.Native.captureMessage = (
  ...params
) => {
  if (!ENABLE_SENTRY_LOGGING) {
    console.log(...params)
    return 'fake-sentry-event-id'
  } else {
    return Sentry.Native.captureMessage(...params)
  }
}
