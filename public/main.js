const userUrl = document.getElementById("url_input");
const shortUrl = document.getElementById("shorturl_input");
document.getElementById("submit").addEventListener("click", async (e) => {
  e.preventDefault();
  let url = userUrl.value;
  await postRequest(url);
});
// document.getElementById("shorturl").addEventListener("click", async (e) => {
//   let shortUrl = shortUrl.value;
//   console.log(shortUrl.value)
//   await getRequest(shortUrl);
// })

// async function getRequest(data) {
//   const res = await axios({
//     method: "GET",
//     url: `http://localhost:3000/api/shorturl/${data}`
//   });
// }

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
