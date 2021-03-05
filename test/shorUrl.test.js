const app = require("../app");
const request = require("supertest");
const { expect, test, afterAll, beforeAll } = require("@jest/globals");
const bodyParser = require("body-parser");
const dataBase = require("../DBClass");
const fs = require("fs");
app.use(bodyParser.urlencoded({ extended: false }));

afterAll(() => {
  dataBase.urlObject.urlArr.pop();
  fs.writeFile(
    `./DB/test.json`,
    JSON.stringify({ urlArr: [] }, null, 4),
    (err) => {
      if (err) {
        throw new Error(`message: ${err}`);
      }
    }
  );
});

describe("testing the POST method", () => {

  it("should return the original and short url", async () => {
    const response = await request(app)
      .post("/api/shorturl/new")
      .send({ url: "http://www.exampletest.com" });
    expect(response.status).toBe(200);
    expect(response.body["original_Url"]).toBe("http://www.exampletest.com");
    expect(response.body["short_Url"]).toBeDefined();
  });

  it("should post new url and saved in data base", async () =>{
    const data = JSON.parse(fs.readFileSync('./DB/test.json'));
    expect(data.urlArr[0]['original_Url']).toBe('http://www.exampletest.com');
  });

  it("should return an error for invalid url", async () => {
    const response = await request(app)
    .post("/api/shorturl/new")
    .send({ url: "www.exampletest.com" });
    expect(response.status).toBe(400);
  });

});

describe("testing the GET method to shortened url", () => {

    it("should return status 302, redirect and increase redirect_count", async () =>{
        const shorturl = dataBase.getShortUrl('http://www.exampletest.com')
        const response = await request(app).get(`/api/shorturl/${shorturl}`)
        expect(response.status).toBe(302);
        expect(response.redirect).toBeTruthy();
    });

    it("should return status 400 and not redirect", async () => {
        const response = await request(app).get(`/api/shorturl/123`)
        expect(response.status).toBe(400);
        expect(response.redirect).toBeFalsy();
    })

});

describe("testing the GET method to the statistic route", () => {

    it("should return the statistics of a specific url with creation date, original url, short url and redirect counter", async () => {
        const shorturl = dataBase.getShortUrl('http://www.exampletest.com');
        const response = await request(app).get(`/api/statistic/${shorturl}`);  
        expect(response.status).toBe(200);
        expect(response.body[0]["creation_Date"]).toBeDefined();
        expect(response.body[0]["redirect_Count"]).toBeDefined();
        expect(response.body[0]["original_Url"]).toBeDefined();
        expect(response.body[0]["shorturl_Id"]).toBeDefined();
    });

    it("should return status 400 and invalid id", async () => {
        const response = await request(app).get(`/api/statistic/123`);
        expect(response.status).toBe(400);
    });

})