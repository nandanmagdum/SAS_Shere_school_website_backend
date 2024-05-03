const axios = require("axios");
const url = "https://sadguru-ashram-shala-shere.onrender.com/auth/test";

const apiCall = async() => {
    const response = await axios.get(url);
    console.log("api called");
    console.log(response.data);
    if(response.stausCode === 200){
        setTimeout( apiCall,1000*60*10);
    }
    else {
        setTimeout( apiCall,1000*60*10);
    }
}

module.exports = apiCall;