import * as Yup from 'yup'

export const paginationValidation = Yup.object({
  total: Yup.number().required(),
  currentPage: Yup.number().required(),
  pageSize: Yup.number().required(),
})

/**
 * Helper to validate paginated result
 * @param dataValidation data item validation
 * @returns schema
 */
export function withPaginationValidation<T extends Yup.AnySchema>(
  dataValidation: T
) {
  return Yup.object({
    items: Yup.array().of(dataValidation),
    pagination: paginationValidation,
  })
}
