

function getContributedCircle(avatar, imageId, iteration_no){
    let startingPos = 48.676443 + (70 * iteration_no); 
    let circleStyle = `<defs><pattern id="${'image'+imageId}" height="100%" width="100%" patternContentUnits="objectBoundingBox">
        <image xlink:href="${avatar}" preserveAspectRatio="xMidYMid meet" width="1" height="1" />
    </pattern>
    </defs>`
    let contributiionCircle = `<ellipse rx="31" ry="31" transform="translate(${startingPos} 307.337946)" fill="url(#${'image'+imageId})"
    stroke="#eeeeee" stroke-width="0.3%"/>`
    let svg_contribution = circleStyle + contributiionCircle;
    return svg_contribution;
}


module.exports = getContributedCircle