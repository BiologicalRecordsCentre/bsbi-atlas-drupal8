let t1
const $ = jQuery // eslint-disable-line no-undef
import { bsbiDataAccess } from './dataAccessAtlas'

export function develTrendSummary(selector, changeSwatchColour) {
  // Colours
  const $colours = $('<div style="margin-top: 1em">').appendTo($(selector))

  // No trend swatch base colour
  const $divTrendSwatch = $('<div>').appendTo($colours)
  $('<input type="text" style="width: 120px" id="trendSwatchColour">').appendTo($divTrendSwatch)
  $('<label for="trendSwatchColour" style="margin-left: 1em">Trend summary colour</label>').appendTo($divTrendSwatch)
  const trendSwatchColour = new JSColor('#trendSwatchColour', {onChange: colourChange})
  trendSwatchColour.fromString('rgb(255,0,0)')

  function colourChange() {
    changeSwatchColour(trendSwatchColour.toRGBString())
  }
}

export function develChangeMapColours(selector, changeMap) {

  // Colours
  const $colours = $('<div style="margin-top: 1em">').appendTo($(selector))

  // No change colour
  const $divNoChange = $('<div>').appendTo($colours)
  $('<input type="text" style="width: 120px" id="noChangeColour">').appendTo($divNoChange)
  $('<label for="noChangeColour" style="margin-left: 1em">Change map - no change colour</label>').appendTo($divNoChange)
  const noChangeColour = new JSColor('#noChangeColour', {onChange: colourChange})
  noChangeColour.fromString(bsbiDataAccess.changeColours[0])

  // Gain colour
  const $divGain = $('<div>').appendTo($colours)
  $('<input type="text" style="width: 120px" id="gainColour">').appendTo($divGain)
  $('<label for="gainColour" style="margin-left: 1em">Change map - gain colour</label>').appendTo($divGain)
  const gainColour = new JSColor('#gainColour', {onChange: colourChange})
  gainColour.fromString(bsbiDataAccess.changeColours[1])

  // Loss colour
  const $divLoss = $('<div>').appendTo($colours)
  $('<input type="text" style="width: 120px" id="lossColour">').appendTo($divLoss)
  $('<label for="lossColour" style="margin-left: 1em">Change map - loss colour</label>').appendTo($divLoss)
  const lossColour = new JSColor('#lossColour', {onChange: colourChange})
  lossColour.fromString(bsbiDataAccess.changeColours[2])

  function colourChange() {
    bsbiDataAccess.changeColours[0]=noChangeColour.toHEXString()
    bsbiDataAccess.changeColours[1]=gainColour.toHEXString()
    bsbiDataAccess.changeColours[2]=lossColour.toHEXString()
    changeMap()
  }
}

