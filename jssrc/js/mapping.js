import { bsbiDataAccess } from './dataAccessAtlas'
import { setCookie, getCookie, getCitation} from './utils'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

let currentTaxon 
let gridStyle = getCookie('gridstyle') ? getCookie('gridstyle') : 'solid'
let backdrop = getCookie('backdrop') ? getCookie('backdrop') : 'colour_elevation'
let slippyMap, staticMap
let mapType = 'allclass'
let insetType = getCookie('inset') ? getCookie('inset') : 'BI4'
let boundaryType = getCookie('boundaries') ? getCookie('boundaries') : 'none'
let showStatus = false
let displayedMapType = 'static'
let resolution = 'hectad'
let atlasRangeIndex = 5
let atlasTrendIndex = 2
const slippyLegendOpts = {
  display: true,
  scale: 0.8,
  x: 10,
  y: 0,
  data: null
}
const svgLegendOpts = {
  display: true,
  scale: 1,
  x: 10,
  y: 5,
  data: null
}
const periods = [
  {
    min: '',
    max: 1929,
    access: 'status_29',
    caption: '1929 and before'
  },
  {
    min: 1930,
    max: 1969,
    access: 'status_30_69',
    caption: '1930–1969'
  },
  {
    min: 1970,
    max: 1986,
    access: 'status_70_86',
    caption: '1970–1986'
  },
  {
    min: 1987,
    max: 1999,
    access: 'status_87_99',
    caption: '1987–1999'
  },
  {
    min: 2000,
    max: 2019,
    access: 'status_00_19',
    caption: '2000–2019'
  }
]
const trends = [
  {
    lower: '1930–69',
    upper: '2000–19',
    access: 'change_1930_1969_vs_2000_2019',
    caption: '1930–69 vs 2000–19'
  },
  {
    lower: '1987–99',
    upper: '2000–19',
    access: 'change_1987_1999_vs_2000_2019',
    caption: '1987–99 vs 2000–19'
  }
]

function mapControlRow(selector, classname) {
  const $div =  $('<div>').appendTo($(selector))
  $div.addClass('atlas-map-control-row')
  if (classname) {
    $div.addClass(classname)
  }
  return $div
}

