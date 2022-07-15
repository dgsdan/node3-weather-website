const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');


const weatherForecastFetch = (addr) => {
    fetch('http://localhost:3000/weather?address=' + addr)
        .then(response => {
            response.json().then(data => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            })
        })
}


weatherForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = searchInput.value;
    weatherForecastFetch(location);
});