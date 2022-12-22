function getDP(dpLink){
    let dpSvg = `</defs>
    <defs>
        <pattern id="attachedImage" height="100%" width="100%" patternContentUnits="objectBoundingBox">
            <image xlink:href="${dpLink}" preserveAspectRatio="xMidYMid meet" width="1" height="1" />
        </pattern>
    </defs>
    
    <rect x="0" y="0" width="800" height="400" rx="12" ry="12" stroke="#ffffff" stroke-width="1%" fill="rgba(19,33,53,0.808)" />
    <ellipse id="edcgB6QnoNY2" rx="56.035688" ry="56.035688" transform="matrix(1.35 0 0 1.35 91.996478 101.601986)"
        fill="url(#attachedImage)" stroke-width="0" />`
    return dpSvg;
}

module.exports = getDP;

