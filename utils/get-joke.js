const axios = require('axios').default;

axios.interceptors.response.use(function (response) {
    return response.data;
});

const getRandomJoke = async () => {
    return await axios.get('https://official-joke-api.appspot.com/random_joke');
}


module.exports = {
    getRandomJoke
}
