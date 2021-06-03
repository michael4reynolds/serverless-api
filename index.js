addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

const corsHeaders = {
  'Access-Control-Headers': '*',
  'Access-Control-Methods': 'POST',
  'Access-Control-Origin': '*',
}

const getImages = async (request) => {
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
      ...corsHeaders,
    },
  })
}

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders })
  }

  if (request.method === 'POST') {
    return getImages(request)
  }
}