export function setControlState() {

  // map display
  if (displayedMapType === "static") {
    $('#slippyAtlasMain').hide()
    $('#staticAtlasMain').show()
  } else {
    $('#staticAtlasMain').hide()
    $('#slippyAtlasMain').show()
  }

  // save map image button
  if (displayedMapType === 'static') {
    $('.atlas-save-map-image').show()
  } else {
    $('.atlas-save-map-image').hide()
  }

  // download map data button
  $('.atlas-download-map-data').show()
  if (mapType === 'allclass' && resolution === 'hectad') {
    $('.atlas-download-map-data input, .atlas-download-map-data button').attr('disabled', false)
  } else {
    $('.atlas-download-map-data input, .atlas-download-map-data button').attr('disabled', true)
  }

  // backdrop selector
  if (displayedMapType === "static") {
    $('.atlas-backdrop-selector').show()
  } else {
    $('.atlas-backdrop-selector').hide()
  }

  // inset control
  if (displayedMapType === "static") {
    $('.atlas-inset-control').show()
  } else {
    $('.atlas-inset-control').hide()
  }

  // grid type control
  if (displayedMapType === "static") {
    $('.atlas-grid-type-control').show()
  } else {
    $('.atlas-grid-type-control').hide()
  }

  // boundary type control
  // if (displayedMapType === "static") {
  //   $('.atlas-boundaries-control').show()
  // } else {
  //   $('.atlas-boundaries-control').hide()
  // }

  // period slider visibility
  if (mapType === 'status') {
    $('.atlas-period-slider-control').show()
  } else {
    $('.atlas-period-slider-control').hide()
  }

  // trend slider control
  if (mapType === 'trends') {
    $('.atlas-trend-slider-control').show()
  } else {
    $('.atlas-trend-slider-control').hide()
  }

  // show status checkbox
  if (mapType === 'allclass' || mapType === 'slippy') {
    $('.atlas-status-checkbox-control').show()
  } else {
    $('.atlas-status-checkbox-control').hide()
  }

  // show opacity slider
  if (displayedMapType === 'slippy') {
    $('.atlas-opacity-slider-control').show()
  } else {
    $('.atlas-opacity-slider-control').hide()
  }

  // status checkbox enabled and checked value
  const disableStatus = bsbiDataAccess.taxaNoStatusList.indexOf(currentTaxon.identifier) > -1 || currentTaxon.isHybrid
  const isHybrid = currentTaxon.hybridMapping

  if (disableStatus || isHybrid) {
    showStatus = false
    bsbiDataAccess.showStatus = false
    $('.atlas-status-checkbox-control span').text('No status info for this taxon')
    $('.atlas-status-checkbox-control span').css('color', 'silver')
  } else {
    $('.atlas-status-checkbox-control span').text('Show status')
    $('.atlas-status-checkbox-control span').css('color', 'black')
  }
  if (disableStatus || isHybrid || (displayedMapType === 'slippy' && mapType === 'allclass' && resolution !== 'hectad')) {
    // Uncheck and disable status checkbutton if not hectad resolution or no status info
    $('.atlas-status-checkbox').prop('checked', false)
    $('.atlas-status-checkbox').attr('disabled', true)
  } else {
    // Display and set checked status to current value of showStatus global
    $('.atlas-status-checkbox').attr('disabled', false)
    $('.atlas-status-checkbox').prop('checked', showStatus)
  }

  // atlas resolution control visibility
  if (displayedMapType === "slippy" && mapType === 'allclass') {
    $('.atlas-resolution-control').show()
  } else {
    $('.atlas-resolution-control').hide()
  }

  // atlas resolution control value and global variables
  if (displayedMapType === "slippy" && mapType === 'allclass') {
    // Reset resolution if currently set to a value that is not
    // appropriate for the taxon
    // if (resolution === 'tetrad' && !currentTaxon.tetrad) {
    //   resolution = 'hectad'
    // }
    bsbiDataAccess.resolution = resolution

    // Ensure right option is selected
    $('.bsbi-resolution-' + resolution).prop('checked', true)

    // Enable/disable tetrad option as appropriate
    // if (currentTaxon.tetrad) {
    //   $('.bsbi-resolution-tetrad').attr('disabled', false)
    // } else {
    //   $('.bsbi-resolution-tetrad').attr('disabled', true)
    // }
  } else {
    bsbiDataAccess.resolution = 'hectad'
  }

  // Enable/disable the hybrid map type option as appropriate
  const $hybridopts = $('.atlas-map-type-selector option[value="hybrid"]') 
  if (isHybrid) {
    $hybridopts.show()
  } else {
    $hybridopts.hide()
    // Select another option if currently selected
    if (mapType === 'hybrid') {
      $hybridopts.prop('selected', false)
      $('.atlas-map-type-selector option[value="allclass"]').prop('selected', true)
      mapType='allclass'
    }
  }
  $('.atlas-map-type-selector').selectpicker('refresh')
}

function gridStyleSelector($parent) {

  const gridStyles = [
    {
      caption: 'Solid grid lines',
      val: 'solid'
    },
    {
      caption: 'Dashed grid lines',
      val: 'dashed'
    },
    {
      caption: 'No grid lines',
      val: 'none'
    }
  ]

  // Main type selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  $sel.addClass('atlas-grid-type-control')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {

    gridStyle = $(this).val()
    setCookie('gridstyle', gridStyle, 30)
    staticMap.setGridLineStyle(gridStyle)
  })

  gridStyles.forEach(function(s){
    const $opt = s.selected  ? $('<option>') : $('<option>')
    $opt.attr('value', s.val)
    $opt.html(s.caption).appendTo($sel)
  })
 
  $sel.val(gridStyle)

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}

// function gridStyleRadios($parent, i) {
//   // Overall control container
//   const $container = $('<div>').appendTo($parent)

//   function makeRadio(label, val, checked) {
//     //$('<div class="radio"><label><input type="radio" name="atlas-grid-type" value="'+ val + '" ' + checked + '>' + label + '</label></div>').appendTo($container)
  
//     const $div = $('<div>').appendTo($container)
//     $div.attr('class', 'radio')
//     const $label = $('<label>').appendTo($div)
//     $label.css('padding-left', '0')
//     const $radio = $('<input>').appendTo($label)
//     const $span = $('<span>').appendTo($label)
//     $span.text(label)
//     $span.css('padding-left', '20px')
//     $radio.attr('type', 'radio')
//     $radio.attr('name', 'atlas-grid-type-' + i)
//     $radio.attr('class', 'atlas-grid-type-' + val)
//     $radio.attr('value', val)
//     $radio.css('margin-left', 0)
//     if (checked) $radio.prop('checked', true)

