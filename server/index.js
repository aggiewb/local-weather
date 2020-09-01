const express = require('express');
const app = express();

app.listen(3001, () => console.log('Express server started'));

app.get('/:longitude/:latitude', (request, response) => {
    const longitude = request.params.longitude;
    const latitude = request.params.latitude;
});