export function develMainMapStyles(selector, changeMap) {

  if ($(selector).length === 0) return

  const labels = {
    '2000_19': '2000 - 2019',
    '1987_99': '1987 - 1999',
    '1970_86': '1970 - 1986',
    '1930_69': '1930 - 1969',
    'pre_1930': 'to 1929'
  }

  const pickers = {
    x: {
      '2000_19': null,
      '1987_99': null,
      '1970_86': null,
      '1930_69': null,
      'pre_1930': null
    },
    n: {
      '2000_19': null,
      '1987_99': null,
      '1970_86': null,
      '1930_69': null,
      'pre_1930': null
    },
    a: {
      '2000_19': null,
      '1987_99': null,
      '1970_86': null,
      '1930_69': null,
      'pre_1930': null
    }
  }

  const checkboxes = {
    x: {
      '2000_19': null,
      '1987_99': null,
      '1970_86': null,
      '1930_69': null,
      'pre_1930': null
    },
    n: {
      '2000_19': null,
      '1987_99': null,
      '1970_86': null,
      '1930_69': null,
      'pre_1930': null
    },
    a: {
      '2000_19': null,
      '1987_99': null,
      '1970_86': null,
      '1930_69': null,
      'pre_1930': null
    }
  }

  const colorbrewer = {
    'sequential single hue Greys': ['#f7f7f7','#cccccc','#969696','#636363','#252525'],
    'sequential single hue Greens': ['#edf8e9','#bae4b3','#74c476','#31a354','#006d2c'],
    'sequential single hue Blues': ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'],
    'sequential single hue Oranges': ['#feedde','#fdbe85','#fd8d3c','#e6550d','#a63603'],
    'sequential single hue Purples': ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'],
    'sequential single hue Reds': ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'],
    'sequential multi-hue BuGn': ['#edf8fb','#b2e2e2','#66c2a4','#2ca25f','#006d2c'],
    'sequential multi-hue BuPu': ['#edf8fb','#b3cde3','#8c96c6','#8856a7','#810f7c'],
    'sequential multi-hue GnBu': ['#f0f9e8','#bae4bc','#7bccc4','#43a2ca','#0868ac'],
    'sequential multi-hue OrRd': ['#fef0d9','#fdcc8a','#fc8d59','#e34a33','#b30000'],
    'sequential multi-hue PuBu': ['#f1eef6','#bdc9e1','#74a9cf','#2b8cbe','#045a8d'],
    'sequential multi-hue PuBuGn': ['#f6eff7','#bdc9e1','#67a9cf','#1c9099','#016c59'],
    'sequential multi-hue PuRd': ['#f1eef6','#d7b5d8','#df65b0','#dd1c77','#980043'],
    'sequential multi-hue RdPu': ['#feebe2','#fbb4b9','#f768a1','#c51b8a','#7a0177'],
    'sequential multi-hue YlGn': ['#ffffcc','#c2e699','#78c679','#31a354','#006837'],
    'sequential multi-hue YlGnBu': ['#ffffcc','#a1dab4','#41b6c4','#2c7fb8','#253494'],
    'sequential multi-hue YlOrBr': ['#ffffd4','#fed98e','#fe9929','#d95f0e','#993404'],
    'sequential multi-hue YlOrRd': ['#ffffb2','#fecc5c','#fd8d3c','#f03b20','#bd0026'],
    'diverging BrBG': ['#a6611a','#dfc27d','#f5f5f5','#80cdc1','#018571'],
    'diverging PiYG': ['#d01c8b','#f1b6da','#f7f7f7','#b8e186','#4dac26'],
    'diverging PRGn': ['#7b3294','#c2a5cf','#f7f7f7','#a6dba0','#008837'],
    'diverging PuOr': ['#e66101','#fdb863','#f7f7f7','#b2abd2','#5e3c99'],
    'diverging RdBu': ['#ca0020','#f4a582','#f7f7f7','#92c5de','#0571b0'],
    'diverging RdGy': ['#ca0020','#f4a582','#ffffff','#bababa','#404040'],
    'diverging RdYlBu': ['#d7191c','#fdae61','#ffffbf','#abd9e9','#2c7bb6'],
    'diverging RdYlGn': ['#d7191c','#fdae61','#ffffbf','#a6d96a','#1a9641'],
    'diverging Spectral': ['#d7191c','#fdae61','#ffffbf','#abdda4','#2b83ba']
  }

  let colStroke

  // Colours
  const $colours = $('<div style="margin-top: 1em">').appendTo($(selector))


  const $div0 =  $('<div style="display: flex">').appendTo($colours)
  const $div1 =  $('<div style="flex: 1">').appendTo($div0)
  const $div2 =  $('<div style="flex: 1">').appendTo($div0)
  const $div3 =  $('<div style="flex: 1">').appendTo($div0)

  $('<h4>').appendTo($div1).text('Without status')
  makeColourPicker('x', '2000_19', $div1)
  makeColourPicker('x', '1987_99', $div1)
  makeColourPicker('x', '1970_86', $div1)
  makeColourPicker('x', '1930_69', $div1)
  makeColourPicker('x', 'pre_1930', $div1)

  $('<h4>').appendTo($div2).text('Native status')
  makeColourPicker('n', '2000_19', $div2)
  makeColourPicker('n', '1987_99', $div2)
  makeColourPicker('n', '1970_86', $div2)
  makeColourPicker('n', '1930_69', $div2)
  makeColourPicker('n', 'pre_1930', $div2)

  $('<h4>').appendTo($div3).text('Alien status')
  makeColourPicker('a', '2000_19', $div3)
  makeColourPicker('a', '1987_99', $div3)
  makeColourPicker('a', '1970_86', $div3)
  makeColourPicker('a', '1930_69', $div3)
  makeColourPicker('a', 'pre_1930', $div3)

  $('<h4>').appendTo($colours).text('Borders')
  makeStrokeColourPicker($colours)

  $('<h4>').appendTo($colours).text('Init colours from Colourbrewer')
  const $sel =  $('<select>').appendTo($colours)
  Object.keys(colorbrewer).forEach(cs => {
    $('<option>').text(cs).appendTo($sel)
  })

  const $cb = $(`<input type="checkbox" id="reverse-colours" style="margin:0.5em">`).appendTo($colours)
  $(`<label for="reverse-colours">reverse</label>`).appendTo($colours)

  const $butNoStatus = $('<button style="margin-left: 0.5em">').text('Without status').appendTo($colours)
  const $butNative = $('<button style="margin-left: 0.5em">').text('Native').appendTo($colours)
  const $butAlien = $('<button style="margin-left: 0.5em">').text('Alien').appendTo($colours)

  $butNoStatus.click(function() {initColours('x', $sel.find(":selected").text(), $cb.is(':checked'))})
  $butNative.click(function() {initColours('n', $sel.find(":selected").text(), $cb.is(':checked'))})
  $butAlien.click(function() {initColours('a', $sel.find(":selected").text(), $cb.is(':checked'))})
  
  function makeColourPicker(status, period, $container) {

    const $div = $('<div>').appendTo($container)
    $(`<input type="text" style="width: 120px" id="colour${period}_${status}">`).appendTo($div)
    const $cb = $(`<input type="checkbox" id="stroke${period}_${status}" style="margin-left: 1em">`).appendTo($div)
    $(`<label for="colour${period}_${status}" style="margin-left: 1em">${period.replace('_', '-')}</label>`).appendTo($div)
    const col = new JSColor(`#colour${period}_${status}`)

    col.option({onChange: function() {colourChange(col, $cb, status, period)}})
    $cb.change(function() {colourChange(col, $cb, status, period)})

    col.fromString(bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][status][labels[period]])
    $cb.prop('checked', bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][status][labels[period]] !== '')

    pickers[status][labels[period]]=col
    checkboxes[status][labels[period]]=$cb
  }

  function makeStrokeColourPicker($container) {

    const $div = $('<div>').appendTo($container)
    $(`<input type="text" style="width: 120px" id="colour_stroke">`).appendTo($div)
    $(`<label for="colour_stroke" style="margin-left: 1em">Border colour</label>`).appendTo($div)
    colStroke = new JSColor(`#colour_stroke`)
    colStroke.fromString('#000000')

    const status = ['x','n','a']
    const period =  ['2000_19','1987_99','1970_86','1930_69','pre_1930']

    colStroke.option({onChange: function() {
      status.forEach(s => {
        period.forEach(p => {
          const $cb = checkboxes[s][labels[p]]
          bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][s][labels[p]] = $cb.is(':checked') ? colStroke.toHEXString() : null
        })
      })
      changeMap()
    }})
  }

  function colourChange(col, $cb, status, period) {

    //console.log('checkbox', $cb.is(':checked'))
    //console.log('colour', col.toHEXString())
    //console.log('period', period)

    bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][status][labels[period]] = col.toHEXString()
    bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][status][labels[period]] = $cb.is(':checked') ? colStroke.toHEXString() : null

    // The 'prior 1970' style always matches '1930 - 1969' style
    if (period === '1930_69') {
      bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][status]['prior 1970'] = col.toHEXString()
      bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][status]['prior 1970'] = $cb.is(':checked') ? colStroke.toHEXString() : null
    }

    changeMap()
  }

  function initColours(status, key, reverse) {
    console.log('init', status, key)
    const colours = colorbrewer[key]
  
    let periods = ['2000_19', '1987_99', '1970_86', '1930_69', 'pre_1930'].reverse()
    if (reverse) {
      periods.reverse()
    }
    periods[bsbiDataAccess.periodClasses].forEach((period,i) => {
      bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][status][labels[period]] = colours[i]
      pickers[status][labels[period]].fromString(colours[i])
    })
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