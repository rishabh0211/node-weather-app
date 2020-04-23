
const getWeatherInfo = (location) => {
  fetch(`/weather?address=${location}`)
    .then(response => response.json())
    .then(res => {
      messageTwo.textContent = '';
      if (res.error) {
        messageOne.textContent = `Error: ${res.error}`;
      } else {
        messageOne.textContent = `The temperature in ${res.location} is ${res.temperature} degree and it feels like ${res.feelsLike} degree.`;
      }
    });
};

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  messageOne.textContent = '';
  messageTwo.textContent = 'Loading...';
  const location = search.value;
  getWeatherInfo(location);
});

