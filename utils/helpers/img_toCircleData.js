
const fetch = require('node-fetch');
var request = require('request').defaults({ encoding: null });

var axios = require('axios');

const img_toCircleData = async (array_repo)=>{
        const response_image = await Promise.all(array_repo.map(async (repo)=>{
                const image = await axios.get(repo.owner.avatar_url, { responseType: 'arraybuffer' });
                const raw = Buffer.from(image.data).toString('base64');
                const base64Image = "data:" + image.headers["content-type"] + ";base64,"+raw;
                return base64Image;
        }));
        return response_image;
}   

module.exports = img_toCircleData;