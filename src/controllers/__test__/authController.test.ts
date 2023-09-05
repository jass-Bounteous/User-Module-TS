import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import app from "../../../src/app";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import userTemplateCopy from "../../../src/schema/userSchema";
import bcrypt from "bcrypt";

chai.use(chaiHttp);
chai.use(sinonChai);

before((done) => {
  userTemplateCopy.deleteOne({ name: "Hukum" });
  done();
});

afterEach(() => {
  sinon.restore();
});

describe("LOGIN tests:", () => {
  it("should return Bad request", async () => {
    const response = await chai.request(app).post("/app/login").send({
      name: undefined,
      password: "pass",
    });
    const expectdResponseBody = { msg: "Bad Request" };

    expect(response).to.have.status(400);
    expect(response.body).to.be.deep.equal(expectdResponseBody);
  });

  it("should return Invalid name error", async () => {
    const findOneStub = sinon.stub(userTemplateCopy, "findOne").resolves(null);

    const response = await chai.request(app).post("/app/login").send({
      name: "tester",
      password: "pass",
    });

    const expectdResponseBody = { msg: "Invalid Name" };

    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.have.been.calledWith({ name: "tester" });
    expect(response).to.have.status(401);
    expect(response.body).to.be.deep.equal(expectdResponseBody);
  });

  it("should return Invalid password error", async () => {
    const dbUser = {
      name: "tester",
      password: "$2b$10$rGX4YWCkhcuC49zxT84l5eevZ95MQljIdyn12e4k3nOITpg3fVIt2",
    };

    const findOneStub = sinon
      .stub(userTemplateCopy, "findOne")
      .resolves(dbUser);

    const bcryptSpy = sinon.spy(bcrypt, "compare");

    const response = await chai.request(app).post("/app/login").send({
      name: "tester",
      password: "wrongPassword",
      // password: "pass",  _correctPassword_
    });

    expect(findOneStub).to.have.been.calledOnce;
    expect(findOneStub).to.have.been.calledWith({ name: "tester" });
    expect(bcryptSpy).to.have.been.calledWith("wrongPassword", dbUser.password);
    expect(response).to.have.status(401);
    expect(response.body).to.have.property("msg");
    expect(response.body.msg).to.be.deep.equal("Invalid Password");
  });

  it("should return return Welcome message", async () => {

    const dbUser = {
      name: "tester",
      password: "$2b$10$rGX4YWCkhcuC49zxT84l5eevZ95MQljIdyn12e4k3nOITpg3fVIt2",
    };

    const findOneStub = sinon
      .stub(userTemplateCopy, "findOne")
      .resolves(dbUser);
    const bcryptSpy = sinon.spy(bcrypt, "compare");

    const updateTokenStub = sinon
      .stub(userTemplateCopy, "findOneAndUpdate")
      .resolves(null);

    const response = await chai.request(app).post("/app/login").send({
      name: "tester",
      password: "pass",
    });

    expect(updateTokenStub).to.have.been.calledOnce;
    expect(findOneStub).to.have.been.calledWith({ name: "tester" });
    expect(bcryptSpy).to.have.been.calledWith("pass", dbUser.password);
    expect(response).to.have.status(200);
    expect(response.body).to.have.property("msg");
    expect(response.body.msg).to.be.deep.equal("Welcome tester");
  });
});

describe("SIGNUP tests:", () => {
  it("should add user", async () => {
    const userData = {
      name: "Hukum",
      emp_code: 3053,
      password: "pass",
      email: "tigerKaHukum@gmail.com",
      mobile_no: 9876543210,
      dob: new Date("2001-07-01"),
    };

    const findOneStub = sinon.stub(userTemplateCopy, "findOne").resolves(null);
    const userCreateStub = sinon
      .stub(userTemplateCopy, "create")
      .resolves(undefined);

    const response = await chai.request(app).post("/app/signup").send(userData);

    expect(findOneStub).to.have.been.calledOnce;
    expect(userCreateStub).to.have.been.calledOnce;
    expect(findOneStub).to.have.been.calledWith({ name: "Hukum" });
    expect(response.status).to.be.equal(201);
    expect(response).to.have.status(201);
    expect(response.body).to.have.property("msg");
    expect(response.body.msg).to.be.equal("User added successfully");
  });

  it("should return username already registered error", async () => {
    const userData = {
      name: "test",
      emp_code: 3053,
      password: "pass",
      email: "test@gmail.com",
      mobile_no: 9876543210,
      dob: "01-07-2001",
    };

    const findOneStub = sinon
      .stub(userTemplateCopy, "findOne")
      .resolves(userData);

    const expectdResponseBody = {
      msg: "This Username has already been registered",
    };

    const response = await chai.request(app).post("/app/signup").send(userData);

    expect(findOneStub).to.have.been.calledWith({ name: "test" });
    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal(expectdResponseBody);
  });

  it("should return bad request", async () => {
    const userData = {
      name: "test",
      email: "test@gmail.com",
      mobile_no: 9876543210,
      dob: "01-07-2001",
    };

    const expectdResponseBody = { msg: "Bad request" };

    const response = await chai.request(app).post("/app/signup").send(userData);

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal(expectdResponseBody);
  });
});