//     $radio.change(function () {
//       gridStyle = $(this).val()
//       setCookie('gridstyle', gridStyle, 30)
//       staticMap.setGridLineStyle(gridStyle)
//       // Update controls mirrored in other blocks
//       $('.atlas-grid-type-' + val).prop("checked", true)
//     })
//   }
//   makeRadio('Solid grid lines', 'solid', gridStyle === 'solid' ? 'checked' : '')
//   makeRadio('Dashed grid lines', 'dashed', gridStyle === 'dashed' ? 'checked' : '')
//   makeRadio('No grid lines', 'none', gridStyle === 'none' ? 'checked' : '')
// }

function boundarySelector($parent) {

  const boundaries = [
    {
      caption: 'Country boundaries',
      val: 'country'
    },
    {
      caption: 'Vice county boundaries',
      val: 'vc'
    },
    {
      caption: 'No boundaries',
      val: 'none'
    }
  ]

  // Main type selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  $sel.addClass('atlas-boundaries-control')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {

    boundaryType = $(this).val()
    setCookie('boundaries', boundaryType, 30)

    if (boundaryType === 'none') {
      staticMap.setVcLineStyle('none')
      staticMap.setCountryLineStyle('none')
      staticMap.setBoundaryColour('#7C7CD3')
      slippyMap.setShowVcs(false)
      slippyMap.setShowCountries(false)
    } else if (boundaryType === 'vc') {
      staticMap.setVcLineStyle('')
      staticMap.setCountryLineStyle('none')
      staticMap.setBoundaryColour('white')
      slippyMap.setShowVcs(true)
      slippyMap.setShowCountries(false)
    } else if (boundaryType === 'country') {
      staticMap.setVcLineStyle('none')
      staticMap.setCountryLineStyle('')
      staticMap.setBoundaryColour('white')
      slippyMap.setShowVcs(false)
      slippyMap.setShowCountries(true)
    }
  })

  boundaries.forEach(function(b){
    const $opt = b.selected  ? $('<option>') : $('<option>')
    $opt.attr('value', b.val)
    $opt.html(b.caption).appendTo($sel)
  })
 
  $sel.val(boundaryType)

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}

function mapInterfaceToggle($parent) {

  const $container = $('<div style="display: flex">').appendTo($parent)

  // Buttons
  const $bgrp = $('<div class="btn-group" data-toggle="buttons">').appendTo($container)

  const $staticLabel = $('<label class="btn btn-primary active">').appendTo($bgrp)
  $('<input type="radio" name="mapType" value="static" checked>').appendTo($staticLabel)
  $staticLabel.append("Overview")

  const $slippyLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
  $('<input type="radio" name="mapType" value="slippy">').appendTo($slippyLabel)
  $slippyLabel.append("Zoomable")

  // Busy indicator
  const $loader = $('<div id="atlas-loader" style="display: none">').appendTo($container) 
  $('<div class="atlas-loader">').appendTo($loader)

  $('input[type=radio][name="mapType"]').change(function() {
    displayedMapType = $(this).val()
    bsbiDataAccess.displayedMapType = displayedMapType

    if (displayedMapType === "slippy") {
      // Get current width of static map
      const $svg = $('#staticAtlasMain svg')
      const w = $svg.width()
      const h = $svg.height()
      slippyMap.setSize(w, h)
    }
    setControlState()
    changeMap()

    if (displayedMapType === "slippy") {
      slippyMap.invalidateSize()
    }
  })
}

function mapTypeSelector($parent) {

  // Main type selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  $sel.addClass('atlas-map-type-selector')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {
    mapType = $(this).val()
    setControlState()
    changeMap()
  })
  const types = [
    {
      caption: 'Distribution overview',
      val: 'allclass'
    },
    {
      caption: 'Distribution by year range',
      val: 'status'
    },
    {
      caption: 'Change maps',
      val: 'trends'
    },
    {
      caption: 'Tetrad frequency',
      val: 'tetrad'
    },
    {
      caption: 'Map hybrid with parents',
      val: 'hybrid'
    },
  ]
  types.forEach(function(t){
    const $opt = $('<option>')
    $opt.attr('value', t.val)
    $opt.html(t.caption).appendTo($sel)
  })

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}

