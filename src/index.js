import './styles.css'

// import IconSearch from './resources/icons/search.svg'

const baseUrl = 'http://api.weatherapi.com/v1'

const btnSearch = document.getElementById('search-btn')
const inputSearch = document.getElementById('search-input')

// const iconSearch = new Image()
// iconSearch.src = IconSearch

// btnSearch.appendChild(iconSearch)

btnSearch.addEventListener('click', async(event)=>{
    event.preventDefault()
    const res = await fetch(`${baseUrl}/current.json?key=${process.env.API_KEY}`)
    console.log(res)
})