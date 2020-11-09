const match = require('mime-match')

const isCorrectFileType = (fileType, allowedFileTypes) => {
  return (allowedFileTypes || []).some((type) => {
    // is this is a mime-type
    if (type.indexOf('/') > -1) {
      if (!fileType) return false
      return match(fileType.replace(/;.*?$/, ''), type)
    }

    // otherwise this is likely an extension
    if (type[0] === '.') {
      return fileType.toLowerCase() === type.substr(1).toLowerCase()
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
    (allowedFileTypes ? isCorrectFileType(file.mimeType, allowedFileTypes) : true) &&
    (minFileSize || maxFileSize ? isCorrectFileSize(file, minFileSize, maxFileSize) : true)
  )
}

module.exports = {
  adheresToRestrictions,
  isCorrectFileType
}
