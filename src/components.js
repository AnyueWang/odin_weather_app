import { format, add } from 'date-fns'

const generateCandidateDiv = (data, handleEachResult) => {
    const candidateDiv = document.createElement('div')
    candidateDiv.classList.add('search-candidates-container')
    data.forEach(eachCity => {
        const cityDiv = document.createElement('div')
        cityDiv.textContent = eachCity
        candidateDiv.appendChild(cityDiv)

        cityDiv.addEventListener('click', async (event) => {
            await handleEachResult(event)
        })
    })
    return candidateDiv
}

const generateWeatherDiv = (data,) => {
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

    const forecastP = document.createElement('p')
    forecastP.textContent = 'Forecast:'
    forecastP.classList.add('forecast-title')
    resultDiv.appendChild(forecastP)

    const forecastDiv = document.createElement('div')
    forecastDiv.classList.add('forecast-container')
    const dateArray = data.localtime.split(' ')[0].split('-')
    const today = new Date(dateArray[0], Number(dateArray[1]) - 1, dateArray[2])
    data.forecast.forEach((eachDayForecast, idx) => {
        const eachDate = add(today, { days: idx })
        const eachDiv = document.createElement('div')

        const eachDateP = document.createElement('p')
        eachDateP.textContent = format(eachDate, 'MM/dd EEE')
        eachDateP.classList.add('forecast-content')
        eachDiv.appendChild(eachDateP)

        const eachWeatherIcon = new Image()
        eachWeatherIcon.src = eachDayForecast.weatherIconSrc
        eachWeatherIcon.classList.add('icon-weather-forecast')
        eachDiv.appendChild(eachWeatherIcon)

        const eachWeatherP = document.createElement('p')
        eachWeatherP.textContent = eachDayForecast.weatherText
        eachWeatherP.classList.add('forecast-content')
        eachDiv.appendChild(eachWeatherP)

        const eachTempP = document.createElement('p')
        eachTempP.textContent = `${eachDayForecast.maxtemp_c} - ${eachDayForecast.mintemp_c} °C`
        eachTempP.classList.add('forecast-content')
        eachDiv.appendChild(eachTempP)

        forecastDiv.appendChild(eachDiv)
    })
    resultDiv.appendChild(forecastDiv)
    return resultDiv
}

const generateErrorDiv = (message) => {
    const errorDiv = document.createElement('div')
    errorDiv.classList.add('error-container')
    errorDiv.textContent = `ERROR: ${message}`
    return errorDiv
}

export default {
    generateCandidateDiv,
    generateWeatherDiv,
    generateErrorDiv,
}