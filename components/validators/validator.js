// Implemented: required
// prettier-ignore-start
export const validate = (data, check) => {
  console.log(data, check)
  const errorsObject = {}
  if (!data.vaccination[0]?.nameOfTheVaccine) {
    errorsObject["nameOfTheVaccine"] = "First Dose vaccine name has to be completed"
  }
  if (!data.vaccination[0]?.firstDoseDate) {
    errorsObject["firstDoseDate"] = "First Dose vaccination date has to be completed"
  }
  Object.keys(check).forEach(v => {
    if (check[v].required && !data[v]) {
      errorsObject[v] = `Field is required: ${v.toUpperCase()}`
    }
  })
  console.log("errrors", errorsObject)
  return errorsObject
}
// prettier-ignore-end
