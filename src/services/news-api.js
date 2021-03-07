import axios from 'axios'

const API_KEY = 'YxMfYpZdgTmRkRLGraIjBfCMLTo4UcX0'

const NewsApi = {
  get: async () => {
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=${API_KEY}`

    const response = await axios.get(url)

    return response
  }
}

export default NewsApi
