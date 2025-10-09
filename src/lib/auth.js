const fs = require('fs');
const jwt = require('jsonwebtoken');
const response = require('../lib/response');

module.exports = (req, res, next) =>{
  const authHeader = req.headers['authorization'];
  
  const publicPaths = [
    '/login',
    '/tools',
    '/storage'
  ];

  if (publicPaths.some(path => req.path.startsWith(path))) {
    return next(); // biarkan lewat tanpa token
  }
  
  if (!authHeader) {
    return response.unauthorized(res, 'Token tidak ditemukan');
  }

  const publicKey = fs.readFileSync('public.key', 'utf8');

  try {
    const token = authHeader;
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'], ignoreExpiration: true });
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return response.unauthorized(res, 'Token tidak valid');
  }
}