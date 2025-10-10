const fs = require('fs');
const jwt = require('jsonwebtoken');
const response = require('../lib/response');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
    
  if (!authHeader) {
    return response.unauthorized(res, 'Token tidak ditemukan');
  }

  const publicKey = fs.readFileSync('public.key', 'utf8');

  try {
    const token = authHeader;
    let decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'], ignoreExpiration: true });
    
    // SUPPORT LEGACY: Jika hasil adalah string (double encoded), parse lagi
    if (typeof decoded === 'string') {
      decoded = JSON.parse(decoded);
    }
    
    req.user = decoded;
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return response.unauthorized(res, 'Token tidak valid');
  }
}