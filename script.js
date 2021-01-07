const getCountries = async dataNumber => {

    const response = await fetch("https://restcountries.eu/rest/v2/all")
    const data = await response.json()

    const countries = []
    for(let i = 0; i < dataNumber; i++) {
        const randomNum = Math.floor(Math.random() * data.length)
        const country = data[randomNum]
      
        countries.push({
            flag: country.flag,
            answer: country.name
        })
    }
    return countries
}

getCountries(20).then(data => {
    console.log(data);
  });

/* countries.forEach(({ flag, answer }) => {
    console.log(1)
    console.log(answer)
    const container = document.createElement('div')
    const flagImg = document.createElement('img')
    const list = document.querySelector('.list')

    flagImg.src = country.flag
    container.appendChild(flagImg)
    list.appendChild(container)
}) */