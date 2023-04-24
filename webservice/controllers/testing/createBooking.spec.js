const request = require('supertest');
const app = require('../../app');

const Booking = require('../../models/Booking');
const User = require('../../models/User');
const Program = require('../../models/Program');
const Notification = require('../../models/Notification');

const { verifyToken } = require('../../services/jwtService');
jest.mock('../../services/jwtService')

jest.mock('../../models/Booking');
jest.mock('../../models/User');
jest.mock('../../models/Program');
jest.mock('../../models/Notification');

// Mock the verifyToken function to always return a user object
// jest.mock('../BookingController', () => ({
//   verifyToken: jest.fn(() => ({ _id: 'user_id' }))
// }));

const userId = '123456'
const programId = '123456789'
const jwt_token = '123456789'

const user = {
  _id: userId,
  name: 'Pras',
  surname: 'Pitasawad',
  remainingAmount: 100,
}

describe("POST /api/booking/:programId", ()=>{
  describe("TC3-1 When user is not authorized", ()=>{
    let res;
    beforeAll(async ()=>{
      res = await request(app)
        .post(`/api/booking/${programId}`)
        .send({
          data: {},
          programId: programId
        })
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 403", () => {
      expect(res.body.code).toEqual(403);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual("forbidden request");
    });
  });

  describe("TC3-2 When don't provide programId", ()=>{
    let res;
    beforeAll(async ()=>{
      verifyToken.mockResolvedValue(user);
      res = await request(app)
        .post(`/api/booking/`)
        .set('Authorization', `Bearer ${jwt_token}`)
        .send({
          data: {},
        })
    });

    afterAll(() => {
      verifyToken.mockRestore();
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 500", () => {
      expect(res.body.code).toEqual(500);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual("something went wrong: Error: programId is required");
    });
  });
  
  describe("TC3-3 When booking duplicate", ()=>{
    let res;
    beforeAll(async ()=>{
      verifyToken.mockResolvedValue(user);
      Booking.find = jest.fn().mockImplementation(() => {
        return [{
          user: userId,
          program: programId
        }];
      });
      res = await request(app)
        .post(`/api/booking/${programId}`)
        .set('Authorization', `Bearer ${jwt_token}`)
        .send({
          data: {},
        })
    });

    afterAll(() => {
      verifyToken.mockRestore();
      Booking.find.mockRestore();
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 400", () => {
      expect(res.body.code).toEqual(400);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual("you already booked this program");
    });
  });

  describe("TC3-4 When user doesn't have enough money", ()=>{
    let res;
    beforeAll(async ()=>{
      verifyToken.mockResolvedValue(user);
      Booking.find = jest.fn().mockImplementation(() => {
        return [];
      });
      User.findById = jest.fn().mockImplementation(() => {
        return user;
      });
      Program.findById = jest.fn().mockImplementation(() => {
        return {
          _id: programId,
          price: 1000,
        };
      });
      res = await request(app)
        .post(`/api/booking/${programId}`)
        .set('Authorization', `Bearer ${jwt_token}`)
        .send({
          data: {},
        })
    });

    afterAll(() => {
      verifyToken.mockRestore();
      Booking.find.mockRestore();
      User.findById.mockRestore();
      Program.findById.mockRestore();
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 400", () => {
      expect(res.body.code).toEqual(400);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual("not enough balance");
    });
  })

  describe("TC3-5 Booking created successfully", ()=>{
    let res;
    beforeAll(async ()=>{
      verifyToken.mockResolvedValue(user);
      Booking.find = jest.fn().mockImplementation(() => {
        return [];
      });
      User.findById = jest.fn().mockImplementation(() => {
        return user;
      });
      Program.findById = jest.fn().mockImplementation(() => {
        return {
          _id: programId,
          price: 100,
        };
      });
      res = await request(app)
        .post(`/api/booking/${programId}`)
        .set('Authorization', `Bearer ${jwt_token}`)
        .send({
          data: {},
        })
    });

    afterAll(() => {
      verifyToken.mockRestore();
      Booking.find.mockRestore();
      User.findById.mockRestore();
      Program.findById.mockRestore();
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 201", () => {
      expect(res.body.code).toEqual(201);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual("booking created");
    });
  })
})