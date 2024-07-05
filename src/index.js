import './styles.css'

const baseUrl = 'http://api.weatherapi.com/v1'

const btnSearch = document.getElementById('search-btn')
const inputSearch = document.getElementById('search-input')

btnSearch.addEventListener('click', async(event)=>{
    event.preventDefault()
    const city = inputSearch.value.toLowerCase()
    const res = await fetch(`${baseUrl}/current.json?key=${process.env.API_KEY}&q=${city}`)
    const rawData = await res.json()
    console.log(rawData)
})