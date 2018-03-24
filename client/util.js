export const encodeUtf8 = (s) => unescape(encodeURIComponent(s))
export const decodeUtf8 = (s) => decodeURIComponent(escape(s))
export const isServer = typeof window === 'undefined'
