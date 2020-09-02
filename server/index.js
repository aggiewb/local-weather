const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.listen(5000, () => console.log('Express server started'));

app.get('/:longitude/:latitude', (request, response) => {
    const longitude = parseInt(request.params.longitude);
    const latitude = parseInt(request.params.latitude);
    console.log(longitude, latitude);
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
    .then(fetchResponse => fetchResponse.json())
    .then(weatherJSON => {
        tempCelsius = weatherJSON.main.temp;
        console.log(tempCelsius);
    });
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
})