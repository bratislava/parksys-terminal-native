const HEADERS = {
  'Content-Type': 'application/x-www-form-urlencoded',
}

/**
 * Create x-www-form-urlencoded form for axios
 * @param params params to initialize form with
 * https://gist.github.com/akexorcist/ea93ee47d39cf94e77802bc39c46589b
 * @returns [form, headers]
 */
function createXWwwForm<T extends Record<string, any>>(
  params: T
): [URLSearchParams, typeof HEADERS] {
  const form = new URLSearchParams()

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const element = params[key]
      form.append(key, element as string)
    }
  }

  return [form, HEADERS]
}

export default createXWwwForm
