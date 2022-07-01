import * as d3 from 'd3'
import { setCookie, getCookie } from './utils'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

let gam, linmod
import { pcache } from './gen'

let regionType = getCookie('trend-region') ? getCookie('trend-region') : 'Britain'
let termType = getCookie('trend-term') ? getCookie('trend-term') : 'long'
let currentTaxon

export function createTrends(sel) {

  $('<h4>').appendTo($(sel)).text('Population trends')

  const $p1 = $('<p>').appendTo($(sel))
  $p1.text("Explanation of trends charts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.")
  const $trends = $('<div>').appendTo($(sel))
  $trends.css('display', 'flex')
  
  const $gam = $('<div>').appendTo($trends)
  $gam.css('flex', '1')
  $gam.attr('id', 'bsbi-gam-chart').css('max-width', '400px')
  
  gam = brccharts.trend2({
    selector: '#bsbi-gam-chart',
    data: [], 
    means: [],
    yearMin: 1947,
    yearMax: 2022,
    width: 400,
    height: 280,
    margin: {left: 50, right: 10, top: 10, bottom: 55},
    expand: true,
    axisLeft: 'tick',
    axisBottom: 'tick',
    axisRight: 'on',
    axisTop: 'on',
    axisLeftLabel: 'Relative index',
    axisLabelFontSize: 12,
    style: {
      vStroke: 'blue',
      vStrokeWidth: 2,
      cStroke: 'grey',
      cStrokeWidth: 0.5,
      cFill: 'rgb(230,230,230)',
      mRad: 3,
      mFill: 'white',
      mStroke: 'black',
      sdStroke: 'black'
    }
  })

  const $linmod = $('<div>').appendTo($trends)
  $linmod.css('flex', '1')
  $linmod.attr('id', 'bsbi-linmod-chart').css('max-width', '400px')
  
  linmod = brccharts.trend3({
    selector: '#bsbi-linmod-chart',
    data: [], 
    means: [], 
    yearMin: 1947,
    yearMax: 2022,
    width: 400,
    height: 280,
    margin: {left: 50, right: 10, top: 10, bottom: 55},
    expand: true,
    axisLeft: 'tick',
    axisBottom: 'tick',
    axisRight: 'on',
    axisTop: 'on',
    axisLeftLabel: 'Relative index',
    axisLabelFontSize: 12,
    style: {
      vStroke: 'blue',
      vStrokeWidth: 2,
      vOpacity: 0.05,
      mRad: 3,
      mFill: 'white',
      mStroke: 'black',
      sdStroke: 'black'
    }
  })
}

export function changeTrends(taxon) {

  if (taxon) {
    currentTaxon = taxon
  }
  if (!currentTaxon) return

  loadData().then(d => {
    const gamData = d[0].status === 'fulfilled' ? d[0].value : []
    const linmodData = d[1].status === 'fulfilled' ? d[1].value : []
    const means = d[2].status === 'fulfilled' ? d[2].value : []
    gam.updateChart(gamData, means)
    linmod.updateChart(linmodData, means)
  })
}

function loadData() {

  const trendsRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/'
  const pGam = d3.csv(`${trendsRoot}${termType}/trends-gam/${regionType}/${currentTaxon.identifier.replace(/\./g, "_")}.csv?${pcache}`, function(d){
    return {
      year: Number(d.year),
      value: Number(d.x50),
      upper: Number(d.x95),
      lower: Number(d.x5)
    }
  })
  const pLinmod = d3.csv(`${trendsRoot}${termType}/trends-linmod/${regionType}/${currentTaxon.identifier.replace(/\./g, "_")}.csv?${pcache}`, function(d){
    return {
      gradient: Number(d.gradient),
      intercept: Number(d.intercept)
    }
  })
  const pMeans = d3.csv(`${trendsRoot}${termType}/trends-lt-mean-sd/${regionType}/${currentTaxon.identifier.replace(/\./g, "_")}.csv?${pcache}`, function(d){
    return {
      year: Number(d.year),
      mean: Number(d.mean),
      sd: Number(d.std),
    }
  })
  return Promise.allSettled([pGam, pLinmod, pMeans])
}

export function createTrendControls(selector) {

  regionSelector(trendControlRow(selector))
  termSelector(trendControlRow(selector))
}

function trendControlRow(selector, classname) {
  const $div =  $('<div>').appendTo($(selector))
  $div.addClass('atlas-trend-control-row')
  if (classname) {
    $div.addClass(classname)
  }
  return $div
}

function regionSelector($parent) {

  const regions = [
    {
      caption: 'Britain',
      val: 'Britain'
    },
    {
      caption: 'Ireland',
      val: 'Ireland'
    },
    {
      caption: 'England',
      val: 'England'
    },
    {
      caption: 'Scotland',
      val: 'Scotland'
    },
    {
      caption: 'Wales',
      val: 'Wales'
    },
    {
      caption: 'Northern Ireland',
      val: 'Northern'
    },
    {
      caption: 'Republic of Ireland',
      val: 'Republic'
    }
  ]

  // Region selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  $sel.addClass('atlas-trends-regions-control')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {

    regionType = $(this).val()
    setCookie('trend-region', regionType, 30)

    changeTrends()
  })

  regions.forEach(function(b){
    const $opt = b.selected  ? $('<option>') : $('<option>')
    $opt.attr('value', b.val)
    $opt.html(b.caption).appendTo($sel)
  })
 
  $sel.val(regionType)

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}

function termSelector($parent) {

  const terms = [
    {
      caption: 'Long term trend',
      val: 'long'
    },
    {
      caption: 'Short term trend',
      val: 'short'
    },
  ]

  // Term type selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  $sel.addClass('atlas-trends-term-control')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {

    termType = $(this).val()
    setCookie('trend-term', termType, 30)

    changeTrends()
  })

  terms.forEach(function(b){
    const $opt = b.selected  ? $('<option>') : $('<option>')
    $opt.attr('value', b.val)
    $opt.html(b.caption).appendTo($sel)
  })
 
  $sel.val(termType)

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}