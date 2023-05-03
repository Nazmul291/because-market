/**
 * Async time out
 * @param {Number} [delay = 0] delay
 * @returns {Promise} resolve promise when timeout
 */
export const asyncTimeout = (delay = 0) => {
  return new Promise((res) => {
    setTimeout(res, delay)
  })
}
