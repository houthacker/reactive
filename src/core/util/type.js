function isScalar(value) {
  const type = typeof value
  return type !== 'object' || (value === null || value === undefined)
}

function isFunction(value) {
  return value instanceof Function
}

function isArray(value) {
  return Array.isArray(value)
}

function isObject(value) {
  return !!value && typeof value === 'object' && !isFunction(value) && !isArray(value)
}

export {
  isScalar,
  isFunction,
  isArray,
  isObject
}