import { makeGetRequest } from "../utils"

export function findAddress(query) {
  return makeGetRequest(
    `https://us-autocomplete-pro.api.smartystreets.com/lookup?auth-id=${process.env.SMARTYSTREETS_PUBLIC_KEY}&search=${query}`
  ).then((res) => res?.suggestions)
}

export function validateAddress(address) {
  const { zip, city, state } = address
  return makeGetRequest(
    `https://us-zipcode.api.smartystreets.com/lookup?auth-id=${process.env.SMARTYSTREETS_PUBLIC_KEY}&zipcode=${zip}`
  ).then((res) => {
    if (
      !res ||
      !res[0] ||
      res[0]?.status === "invalid_zipcode" ||
      !res[0]?.zipcodes ||
      !res[0].zipcodes[0]
    ) {
      return false
    }

    const { zipcode, state_abbreviation, default_city } = res[0].zipcodes[0]

    return (
      zip === zipcode && state_abbreviation === state && city === default_city
    )
  })
}
