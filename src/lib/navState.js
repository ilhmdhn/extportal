const fetch = require('node-fetch');

module.exports = async() => {
  try {
    const url = 'http://103.94.238.197/:1922/check-db';
    const response = await fetch(url);
    const data = await response.json();

    if (data.state === 1) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return false;
  }
}