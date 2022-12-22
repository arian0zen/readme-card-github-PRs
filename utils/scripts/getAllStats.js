function statsText (statsObject){
    let svgStats = `<text dx="0" dy="0"  font-size="30" font-weight="400"
    transform="translate(194.19878 60.516845)" stroke-width="0">

    <tspan y="0" font-size="25" font-weight="400" stroke-width="0">
        <![CDATA[
${statsObject.name}, 
]]>
    </tspan>
    <tspan id="smallText" y="0" font-size="15" font-weight="400" stroke-width="0">
        <![CDATA[
${statsObject.username}
]]>
    </tspan>
</text><text dx="0" dy="0"  font-size="30" font-weight="400"
    transform="translate(193.286741 93.73453)" stroke-width="0">
    <tspan y="0" font-size="25" font-weight="400" stroke-width="0">
        <![CDATA[
Total Pull Request merged ${statsObject.totalPRMerged}, 
]]>
    </tspan>
    <tspan y="0" id="smallText" font-size="15" font-weight="400" stroke-width="0">
        <![CDATA[
Total PR created ${statsObject.totalPRcreated}
]]>
    </tspan>
</text><text dx="0" dy="0" font-size="30" font-weight="400"
    transform="translate(193.286741 129.567941)" stroke-width="0">
    <tspan y="0" font-size="25" font-weight="400" stroke-width="0">
        <![CDATA[
Total Issue created ${statsObject.totalIssueCreated}, 
]]>
    </tspan>
    <tspan y="0" id="smallText" font-size="15" font-weight="400" stroke-width="0">
        <![CDATA[
Total issue closed ${statsObject.totalIssueClosed}
]]>
    </tspan>
</text><text dx="0" dy="0"  font-size="30" font-weight="400"
    transform="translate(192.374702 162.929117)" stroke-width="0">
    <tspan y="0" font-size="25" font-weight="400" stroke-width="0">
        <![CDATA[
Most Popular project: ${statsObject.mostPopularProject},
]]>
    </tspan></text>
<text dx="0" dy="-8" font-size="25" font-weight="400"
    transform="translate(18.119689 259.683899)" stroke-width="0">
    <tspan y="0" font-weight="400" stroke-width="0">
        <![CDATA[
My Recent Contributions :
]]>
</tspan></text>`
return svgStats;

}

module.exports = statsText;