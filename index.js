addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const { query } = await request.json()

  const resp = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}`,
    {
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
      },
    },
  )
  const data = await resp.json()
  const images = data.results.map((image) => ({
    id: image.id,
    image: image.urls.small,
    link: image.links.html,
  }))

  return new Response(JSON.stringify(images), {
    headers: {
      'Content-type': 'application/json',
    },
  })
}
