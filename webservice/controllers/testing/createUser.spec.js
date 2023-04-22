const request = require("supertest");
const app = require("../../app");

const bcrypt = require("bcrypt");
jest.mock("bcrypt");

const User = require("../../models/User");

// Mock the User model
jest.mock("../../models/User");

const user1 = {
  email: "user1@gmail.com",
  password: "user1pass",
  name: "user1",
  surname: "user1real",
  phoneNumber: "0101010101"
};

const user0= {
  email: "user0@gmail.com",
  password: "user0pass",
  name: "user0",
  surname: "user0real",
  phoneNumber: "0000000000"
};

  describe("POST /api/user", () => {
    describe("TC1-1 When an email is not provided", () => {
      let res;
      beforeAll(async () => {
        res = await request(app)
          .post("/api/user")
          .send({
            password: user1.password,
            name: user1.name,
            surname: user1.surname,
            phoneNumber: user1.phoneNumber 
          });
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify email"
        );
      });
    });

    describe("TC1-2 When an email is already in use", () => {
      let res;
  
      beforeAll(async () => {
        User.findOne = jest.fn().mockReturnValue({
          ...user0,
        });
  
        res = await request(app).post("/api/user").send({
          email: user0.email,
          password: user0.password,
          name: user0.name,
          surname: user0.surname,
          phoneNumber: user0.phoneNumber
        });
      });
  
      afterAll(() => {
        User.findOne.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 406", () => {
        expect(res.body.code).toEqual(406);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual("email already in use");
      });
    });

    describe("TC1-3 When an password is not provided", () => {
      let res;
      beforeAll(async () => {
        res = await request(app)
          .post("/api/user")
          .send({
            email: user1.email,
            name: user1.name,
            surname: user1.surname,
            phoneNumber: user1.phoneNumber 
          });
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify password"
        );
      });
    });

    describe("TC1-4 When an name is not provided", () => {
      let res;
      beforeAll(async () => {
        res = await request(app)
          .post("/api/user")
          .send({
            email: user1.email,
            password: user1.password,
            surname: user1.surname,
            phoneNumber: user1.phoneNumber 
          });
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

    describe("TC1-5 When a surname is not provided", () => {
      let res;
      beforeAll(async () => {
        res = await request(app)
          .post("/api/user")
          .send({
            email: user1.email,
            password: user1.password,
            name: user1.name,
            phoneNumber: user1.phoneNumber 
          });
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify surname"
        );
      });
    });

    describe("TC1-6 When a phone number is not provided", () => {
      let res;
      beforeAll(async () => {
        res = await request(app)
          .post("/api/user")
          .send({
            email: user1.email,
            password: user1.password,
            name: user1.name,
            surname: user1.surname,
          });
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify phone number"
        );
      });
    });

    describe("TC1-7 Register Success", () => {
      let res;
  
      beforeAll(async () => {
        User.findOne = jest.fn().mockImplementation(() => {
          return null;
        });
  
        res = await request(app).post("/api/user").send({
          email: user1.email,
          password: user1.password,
          name: user1.name,
          surname: user1.surname,
          phoneNumber: user1.phoneNumber
        });
      });
  
      afterAll(() => {
        User.findOne.mockRestore();
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 201", () => {
        expect(res.body.code).toEqual(201);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual("user created");
      });
    });
  });