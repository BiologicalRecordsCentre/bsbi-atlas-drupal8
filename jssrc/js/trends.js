import * as d3 from 'd3'
import { setCookie, getCookie } from './utils'
import * as stats from 'stats-lite'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

let gam, linmod, bar, density
let $gamNoData, $linmodNoData, $barNoData, $densityNoData
import { pcache } from './gen'

let regionType = getCookie('trend-region') ? getCookie('trend-region') : 'Britain'
let termType = getCookie('trend-term') ? getCookie('trend-term') : 'long'
let scaleType = getCookie('trend-scale') ? getCookie('trend-scale') : 'within'
let scaleTypeDensity = getCookie('trend-scale-density') ? getCookie('trend-scale-density') : 'max'
let currentTaxon

export function createTrends(sel) {

  $('<h4 id="bsbiTrendsTitle">').appendTo($(sel)).text('')
  $('<p id="bsbiTrendsAggNote">').appendTo($(sel)).text('')

  const $trends1 = $('<div>').appendTo($(sel))
  $trends1.attr('class', 'phenRow')
  const $trends2 = $('<div>').appendTo($(sel))
  $trends2.attr('class', 'phenRow')

  const $p1 = $('<p>').appendTo($(sel))
  $p1.html(`
  The trends above rely on the frequency scaling using local occupancy (“Frescalo”) approach of Hill (2012). 
  The method was designed to adjust for locally variable recording effort across time periods, 
  and has been used on many distribution datasets (Pescott et al., 2019). Here, we apply 
  Frescalo to vascular plant data gridded at the 10 km scale within the following time 
  periods: 1930–69; 1987–99; 2000–09; 2010–19. These are a subset of the “date-classes” used 
  by the BSBI to organise their data, and roughly designate multi-year periods within which 
  specific national recording projects occurred (Preston et al., 2002).
  `)
  const $p2 = $('<p>').appendTo($(sel))
  $p2.html(`
  Outputs from the Frescalo model include per taxon/time period estimates of mean relative occupancy and 
  their standard deviations. Below, we plot these estimates (filled white circles with black lines) 
  in Figures 1 and 2, along with a GAM smoother (Fig. 1) and a Monte Carlo-based 100-member set of 
  linear regressions compatible with these (Fig. 2). The trend magnitude frequency chart in Figure 
  3 is based on discretising the compatible linear trend set displayed in Figure 2, in order to 
  more clearly display the model-based uncertainty associated with the Frescalo outputs. 
  Pescott et al. (2022) describe the rationale for this in more detail. Finally, Figure 4 … [TO BE COMPLETED].
  `)

  const $p3 = $('<p>').appendTo($(sel))
  $p3.html(`
  [NEW PARAGRAPH: OTHER TEXT ABOUT DECISIONS WITH REGARDS TO INCLUDING AND EXCLUDING SPECIES IN MODELLING AND/OR DISPLAY]
  `)
  
  $('<h4>').appendTo($(sel)).text('References')
  let $ref 
  $ref = $('<p>').appendTo($(sel))
  $ref.html(`
  Hill, M.O. 2012. Local frequency as a key to interpreting species occurrence data when recording effort is not known. 
  <i>Methods in Ecology and Evolution</i> 3, 195–205.
  `)
  $ref = $('<p>').appendTo($(sel))
  $ref.html(`
  Pescott, O.L., Humphrey, T.A., Stroh, P.A., Walker, K.J. 2019. Temporal changes in distributions and the species 
  atlas: How can British and Irish plant data shoulder the inferential burden? <i>British & Irish Botany</i> 1, 250–282. 
  <a href="https://doi.org/10.33928/bib.2019.01.250" target="_blank">https://doi.org/10.33928/bib.2019.01.250</a>
  `)
  $ref = $('<p>').appendTo($(sel))
  $ref.html(`
  Pescott, O.L., Stroh, P.A., Humphrey, T.A. and Walker, K.J. 2022. Simple methods for improving the communication 
  of uncertainty in species’ temporal trends. <i>Ecological Indicators</i>, 141, 109117. 
  <a href="https://doi.org/10.1016/j.ecolind.2022.109117" target="_blank">https://doi.org/10.1016/j.ecolind.2022.109117</a>
  `)
  $ref = $('<p>').appendTo($(sel))
  $ref.html(`
  Preston, C.D., Pearman, D.A., Dines, T.D. (Eds.) 2002. <i>New Atlas of the British and Irish Flora</i>. Oxford University 
  Press, Oxford, England.
  `)
  
  const $gam = $('<div>').appendTo($trends1)
  $gam.attr('id', 'bsbi-gam-chart')
    .attr('class', 'phenColumn')
    .css('max-width', '400px')
    .css('position', 'relative')
    .text('Figure 1')

  gam = brccharts.trend2({
    selector: '#bsbi-gam-chart',
    data: [], 
    means: [],
    // yearMin: 1947,
    // yearMax: 2022,
    width: 350,
    height: 250,
    margin: {left: 50, right: 10, top: 10, bottom: 55},
    expand: true,
    axisLeft: 'tick',
    axisBottom: 'tick',
    axisRight: 'on',
    axisTop: 'on',
    axisLeftLabel: 'Relative frequency',
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

  $gamNoData = $('<div>').appendTo($gam)
  $gamNoData.text('No trend available for this combination')
    .css('position', 'absolute')
    .css('margin', '3em')
    .css('top', '0px')
    .css('left', '50px')
    .css('display', 'none')
    
  const $linmod = $('<div>').appendTo($trends1)
  $linmod.attr('id', 'bsbi-linmod-chart')
    .attr('class', 'phenColumn')
    .css('max-width', '400px')
    .css('position', 'relative')
    .text('Figure 2')
    
  linmod = brccharts.trend3({
    selector: '#bsbi-linmod-chart',
    data: [], 
    means: [], 
    // yearMin: 1947,
    // yearMax: 2022,
    width: 350,
    height: 250,
    margin: {left: 50, right: 10, top: 10, bottom: 55},
    expand: true,
    axisLeft: 'tick',
    axisBottom: 'tick',
    axisRight: 'on',
    axisTop: 'on',
    axisLeftLabel: 'Relative frequency',
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

  $linmodNoData = $('<div>').appendTo($linmod)
  $linmodNoData.text('No trend available for this combination')
    .css('position', 'absolute')
    .css('margin', '3em')
    .css('top', '0px')
    .css('left', '50px')
    .css('display', 'none')

  // Trend density plot
  const $density = $('<div>').appendTo($trends2)
  $density.attr('id', 'bsbi-density-chart')
    .attr('class', 'phenColumn')
    .css('max-width', '400px')
    .css('position', 'relative')
    .text('Figure 3')
    
  density = brccharts.density({
    selector: '#bsbi-density-chart',
    data: [], 
    ylines:[],
    xlines:[],
    width: 350,
    height: 250,
    padding: 0.1,
    margin: {left: 50, right: 10, top: 10, bottom: 45},
    expand: true,
    axisLeft: 'on',
    axisBottom: 'tick',
    axisRight: 'on',
    axisTop: 'on',
    axisLeftLabel: 'Density',
    axisBottomLabel: 'Slope',
    axisLabelFontSize: 12,
    styles: [{stroke: 'blue', strokeWidth: 1}, {stroke: 'grey', strokeWidth: 1}]
  })

  $densityNoData = $('<div>').appendTo($density)
  $densityNoData.text('No trend available for this combination')
    .css('position', 'absolute')
    .css('margin', '3em')
    .css('top', '0px')
    .css('left', '50px')
    .css('display', 'none')

  // Trend overview
  const $bar = $('<div>').appendTo($trends2)
  $bar.attr('id', 'bsbi-bar-chart')
    .attr('class', 'phenColumn')
    .css('max-width', '400px')
    .css('position', 'relative')
    .text('Figure 4')
    
  bar = brccharts.bar({
    selector: '#bsbi-bar-chart',
    data: [], 
    width: 350,
    height: 250,
    padding: 0.1,
    margin: {left: 50, right: 10, top: 10, bottom: 85},
    expand: true,
    axisLeft: 'tick',
    axisBottom: 'tick',
    axisRight: 'none',
    axisTop: 'none',
    axisLeftLabel: 'Frequency',
    axisLabelFontSize: 12,
    labelPosition: {'text-anchor': 'end', dx: '-1em', dy: '0.2em', transform: 'rotate(-55)'}
  })

  $barNoData = $('<div>').appendTo($bar)
  $barNoData.text('No trend available for this combination')
    .css('position', 'absolute')
    .css('margin', '3em')
    .css('top', '0px')
    .css('left', '50px')
    .css('display', 'none')
}

export function changeTrends(taxon) {

  if (taxon) {
    currentTaxon = taxon
  }
  if (!currentTaxon.identifier) return

  // Set title to reflect user selection
  const termTypeText = termType === 'short' ? 'Post-1987' : 'Post-1930'
  let regionTypeText
  if (regionType === 'Northern') {
    regionTypeText = 'Northern Ireland'
  } else if (regionType === 'Republic') {
    regionTypeText = 'Republic of Ireland'
  } else {
    regionTypeText = regionType
  }
  $('#bsbiTrendsTitle').html(`<b>${termTypeText}</b> effort-adjusted 10 km distribution trends for <b>${regionTypeText}</b>`)

  if (currentTaxon[`${termType}TrendAgg`]) {
    setTrendsAggHtml(currentTaxon, termType, $('#bsbiTrendsAggNote'))
  } else {
    $('#bsbiTrendsAggNote').html('')
  }

  loadData().then(d => {
    
    // Set flag to exclude if data deficient
    const dTrendCounts = d[6]
    let dataDeficient = true
    if (dTrendCounts.status === 'fulfilled') {
      //console.log('Trend counts', dTrendCounts.value[0])
      if (regionType === 'Britain' ||
          regionType === 'England' ||
          regionType === 'Scotland' ||
          regionType === 'Wales') {
        if (termType === 'long') {
          dataDeficient = dTrendCounts.value[0].GbLong <= 15
        } else {
          dataDeficient = dTrendCounts.value[0].GbShort <= 15
        }
      } else {
        if (termType === 'long') {
          dataDeficient = dTrendCounts.value[0].IrLong <= 6
        } else {
          dataDeficient = dTrendCounts.value[0].IrShort <= 6
        }
      }
    }

    let gamData, linmodData, barData, densityData

    if (d[0].status === 'fulfilled' && !dataDeficient) {
      
      $gamNoData.hide()
      // If termType is short, add extra points to start of array to make 
      // for smooth transitions between long and short term trends
      if (termType === 'short') {
        gamData = []
        for (let i=0; i<44; i++) {
          gamData.push(d[0].value[0])
        }
        gamData = [...gamData, ...d[0].value]
      } else {
        gamData = d[0].value
      }
    } else {
      gamData = []
      $gamNoData.show()
    }
    if (d[1].status === 'fulfilled' && !dataDeficient) {
      linmodData = d[1].value
      densityData = [linmodData.map(d => {return {slope: Number(d.gradient)}})]
      $linmodNoData.hide()
      $densityNoData.hide()
    } else {
      linmodData = []
      densityData = []
      $linmodNoData.show()
      $densityNoData.show()
    }
    const meanLinmodData = d[4].status === 'fulfilled' && !dataDeficient ? d[4].value : []
    if (densityData.length) {
      densityData.push(meanLinmodData)
    }
    const linmodCentiles = d[5].status === 'fulfilled' && !dataDeficient ? d[5].value : []
    const means = d[2].status === 'fulfilled' && !dataDeficient ? d[2].value : []
    // Reverse the order of means to make for smooth transitions between
    // short and long term trends
    means.reverse()
    if (d[3].status === 'fulfilled' && !dataDeficient) {
      barData = d[3].value[0]
      $barNoData.hide()
    } else {
      barData = []
      $barNoData.show()
    }
    let yMin, yMax
    if (scaleType === 'across') {
      yMin = -0.2
      yMax = 1
    }
    gam.updateChart(gamData, means, termType === 'long' ? 1947 : 1990, 2022, yMin, yMax, true, [{y: 0, stroke: 'rgb(210,210,210)', strokeWidth: 1}])
    linmod.updateChart(linmodData, means, termType === 'long' ? 1947 : 1990, 2022, yMin, yMax, true, [{y: 0, stroke: 'rgb(210,210,210)', strokeWidth: 1}])
    bar.updateChart(barData)
  
    const xlines = [
      {x: -0.004, stroke: 'silver', strokeWidth: 1, strokeDasharray: '3 3'},
      {x: -0.001, stroke: 'silver', strokeWidth: 1, strokeDasharray: '3 3'},
      {x: 0, stroke: 'silver', strokeWidth: 1},
      {x: 0.001, stroke: 'silver', strokeWidth: 1, strokeDasharray: '3 3'},
      {x: 0.004, stroke: 'silver', strokeWidth: 1, strokeDasharray: '3 3'}
    ]
    const limmodCentile = linmodCentiles.find(l => l.region === regionType)
    if (densityData.length) {
      // In general, density slopes of individual taxon will be within the overall
      // density slope. But for outliers, we adjust the x axis limits based on
      // the density slope for the taxon.
      const dd = densityData[0].map(d => d.slope)
      const dp95 = stats.percentile(dd, 0.95)
      const dp5 = stats.percentile(dd, 0.05)
      const xmax = limmodCentile.c95 > dp95 ? limmodCentile.c95 : dp95
      const xmin = limmodCentile.c5 < dp5 ? limmodCentile.c5 : dp5
      density.updateChart(densityData, xmin, xmax, xlines, null, scaleTypeDensity==='max')
    } else {
      density.updateChart([])
    }
  })
}

function loadData() {

  const tIdentifier = currentTaxon[`${termType}TrendAgg`] ? currentTaxon[`${termType}TrendAgg`] : currentTaxon.identifier

  const trendsRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/'
  const trendCountRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/hectad-counts'
  const pTrendCounts = d3.csv(`${trendCountRoot}/${tIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`)
  const pGam = d3.csv(`${trendsRoot}${termType}/trends-gam/${regionType}/${tIdentifier.replace(/\./g, "_")}.csv?${pcache}`, function(d){
    return {
      year: Number(d.year),
      value: Number(d.x50),
      upper: Number(d.x95),
      lower: Number(d.x5)
    }
  })
  const pLinmod = d3.csv(`${trendsRoot}${termType}/trends-linmod/${regionType}/${tIdentifier.replace(/\./g, "_")}.csv?${pcache}`, function(d){
    return {
      gradient: Number(d.gradient),
      intercept: Number(d.intercept)
    }
  })
  const pMeans = d3.csv(`${trendsRoot}${termType}/trends-lt-mean-sd/${regionType}/${tIdentifier.replace(/\./g, "_")}.csv?${pcache}`, function(d){
    return {
      year: Number(d.year),
      mean: Number(d.mean),
      sd: Number(d.std),
    }
  })
  const pSummaries = d3.csv(`${trendsRoot}${termType}/trends-summaries/${regionType}/${tIdentifier.replace(/\./g, "_")}.csv?${pcache}`, function(d){
    return [
      {value: Number(d.declineStrong), label: 'Strong decline', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'},
      {value: Number(d.declineMod), label: 'Moderate decline', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'},
      {value: Number(d.stable), label: 'Stable', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'},
      {value: Number(d.increaseMod), label: 'Moderate increase', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'},
      {value: Number(d.increaseStrong), label: 'Strong increase', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'}
    ]
  })
  const pLinmodMeans = d3.csv(`${trendsRoot}${termType}/trends-linmod/${regionType}/mean-gradients.csv?${pcache}`, function(d){
    return {
      slope: Number(d.gradient)
    }
  })
  const pLinmodCentiles = d3.csv(`${trendsRoot}${termType}/trends-linmod/centiles.csv?${pcache}`, function(d){
    return {
      region: d.region,
      c5: Number(d.c5),
      c95: Number(d.c95)
    }
  })
  return Promise.allSettled([pGam, pLinmod, pMeans, pSummaries, pLinmodMeans, pLinmodCentiles, pTrendCounts])
}

export function createTrendControls(selector) {

  regionSelector(trendControlRow(selector))
  termSelector(trendControlRow(selector))
  scalingSelector((trendControlRow(selector)))
  scalingSelector2((trendControlRow(selector)))
}

export function setTrendsAggHtml(currentTaxon, termType, $ctl) {

  //const captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions/'
  // const pCaptions = []
  // currentTaxon.trendAggTaxa.split(',').forEach(ddbid => {
  //   const captionFile = `${captionRoot}${ddbid.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
  //   pCaptions.push(d3.csv(captionFile))
  // })
  // Promise.allSettled(pCaptions).then(captions => {
  //   console.log(captions)
  //   const aggTaxa = captions.map(c => c.value[0].formattedName).join(', ')
  //   const html = `(Trend for aggregate taxon <i>${currentTaxon[termType + 'TrendAggName'].replace('agg.', '</i>agg.<i>' )}</i>) ${aggTaxa}`
  //   $ctl.html(html)
  // })

  $ctl.html('')
  const $span1 = $('<span>').appendTo($ctl)
  $span1.html(`(Trend for aggregate taxon ${enrichName(currentTaxon[termType + 'TrendAggName'])}`)

  console.log(currentTaxon.trendAggTaxaNames, currentTaxon.trendAggTaxa)
  let aggTaxa = currentTaxon.trendAggTaxaNames.split(',').map((t,i) => {
    return enrichName(t, currentTaxon.trendAggTaxa.split(',')[i])
  }).join(', ')
  // Replace last comma with 'and'
  const lastIndex = aggTaxa.lastIndexOf(', ')
  aggTaxa = `${aggTaxa.substring(0, lastIndex)} and ${aggTaxa.substring(lastIndex + 1)}`

  const $span2 = $('<span>').appendTo($ctl)
  $span2.css('display', 'none')
  $span2.html(` - comprises ${aggTaxa}`)

  const $span3 = $('<span>').appendTo($ctl)
  $span3.css('cursor', 'pointer')
  $span3.data('data-val', 'hide')
  $span3.html(' - <b>[show more]</b>)')
  $span3.on('click', function() {
    if ($(this).data('data-val') === 'hide') {
      $(this).data('data-val', 'show') 
      $(this).html(' - <b>[show less]</b>)') 
      $span2.show()
    } else {
      $(this).data('data-val', 'hide')
      $(this).html(' - <b>[show more]</b>)') 
      $span2.hide()
    }
  })
  
  function enrichName(name, ddbid) {

    // Remove italics (use reversed italics tab) from some strinbs
    let ret = `<i>${name}</i>`
    const noItalics = ['agg.', 's.s.', 's.l.', 'subsp.', '=']
    noItalics.forEach(ni => {
      ret = ret.replace(ni, `</i>${ni}<i>`)
    })
    // Replace x with ×
    ret = ret.replace(/ x /g, ' × ')
    if (ddbid) {
      ret = `<a href="/atlas/${ddbid}">${ret}</a>`
    }
    return ret
  }
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
      caption: 'Long-term trend (post-1930)',
      val: 'long'
    },
    {
      caption: 'Short-term trend (post-1987)',
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

function scalingSelector($parent) {

  const scales = [
    {
      caption: 'Scale trends to species',
      val: 'within'
    },
    {
      caption: 'Scale trends across species',
      val: 'across'
    },
  ]

  // Scale (y axis) selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  $sel.addClass('atlas-trends-scale-control')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {

    scaleType = $(this).val()
    setCookie('trend-scale', scaleType, 30)

    changeTrends()
  })

  scales.forEach(function(b){
    const $opt = b.selected  ? $('<option>') : $('<option>')
    $opt.attr('value', b.val)
    $opt.html(b.caption).appendTo($sel)
  })
 
  $sel.val(scaleType)

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}

function scalingSelector2($parent) {

  const scales = [
    {
      caption: 'Scale density plot to max',
      val: 'max'
    },
    {
      caption: 'Scale density plot to area',
      val: 'area'
    },
  ]

  // Scale (y axis) selector
  const $sel = $('<select>').appendTo($parent)
  $sel.addClass('selectpicker')
  $sel.addClass('atlas-trends-density-scale-control')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {

    scaleTypeDensity = $(this).val()
    setCookie('trend-scale-density', scaleTypeDensity, 30)

    changeTrends()
  })

  scales.forEach(function(b){
    const $opt = b.selected  ? $('<option>') : $('<option>')
    $opt.attr('value', b.val)
    $opt.html(b.caption).appendTo($sel)
  })
 
  $sel.val(scaleTypeDensity)

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}