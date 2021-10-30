var request = require('supertest');
var app = require('../app/app.js');

describe('GET /', function() {
    it('respond with Hello World!', function(done) {
     //navigate to root and check the response is "hello world"
     request(app).get('/').expect('Hello World!', done);
    });
   });

