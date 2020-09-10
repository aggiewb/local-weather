const assert = require('chai').assert;
const { server } = require('./index.js');
const fetch = require('node-fetch');

describe('SERVER ROUTES', function(){
    describe('GET /:longitude/:latitude', function(){
        it('Should return a JSON object with tempCelsius, location, and type properties', function(done){
            fetch('http://localhost:5000/90/135')
                .then(response => response.json())
                .then(data => {
                    assert.isOk(data);
                    assert.isOk(data.tempCelsius);
                    assert.isOk(data.location);
                    assert.isOk(data.type);
                    done();
                });
        });
    });
    describe('GET /:longitude/:latitude with bad params', function(){
        it('Should return a JSON object with a key of error', function(done){
            fetch('http://localhost:5000/north/west')
                .then(response => response.json())
                .then(data => {
                    assert.isTrue(Object.prototype.hasOwnProperty.call(data, 'error'));
                    done();
                });
        });
    });
    describe('Request made to a nonexistent route', function(){
        it('Should return a 404 response', function(done){
            fetch('http://localhost:5000/')
                .then(response => response.text())
                .then(data => {
                    assert.isTrue(data.includes('404'));
                    done();
                });
        });
    });
    after(function(){
        server.close();
    });
});