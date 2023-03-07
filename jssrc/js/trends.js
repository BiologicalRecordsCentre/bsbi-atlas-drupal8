import * as d3 from 'd3'
import { setCookie, getCookie, addSvgAccessibility } from './utils'
import * as stats from 'stats-lite'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

let gam, linmod, bar, density
let $gamNoData, $linmodNoData, $barNoData, $densityNoData
import { pcache } from './gen'
//import { scaleDivergingLog } from 'd3'

let regionType = getCookie('trend-region') ? getCookie('trend-region') : 'Britain'
let termType = getCookie('trend-term') ? getCookie('trend-term') : 'long'
let scaleType = getCookie('trend-scale') ? getCookie('trend-scale') : 'within'
let scaleTypeDensity = getCookie('trend-scale-density') ? getCookie('trend-scale-density') : 'max'
let currentTaxon

export function createTrends(sel) {

  $('<div class="sect-subhead" id="bsbiTrendsTitle">').appendTo($(sel)).text('')
  $('<p id="bsbiTrendsAggNote">').appendTo($(sel)).text('')

  const $trends1 = $('<div>').appendTo($(sel))
  $trends1.attr('class', 'phenRow')
  const $trends2 = $('<div>').appendTo($(sel))
  $trends2.attr('class', 'phenRow')

  const $p1 = $('<p>').appendTo($(sel))
  $p1.html(`
  <i>Trends, “effort” adjustments and residual bias</i><br/>
  The trends above are ultimately based on the FREquency SCAling LOcal (“Frescalo”) approach of Hill (2012). 
  The method was designed to adjust for locally variable recording effort across time periods, and has been 
  used on many distribution datasets. Here, we apply Frescalo to vascular plant data gridded at the 10 km 
  scale across the following time periods: 1930–69; 1987–99; 2000–09; and 2010–19. These are a subset of 
  the “date-classes” used by the BSBI to organise their data, and roughly designate multi-year periods within 
  which specific national recording projects occurred. Readers should keep in mind that Frescalo only adjusts 
  for variable overall recording effort between times and places, and not for systematic biases in the relative 
  attention paid to species. There is a strong argument for creating formal “risk-of-bias” assessments for 
  every modelled trend presented here; unfortunately we have not had the resources to achieve this fully to 
  date, although it remains a longer-term aim. See Chapters 6 and 7 of Stroh <i>et al.</i> (2023) and the references 
  below for more information.
  `)
  const $p2 = $('<p>').appendTo($(sel))
  $p2.html(`
  <i>Figure 1. Smoothed time trend.</i><br/>
  The filled white circles and black bars are the Frescalo-estimated means and standard deviations of a 
  species’ relative frequency in each time period, plotted at the median of the relevant BSBI date-class. 
  The smoothed trend is estimated by fitting 100 generalised additive models to data resampled from the 
  Frescalo means and standard deviations; the blue line is the median of these model fits, whist the grey 
  ribbon is its 90% uncertainty interval.
  `)

  const $p3 = $('<p>').appendTo($(sel))
  $p3.html(`
  <i>Figure 2. 100 compatible linear trends.</i><br/>
  The filled white circles and black bars are as for Figure 1. The transparent blue lines represent a random 
  selection of 100 trends that are compatible with these estimates (technically a “line ensemble”). 
  See Pescott <i>et al.</i> (2022) and Stroh <i>et al.</i> (2023) for more information.
  `)

  const $p4 = $('<p>').appendTo($(sel))
  $p4.html(`
  <i>Figure 3. Distribution of linear slope estimates.</i><br/>
  The solid blue line is the distribution of the 100 slope estimates from Figure 2 (the solid grey line is the 
  density across all species for comparison). The broken vertical grey lines represent the classes erected 
  by us for summarising this linear trend information and its uncertainty.
  `)

  const $p5 = $('<p>').appendTo($(sel))
  $p5.html(`
  <i>Figure 4. Classification of slope estimates.</i><br/>
  This bar chart is a simple count of how many of the 100 trend line slopes (Figs 2 and 3) fall into the five 
  size classes illustrated in Figure 3. This method of summarising variation in species’ estimated linear 
  trends is behind the summary “strips” presented on the Summary tab. These are also used for the species’ 
  accounts in Stroh <i>et al.</i> (2023).
  `)

  const $refHead = $('<p>').appendTo($(sel))
  $refHead.css('margin-bottom', '0')
  $refHead.html(`<i>Further information</i>`)
  
  let $ref 
  $ref = $('<p>').appendTo($(sel))
  $ref.addClass('bsbi-text-ref')
  $ref.html(`
  Boyd, R.J., Powney, G.D., Burns, F., Danet, A., Duchenne, F., Grainger, M.J., Jarvis, S.G., Martin, G., Nilsen, E.B., 
  Porcher, E., Stewart, G.B., Wilson, O.J. and Pescott, O.L. 2022. ROBITT: A tool for assessing the risk-of-bias in 
  studies of temporal trends in ecology. <i>Methods in Ecology and Evolution</i> 13, 1497-1507. 
  <a target= "_blank" href="https://doi.org/10.1111/2041-210X.13857">https://doi.org/10.1111/2041-210X.13857</a>
  `)
  $ref = $('<p>').appendTo($(sel))
  $ref.addClass('bsbi-text-ref')
  $ref.html(`
  Hill, M.O. 2012. Local frequency as a key to interpreting species occurrence data when recording effort is not known. 
  <i>Methods in Ecology and Evolution</i> 3, 195–205. 
  <a target= "_blank" href="https://doi.org/10.1111/j.2041-210X.2011.00146.x">https://doi.org/10.1111/j.2041-210X.2011.00146.x</a>
  `)
  $ref = $('<p>').appendTo($(sel))
  $ref.addClass('bsbi-text-ref')
  $ref.html(`
  Pescott, O.L., Humphrey, T.A., Stroh, P.A. and Walker, K.J. 2019. Temporal changes in distributions and the species 
  atlas: How can British and Irish plant data shoulder the inferential burden? <i>British & Irish Botany</i> 1, 250–282. 
  <a target= "_blank" href="https://doi.org/10.33928/bib.2019.01.250">https://doi.org/10.33928/bib.2019.01.250</a>
  `)
  $ref = $('<p>').appendTo($(sel))
  $ref.addClass('bsbi-text-ref')
  $ref.html(`
  Pescott, O.L., Stroh, P.A., Humphrey, T.A. and Walker, K.J. 2022. Simple methods for improving the communication 
  of uncertainty in species’ temporal trends. <i>Ecological Indicators</i>, 141, 109117. 
  <a target= "_blank" href="https://doi.org/10.1016/j.ecolind.2022.109117">https://doi.org/10.1016/j.ecolind.2022.109117</a>
  `)
  $ref = $('<p>').appendTo($(sel))
  $ref.addClass('bsbi-text-ref')
  $ref.html(`
  Preston, C.D., Pearman, D.A., Dines, T.D. (Eds.) 2002. <i>New Atlas of the British and Irish Flora</i>. Oxford University 
  Press, Oxford, England.
  `)
  $ref = $('<p>').appendTo($(sel))
  $ref.addClass('bsbi-text-ref')
  $ref.html(`
  Stroh, P.A., Walker, K.J., Humphrey, T.A., Pescott, O.L. and Burkmar, R.J. (eds). 2023. <i>Plant Atlas 2020. 
  Mapping changes in the distribution of the British and Irish flora.</i> 2 volumes. Botanical Society of Britain 
  and Ireland, Durham & Princeton University Press, Princeton.
  `)

  const $gam = $('<div>').appendTo($trends1)
  $gam.attr('id', 'bsbi-gam-chart')
    .attr('class', 'phenColumn')
    .css('max-width', '400px')
    .css('position', 'relative')
    .text('Figure 1. Smoothed time trend.')

  gam = brccharts.yearly({
    selector: '#bsbi-gam-chart',
    width: 350,
    height: 250,
    margin: {left: 50, right: 0, top: 5, bottom: 55},
    expand: true,
    perRow: 1,
    taxa: ['dummy'], // A value is needed here even for blank charts
    yAxisOpts: {numFormat: '.2f', minMax: null, fixedMin: null},
    axisRight: 'on',
    axisTop: 'on',
    metrics: [],
    showLegend: false,
    showTaxonLabel: false,
    showCounts: 'line',
    axisLeftLabel: 'Relative frequency',
    axisLabelFontSize: 12,
    xPadPercent: 0.03,
    yPadPercent: 0.03,
    minYearTrans: 1940,
    maxYearTrans: 2030,
    minYear: 1949,
    maxYear: 2019
  })
  
  $gamNoData = $('<div>').appendTo($gam)
  $gamNoData.text('No trend available for this combination')
    .css('position', 'absolute')
    .css('margin', '3em')
    .css('top', '5px')
    .css('left', '50px')
    .css('display', 'none')

  const $linmod = $('<div>').appendTo($trends1)
  $linmod.attr('id', 'bsbi-linmod-chart')
    .attr('class', 'phenColumn')
    .css('max-width', '400px')
    .css('position', 'relative')
    .text('Figure 2. 100 compatible linear trends.')
    
  linmod = brccharts.yearly({
    selector: '#bsbi-linmod-chart',
    width: 350,
    height: 250,
    margin: {left: 50, right: 0, top: 5, bottom: 55},
    expand: true,
    perRow: 1,
    taxa: ['dummy'], // A value is needed here even for blank charts
    yAxisOpts: {numFormat: '.2f', minMax: null, fixedMin: null},
    axisRight: 'on',
    axisTop: 'on',
    metrics: [],
    showLegend: false,
    showTaxonLabel: false,
    showCounts: 'line',
    axisLeftLabel: 'Relative frequency',
    axisLabelFontSize: 12,
    xPadPercent: 0.03,
    yPadPercent: 0.03,
    minYearTrans: 1940,
    maxYearTrans: 2030,
    minYear: 1949,
    maxYear: 2019
  })
    
  $linmodNoData = $('<div>').appendTo($linmod)
  $linmodNoData.text('No trend available for this combination')
    .css('position', 'absolute')
    .css('margin', '3em')
    .css('top', '5px')
    .css('left', '50px')
    .css('display', 'none')

  // Trend density plot
  const $density = $('<div>').appendTo($trends2)
  $density.attr('id', 'bsbi-density-chart')
    .attr('class', 'phenColumn')
    .css('max-width', '400px')
    .css('position', 'relative')
    .text('Figure 3. Distribution of linear slope estimates.')
    
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
    .text('Figure 4. Classification of slope estimates.')
    
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

    // Set boolean to indicate whether or not tren has been explicitly excluded in file
    const regionAbrv = {Britain: 'br', England: 'en', Scotland: 'sc', Wales: 'wa', Ireland: 'ir', Republic: 'ri', Northern: 'ni'}
    const explicitExlusion = trendExclusion(currentTaxon.trendExclude, regionAbrv[regionType], termType)

    let gamData, linmodData, barData, densityData

    if (d[0].status === 'fulfilled' && !dataDeficient && !explicitExlusion) {

      // Set the aggregate taxon note if necessary
      if (currentTaxon[`${termType}TrendAgg`]) {
        setTrendsAggHtml(currentTaxon, termType, $('#bsbiTrendsAggNote'))
      } else {
        $('#bsbiTrendsAggNote').html('')
      }
      
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
      $('#bsbiTrendsAggNote').html('')
      gamData = []
      $gamNoData.show()
    }
    if (d[1].status === 'fulfilled' && !dataDeficient  && !explicitExlusion) {
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
    const meanLinmodData = d[4].status === 'fulfilled' && !dataDeficient  && !explicitExlusion ? d[4].value : []
    if (densityData.length) {
      densityData.push(meanLinmodData)
    }
    const linmodCentiles = d[5].status === 'fulfilled' && !dataDeficient  && !explicitExlusion ? d[5].value : []
    const means = d[2].status === 'fulfilled' && !dataDeficient  && !explicitExlusion ? d[2].value : []
    // Reverse the order of means to make for smooth transitions between
    // short and long term trends
    means.reverse()

    // Update bar chart
    if (d[3].status === 'fulfilled' && !dataDeficient  && !explicitExlusion) {
      barData = d[3].value[0]
      $barNoData.hide()
    } else {
      barData = []
      $barNoData.show()
    }
    bar.updateChart(barData)

    // Set the SVG accessibility
    addSvgAccessibility('bsbi-bar-chart', '>svg', 'Classification of slope estimates', `Classification of ${termType}-term slope estimates for ${currentTaxon.shortName} in ${regionTypeText}`)

    // Set y axis extents for gam and linmod
    let yMin = null
    let yMax = null
    if (scaleType === 'across') {
      yMin = -0.2
      yMax = 1
    }

    // Zero line will be plotted on gam and linmod if scaling across species
    const zeroLine = {
      taxon: currentTaxon.identifier,
      gradient: 0,
      intercept: 0,
      colour: 'rgb(201, 210, 210)',
      width: 1,
      opacity: 0.5
    }

    // Update gam chart
    gam.setChartOpts({
      metrics:  [{ 
        prop: 'value', 
        colour: 'blue', 
        opacity: gamData.length ? 1 : 0,
        lineWidth: 2,
        bandUpper: 'upper', 
        bandLower: 'lower', 
        bandFill: 'silver', 
        bandStroke: 'rgb(200,200,200)',
        bandOpacity: gamData.length ? 0.3 : 0,
        bandStrokeOpacity: gamData.length ? 1 : 0,
        bandStrokeWidth: 1,
      }],
      data: gamData.map(d => {
        const d1 = {...d}
        d1.taxon = currentTaxon.identifier
        return d1
      }),
      dataPoints: means.map(d => {
        return {
          taxon: currentTaxon.identifier,
          year: d.year,
          y: d.mean,
          upper: d.mean + d.sd,
          lower: d.mean - d.sd
        }
      }),
      dataTrendLines: scaleType === 'across' ? [zeroLine] : [],
      minYear: termType === 'long' ? 1949 : 1993,
      minCount: yMin,
      maxCount: yMax,
      taxa: [currentTaxon.identifier]
    })
    // Set the SVG accessibility
    addSvgAccessibility('bsbi-gam-chart', '>div>svg', 'Smoothed time trend', `Smoothed ${termType}-term time trend for ${currentTaxon.shortName} in ${regionTypeText}`)

    // Update linmod chart
    const yearlyTrendLines = linmodData.map(d => {
      return {
        gradient: d.gradient,
        intercept: d.intercept,
        taxon: currentTaxon.identifier,
        colour: 'blue',
        width: 2,
        opacity: 0.05
      }
    })
    if (scaleType === 'across') {
      yearlyTrendLines.push(zeroLine)
    }

    linmod.setChartOpts({
      metrics: [],
      dataPoints: means.map(d => {
        return {
          taxon: currentTaxon.identifier,
          year: d.year,
          y: d.mean,
          upper: d.mean + d.sd,
          lower: d.mean - d.sd
        }
      }),
      dataTrendLines: yearlyTrendLines,
      minYear: termType === 'long' ? 1949 : 1993,
      minCount: yMin,
      maxCount: yMax,
      taxa: [currentTaxon.identifier]
    })
    // Set the SVG accessibility
    addSvgAccessibility('bsbi-linmod-chart', '>div>svg', 'Compatible linear trends', `Compatible ${termType}-term linear trends for ${currentTaxon.shortName} in ${regionTypeText}`)

  
    // Update density chart
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

    // Set the SVG accessibility
    addSvgAccessibility('bsbi-density-chart', '>svg', 'Distribution of linear slope estimates', `Distribution of ${termType}-term linear slope estimates for ${currentTaxon.shortName} in ${regionTypeText}`)

  })

  // Hidden download function
  window.bsbi_download_trend = function(asBmp) {
    const filename = `${currentTaxon.shortName.replace(' ','-')}-${currentTaxon.identifier.replace('.','-')}-${regionType}-${termType}`
    const asSvg = !asBmp
    gam.saveImage(asSvg, `${filename}-fig1-${scaleType}`)
    linmod.saveImage(asSvg, `${filename}-fig2-${scaleType}`)
    density.saveImage(asSvg, `${filename}-fig3-${scaleTypeDensity}`)
    bar.saveImage(asSvg, `${filename}-fig4`)
  }
}

