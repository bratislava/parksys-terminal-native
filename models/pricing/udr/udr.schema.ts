import * as Yup from 'yup'

export const udrValidation = Yup.object({
  id: Yup.number().required(),
  mestskaCast: Yup.string().required(),
  kodZony: Yup.string().required(),
  nazov: Yup.string().required(),
  maxParkovanie: Yup.string().required(),
  bezpPark: Yup.string().required(),
  obmedzenePreApk: Yup.string().required(),
  vynimkaZoSpoplatnenia: Yup.string().required(),
  vynimkaApk: Yup.string().required(),
  udrid: Yup.string().required(),
  globalIdString: Yup.string().required(),
  shapeArea: Yup.string().required(),
  shapeLength: Yup.string().required(),
  vyhradene: Yup.string().required(),
})

export const getudrResValidation = Yup.array().of(udrValidation)
