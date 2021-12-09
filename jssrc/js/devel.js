let t1
const $ = jQuery

export function develChangeMapColours(selector, changeMap, bsbiDataAccess) {

  // Colours
  const $colours = $('<div style="margin-top: 1em">').appendTo($(selector))

  // No change colour
  const $divNoChange = $('<div>').appendTo($colours)
  $('<input type="text" style="width: 120px" id="noChangeColour">').appendTo($divNoChange)
  $('<label for="noChangeColour" style="margin-left: 1em">Change map - no change colour</label>').appendTo($divNoChange)
  const noChangeColour = new JSColor('#noChangeColour', {onChange: colourChange})
  noChangeColour.fromString(bsbiDataAccess.devel.changeColours[0])

  // Gain colour
  const $divGain = $('<div>').appendTo($colours)
  $('<input type="text" style="width: 120px" id="gainColour">').appendTo($divGain)
  $('<label for="gainColour" style="margin-left: 1em">Change map - gain colour</label>').appendTo($divGain)
  const gainColour = new JSColor('#gainColour', {onChange: colourChange})
  gainColour.fromString(bsbiDataAccess.devel.changeColours[1])

  // Loss colour
  const $divLoss = $('<div>').appendTo($colours)
  $('<input type="text" style="width: 120px" id="lossColour">').appendTo($divLoss)
  $('<label for="lossColour" style="margin-left: 1em">Change map - loss colour</label>').appendTo($divLoss)
  const lossColour = new JSColor('#lossColour', {onChange: colourChange})
  lossColour.fromString(bsbiDataAccess.devel.changeColours[2])

  function colourChange() {
    bsbiDataAccess.devel.changeColours[0]=noChangeColour.toHEXString()
    bsbiDataAccess.devel.changeColours[1]=gainColour.toHEXString()
    bsbiDataAccess.devel.changeColours[2]=lossColour.toHEXString()
    changeMap()
  }
}

export function develTabsOnOff(selector, changeMap, mainAtlasContent) {
  // Tabs on/off
  const $bgrp = $('<div class="btn-group" data-toggle="buttons">').appendTo($(selector))
  const $onLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
  $('<input type="radio" name="tabsToggle" value="on">').appendTo($onLabel)
  $onLabel.append("Show tabs")
  const $offLabel = $('<label class="btn btn-primary active">').appendTo($bgrp)
  $('<input type="radio" name="tabsToggle" value="off" checked>').appendTo($offLabel)
  $offLabel.append("No tabs")

  $('input[type=radio][name="tabsToggle"]').change(function() {
    mainAtlasContent($(this).val() === "on")
    changeMap()
  })
}

export function develMappingPerformance($parent, changeMap, bsbiDataAccess) {

  const $container = $('<div id="slippy-dev" style="padding: 0.5em; background-color: yellow">').appendTo($parent)

  const $title = $('<div>').appendTo($container)
  $title.html('<b>Testing tetrad styles &amp; performance</b>')
  
  const $radios = $('<div style="margin-top: 0.5em">').appendTo($container)
  $('<input type="radio" name="symboltype" value="circle" id="symb-poly-circle">').appendTo($radios)
  $('<label for="symb-poly-circle" style="font-weight: 500">').html('&nbsp;Polygon circles').appendTo($radios)
  
  $('<br/><input type="radio" name="symboltype" value="square" id="symb-poly-square">').appendTo($radios)
  $('<label for="symb-poly-square" style="font-weight: 500">').html('&nbsp;Polygon squares').appendTo($radios)

  $('<br/><input type="radio" name="symboltype" value="circlerad" id="symb-circle">').appendTo($radios)
  $('<label for="symb-circle" style="font-weight: 500">').html('&nbsp;SVG Circles').appendTo($radios)

  $('#symb-poly-circle').prop( "checked", true )

  $('input[name="symboltype"]').on("change", function() {
    bsbiDataAccess.devel.symboltype=$('input[name="symboltype"]:checked').val()
    changeMap()
  })

  $('<div id="dev-download-time">').appendTo($container)
  $('<div id="dev-display-time">').appendTo($container)
}

export function develStartMapTiming(id) {
  t1 = Math.floor(Date.now() / 100)
  document.getElementById(`dev-${id}-time`).innerHTML= `${id} data...`
}

export function develStopMapTiming(id) {
  const t2 = Math.floor(Date.now() / 100)
  document.getElementById(`dev-${id}-time`).innerHTML= `${id} took <b>${String((t2-t1)/10)}</b> seconds`
}