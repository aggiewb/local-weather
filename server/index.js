const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.listen(5000, () => console.log('Express server started'));

app.get('/:longitude/:latitude', (request, response) => {
    const longitude = parseFloat(request.params.longitude);
    const latitude = parseFloat(request.params.latitude);
    fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`)
        .then(fetchResponse => {
            if(fetchResponse.ok){
                return fetchResponse.json();
            } else {
                throw new Error(fetchResponse.statusText);
            }
        })
        .then(weatherJSON => {
            const tempCelsius = weatherJSON.main.temp;
            const location = weatherJSON.name;
            const type = weatherJSON.weather[0].main;
            response.json({tempCelsius, location, type});
        })
        .catch(error => response.json(error));
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
});