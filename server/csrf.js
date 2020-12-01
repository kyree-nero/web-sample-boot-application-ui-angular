module.exports = (req, res, next) => {
  res.header('X-CSRF-TOKEN', '1f5a7733-473b-4190-9abd-11b2f54d12a2')
  next()
}
