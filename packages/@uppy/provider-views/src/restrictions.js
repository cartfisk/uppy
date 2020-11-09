const match = require('mime-match')

const isCorrectFileType = (file, allowedFileTypes) => {
  return (allowedFileTypes || []).some((type) => {
    // is this is a mime-type
    if (type.indexOf('/') > -1) {
      if (!file.mimeType) return false
      return match(file.mimeType.replace(/;.*?$/, ''), type)
    }

    // otherwise this is likely an extension
    if (type[0] === '.') {
      return file.mimeType.toLowerCase() === type.substr(1).toLowerCase()
    }
    return false
  })
}

const isCorrectFileSize = (file, minFileSize, maxFileSize) => {
  return (
    minFileSize ? file.size >= minFileSize : true &&
    maxFileSize ? file.size <= maxFileSize : true
  )
}

const adheresToRestrictions = (file, restrictions) => {
  const {
    maxFileSize,
    minFileSize,
    allowedFileTypes
  } = restrictions

  return (
    (allowedFileTypes ? isCorrectFileType(file, allowedFileTypes) : true) &&
    (minFileSize || maxFileSize ? isCorrectFileSize(file, minFileSize, maxFileSize) : true)
  )
}

module.exports = adheresToRestrictions
