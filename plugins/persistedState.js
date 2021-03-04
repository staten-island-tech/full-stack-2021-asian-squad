import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

// persists state in between reloads using cookies
// works with Nuxt SSR :D
export default ({ store, req, isDev }) => {
  createPersistedState({
    storage: {
      getItem: (key) => {
        if (process.server) {
          const parsedCookies = cookie.parse(req.headers.cookie);
          return parsedCookies[key];
        } else {
          return Cookies.get(key);
        }
      },
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 365, secure: !isDev }),
      removeItem: key => Cookies.remove(key)
    }
  })(store);
};
