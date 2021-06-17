export const info = (...params: [any]) => {
  console.log(...params)
}

export const error = (...params: [any]) => {
  console.error(params)
  throw [...params]
}

export default { info, error }