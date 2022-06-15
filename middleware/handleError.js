const ValidatorError = require('../Errors/ValidatorError')

module.exports = (error, req, res, next) => {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    error = new ValidatorError(error.message)
  }

  if (error.status === undefined) error.status = 500

  console.log(error.name)
  console.log(error.status)
  console.log(error.message)

  res.status(error.status).send({ error: error.message }).end()
}
