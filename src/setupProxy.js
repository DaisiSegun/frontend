const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy all requests under /api to the target API
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://bewildered-pike-cowboy-hat.cyclic.app', // Replace with your API URL
      changeOrigin: true,
      secure: false, // Set to false if your server doesn't have a valid certificate
    })
  );
};
