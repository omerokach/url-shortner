const axios = require("axios");

function getRequest(data){
    axios.get( `https://api.jsonbin.io/v3/b` ,{
        method: 'GET',
        headers: {
          "Content-Type": "application/json" 
        },  
      } ).then((response) => {
          return response.send(response);
      })
}

function postRequest(data){
    axios.post( `https://api.jsonbin.io/v3/b` ,{
        method: 'POST',
        headers: {
        "Content-Type": "application/json", 
        "X-Master-Key": "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK",
        "X-BIN-PRIVATE": false
      },
      body: JSON.stringify({data})  
    } ).then((response) =>{
        response.send(response);
        return response;
    })
}

function putRequest(data, id){
    axios.put(`https://api.jsonbin.io/v3/b/${id}`,{
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "X-Bin-Versioning": true, 
            "X-Master-Key": "$2b$10$w1piqKtT3h7v/fsuAVZjferrU.eP4x9ZpkAtxxytBDo9tYxNv8YMK" 
        },
        body: JSON.stringify({data}),
    }).then((response) => {response.send(response)});
}