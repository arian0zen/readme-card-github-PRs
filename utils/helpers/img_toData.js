
const fetch = require('node-fetch');
var request = require('request').defaults({ encoding: null });

var axios = require('axios');

const img_toData = async (imgUrl)=>{
        const url = imgUrl;
        const image = await axios.get(url, {responseType: 'arraybuffer'});
        const raw = Buffer.from(image.data).toString('base64');
        const base64Image = "data:" + image.headers["content-type"] + ";base64,"+raw;
        return base64Image
}

module.exports = img_toData;