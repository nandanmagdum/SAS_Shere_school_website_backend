const axios = require("axios");
const url = "https://school-website-vdgs.onrender.com/";

const apiCall = async() => {
    const response = await axios.get(url);
    console.log("api called");
    console.log(response.body);
    if(response.stausCode === 200){
        setTimeout( apiCall,1000*60);
    }
    else {
        setTimeout( apiCall,1000*5);
    }
}

module.exports = apiCall;