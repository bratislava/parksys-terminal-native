import * as yup from 'yup'

// kept as an example
export const mhdStop = yup
  .object()
  .shape({
    id: yup.string().required('error-malformed-stationStopId'),
    name: yup.string().required('error-malformed-name'),
    gpsLon: yup.string().required('error-malformed-gpsLon'),
    gpsLat: yup.string().required('error-malformed-gpsLat'),
    platform: yup.string().nullable(),
  })
  .noUnknown()

export const apiMhdStops = yup
  .object()
  .shape({ stops: yup.array().ensure().of(mhdStop) })
