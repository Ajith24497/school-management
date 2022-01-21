const createCookie = (name, value, seconds) => {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 1000);
  const expires = `expires=${date.toGMTString()}`;
  document.cookie = `${name}=${value}; ${expires}; path/`;
};

const getCookie = (cookieName) => {
  const cookies = document.cookie
    .split(";")
    .map((cookie) => cookie.split("="))
    .reduce(
      (accum, [key, val]) => ({
        ...accum,
        [key.trim()]: decodeURIComponent(val),
      }),
      {}
    );
  return cookies[cookieName];
};

module.exports = { createCookie, getCookie };
