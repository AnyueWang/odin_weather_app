import './styles.css'
import reset from './reset'
import app from './app'
import rawdataProcessor from './rawdata-processor'
import components from './components'

const btnSearch = document.getElementById('search-btn')
const inputSearch = document.getElementById('search-input')
const contentDiv = document.getElementById('content-container')
const searchForm = document.getElementById('search-form')

inputSearch.addEventListener('keydown', searchInput)
btnSearch.addEventListener('click', searchWeather)

async function searchInput(event) {
    reset.removePreviousCadidates()
    reset.removePreviousError()
    if (event.key === 'Enter') return
    const currentStr = event.key.length === 1
        ? event.target.value + event.key
        : (
            event.key === 'Backspace' && event.target.value.length !== 0
                ? event.target.value.slice(0, -1)
                : event.target.value
        )
    if (currentStr.length <= 2) return
    try {
        const rawData = await app.search(currentStr)
        if (rawData.length == 0) return
        const data = rawdataProcessor.processCandidateData(rawData)
        if (data) {
            const candidateDiv = components.generateCandidateDiv(data, searchWeather)
            searchForm.appendChild(candidateDiv)
        }
    } catch (error) {
        handleError(error)
    }
}

async function searchWeather(event) {
    event.preventDefault()
    reset.removePreviousCadidates()
    reset.removePreviousError()
    reset.removePreviousResult()
    const city = inputSearch.value.toLowerCase()
    inputSearch.value = ''
    try {
        const rawData = await app.get(city)
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
        const data = rawdataProcessor.processWeatherData(rawData)
        const resultDiv = components.generateWeatherDiv(data)
        contentDiv.appendChild(resultDiv)
    } catch (error) {
        handleError(error)
    }
}

function handleError(error) {
    reset.removePreviousCadidates()
    reset.removePreviousError()
    const errorDiv = components.generateErrorDiv(error.message)
    contentDiv.appendChild(errorDiv)
}
