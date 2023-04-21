const request = require("supertest");
const app = require("../../app");

const bcrypt = require("bcrypt");
jest.mock("bcrypt");

const User = require("../../models/User");

// Mock the User model
jest.mock("../../models/User");

const user1 = {
  email: "user1@gmail.com",
  password: "user1",
};

const user2 = {
  email: "user2@gmail.com",
  password: "user2",
};


  describe("POST /api/user", () => {
    describe("When an email is not provided", () => {
      let res;
      beforeAll(async () => {
        res = await request(app)
          .post("/api/user")
          .send({ password: user1.password });
      });
  
      it("Should return status code 200", () => {
        expect(res.statusCode).toEqual(200);
      });
      it("Should return code 400", () => {
        expect(res.body.code).toEqual(400);
      });
      it("Should return message", () => {
        expect(res.body.message).toEqual(
          "please specify email and password"
        );
      });
    });

    describe("When an email is already in use", () => {
      let res;
  
      beforeAll(async () => {
        User.findOne = jest.fn().mockReturnValue({
          ...user1,
        });
  
        res = await request(app).post("/api/user").send({
          email: user1.email,
          password: user1.password,
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

    describe("Register Success", () => {
      let res;
  
      beforeAll(async () => {
        User.findOne = jest.fn().mockImplementation(() => {
          return null;
        });
  
        res = await request(app).post("/api/user").send({
          email: user1.email,
          password: user1.password,
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