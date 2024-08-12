const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');  // app.js가 있는 경로를 지정

const { expect } = chai;
chai.use(chaiHttp);

describe('Backend Tests', () => {
  it('should return 200 for the home route', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return 404 for an invalid route', (done) => {
    chai.request(app)
      .get('/invalid-route')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});
