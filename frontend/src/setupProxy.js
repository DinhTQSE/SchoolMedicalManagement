/**
 * Custom proxy configuration for Create React App development server
 * This file is automatically recognized by Create React App
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api', // Ch? proxy c�c request b?t d?u b?ng /api
    createProxyMiddleware({
      target: 'http://localhost:8080', // URL c?a backend Spring Boot ch�nh
      changeOrigin: true,
      secure: false, // Thu?ng l� false cho m�i tru?ng dev localhost
      // Kh�ng d�ng pathRewrite v� backend d� c� /api trong @RequestMapping
      onProxyReq: (proxyReq, req, res) => {
        },
      onError: (err, req, res, target) => {
        console.error(`[Proxy Error] Could not connect to ${target.href}: ${err.message}`);
        // Kh�ng t? d?ng th? l?i port kh�c trong phi�n b?n don gi?n n�y
        if (!res.headersSent) {
            res.writeHead(503, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Proxy Error: Could not connect to backend service.', error: err.message }));
        }
      }
    })
  );

  // N?u b?n c� c�c API kh�c kh�ng b?t d?u b?ng /api, b?n c� th? th�m c�c proxy kh�c ? d�y
  // V� d?:
  // app.use(
  //   '/auth', 
  //   createProxyMiddleware({
  //     target: 'http://localhost:8080', 
  //     changeOrigin: true,
  //   })
  // );
};
