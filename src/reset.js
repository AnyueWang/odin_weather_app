const removePreviousCadidates = () => {
    const previousCandidates = document.querySelector('.search-candidates-container')
    if (previousCandidates) {
        previousCandidates.remove()
    }
}

const removePreviousError = () => {
    const previousError = document.querySelector('.error-container')
    if (previousError) {
        previousError.remove()
    }
}

const removePreviousResult = () => {
    const preResultDiv = document.getElementById('result-container')
    if (preResultDiv) {
        preResultDiv.remove()
    }
}

export default {
    removePreviousCadidates,
    removePreviousError,
    removePreviousResult,
}