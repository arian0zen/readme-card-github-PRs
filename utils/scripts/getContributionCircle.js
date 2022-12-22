

function getContributedCircle(avatar, imageId, changeInPos){
    let startingPos = 48.676443 + changeInPos; 
    let circleStyle = `<defs>
    <pattern id="${imageId}" height="100%" width="100%" patternContentUnits="objectBoundingBox">
        <image xlink:href="https://avatars.githubusercontent.com/u/68517592?s=400&u=418a39bced9cc4f2979ea90632ce094065c7747d&v=4" preserveAspectRatio="xMidYMid meet" width="1" height="1" />
    </pattern>
    </defs>`
    let contributiionCircle = `<ellipse rx="31" ry="31" transform="translate(${startingPos} 307.337946)" fill="url(#${imageId})"
    stroke="#eeeeee" stroke-width="0.3%"/>`
    let svg_contribution = circleStyle + contributiionCircle;
    return svg_contribution;
}


module.exports = getContributedCircle