function backdropSelector($parent) {

  const rasterRoot = ds.bsbi_atlas.dataRoot + 'rasters/'

  // Backdrops
  const backdrops = [
    {
      caption: 'No backdrop',
      val: 'none'
    },
    {
      caption: 'Colour elevation',
      val: 'colour_elevation'
    },
    {
      caption: 'Grey elevation',
      val: 'grey_elevation_300'
    },
  ]

  // Main type selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  //$sel.addClass('atlas-backdrop-selector')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {
    // Remove all backdrops
    backdrops.forEach(function(b){
      if (b.val !== 'none') {
        staticMap.basemapImage(b.val, false, rasterRoot + b.val + '.png', rasterRoot + b.val + '.pgw')
      }
    })
    // Display selected backdrop
    backdrop = $(this).val()
    setCookie('backdrop', backdrop, 30)
    if (backdrop !== 'none') {
      staticMap.basemapImage(backdrop, true, rasterRoot + backdrop + '.png', rasterRoot + backdrop + '.pgw')
    }
  })
  backdrops.forEach(function(b){
    const $opt = $('<option>')
    $opt.attr('value', b.val)
    $opt.html(b.caption).appendTo($sel)
  })
  $sel.val(backdrop)
  if (backdrop !== 'none') {
    staticMap.basemapImage(backdrop, true, rasterRoot + `${backdrop}.png`, rasterRoot + `${backdrop}.pgw`)
  }

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}

function mapImageButton($parent, i) {

  let imageType = 'png'

  // Overall control container
  const $container = $('<div>').appendTo($parent)
  $container.addClass('atlas-save-map-image')
  $container.hide()

  const $svg = $('<svg>').appendTo($container)
  const $t = $('<text>').appendTo($svg)
  $t.attr('x', '10')
  $t.attr('y', '20')
  $('<br>').appendTo($container)

  const $button = $('<button>').appendTo($container)
  $button.addClass('btn btn-default')
  $button.text('Download image')
  $button.on('click', function(){
    const info = {
      text: getCitation(currentTaxon, true),
      margin: 10,
      fontSize: 10,
      //img: `${ds.bsbi_atlas.dataRoot}combined-logos.png`
    }
    staticMap.saveMap(imageType === 'svg', info, 'atlas-image')
  })

  makeRadio('PNG', 'png', true)
  makeRadio('SVG', 'svg', false)

  function makeRadio(label, val, checked) {

    const $div = $('<div>').appendTo($container)
    $div.css('display', 'inline-block')
    $div.css('margin-left', '0.5em')
    $div.attr('class', 'radio')
    const $label = $('<label>').appendTo($div)
    $label.css('padding-left', '0')
    const $radio = $('<input>').appendTo($label)
    const $span = $('<span>').appendTo($label)
    $span.text(label)
    $span.css('padding-left', '20px')
    $radio.attr('type', 'radio')
    $radio.attr('name', 'img-download-type-' + i)
    $radio.attr('class', 'img-download-type-' + val)
    $radio.attr('value', val)
    $radio.css('margin-left', 0)
    if (checked) $radio.prop('checked', true)

    $radio.change(function () {
      // Update controls mirrored in other blocks
      $('.img-download-type-' + val).prop("checked", true)
      imageType = val
    })
  }
}

function mapDownloadButton($parent, i) {

  let downloadType = 'csv'

  // Overall control container
  const $container = $('<div>').appendTo($parent)
  $container.addClass('atlas-download-map-data')
  $container.hide()

  const $button = $('<button>').appendTo($container)
  $button.addClass('btn btn-default')
  $button.text('Download data')
  $button.on('click', function(){
    let displayedMap
    if (displayedMapType === 'static') {
      displayedMap = staticMap
    } else {
      displayedMap = slippyMap
    }
    displayedMap.downloadData(downloadType === 'geojson')
  })

  makeRadio('CSV', 'csv', true)
  makeRadio('GJson', 'geojson', false)

  function makeRadio(label, val, checked) {

    const $div = $('<div>').appendTo($container)
    $div.css('display', 'inline-block')
    $div.css('margin-left', '0.5em')
    $div.attr('class', 'radio')
    const $label = $('<label>').appendTo($div)
    $label.css('padding-left', '0')
    const $radio = $('<input>').appendTo($label)
    const $span = $('<span>').appendTo($label)
    $span.text(label)
    $span.css('padding-left', '20px')
    $radio.attr('type', 'radio')
    $radio.attr('name', 'download-type-' + i)
    $radio.attr('class', 'download-type-' + val)
    $radio.attr('value', val)
    $radio.css('margin-left', 0)
    if (checked) $radio.prop('checked', true)

    $radio.change(function () {
      // Update controls mirrored in other blocks
      $('.download-type-' + val).prop("checked", true)
      downloadType = val
    })
  }
}

