addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const CLIENT_ID = 'PwqC0i0JdupuqppRevfnD6dk3FdZVwoE_CoXIvhRQOk'
  const resp = await fetch('https://api.unsplash.com/photos', {
    headers: {
      Authorization: `Client-ID ${CLIENT_ID}`,
    },
  })
  const data = await resp.json()
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-type': 'application/json',
    },
  })

  const { query } = await request.json()
  return new Response(`Your query was ${query}`)
}
