const DB_URL = 'mongodb://127.0.0.1/bitfilmsdb';
const URL_REGEX = /^https?:\/\/(w{3}\.)?[a-z\d]+\.[\w\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/i;
const EMAIL_REGEX = /[a-zA-Z0-9_\\.\\-]+@[a-zA-Z0-9_]+\\.[a-z]{2,}/;

module.exports = {
  DB_URL,
  URL_REGEX,
  EMAIL_REGEX,
};
