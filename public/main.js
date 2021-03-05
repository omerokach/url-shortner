const userUrl = document.getElementById("url_input");
const shortUrl = document.getElementById("shortUrl_input");
const table = document.getElementById("shortUrlTable");
const urlArr = [];
document.getElementById("submit").addEventListener("click", (e) => {
  e.preventDefault();
  let url = userUrl.value;
  postRequest(url);
});

document.getElementById("shortUrlSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  let shortUrlInput = shortUrl.value;
  console.log(shortUrlInput);
  getStatistic(shortUrlInput);
  getRequest(shortUrlInput);
});

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
    urlArr.push(res.data[0]);
    console.log(urlArr)
  });
}

function postRequest(url) {
  try {
    axios({
      method: "POST",
      url: `http://localhost:3000/api/shorturl/new`,
      data: { url: url },
    }).then((res) => {
      getStatistic(res.data["short_Url"]);
    })
  } catch (e) {
    throw e.response.data.message;
  }
}

function objToTable(urlObj){

}
function creatRow(url, shortUrl, numOfRedirect, date) {
  const arr = [url, shortUrl, numOfRedirect, date];
  const tr = document.createElement("tr");
  for (let i = 0; i < 4; i++) {
    const td = document.createElement("td");
    td.innerText = arr[i];
    tr.appendChild(td);
  }
}
