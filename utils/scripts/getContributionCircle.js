const img_toCircleData = require('../helpers/img_toCircleData');

async function getContributedCircle(array_repos){
    let svg_contribution_style = '';
    let repo_avatar_array = await img_toCircleData(array_repos);
    repo_avatar_array.forEach((repo_avatar, index)=>{
        let startingPos = 48.676443 + (70 * index); 
        let circleStyle = `<defs><pattern id="${'image'+index}" height="100%" width="100%" patternContentUnits="objectBoundingBox">
            <image xlink:href="${repo_avatar}" preserveAspectRatio="xMidYMid meet" width="1" height="1" />
        </pattern>
        </defs>`
        let contributiionCircle = `<ellipse rx="31" ry="31" transform="translate(${startingPos} 307.337946)" fill="url(#${'image'+index})"
        stroke="#eeeeee" stroke-width="0.3%"/>`
        svg_contribution_style += circleStyle + contributiionCircle;
    });
    return svg_contribution_style;
}


module.exports = getContributedCircle


