async function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    try {
      fn(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = runMiddleware;
