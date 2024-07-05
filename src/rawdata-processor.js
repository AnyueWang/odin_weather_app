const processCandidateData = (rawData) => {
    const data = []
    rawData.forEach(eachCity => {
        const info = `${eachCity.name || ''}, ${eachCity.region || ''}, ${eachCity.country || ''}`
        data.push(info)
    })
    return data
}

const processWeatherData = (rawData) => {
    const forecastData = []
    rawData.forecast.forecastday.forEach(eachDayData => {
        const lastHourData = eachDayData.hour.at(12)
        const requiredData = {
            weatherIconSrc: lastHourData.condition.icon.replace('64x64', '128x128'),
            maxtemp_c: eachDayData.day.maxtemp_c,
            mintemp_c: eachDayData.day.mintemp_c,
            weatherText: lastHourData.condition.text,
        }
        forecastData.push(requiredData)
    });
    return {
        city: rawData.location.name,
        region: rawData.location.region,
        country: rawData.location.country,
        weatherIconSrc: rawData.current.condition.icon.replace('64x64', '128x128'),
        temp_c: rawData.current.temp_c,
        weatherText: rawData.current.condition.text,
        localtime: rawData.location.localtime,
        forecast: forecastData,
    }
}

export default {
    processCandidateData,
    processWeatherData
}