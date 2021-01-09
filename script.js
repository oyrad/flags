async function getCountries(region, quantity) {

    const response = await fetch("https://restcountries.eu/rest/v2/all")
    const data = await response.json()
    
    const avoidNums = [30, 33, 98, 183, 191, 216]
    //const availableCountries = data.filter(index => avoidNums.includes(index))

    
    const filteredCountries = data.filter((country, index) => 
        (!avoidNums.includes(index) && (region === "all" || country.region == region)))
      
    const countries = []
    const pastRndNums = []
        
    let foundFlags = 0
    while(foundFlags < quantity) {

        const randomNum = Math.floor(Math.random() * filteredCountries.length)

        if (!(pastRndNums.includes(randomNum) || avoidNums.includes(randomNum))) {
            pastRndNums.push(randomNum)
            const country = filteredCountries[randomNum]
      
            countries.push({
                flag: country.flag,
                name: country.name,
                capital: country.capital,
                languages: country.languages[0].name,
                region: country.region
            })

            foundFlags++
        }
    }
    return countries
}

let rendered = false
const form = document.querySelector('form')
const list = document.querySelector('.grid-list')
const regionBox = document.querySelector('.region')
const quantityBox = document.querySelector('.quantity')

form.addEventListener('submit', e => {

    e.preventDefault()
    
    if (rendered) list.querySelectorAll('*').forEach(element => element.remove())

    getCountries(regionBox.value, quantityBox.value).then(countries => {
        
        countries.forEach(({ flag, name, capital, languages, region }) => {
            const container = document.createElement('div')
            container.className = "card"

            const front = document.createElement('div')
            front.className = "front"

            const back = document.createElement('div')
            back.className = "back"

            const countryName = document.createElement('h4')
            countryName.innerText = `Name: ${name}`

            const countryCapital = document.createElement('h4')
            if(!capital) countryCapital.innerText = `Capital City: None`
            else countryCapital.innerText = `Capital City: ${capital}`
            countryCapital.style.color = "#666"

            const countryLangs = document.createElement('h4')
            countryLangs.innerText = `Language: ${languages}`

            const countryReg = document.createElement('h4')
            countryReg.innerText = `Region: ${region}`
            countryReg.style.color = "#666"
            
            const flagImg = document.createElement('img')
            flagImg.src = flag
            
            front.appendChild(flagImg)

            back.appendChild(countryName)
            back.appendChild(countryCapital)
            back.appendChild(countryLangs)
            back.appendChild(countryReg)

            container.appendChild(front)

            let flip = false
            container.addEventListener("click", () => {
                flip = !flip
                if (flip) {
                    container.className = "card flip"
                    front.remove()
                    container.appendChild(back)
                } else {
                    container.className = "card"
                    back.remove()
                    container.appendChild(front)
                }
            })

            list.appendChild(container)
        })

    })
    rendered = true
})
