export const updateCart = (body) =>
  fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.error)))

export const changeCart = (body) =>
  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.error)))
