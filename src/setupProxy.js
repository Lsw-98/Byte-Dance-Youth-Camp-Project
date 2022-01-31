const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/springTravel',
    createProxyMiddleware({
      target: 'http://apis.juhe.cn',
      changeOrigin: true
    })
  )
}