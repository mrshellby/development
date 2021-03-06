// Copyright © VNG Realisatie 2020
// Licensed under the EUPL
//
import { camelCase } from 'change-case'

function objectKeysToCamelCase(obj) {
  if (obj instanceof Array) {
    return obj.map((value) => {
      return objectKeysToCamelCase(value)
    })
  } else if (typeof obj === 'object' && obj !== null) {
    const newObj = {}

    Object.entries(obj).forEach(([key, value]) => {
      value = objectKeysToCamelCase(value)
      newObj[camelCase(key)] = value
    })

    return newObj
  }

  return obj
}

export default objectKeysToCamelCase
