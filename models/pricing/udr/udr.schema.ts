import * as Yup from 'yup'
import { MestskaCast, KodZony, VynimkaZoSpoplatnenia, Vyhradene } from './udr.d'

export const udrValidation = Yup.object({
  id: Yup.number().required(),
  mestskaCast: Yup.mixed<MestskaCast>().oneOf(Object.values(MestskaCast)),
  kodZony: Yup.mixed<KodZony>().oneOf(Object.values(KodZony)),
  nazov: Yup.string().required(),
  maxParkovanie: Yup.string().required(),
  bezpPark: Yup.string().required(),
  obmedzenePreApk: Yup.string().required(),
  vynimkaZoSpoplatnenia: Yup.mixed<VynimkaZoSpoplatnenia>().oneOf(
    Object.values(VynimkaZoSpoplatnenia)
  ),
  vynimkaApk: Yup.string().required(),
  udrid: Yup.string().required(),
  globalIdString: Yup.string().required(),
  shapeArea: Yup.string().required(),
  shapeLength: Yup.string().required(),
  vyhradene: Yup.mixed<Vyhradene>().oneOf(Object.values(Vyhradene)),
})

export const getudrResValidation = Yup.array().of(udrValidation)