function loadData() {

  const tIdentifier = currentTaxon[`${termType}TrendAgg`] ? currentTaxon[`${termType}TrendAgg`] : currentTaxon.identifier

  const trendsRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/'
  const trendCountRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/hectad-counts'
  const pTrendCounts = d3.csv(`${trendCountRoot}/${tIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`)
  const pGam = d3.csv(`${trendsRoot}${termType}/trends-gam/${regionType}/${tIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`, function(d){
    return {
      year: Number(d.year),
      value: Number(d.x50),
      upper: Number(d.x95),
      lower: Number(d.x5)
    }
  })
  const pLinmod = d3.csv(`${trendsRoot}${termType}/trends-linmod/${regionType}/${tIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`, function(d){
    return {
      gradient: Number(d.gradient),
      intercept: Number(d.intercept)
    }
  })
  const pMeans = d3.csv(`${trendsRoot}${termType}/trends-lt-mean-sd/${regionType}/${tIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`, function(d){
    return {
      year: Number(d.year),
      mean: Number(d.mean),
      sd: Number(d.std),
    }
  })
  const pSummaries = d3.csv(`${trendsRoot}${termType}/trends-summaries/${regionType}/${tIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`, function(d){
    return [
      {value: Number(d.declineStrong), label: 'Strong decline', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'},
      {value: Number(d.declineMod), label: 'Moderate decline', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'},
      {value: Number(d.stable), label: 'Stable', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'},
      {value: Number(d.increaseMod), label: 'Moderate increase', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'},
      {value: Number(d.increaseStrong), label: 'Strong increase', stroke: 'grey', strokeWidth: 1, fill: 'rgb(230,230,230)'}
    ]
  })
  const pLinmodMeans = d3.csv(`${trendsRoot}${termType}/trends-linmod/${regionType}/mean-gradients.csv?prevent-cache=${pcache}`, function(d){
    return {
      slope: Number(d.gradient)
    }
  })
  const pLinmodCentiles = d3.csv(`${trendsRoot}${termType}/trends-linmod/centiles.csv?prevent-cache=${pcache}`, function(d){
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

  window.downloadTrends = (asSvg) => {

    let region
    if (regionType === 'Northern') {
      region = 'northern_ireland'
    } else if (regionType === 'Republic') {
      region = 'republic_of_ireland'
    } else {
      region = regionType.toLowerCase()
    }
    const taxon = currentTaxon.shortName.replace(/[^a-z0-9]/gi, '_').toLowerCase()
    const filename = `${taxon}-${region}-${termType}`
    gam.saveImage(asSvg, `${filename}-fig1`)
    linmod.saveImage(asSvg, `${filename}-fig2`)
    density.saveImage(asSvg, `${filename}-fig3`)
    bar.saveImage(asSvg, `${filename}-fig4`)
  }
}

export function setTrendsAggHtml(currentTaxon, termType, $ctl) {

  $ctl.html('')
  const $span1 = $('<span>').appendTo($ctl)
  $span1.html(`(Trend for aggregate taxon ${enrichName(currentTaxon[termType + 'TrendAggName'])}`)

  if (currentTaxon.trendAggTaxaNames) {
    let aggTaxa = currentTaxon.trendAggTaxaNames.split(',').map((t,i) => {
      return enrichName(t, currentTaxon.trendAggTaxa.split(',')[i])
    }).join(', ')
    // Replace last comma with 'and'
    const lastIndex = aggTaxa.lastIndexOf(', ')
    aggTaxa = `${aggTaxa.substring(0, lastIndex)} and ${aggTaxa.substring(lastIndex + 1)}`

    const $span2 = $('<span>').appendTo($ctl)
    $span2.addClass('trend-sum-agg-detail')
    $span2.css('display', 'none')
    $span2.html(` - comprises ${aggTaxa}`)

    const $span3 = $('<span>').appendTo($ctl)
    $span3.addClass('trend-sum-agg-showhide')
    $span3.css('cursor', 'pointer')
    $span3.data('data-val', 'hide')
    $span3.html(' - <b>[show more]</b>')
    $span3.on('click', function() {
      if ($(this).data('data-val') === 'hide') {
        $(this).data('data-val', 'show') 
        $(this).html(' - <b>[show less]</b>') 
        $span2.show()
      } else {
        $(this).data('data-val', 'hide')
        $(this).html(' - <b>[show more]</b>') 
        $span2.hide()
      }
    })
    const $span4 = $('<span>').appendTo($ctl)
    $span4.html(')')
  }
  
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

const regions=['br', 'en', 'ir', 'ni', 'ri', 'sc', 'wa']

export function encodeTrendExclusion(t) {
  // The no-trend file shows which trend charts should be excluded
  // for a given taxon. The argument passed to this function is either
  // an object representing a line from that file or false if there
  // was no line for the taxon being considered. This function returns
  // a string representing for each of the regions for which trends
  // can be displayed and each of the long/short terms, whether the
  // trend should be excluded (represented by a 1), or
  // included (if known) (represented by a 0).
  if (t) {
    let short = ''
    let long = ''
    regions.forEach(r => {
      const sl = t[r].split(',')
      if (sl.includes('l')) {
        long += '1'
      } else {
        long += '0'
      }
      if (sl.includes('s')) {
        short += '1'
      } else {
        short += '0'
      }
    })
    return `${short}${long}`
  } else {
    return '00000000000000'
  }
}

export function trendExclusion(trendExcludeAttr, country, term) {

  const regionIndex = regions.indexOf(country)
  const termIndexAdjust = term === 'short' ? 0 : 7
  const i = regionIndex + termIndexAdjust

  // console.log(trendExcludeAttr, country, term, regionIndex, termIndexAdjust) 

  return (trendExcludeAttr.substr(i, 1) === '1')
}