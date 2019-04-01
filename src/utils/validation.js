export const required = value =>
  value || typeof value === 'number' ? undefined : { key: 'error.required' }

export const minLength = min => value =>
  value && value.length < min ? { key: 'error.minLength', min } : undefined

export const minLength6 = minLength(6)
