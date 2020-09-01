const express = require('express');
const app = express();

app.listen(5000, () => console.log('Express server started'));

app.get('/:longitude/:latitude', (request, response) => {
    const longitude = request.params.longitude;
    const latitude = request.params.latitude;
});

app.use((request, response) => {
    response.type('text/html');
    response.status(404);
    response.send('<h1>404 error</h1><p>Sorry! That page couldn\'t be found.</p>');
})