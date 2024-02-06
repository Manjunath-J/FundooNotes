import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';

let userToken, pwdToken;
let id;

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('User', () => {


    it('Given new user when added should return status 201', (done) => {
      const userdetails = {
        firstName: 'Manjunath',
        lastName: 'J',
        email: 'manjunath@mail.com',
        password: 'Manju@123'
      };
      request(app)
        .post('/api/v1/User')
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });


    it('Given Log-In user should return status 200', (done) => {
      const userdetails = {
        email: 'manjunath@mail.com',
        password: 'Manju@123'
      };
      request(app)
        .post('/api/v1/User/signin')
        .send(userdetails)
        .end((err, res) => {
          userToken = res.body.data
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });

    it('Given Creating new Note should return status 201', (done) => {
      const notedetails = {
        Title: "The Book 3",
        Description: "to read the book",
        color: "red"
      };
      request(app)
        .post('/api/v1/Notes')
        .send(notedetails)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          id = (res.body.data._id)
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });


    it('Given Fetching allNotes should return status 200', (done) => {
      request(app)
        .get('/api/v1/Notes')
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


    it('Given Fetching Note by ID should return status 200', (done) => {
      request(app)
        .get(`/api/v1/Notes/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


    it('Given Updating Note by ID should return status 202', (done) => {
      const notedetails = {
        Title: "The Book 5",
        Description: "to read the book",
        color: "black"
      };
      request(app)
        .put(`/api/v1/Notes/${id}`)
        .send(notedetails)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.ACCEPTED);
          done();
        });
    });

    it('Given Archieving Note by ID should return status 202', (done) => {
      request(app)
        .get(`/api/v1/Notes/isarch/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


    it('Given Moving Note to Trash by ID should return status 202', (done) => {
      request(app)
        .get(`/api/v1/Notes/isdeleted/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });



    it('Given Deleteing Note by ID should return status 200', (done) => {
      request(app)
        .delete(`/api/v1/Notes/${id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


    it('Given forgot-Password should return status 200', (done) => {
      const userdetails = {
        email: 'manjunath@mail.com'
      };
      request(app)
        .post('/api/v1/User/forgotPassword')
        .send(userdetails)
        .end((err, res) => {
          pwdToken = res.body.data
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


    it('Given reset-Password should return status 200', (done) => {
      const userdetails = {
        password: 'Manju@1234'
      };
      request(app)
        .put('/api/v1/User/resetPassword')
        .set('Authorization', `Bearer ${pwdToken}`)
        .send(userdetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });


  });

  // describe('GET /User', () => {
  //   it('should return empty array', (done) => {
  //     request(app)
  //       .get('/api/v1/users')
  //       .end((err, res) => {
  //         expect(res.statusCode).to.be.equal(200);
  //         expect(res.body.data).to.be.an('array');

  //         done();
  //       });
  //   });
  // });
});
