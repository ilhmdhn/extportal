const fetch = require('node-fetch');

module.exports = async() => {
  try {
    console.log('masuk nav state');
    const url = 'http://127.0.0.1:1922/check-db';
    const response = await fetch(url);
    const data = await response.json();
    if (data.state === true) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.error('Error fetching nav state:', err);
    return false;
  }
}