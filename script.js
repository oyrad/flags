async function getCountries(dataNumber) {

    const response = await fetch("https://restcountries.eu/rest/v2/all")
    const data = await response.json()

    const countries = []
    for(let i = 0; i < dataNumber; i++) {
        const randomNum = Math.floor(Math.random() * data.length)
        const country = data[randomNum]
      
        countries.push({
            flag: country.flag,
            name: country.name,
            capital: country.capital
        })
    }
    return countries
}

let rendered = false
const form = document.querySelector('form')
const list = document.querySelector('.grid-list')
const selectBox = document.querySelector('select')

form.addEventListener('submit', event => {
    event.preventDefault()

    if (rendered) {
        list.querySelectorAll('*').forEach(element => element.remove())
        rendered = false
    }

    getCountries(selectBox.value).then(countries => {
        countries.forEach(({ flag, name, capital }) => {
            const container = document.createElement('div')
            const flagImg = document.createElement('img')

            flagImg.src = flag
            container.appendChild(flagImg)
            list.appendChild(container)
        })
    })
    rendered = true
    form.reset()
})