function opacitySlider($parent) {

  const initOpacity = 70
  $('#atlas-leaflet-svg').css('opacity', initOpacity/100)
  
  // Overall control container
  const $container = $('<div>').appendTo($parent)
  $container.addClass('atlas-opacity-slider-control')
  $container.hide()

  // Label
  const $sliderLabel = $('<div>').appendTo($container)
  $sliderLabel.addClass('atlas-opacity-slider-label')
  $sliderLabel.text('Opacity:')

  // Slider
  const $sliderContainer = $('<div>').appendTo($container)
  $sliderContainer.addClass('slidecontainer')
  $sliderContainer.addClass('atlas-opacity-slider-slider')
  const $slider = $('<input>').appendTo($sliderContainer)
  $slider.addClass('slider')
  $slider.attr('type', 'range').attr('min', '1').attr('max', '100').attr('value', initOpacity).attr('id', 'atlas-opacity-slider')
  $slider.change(function() {
    $('#atlas-leaflet-svg').css('opacity', $(this).val()/100)
  })
}

function statusCheckbox($parent) {
  // Overall control container
  const $container = $('<div>').appendTo($parent)
  $container.addClass('atlas-status-checkbox-control')

  // Status on/off toggle
  const $checDiv = $('<div class="checkbox">').appendTo($container)
  //$checDiv.css('margin-top', '4.3em')

  $('<label><input type="checkbox" class="atlas-status-checkbox"/><span>Show status</span></label>').appendTo($checDiv)

  $('.atlas-status-checkbox').change(function() {
    showStatus = $(this).is(':checked')
    bsbiDataAccess.showStatus = showStatus
    changeMap()
  })
}

function statusControl($parent) {
  
  // Overall control container
  const $container = $('<div>').appendTo($parent)
  $container.addClass('atlas-period-slider-control')
  $container.hide()

  // Period display
  // const $indicator = $('<div>').appendTo($container)
  // $indicator.css('font-size', '1.5em')
  // $indicator.css('margin-bottom', '0.2em')
  // $indicator.text(periods[periods.length - 1].caption)

  // Slider
  const $sliderContainer = $('<div>').appendTo($container)
  $sliderContainer.addClass('slidecontainer')
  const $slider = $('<input>').appendTo($sliderContainer)
  $slider.addClass('slider')
  $slider.attr('type', 'range').attr('min', '1').attr('max', periods.length).attr('id', 'atlas-range-select')
  $slider.change(function() {
    atlasRangeIndex = $(this).val()
    changeMap()
  })

  const $scaleContainer = $('<div>').appendTo($sliderContainer)
  $scaleContainer.addClass('atlas-range-tick-container')
  $scaleContainer.css('margin-bottom', '4.3em')
  periods.forEach(function(p, i){
    const $tick = $('<span>').appendTo($scaleContainer)
    $tick.addClass('atlas-range-tick')
    const percent = i/(periods.length - 1)*100
    $tick.css('left',  percent.toString() + '%')
    $tick.text('|')
    $tick.append('<br>')
    const $tickText = $('<span>').appendTo($tick)
    $tickText.addClass('atlas-range-tick-text')
    $tickText.html((p.min ? p.min : 'pre') + '<br>' + (p.max === 1929 ? 1930 : p.max))
    //$tickText.html(p.min + '<br>' + p.max)
  })

  // // Status on/off toggle
  // const $checDiv = $('<div class="checkbox">').appendTo($container)
  // $checDiv.css('margin-top', '4.3em')

  // $('<label><input type="checkbox" id="atlas-status-checkbox">Show status</label>').appendTo($checDiv)

  // $('#atlas-status-checkbox').change(function() {
  //   showStatus = $(this).is(':checked')
  //   bsbiDataAccess.showStatus = showStatus
  //   changeMap()
  // })
}

function resolutionControl($parent, i) {
  // Overall control container
  const $container = $('<div>').appendTo($parent)

  function makeRadio(label, val, checked) {
    const $div = $('<div>').appendTo($container)
    $div.attr('class', 'radio')
    const $radio = $('<input>').appendTo($div)
    $radio.attr('type', 'radio')
    $radio.attr('name', 'bsbi-resolution-' + i)
    $radio.attr('class', 'bsbi-resolution-' + val)
    $radio.attr('value', val)
    $radio.css('margin-left', 0)
    if (checked) $radio.prop('checked', true)
    const $label = $('<label>').appendTo($div)
    $label.attr('for', 'bsbi-resolution-' + val)
    $label.text(label)

    $radio.change(function () {

      resolution = $(this).val()
  
      // Update controls mirrored in other blocks
      $('.bsbi-resolution-' + resolution).prop("checked", true)
      setControlState()
      changeMap()
    })
  }
  makeRadio('Hectads', 'hectad', true)
  makeRadio('Tetrads', 'tetrad', false)
  //makeRadio('Monads', 'monad', false)
}

