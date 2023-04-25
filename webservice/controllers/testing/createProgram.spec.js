const request = require("supertest");
const app = require("../../app");

const Program = require('../../models/Program');
const User = require('../../models/User');

const { verifyToken } = require('../../services/jwtService');
jest.mock('../../services/jwtService')

jest.mock('../../models/User');
jest.mock("../../models/Program");

const jwt_token = '123456789'

const user = {
  _id: '123456',
  name: 'Name',
  surname: 'Surname',
  isGuide: true,
  licenseId: '1234567890',
}

const validField = {
  name: "Program Name",
  price: 5000,
  startDate: "2023-05-01",
  endDate: "2023-05-04",
  max_participant: 5,
  province: "Bangkok",
  language: ["English"]
};

  describe("POST /api/program", () => {
    describe("TC4-1 Empty 'name' field", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            price: validField.price,
            startDate: validField.startDate,
            endDate: validField.endDate,
            max_participant: validField.max_participant,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify name"
        );
      });
    });

    describe("TC4-2 Empty 'price' field", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            startDate: validField.startDate,
            endDate: validField.endDate,
            max_participant: validField.max_participant,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify price"
        );
      });
    });

    describe("TC4-3 Negative 'price' value", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: -10,
            startDate: validField.startDate,
            endDate: validField.endDate,
            max_participant: validField.max_participant,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "price cannot be negative"
        );
      });
    });

    describe("TC4-4 Empty 'startDate' field", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            endDate: validField.endDate,
            max_participant: validField.max_participant,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify start date"
        );
      });
    });

    describe("TC4-5 Empty 'endDate' field", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            startDate: validField.startDate,
            max_participant: validField.max_participant,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify end date"
        );
      });
    });

    describe("TC4-6 'endDate' value earlier than 'startDate' value", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            startDate: "2023-11-30",
            endDate: "2023-11-01",
            max_participant: validField.max_participant,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "end date cannot be before start date"
        );
      });
    });

    describe("TC4-7 Empty 'max_participant' field", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            startDate: validField.startDate,
            endDate: validField.endDate,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify max participant"
        );
      });
    });

    describe("TC4-8 Non-integer 'max_participant' value", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            startDate: validField.startDate,
            endDate: validField.endDate,
            max_participant: "just a string",
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "max participant must be positive integer"
        );
      });
    });

    describe("TC4-9 'max_participant' value less than 1", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            startDate: validField.startDate,
            endDate: validField.endDate,
            max_participant: -1,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "max participant must be positive integer"
        );
      });
    });

    describe("TC4-10 Empty 'province' field", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            startDate: validField.startDate,
            endDate: validField.endDate,
            max_participant: validField.max_participant,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify province"
        );
      });
    });

    describe("TC4-11 Empty 'language' array", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            startDate: validField.startDate,
            endDate: validField.endDate,
            max_participant: validField.max_participant,
            province: validField.province,
            language: []
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please select at least one language"
        );
      });
    });

    describe("TC4-12 All required fields are valid", () => {
      let res;
      beforeAll(async () => {
        verifyToken.mockResolvedValue(user);
        res = await request(app)
          .post("/api/program")
          .set('Authorization', `Bearer ${jwt_token}`)
          .send({
            name: validField.name,
            price: validField.price,
            startDate: validField.startDate,
            endDate: validField.endDate,
            max_participant: validField.max_participant,
            guide: user,
            province: validField.province,
            language: validField.language
          });
      });

      afterAll(() => {
        verifyToken.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 201", () => {
        expect(res.body.code).toEqual(201);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual("program created");
      });
    });
  });