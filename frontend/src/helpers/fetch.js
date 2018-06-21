const status = async response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))
}

const apiVersion = '/api-v1'

const json = response => response.json()

const fetchLocal = (URL, optional) => fetch(`http://localhost:8080${apiVersion}${URL}`, {
  headers: {
    'Content-Type': 'application/json',
  },
  ...optional,
}).then(status)
  .then(json)
  .then(data => data)
  .catch(error => {
    console.log('Request failed', error)
    return {}
  })

const get = URL => fetchLocal(URL, { method: 'GET' })

const post = (URL, data) => fetchLocal(URL, {
  method: 'POST',
  body: JSON.stringify(data),
})

const del = URL => fetchLocal(URL, { method: 'DELETE' })

export const api = {
  get,
  post,
  delete: del,
}
