import './styles.css'

const baseUrl = 'http://api.weatherapi.com/v1'

const btnSearch = document.getElementById('search-btn')
const inputSearch = document.getElementById('search-input')
const resultDiv = document.getElementById('result-container')

btnSearch.addEventListener('click', async (event) => {
    event.preventDefault()
    const city = inputSearch.value.toLowerCase()
    try {
        const res = await fetch(`${baseUrl}/current.json?key=${process.env.API_KEY}&q=${city}`)
        const rawData = await res.json()
        if (rawData.error) {
            const errorCode = rawData.error.code
            switch (errorCode) {
                case 1003:
                    throw new Error('The city name should not be empty!')
                case 1006:
                    throw new Error('The city name does not exist!')
                default:
                    break;
            }
        }
        console.log(rawData)
        const weatherIcon = new Image()
        weatherIcon.src = rawData.current.condition.icon
        resultDiv.appendChild(weatherIcon)
    } catch (error) {
        console.log(error.message)
    }
})