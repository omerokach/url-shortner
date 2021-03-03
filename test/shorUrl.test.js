const app = require("../app");
const request = require("supertest");
const { expect, test, afterAll, beforeAll } = require(  "@jest/globals");

describe("testing the short-url app", () => {
    it("should send url and get short-url", () => {
        request(app)
        .get("/api/shorturl/qvcak")
        .then(response => {console.log(response.text)});
});
})