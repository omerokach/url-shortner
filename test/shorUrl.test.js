const app = require("../app");
const request = require("supertest");
const { expect, test, afterAll, beforeAll } = require("@jest/globals");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

describe("testing the short-url app",  () => {
  it("should send url and get short-url", async () => {
    const response = await request(app).post("/api/shorturl/new").type('form').send({url:'http://www.exampletest.com'});
    // console.log(response.body);
})
});
