const puppeteer = require("puppeteer");
const app = require("./app");
const nock = require("nock");
const request = require("supertest");
const { expect, test, afterAll, beforeAll } = require("@jest/globals");

describe("testing the short-url app", () => {
    it("should send url and get short-url", async () => {
        const res = nock.use(app).get("localhost:3000/api/shorturl");
        
    })
})