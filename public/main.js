const userUrl = document.getElementById("url_input");
const shortUrl = document.getElementById("shortUrl_input");
const table = document.querySelector("table");
const alertContainer = document.getElementById("alertContainer");
let urlArr = [];

document.addEventListener("DOMContentLoaded", () => {
  getAndPrintAllUrls();
});

document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let url = userUrl.value;
  postRequest(url);
});

document.getElementById("goToUrl").addEventListener("click", (e) => {
  e.preventDefault();
  let shortUrlInput = shortUrl.value;
  getRequest(shortUrlInput);
  let obj = urlArr.find(
    (urlObject) => urlObject["shorturl_Id"] === shortUrlInput
  );
  const redirectCounter = obj["redirect_Count"];
  const urlRow = document.getElementById(obj["original_Url"]);
  const rowTd = urlRow.querySelectorAll("td");
  rowTd[1].innerText = redirectCounter + 1;
});

function getAndPrintAllUrls() {
  axios({
    method: "GET",
    url: "http://localhost:3000/api/shorturl",
  }).then((response) => {
    urlArr = [...response.data.urlArr];
    generateTable(table, response.data.urlArr);
  });
}

function getRequest(shortUrl) {
  console.log(shortUrl);
  axios({
    method: "GET",
    url: `http://localhost:3000/api/shorturl/${shortUrl}`,
  }).then((response) => {
    if (response.request.status === 200) {
      window.open(response.request.responseURL);
    } else if (response.data.redirect == "http://localhost:3000/api/shorturl") {
      window.location = "http://localhost:3000/api/shorturl";
    }
  });
}

function getStatistic(shortId) {
  axios({
    method: "GET",
    url: `http://localhost:3000/api/statistic/${shortId}`,
  }).then((res) => {
    const urlArr = [];
    urlArr.push(res.data[0]);
    generateTable(table, urlArr);
  });
}

function postRequest(url) {
  axios({
    method: "POST",
    url: `http://localhost:3000/api/shorturl/new`,
    data: { url: url },
  })
    .then((res) => {
      getStatistic(res.data["short_Url"]);
    })
    .catch((err) => {
      if ((err.response.data.message = "invalid url")) {
        alertContainer.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> invalid URL, type a correct one.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      }
      if ((err.response.data.message = "invalid host name")) {
        alertContainer.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> invalid host name, type a correct one.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      }
      if ((err.response.data.message = "url already exist")) {
        alertContainer.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> already exist!, type a new one or use the one down here.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
      }
    });
}

function generateTable(table, urlArr) {
  for (let element of urlArr) {
    let row = table.insertRow();
    for (key in element) {
      if (key === "original_Url") {
        row.setAttribute("id", element[key]);
      }
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}
