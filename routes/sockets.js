module.exports = function(app) {
  app.io.route('ready', function(req) {
      req.io.emit('talk', {
          message: 'io event from an io route on the server'
      })
  })
};