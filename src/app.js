const baseUrl = 'https://api.weatherapi.com/v1'

const search = async (str) => {
    const res = await fetch(`${baseUrl}/search.json?key=${process.env.API_KEY}&q=${str}`, { mode: 'cors' })
    return await res.json()
}

const get = async (city) => {
    const res = await fetch(`${baseUrl}/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3`, { mode: 'cors' })
    return await res.json()
}

export default {
    search,
    get
}