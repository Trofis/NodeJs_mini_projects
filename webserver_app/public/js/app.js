const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } 
        else {
            console.log(data.location)
            console.log(data.latitude)
            console.log(data.longitude)
            console.log(data.temperature)

            const messageOne = document.querySelector('#message-1')
            const messageTwo = document.querySelector('#message-2')

            messageOne.textContent = data.location
            messageTwo.textContent = data.temperature
        }
    })
})
})