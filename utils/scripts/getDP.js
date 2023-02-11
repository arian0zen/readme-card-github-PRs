const img_toData = require('../helpers/img_toData');

async function getDP(dpLink){
    //convert dp link to string(64 bit encoded data)
    const imgData = await img_toData(dpLink);
    let dpSvg = `</defs>
    <defs>
        <pattern id="attachedImage" height="100%" width="100%" patternContentUnits="objectBoundingBox">
            <image xlink:href="${imgData}" preserveAspectRatio="xMidYMid meet" width="1" height="1" />
        </pattern>
    </defs>
    
    <rect x="0" y="0" width="800" height="400" rx="12" ry="12" stroke="#ffffff" stroke-width="1%" fill="#004953" />
    <ellipse id="edcgB6QnoNY2" rx="56.035688" ry="56.035688" transform="matrix(1.35 0 0 1.35 91.996478 101.601986)"
        fill="url(#attachedImage)" stroke-width="0" />`
    return dpSvg;
}

module.exports = getDP;

