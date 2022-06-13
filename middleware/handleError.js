
const ERROR_MAP = {
  CastError: res => res.status(400).send({ error: 'id used is malformed' }),
  ValidationError: res => res.status(400).send({ error: 'some inputs are missed' }),
  defaultError: res => res.status(500).end()
}

module.exports = (error, req, res, next) => {
  console.log(error)
  const handler = ERROR_MAP[error.name] || ERROR_MAP.defaultError

  handler(res, error)
}
