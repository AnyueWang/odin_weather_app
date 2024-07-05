import './styles.css'
import { format } from 'date-fns'

const baseUrl = 'http://api.weatherapi.com/v1'

const btnSearch = document.getElementById('search-btn')
const inputSearch = document.getElementById('search-input')
const contentDiv = document.getElementById('content-container')

btnSearch.addEventListener('click', async (event) => {
    event.preventDefault()
    const preResultDiv = document.getElementById('result-container')
    if (preResultDiv) preResultDiv.remove()
    const city = inputSearch.value.toLowerCase()
    try {
        const res = await fetch(`${baseUrl}/forecast.json?key=${process.env.API_KEY}&q=${city}&days=3`)
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
        inputSearch.value = ''
        const data = {
            city: rawData.location.name,
            region: rawData.location.region,
            country: rawData.location.country,
            weatherIconSrc: rawData.current.condition.icon.replace('64x64', '128x128'),
            temp_c: rawData.current.temp_c,
            weatherText: rawData.current.condition.text,
            localtime: rawData.location.localtime,
        }
        const resultDiv = document.createElement('div')
        resultDiv.setAttribute('id', 'result-container')

        const weatherDiv = document.createElement('div')
        const weatherIcon = new Image()
        weatherIcon.src = data.weatherIconSrc
        weatherIcon.classList.add('icon-weather-main')
        const weatherP = document.createElement('p')
        weatherP.textContent = `${data.weatherText}, ${data.temp_c} °C`
        weatherP.classList.add('weather-name')
        weatherDiv.appendChild(weatherIcon)
        weatherDiv.appendChild(weatherP)
        resultDiv.appendChild(weatherDiv)

        const basicDiv = document.createElement('div')
        const cityP = document.createElement('p')
        cityP.textContent = data.city
        cityP.classList.add('city-name')
        const countryP = document.createElement('p')
        countryP.textContent = `${data.region}, ${data.country}`
        const timeP = document.createElement('p')
        timeP.textContent = data.localtime
        basicDiv.appendChild(cityP)
        basicDiv.appendChild(countryP)
        basicDiv.appendChild(timeP)
        resultDiv.appendChild(basicDiv)



        contentDiv.appendChild(resultDiv)

    } catch (error) {
        console.log(error.message)
    }
})