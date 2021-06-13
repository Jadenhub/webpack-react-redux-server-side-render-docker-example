import unfetch from 'isomorphic-unfetch'

const clientfetch = (...args) => unfetch(...args)
  .then(async (res) => {
    if (res.status >= 400) {
      window.location.href = `${window.location.origin}/404`
    }
    return {data: await res.json(), status: res.status}
  })
  .catch(error => {
    return { error }
  })

export default clientfetch
