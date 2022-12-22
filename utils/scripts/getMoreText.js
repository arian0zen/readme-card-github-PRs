function getHowManyMoreText(howMany) {
  let howManyMoreText = `<text id="edcgB6QnoNY37" dx="0" dy="0" font-family="&quot;edcgB6QnoNY1:::Concert One&quot;"
  font-size="18" font-weight="400" transform="translate(702.274394 362.566093)" opacity="0.63" stroke-width="0">
  <tspan y="0" font-weight="400" stroke-width="0">
      <![CDATA[
+ ${howMany} more
]]>`;
  return howManyMoreText;
}

module.exports = getHowManyMoreText;