function trendControl($parent) {
  // Overall control container
  const $container = $('<div>').appendTo($parent)
  $container.addClass('atlas-trend-slider-control')
  $container.hide()

  // Trend display
  // const $indicator = $('<div>').appendTo($container)
  // $indicator.css('font-size', '1.5em')
  // $indicator.css('margin-bottom', '0.2em')
  // $indicator.text(trends[trends.length - 1].caption)

  // Slider
  const $sliderContainer = $('<div>').appendTo($container)
  $sliderContainer.addClass('slidecontainer')
  $sliderContainer.addClass('atlas-trend-select-container')
  const $slider = $('<input>').appendTo($sliderContainer)
  $slider.addClass('slider')
  $slider.attr('type', 'range').attr('min', '1').attr('max', trends.length).addClass('atlas-trend-select')
  $slider.change(function() {
    atlasTrendIndex = $(this).val()
    changeMap()
  })

  const $scaleContainer = $('<div>').appendTo($sliderContainer)
  $scaleContainer.addClass('atlas-trend-tick-container')
  trends.forEach(function(p, i){
    const $tick = $('<span>').appendTo($scaleContainer)
    $tick.addClass('atlas-trend-tick')
    const percent = i/(trends.length - 1)*100
    $tick.css('left',  percent.toString() + '%')
    $tick.text('|')
    $tick.append('<br>')
    const $tickText = $('<span>').appendTo($tick)
    $tickText.addClass('atlas-trend-tick-text')
    $tickText.addClass('atlas-trend-tick-text-' + i)
    $tickText.html(p.lower + '<br>v.<br>' + p.upper)
  })

  $container.css('margin-bottom', '5.3em')

}

function insetSelector($parent) {

  const inserts = [
    {
      caption: 'No insets',
      val: 'BI1'
    },
    {
      caption: 'Channel Isles inset',
      val: 'BI2'
    },
    {
      caption: 'Northern and Channel Isles inset',
      val: 'BI4'
    },
  ]

  // Main type selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  $sel.addClass('atlas-inset-control')
  
  //$sel.addClass('atlas-backdrop-selector')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {

    insetType = $(this).val()
    staticMap.setTransform(insetType)
    setCookie('inset', insetType, 30)
    changeMap()
  })

  inserts.forEach(function(i){
    const $opt = i.selected  ? $('<option>') : $('<option>')
    $opt.attr('value', i.val)
    $opt.html(i.caption).appendTo($sel)
  })

  $sel.val(insetType)

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}

function insetRadios($parent, i) { 
  
  // Overall control container
  const $container = $('<div>').appendTo($parent)
  //$container.attr('id', 'atlas-inset-control')

  function makeRadio(label, val, checked) {
    const $div = $('<div>').appendTo($container)
    $div.attr('class', 'radio')
    const $label = $('<label>').appendTo($div)
    $label.css('padding-left', '0')
    const $radio = $('<input>').appendTo($label)
    const $span = $('<span>').appendTo($label)
    $span.text(label)
    $span.css('padding-left', '20px')
    $radio.attr('type', 'radio')
    $radio.attr('name', 'bsbi-inset-type-' + i)
    $radio.attr('class', 'bsbi-inset-type-' + val)
    $radio.attr('value', val)
    $radio.css('margin-left', 0)
    if (checked) $radio.prop('checked', true)

    $radio.change(function () {
      insetType = $(this).val()

      // Update controls mirrored in other blocks
      $('.bsbi-inset-type-' + insetType).prop("checked", true)

      staticMap.setTransform(insetType)
      setCookie('inset', insetType, 30)
      changeMap()
    })
  }
  const selectedInset = getCookie('inset') ? getCookie('inset') : insetType
  makeRadio('No insets', 'BI1', selectedInset === 'BI1' ? 'checked' : '')
  makeRadio('Channel Isles inset', 'BI2', selectedInset === 'BI2' ? 'checked' : '')
  makeRadio('Northern and Channel Isles inset', 'BI4', selectedInset === 'BI4' ? 'checked' : '')
}

