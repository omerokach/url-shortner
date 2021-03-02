const fs = require('fs');

class Database {
    constructor(){
        this.urkArr = [];
    }
    creatNewShortenedUrl(url){
        const newUrlObject = {};
        newUrlObject.creationDate = clearDate(new Date());
        newUrlObject.redirectCount = 0;
        originalUrl = url
        newUrlObject["shorturl-id"];
    }
    getAllUrls() {};
    getSpecificUrl() {};
    updateUrl () {};
}

//Sql date
function clearDate(date){
    let newDate = (date.toISOString()).split(".")[0];
    return newDate.split("T")[0] + " " + newDate.split("T")[1]; 
}