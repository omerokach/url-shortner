const userUrl = document.getElementById("url_input");
const shortUrl = document.getElementById("shortUrl_input");
document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  let url = userUrl.value;
  await postRequest(url);
});
document.getElementById("shortUrlSubmit").addEventListener("click", async (e) => {
  e.preventDefault();
  let shortUrlInput = shortUrl.value;
  console.log(shortUrlInput)
  await getRequest(shortUrlInput);
})

function getRequest(data) {
  console.log(data)
  axios({
    method: "GET",
    url: `http://localhost:3000/api/shorturl/${data}`
  }).then((response) => {
    console.log(response)
    if (response.request.status === 200) {
        window.open(response.request.responseURL);  
    } else if (response.data.redirect == 'http://localhost:3000/api/shorturl'){
        window.location = "http://localhost:3000/api/shorturl"
    }
})
}

async function postRequest(url) {
  try {
    const res = await axios({
      method: "POST",
      url: `http://localhost:3000/api/shorturl/new`,
      data: { url: url },
    });
  } catch (e) {
    throw e.response.data.message;
  }
}
