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
};
const nonexistentuser = {
  email: "nonexistentuser@gmail.com",
  password: "nonexistentpassword",
};

describe("POST /auth/login", () => {
  describe("TC2-1 When an email is not provided", () => {
    let res;
    beforeAll(async () => {
      res = await request(app)
        .post("/auth/login")
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
        "please provide both email and password"
      );
    });
  });

  describe("TC2-2 When a user is not exist", () => {
    let res;

    beforeAll(async () => {
      User.findOne = jest.fn().mockImplementation(() => {
        return null;
      });

      res = await request(app).post("/auth/login").send({
        email: nonexistentuser.email,
        password: nonexistentuser.password,
      });
    });

    afterAll(() => {
      User.findOne.mockRestore();
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 401", () => {
      expect(res.body.code).toEqual(401);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual("invalid email or password");
    });
  });

  describe("TC2-3 When a password is not provided", () => {
    let res;
    beforeAll(async () => {
      res = await request(app)
        .post("/auth/login")
        .send({ email: user1.email});
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 400", () => {
      expect(res.body.code).toEqual(400);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual(
        "please provide both email and password"
      );
    });
  });

  describe("TC2-4 When a password is incorrect", () => {
    let res;
    const incorrectPassword = "incorrect_password";

    beforeAll(async () => {
      bcrypt.compare.mockResolvedValue(false);
      User.findOne = jest.fn().mockReturnValue({
        ...user1,
      });

      res = await request(app).post("/auth/login").send({
        email: user1.email,
        password: incorrectPassword,
      });
    });

    afterAll(() => {
      User.findOne.mockRestore();
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 401", () => {
      expect(res.body.code).toEqual(401);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual("invalid email or password");
    });
  });

  describe("TC2-5 When a password is correct", () => {
    let res;

    beforeAll(async () => {
      bcrypt.compare.mockResolvedValue(true);
      User.findOne = jest.fn().mockReturnValue({
        ...user1,
      });

      res = await request(app).post("/auth/login").send({
        email: user1.email,
        password: user1.password,
      });
    });

    afterAll(() => {
      bcrypt.compare.mockRestore();
      User.findOne.mockRestore();
    });

    it("Should return status code 200", () => {
      expect(res.statusCode).toEqual(200);
    });
    it("Should return code 200", () => {
      expect(res.body.code).toEqual(200);
    });
    it("Should return message", () => {
      expect(res.body.message).toEqual("login successful");
    });
  });
});
