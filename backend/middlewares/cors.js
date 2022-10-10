const cors = (req, res, next) => {
  const allowedCors = [
    'https://mesto.react.nomoredomains.icu',
    'http://mesto.react.nomoredomains.icu',
    'localhost:3000',
    'http://localhost:3000',
  ];
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
  return true;
};

module.exports = cors;
