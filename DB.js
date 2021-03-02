const fs = require('fs');

class Database {
    constructor(){
        this.urkArr = [];
    }
    creatNewShortenedUrl(url){
        const newUrlObject = {};
        newUrlObject.creationDate = new Date();
        newUrlObject.redirectCount = 0;
        originalUrl = url
        newUrlObject["shorturl-id"];
    }
    getAllUrls() {};
    getSpecificUrl() {};
    updateUrl () {};
}