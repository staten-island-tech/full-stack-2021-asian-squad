import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'

// persists state in between reloads using cookies
// works with Nuxt SSR :D
export default ({ store, req, isDev }) => {
  createPersistedState({
    storage: {
      getItem: (key) => {
        // use cookies in request headers if in server
        if (process.server) {
          // return nothing if cookies not present
          const reqCookies = req.headers.cookie
          if (!reqCookies) return
          // parse + return cookies if present
          const parsedCookies = cookie.parse(reqCookies)
          return parsedCookies[key]
        } else {
          // get cookies if in client
          return Cookies.get(key)
        }
      },
      setItem: (key, value) =>
        Cookies.set(key, value, { expires: 365, secure: !isDev }),
      removeItem: (key) => Cookies.remove(key),
    },
  })(store)
}
