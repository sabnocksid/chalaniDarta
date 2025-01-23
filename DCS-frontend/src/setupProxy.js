const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', 
    createProxyMiddleware({
      target: 'http://52.66.247.124:2020/api/v1/', 
      changeOrigin: true, 
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};
