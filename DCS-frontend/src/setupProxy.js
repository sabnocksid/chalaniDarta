const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', 
    createProxyMiddleware({
      target: 'https://darta.bimal1412.com.np', 
      changeOrigin: true, 
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};
