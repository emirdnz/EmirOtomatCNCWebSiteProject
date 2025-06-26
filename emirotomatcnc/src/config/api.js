// Production URL: https://api.emirotomatcnc.com
// Development URL: http://localhost:5000
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const API_URL = isDevelopment 
  ? 'http://localhost:5000' 
  : 'https://api.emirotomatcnc.com';