export function mapSetCurrentTaxon(taxon) {
  currentTaxon = taxon
}

export function createMaps(selector) {

  // Modify standard UK opts to remove any without CI
  const transOptsSel =  JSON.parse(JSON.stringify(brcatlas.namedTransOpts))
  delete transOptsSel.BI3 // Remove the options without CI

  // Modify insets to go further west in order
  // to give more room for legends.
  transOptsSel.BI4.bounds.xmin = -240000,  //Northern Isles
  transOptsSel.BI1.bounds.xmin = -230000,  //No insets
  transOptsSel.BI2.bounds.xmin = -230000,  //CI inset

  // Init
  bsbiDataAccess.bsbiDataRoot = ds.bsbi_atlas.dataRoot + 'bsbi/20220704/'
  bsbiDataAccess.showStatus = false

  // Data access 
  const mapTypesSel = {
    'status_29': bsbiDataAccess.status_29,
    'status_30_69': bsbiDataAccess.status_30_69,
    'status_70_86': bsbiDataAccess.status_70_86,
    'status_87_99': bsbiDataAccess.status_87_99,
    'status_00_19': bsbiDataAccess.status_00_19,
    'Tetrad frequency': bsbiDataAccess.bsbiHectadDateTetFreq,
    'change_1987_1999_vs_2000_2019': bsbiDataAccess.change_1987_1999_vs_2000_2019,
    'change_1930_1969_vs_2000_2019': bsbiDataAccess.change_1930_1969_vs_2000_2019,
    'distAllClasses': bsbiDataAccess.distAllClasses,
    'hybrid': bsbiDataAccess.hybrid
  }

  // Basemaps
  const basemapConfigs = [
    {
      name: 'Open Street Map',
      type: 'tileLayer',
      selected: true,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      opts: {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    },
    {
      name: 'Stamen Black & White',
      type: 'tileLayer',
      selected: false,
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
      opts: {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      }
    },
    {
      name: 'Open Topo Map',
      type: 'tileLayer',
      selected: false,
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      opts: {
        maxZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }
    },
    {
      name: 'GEBCO 2020 Elevation',
      type: 'wms',
      selected: false,
      url: 'https://www.gebco.net/data_and_products/gebco_web_services/2020/mapserv?',
      opts: {
        layers: 'GEBCO_2020_Grid_2',
        maxZoom: 17,
        attribution: 'Imagery reproduced from the GEBCO_2020 Grid, GEBCO Compilation Group (2020) GEBCO 2020 Grid (doi:10.5285/a29c5465-b138-234d-e053-6c86abc040b9)'
      }
    },
    {
      name: 'Copernicus elevation aspect',
      type: 'wms',
      selected: false,
      url: 'https://copernicus.discomap.eea.europa.eu/arcgis/services/Elevation/Aspect/MapServer/WMSServer?',
      opts: {
        layers: 'image',
        maxZoom: 17,
        attribution: '&copy; European Commission'
      }
    }
  ]

  // Map height
  const height = 650
  // Create the static map
  staticMap = brcatlas.svgMap({
    selector: selector,
    mapid: "staticAtlasMain",
    captionId: "dotCaption",
    height: height,
    expand: true,
    legendOpts: svgLegendOpts,
    transOptsKey: getCookie('inset') ? getCookie('inset') : insetType,
    transOptsSel: transOptsSel,
    mapTypesKey: 'status_10_19',
    mapTypesSel: mapTypesSel,
    mapTypesControl: false,
    transOptsControl: false,
    seaFill: 'white',
    gridLineColour: '#7C7CD3',
    gridLineStyle: gridStyle,
    boundaryColour: '#7C7CD3',
    vcColour: '#7C7CD3',
    vcLineStyle: boundaryType === 'vc' ? '' : 'none',
    countryColour: '#7C7CD3',
    countryLineStyle: boundaryType === 'country' ? '' : 'none'
  })

  const rasterRoot = ds.bsbi_atlas.dataRoot + 'rasters/'
  //staticMap.basemapImage('colour_elevation', true, rasterRoot + 'colour_elevation.png', rasterRoot + 'colour_elevation.pgw')

  // Callbacks for slippy maps
  function startLoad() {
    document.getElementById('atlas-loader').style.display = 'inline-block'
    //develStartMapTiming("download")
  }
  function endLoad() {
    document.getElementById('atlas-loader').style.display = 'none'
    //develStopMapTiming("download")
  }
  function startDraw() {
    document.getElementById('atlas-loader').style.display = 'inline-block'
    //develStartMapTiming("display")
  }
  function endDraw() {
    document.getElementById('atlas-loader').style.display = 'none'
    //develStopMapTiming("display")
  }

  // Create the slippy map
  slippyMap = brcatlas.leafletMap({
    selector: selector,
    mapid: 'slippyAtlasMain',
    height: height,
    width: staticMap.getMapWidth(),
    captionId: "dotCaption",
    mapTypesKey: 'status_10_19',
    mapTypesSel: mapTypesSel,
    legendOpts: slippyLegendOpts,
    basemapConfigs: basemapConfigs,
    callbacks: [startDraw, endDraw, startLoad, endLoad],
    showVcs: boundaryType === 'vc',
    showCountries: boundaryType === 'country'
  })
  $('#slippyAtlasMain').hide()
}

export function changeMap(retPromise) {

  let displayedMap
  if (displayedMapType === 'static') {
    displayedMap = staticMap
  } else {
    displayedMap = slippyMap
  }

  if (mapType === 'status') {
    const access = periods[atlasRangeIndex-1].access
    displayedMap.setMapType(access)
  } else if (mapType === 'allclass') {
    displayedMap.setMapType('distAllClasses')
  } else if (mapType === 'trends') {
    const access = trends[atlasTrendIndex-1].access
    displayedMap.setMapType(access)
  } else if (mapType === 'tetrad') {
    displayedMap.setMapType('Tetrad frequency')
  } else if (mapType === 'hybrid') {
    displayedMap.setMapType('hybrid')
  }

  // To try to keep the legend around the same apparent size when
  // actual map size changes due to inset change, we set a scale
  // factor to apply to the legend depending on what inset value
  // is specified.
  svgLegendOpts.scale=0.9
  if (insetType == 'BI1') {
    svgLegendOpts.scale = svgLegendOpts.scale * 0.77
  }
  if (insetType == 'BI2') {
    svgLegendOpts.scale = svgLegendOpts.scale * 0.85
  }
  staticMap.setLegendOpts(svgLegendOpts)

  if (currentTaxon.identifier) {
    displayedMap.setIdentfier(currentTaxon.identifier)

    if (retPromise) {
      return displayedMap.redrawMap()
    } else {
      displayedMap.redrawMap().catch(e => {
        console.warn(`Unable to generate map for ${currentTaxon.shortName} (${currentTaxon.identifier}). Error message:`, e)
        displayedMap.clearMap()
      })
    }
  }

  // Initialise dot caption
  $('#dotCaption').html(bsbiDataAccess.dotCaption)
}

export function createMapControls(selector) {

  mapInterfaceToggle(mapControlRow(selector))
  mapTypeSelector(mapControlRow(selector))
  statusControl(mapControlRow(selector))
  statusCheckbox(mapControlRow(selector))
  trendControl(mapControlRow(selector))
  backdropSelector(mapControlRow(selector, 'atlas-backdrop-selector'))
  insetSelector(mapControlRow(selector))
  gridStyleSelector(mapControlRow(selector))
  boundarySelector(mapControlRow(selector))

  opacitySlider(mapControlRow(selector))

  $(selector).each(function(i) {
    // We loop through the selection so that we can use the
    // index value to differentiate the equivalent controls
    // from different blocks. This is vital for radio controls
    // otherwise value can only be selected in one block and
    // therefore initialisation may be wrong.
    let sel = 'bsbi-atlas-map-controls-' + i
    const $div = $('<div>').appendTo($(this))
    $div.addClass(sel)
    sel = '.' + sel
    // Potentially we can also use this to ensure that selection
    // in one block is mirrored in the other. This is only important
    // if user might switch between blocks during use - but this
    // is very unlikely. (But nevertheless has been implemented
    // for the radio buttons below.)
    //insetRadios(mapControlRow(sel,'atlas-inset-control'), i)
    //gridStyleRadios(mapControlRow(sel, 'atlas-grid-type-control'), i)
    resolutionControl(mapControlRow(sel, 'atlas-resolution-control'), i)
    mapImageButton(mapControlRow(sel, 'atlas-image-button'), i)
    mapDownloadButton(mapControlRow(sel, 'atlas-download-button'), i)
  })
}

export function updateBsbiDataAccess(key, value) {
  bsbiDataAccess[key]=value
}

export function getStaticMap() {
  return staticMap
}

// export function setMapType(type) {
//   mapType = type
// }