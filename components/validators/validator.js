// Implemented: required
// prettier-ignore-start
export const validate = (data, check) => {
  console.log(data, check)
  const errorsObject = {}
  Object.keys(check).forEach(v => {
    if (check[v].required && !data[v]) {
      errorsObject[v] = 'Field is required'
    }
  })
  return errorsObject
}
// prettier-ignore-end
