import { createMaps, getStaticMap, changeMap, mapSetCurrentTaxon } from './mapping'
import { bsbiDataAccess } from './dataAccessAtlas'
import { apparency, phenology, altLat } from './ecology'
import { updateTrendSummary2, trendSummary2, trendSave } from './trendSummary'
import { pcache } from './utils'
import { getCookie } from './utils'
import { encodeTrendExclusion, trendExclusion } from './trends'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

const currentTaxon = {
  identifier: '',
  name: null,
  shortName: null,
}
let trendAggs, noTrend
let phen1, phen2, altlat
let gam, limod, density, bar
let browsedFileData
let bCancelled = false
let logText = ''
let aNoStatus, aIsHybrid

export function downloadPage() {

  $('#bsbi-atlas-download')
    .css('display', 'flex')
  $('<div>').appendTo($('#bsbi-atlas-download'))
    .attr('id', 'bsbi-atlas-download-left')
    .css('flex', 1)
  $('<div>').appendTo($('#bsbi-atlas-download'))
    .attr('id', 'bsbi-atlas-download-right')
    .css('flex', 1)
    .css('margin-left', '1em')

  taxonSelectors()
  downloadButton()
 
  $('<hr/>').appendTo($('#bsbi-atlas-download-left'))

  const $instructions = $('<p>').appendTo($('#bsbi-atlas-download-left'))
  $instructions.html(`
    For batch downloads, first select a CSV file from your computer
    that has two (or three) columns: <i>taxonId</i> which has the ddbid for each 
    taxon and <i>taxon</i> which specifies a taxon name. 
    The taxon name is only used to name the file and
    doesn't have to be exactly the same as 
    the name used elsewhere on the site. The ddbid will also be used 
    in the filename in case of any ambiguity. 
    If a third column - <i>staceOrder</i> - is specified, it is used at the
    start of the filename.
  `)
  fileUploadButton()
  downloadBatchButton()
  cancelDownloadBatchButton()
  downloadLogButton()
  downloadLimits()

  $('<hr/>').appendTo($('#bsbi-atlas-download-left'))

  makeCheckbox('map', 'Map')
  makeCheckbox('apparency', 'Apparency')
  makeCheckbox('phenology', 'Phenology')
  makeCheckbox('altlat', 'Alt/Lat', true)
  makeCheckbox('trend', 'Summary trends')
  makeCheckbox('trend1', 'Trend fig 1')
  // makeCheckbox('trend2', 'Trend fig 2', true)
  // makeCheckbox('trend3', 'Trend fig 3')
  // makeCheckbox('trend4', 'Trend fig 4')

  makeCheckAll()

  $('<hr/>').appendTo($('#bsbi-atlas-download-left'))

  trendOptions()

  mapping()
  apparencyChart()
  phenologyChart()
  altlatChart()
  trendIndicators()
  trendFig1Chart()
}

function trendOptions() {
  $('<p>').appendTo($('#bsbi-atlas-download-left')).text("Trend chart options:")

  const $regionSel = $('<select>').appendTo($('#bsbi-atlas-download-left'))
  $regionSel.attr('id', 'trend-chart-region')
  $('<option>').appendTo($regionSel).text('Britain').attr('value', 'Britain').attr('selected', 'selected')
  $('<option>').appendTo($regionSel).text('Ireland').attr('value', 'Ireland')
  $regionSel.selectpicker()
  $regionSel.on('changed.bs.select', function () {
    trendFig1Update(currentTaxon.identifier)
  })

  const $typeSel = $('<select>').appendTo($('#bsbi-atlas-download-left'))
  $typeSel.attr('id', 'trend-chart-type')
  $('<option>').appendTo($typeSel).text('Long').attr('value', 'long').attr('selected', 'selected')
  $('<option>').appendTo($typeSel).text('Short').attr('value', 'short')
  $typeSel.selectpicker()
  $typeSel.on('changed.bs.select', function () {
    trendFig1Update(currentTaxon.identifier)
  })

  const $scaleSel = $('<select>').appendTo($('#bsbi-atlas-download-left'))
  $scaleSel.attr('id', 'trend-chart-scale')
  $('<option>').appendTo($scaleSel).text('Scale trends to species').attr('value', 'within').attr('selected', 'selected')
  $('<option>').appendTo($scaleSel).text('Scale trends across species').attr('value', 'across')
  $scaleSel.selectpicker()
  $scaleSel.on('changed.bs.select', function () {
    trendFig1Update(currentTaxon.identifier)
  })
}

function taxonToFile(taxon, id, staceOrder) {

  let ordering
  if (staceOrder) {
    ordering = `${staceOrder}_`
  } else {
    ordering = ''
  }
  let filename = `${ordering}${taxon.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${id.replace(/[^a-z0-9]/gi, '_')}_`
  return filename
}

async function downloadTaxa() {

  const data = await d3.csv(browsedFileData)
  bCancelled = false
  logText = ''

  const iMin = $('#taxon-index-min').val()
  let iMax = $('#taxon-index-max').val()
  if (iMax > data.length) {
    iMax = data.length
    $('#taxon-index-max').val(iMax)
  }

  for (let i=iMin-1; i<iMax; i++) {

    if (bCancelled) {
      break
    }

    $('#bsbi-atlas-download-counter').text(i+1)

    // Taxon
    const t = data[i]
    const filename = taxonToFile(t.taxon, t.taxonId, t.staceOrder)

    // For reporting errors
    let eMapping, eApparency, ePhenology, eAltlat, eTrends, eTrends1

    // Ensure that status is set correctly for mapping
    const isHybrid = aIsHybrid.indexOf(t.taxonId) > -1
    const noStatus = aNoStatus.indexOf(t.taxonId) > -1
    bsbiDataAccess.showStatus = !isHybrid && !noStatus

    // Map
    const p1 = mappingUpdate(t.taxonId, filename).catch(e => eMapping = e)
    const p2 = apparencyUpdate(t.taxonId, filename).catch(e => eApparency = e)
    const p3 = phenologyUpdate(t.taxonId, filename).catch(e => ePhenology = e)
    const p4 = altlatUpdate(t.taxonId, filename).catch(e => eAltlat = e)
    const p5 = trendsUpdate(t.taxonId, t.taxon, t.staceOrder).catch(e => eTrends = e)
    const p6 = trendFig1Update(t.taxonId, filename).catch(e => eTrends1 = e)

    await Promise.all([p1, p2, p3, p4, p5, p6]).then(() => {

      if (eMapping || eApparency  || ePhenology || eAltlat || eTrends || eTrends1) {
        let html=(`<b>${i+1} ${t.taxon} (${t.taxonId})</b>`)
        logText += `\r\n\r\n${i+1} ${t.taxon} (${t.taxonId})`

        html += '<ul>'
        if (eMapping) {
          html += '<li>Map failed</li>'
          logText += '\r\nMap failed'
        }
        if (eApparency) {
          html += '<li>Apparency chart failed</li>'
          logText += '\r\nApparency chart failed'
        }
        if (ePhenology) {
          html += '<li>Phenology chart failed</li>'
          logText += '\r\nPhenology chart failed'
        }
        if (eAltlat) {
          html += '<li>Altlat chart failed</li>'
          logText += '\r\nPhenology chart failed'
        }
        if (eTrends) {
          html += '<li>Trends charts failed</li>'
          logText += '\r\nPhenology chart failed'
        }
        if (eTrends1) {
          html += '<li>Trends fig 1 charts failed</li>'
          logText += '\r\nTrends fig 1 chart failed'
        }
       
        $('<div>').appendTo($('#bsbi-atlas-download-right')).html(html)
      }
    })
  }
}

function fileUploadButton() {

  const $file = $('<input>').appendTo($('#bsbi-atlas-download-left'))
  $file.attr('type', 'file')
  $file.attr('accept', '.csv')
  $file.attr('id', 'bsbi-atlas-batch-file')
  $file.css('margin-bottom', '1em')
  $file.on('change', function(){
    fileOpened(event)
  })
}

function fileOpened(event) {
  const reader = new FileReader()
  reader.addEventListener('load', (event) => {
    browsedFileData = event.target.result
    //console.log('browsedFileData', browsedFileData)
  })
  reader.readAsDataURL(event.target.files[0])
}

function downloadBatchButton() {
  const $button = $('<button>').appendTo($('#bsbi-atlas-download-left'))
  $button.addClass('btn btn-default')
  $button.text('Download batch')
  $button.on('click', function(){
    clearCharts()
    downloadTaxa()
  })
}

function downloadLogButton() {
  const $button = $('<button>').appendTo($('#bsbi-atlas-download-left'))
  $button.addClass('btn btn-default')
  $button.css('margin-left', '1em')
  $button.text('Download problems')
  $button.on('click', function(){
    const a = document.createElement('a')
    const file = new Blob([logText], {type: 'text/plain'})
    a.href= URL.createObjectURL(file)
    a.download = 'bulk-svg-error-log.txt'
    a.click()
    URL.revokeObjectURL(a.href)
  })
}

function cancelDownloadBatchButton() {
  const $button = $('<button>').appendTo($('#bsbi-atlas-download-left'))
  $button.addClass('btn btn-default')
  $button.css('margin-left', '1em')
  $button.text('Cancel')
  $button.on('click', function(){
    bCancelled = true
  })
}

function downloadLimits() {
  const $div = $('<div>').appendTo($('#bsbi-atlas-download-left'))
  $div.css('margin-top', '0.5em')

  const $minLabel = $('<label>').appendTo($div)
  $minLabel.attr('for', 'taxon-index-min')
  $minLabel.text('Start index')
  $minLabel.css('margin-right', '0.5em')
  const $min = $('<input>').appendTo($div)
  $min.attr('type', 'number')
  $min.attr('id', 'taxon-index-min')
  $min.attr('min', '1')
  $min.attr('value', 1)
  $min.css('width', 60)

  const $maxLabel = $('<label>').appendTo($div)
  $maxLabel.attr('for', 'taxon-index-max')
  $maxLabel.text('End index')
  $maxLabel.css('margin', '0 0.5em')
  const $max = $('<input>').appendTo($div)
  $max.attr('type', 'number')
  $max.attr('id', 'taxon-index-max')
  $max.attr('min', '1')
  $max.attr('value', 100)
  $max.css('width', 60)

  const $divCount = $('<div>').appendTo($div)
  $divCount.css('display', 'inline-block')
  $divCount.css('margin-left', '1em')
  $divCount.attr('id', 'bsbi-atlas-download-counter')
}

function downloadButton() {
  const $button = $('<button>').appendTo($('#bsbi-atlas-download-left'))
  $button.addClass('btn btn-default')
  $button.text('Download selected')

  $button.on('click', function(){
    clearCharts()
    let filename
    if (currentTaxon.shortName) {
      filename = taxonToFile(currentTaxon.shortName, currentTaxon.identifier)
    } else {
      filename = 'download'
    }
    const staticMap = getStaticMap()

    if ($('#download-map').is(':checked')) 
      staticMap.saveMap(true, null, `${filename}map`)
    if ($('#download-apparency').is(':checked')) 
      phen1.saveImage(true, `${filename}apparency`)
    if ($('#download-phenology').is(':checked')) 
      phen2.saveImage(true, `${filename}phenology`)
    if ($('#download-altlat').is(':checked')) 
      altlat.saveImage(true, `${filename}altlat`)
    if ($('#download-trend').is(':checked')) {
      trendSave('bsbi-long-trend-summary-gb', `${filename}trend-long-gb`)
      trendSave('bsbi-long-trend-summary-ir', `${filename}trend-long-ir`)
      trendSave('bsbi-short-trend-summary-gb', `${filename}trend-short-gb`)
      trendSave('bsbi-short-trend-summary-ir', `${filename}trend-short-ir`)
    }
    if ($('#download-trend1').is(':checked')) {

      const termType = $('#trend-chart-type').find(":selected").val()
      const regionType = $('#trend-chart-region').find(":selected").val()
      const scaleType = $('#trend-chart-scale').find(":selected").val()
      gam.saveImage(true, `${filename}trend1-${regionType}-${termType}-${scaleType}`)
    }
  })
}

function makeCheckbox(id, label, newline ) {
  const $cb = $(`<input class="downloadCheckboxes" type="checkbox" id="download-${id}" style="margin:0.5em" checked>`).appendTo($('#bsbi-atlas-download-left'))
  $(`<label for="download-${id}">${label}</label>${newline ? '</br>' : ''}`).appendTo($('#bsbi-atlas-download-left'))
}

function makeCheckAll() {
  $("</br>").appendTo($('#bsbi-atlas-download-left'))

  let $button = $('<button>').appendTo($('#bsbi-atlas-download-left'))
  $button.addClass('btn btn-default')
  $button.text('Check all')
  $button.on('click', function(){checkUncheck(true)})

  $button = $('<button>').appendTo($('#bsbi-atlas-download-left'))
  $button.addClass('btn btn-default')
  $button.text('Uncheck all')
  $button.css('margin-left', '1em')
  $button.on('click', function(){checkUncheck(false)})

  function checkUncheck(checked) {
    $('.downloadCheckboxes').prop('checked', checked)
  }
}

function mapping() {
  $('<div id="bsbiMapDownloadDiv" style="max-width: 500px">').appendTo($('#bsbi-atlas-download-left'))

  createMaps("#bsbiMapDownloadDiv")
  const staticMap = getStaticMap()

  // Transorm, grid style and boundary style are all set when map is initialised, but
  // backdrop is not so do it here.
  const backdrop = getCookie('backdrop') ? getCookie('backdrop') : 'colour_elevation'
  const rasterRoot = ds.bsbi_atlas.dataRoot + 'rasters/'
  if (backdrop !== 'none') {
    staticMap.basemapImage(backdrop, true, rasterRoot + `${backdrop}.png`, rasterRoot + `${backdrop}.pgw`)
  }

  // Ensure right map is selected
  // allclass is the default, status is set on a per taxon basis
  // Indicated that 4 classes are to be used
  bsbiDataAccess.periodClasses = 'print'
}

async function mappingUpdate(taxonId, filename) {

  const staticMap = getStaticMap()
  if ($('#download-map').is(':checked')) {
    currentTaxon.identifier = taxonId
    mapSetCurrentTaxon(currentTaxon)
    await changeMap(true)
    if (filename) {
      await staticMap.saveMap(true, null, `${filename}map`)
    }
  }
  return Promise.resolve()
}

function apparencyChart() {
  const $apparency = $('<div>').appendTo($('#bsbi-atlas-download-left'))
  $apparency.attr('id', 'bsbi-apparency-chart').css('max-width', '400px')

  phen1 = brccharts.phen1({
    selector: '#bsbi-apparency-chart',
    data: [],
    taxa: ['taxon'],
    metrics: [{ prop: 'n', label: 'Apparency', colour: 'green', fill: '#ddffdd', strokeWidth: '1.47pt' }],
    width: 400,
    height: 250,
    headPad: 35,
    perRow: 1,
    expand: true,
    showTaxonLabel: false,
    axisLeft: 'off',
    axisBottom: 'off',
    showLegend: false,
    interactivity: 'none'
  })
}

async function apparencyUpdate(taxonId, filename) {
  if ($('#download-apparency').is(':checked')) {
    const apparencyRoot = `${ds.bsbi_atlas.dataRoot}bsbi/apparency/`
    const file = apparencyRoot + 'all/' + taxonId.replace(/\./g, "_") + '.csv'
    let data = await d3.csv(file + `?prevent-cache=${pcache}`) //.catch(() => null)
    await apparency(phen1, data)
    if (filename) {
      await phen1.saveImage(true, `${filename}apparency`)
    } 
  }
  return Promise.resolve()
}

function phenologyChart() {
  const $phenology = $('<div>').appendTo($('#bsbi-atlas-download-left'))
  $phenology.attr('id', 'bsbi-phenology-chart').css('max-width', '400px')

  phen2 = brccharts.phen2({
    selector: '#bsbi-phenology-chart',
    data: [],
    taxa: ['taxon'],
    metrics: [],
    width: 400,
    height: 25,
    split: true,
    headPad: 35,
    chartPad: 35,
    perRow: 1,
    expand: true,
    showTaxonLabel: false,
    interactivity: 'none',
    monthFontSize: '17.6pt',
    font: 'Minion Pro',
    lineWidth: '0.735pt',
    displayLegend: false
  })
}

async function phenologyUpdate(taxonId, filename) {
  if ($('#download-phenology').is(':checked')) {
    const captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions2/'
    const file = `${captionRoot}${taxonId.replace(/\./g, "_")}.csv`
    let data = await d3.csv(file + `?prevent-cache=${pcache}`) //.catch(() => null)
    await phenology(phen2, data, null)
    if (filename) {
      // Tweak the phenology bars and the ticks for book
      //d3.selectAll('#phen2-chart g.axis g.tick line').style('stroke', 'red')
      d3.selectAll('#phen2-chart g.axis g.tick line').style('transform', 'translate(0, 0.1pt)')
      d3.selectAll('#phen2-chart .phen-rect').style('transform', 'translate(0, 0.1pt)')
      await phen2.saveImage(true, `${filename}phenology`)
    }
  }
  return Promise.resolve()
}

function altlatChart() {

  const $altlat = $('<div>').appendTo($('#bsbi-atlas-download-left'))
  $altlat.attr('id', 'bsbi-altlat-chart').css('max-width', '600px')

  const opts = {
    selector: '#bsbi-altlat-chart',
    data: [],
    ranges:  [
      {
        min: 0,
        max: 0.99999,
        radius: 8,
        legend: '<1%'
      },
      {
        min: 1,
        max: 10,
        radius: 11,
        legend: '1–10%'
      },
      {
        min: 10.00001,
        max: 30,
        radius: 14,
        legend: '11–30%'
      },
      {
        min: 30.00001,
        max: 40,
        radius: 16,
        legend: '31–40%'
      },
      {
        min: 40.00001,
        max: 50,
        radius: 18,
        legend: '41–50%'
      },
      {
        min: 50.00001,
        max: 100,
        radius: 20,
        legend: '51–100%'
      }
    ],
    taxa: ['dummy'],
    width: 600,
    //width: 620,
    height: 300,
    perRow: 1,
    expand: true,
    margin: {left: 65, right: 20, top: 45, bottom: 57},
    //margin: {left: 65, right: 40, top: 45, bottom: 57},
    showTaxonLabel: false,
    showLegend: true,
    interactivity: 'none',
    axisLabelFontSize: 12,
    legendFontSize: '22pt',
    legendSpacing: 25,
    axisLabelFontSize: '22pt',
    axisTickFontSize: '22pt',
    font: 'Minion Pro',
    lineWidth: '0.972pt',
    yAxisLabelToTop: true,
    legendBaseline: 'mathematical',
    legendXoffset: 1050,
    //legendXoffset: 1030,
    legendYoffset: 1180
  }
  altlat = brccharts.altlat(opts)

  // For ad-hoc generation
  //TetradDistribution()
  // function TetradDistribution() {
    
  //   const altlatsq = [[1200,0,67],[1200,100,4],[1100,100,17],[1100,0,162],[1100,200,1],[1150,0,367],[1150,100,39],[1150,200,3],[1150,300,1],[1000,0,381],[1000,100,24],[1000,200,2],[1050,0,31],[900,0,664],[900,100,630],[900,200,408],[900,300,211],[900,400,55],[950,0,538],[950,100,200],[900,500,30],[950,200,54],[950,300,10],[900,600,6],[950,500,3],[950,400,3],[850,100,482],[850,0,1132],[800,0,783],[800,100,673],[800,300,509],[800,200,628],[850,200,300],[850,300,232],[800,400,366],[800,600,167],[800,500,263],[850,400,146],[850,500,110],[800,700,94],[850,600,32],[850,700,18],[800,800,31],[850,800,2],[800,900,9],[800,1000,6],[800,1100,1],[750,0,518],[750,100,393],[700,0,920],[750,200,373],[750,300,502],[700,100,581],[700,200,399],[750,400,429],[700,300,307],[700,400,242],[700,600,89],[750,500,305],[750,600,259],[700,500,144],[700,700,46],[750,700,153],[750,900,20],[750,800,66],[700,800,2],[700,900,1],[750,1000,4],[750,1100,1],[650,0,1262],[650,100,714],[600,0,655],[600,100,625],[650,200,471],[600,200,731],[650,300,234],[650,400,63],[600,300,502],[600,400,266],[600,500,70],[650,500,6],[600,600,13],[600,700,3],[550,0,1063],[550,100,818],[500,0,697],[550,200,632],[500,100,581],[550,300,283],[550,400,77],[550,500,25],[550,600,2],[500,200,355],[500,300,255],[500,400,220],[500,500,141],[500,600,50],[500,700,5],[450,0,1242],[450,100,600],[450,300,238],[450,200,370],[450,400,146],[400,0,1751],[450,500,58],[400,100,431],[400,200,219],[400,300,144],[400,400,31],[450,600,4],[400,500,2],[300,0,3021],[300,100,1145],[350,0,2412],[300,200,299],[300,300,223],[350,100,566],[350,200,356],[300,500,41],[350,300,252],[350,400,101],[300,400,155],[350,500,18],[350,700,3],[350,600,11],[350,800,2],[300,600,8],[200,0,2821],[200,100,1742],[200,200,531],[200,300,266],[200,400,105],[250,0,2800],[250,100,1334],[250,200,404],[250,300,292],[250,400,182],[200,500,36],[250,500,28],[250,600,2],[200,600,11],[150,0,2748],[100,0,2728],[100,100,1640],[100,200,243],[150,100,1225],[100,300,80],[100,400,19],[150,200,155],[150,300,30],[150,400,9],[0,0,402],[0,100,88],[0,200,4],[50,0,1122],[50,100,670],[50,200,183],[50,300,74],[50,400,45],[50,500,12]]
  //   const altlatsqTrans = altlatsq.map(g => {
  //     return {
  //       distance: g[0],
  //       altitude: g[1],
  //       metric: g[2],
  //       taxon: 'dummy'
  //     }
  //   })
  //   const rangesTetradDist = [
  //     {
  //       min: 1,
  //       max: 25,
  //       radius: 5,
  //       legend: '1-25'
  //     },
  //     {
  //       min: 26,
  //       max: 100,
  //       radius: 8,
  //       legend: '26-100'
  //     },
  //     {
  //       min: 101,
  //       max: 500,
  //       radius: 12,
  //       legend: '101-500'
  //     },
  //     {
  //       min: 501,
  //       max: 1000,
  //       radius: 16,
  //       legend: '501-1000'
  //     },
  //     {
  //       min: 1001,
  //       max: 1500,
  //       radius: 20,
  //       legend: '1001-1500'
  //     },
  //     {
  //       min: 1500,
  //       max: 5000,
  //       radius: 23,
  //       legend: '>1500'
  //     }
  //   ]
  //   altlat.setChartOpts({data: altlatsqTrans, ranges: rangesTetradDist})
  // }
}

async function altlatUpdate(taxonId, filename) {
  if ($('#download-altlat').is(':checked')) {
    const altlatRoot = ds.bsbi_atlas.dataRoot + 'bsbi/maps/altlat/'
    const altlatfile = `${altlatRoot}${taxonId.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const altlatdata = await d3.csv(altlatfile)
    await altLat(altlat, altlatdata)
    if (filename) {
      await altlat.saveImage(true, `${filename}altlat`)
    }
  }
  return Promise.resolve()
}

function trendFig1Chart() {
  const $trendFig1 = $('<div>').appendTo($('#bsbi-atlas-download-left'))
  $trendFig1.attr('id', 'bsbi-trendFig1-chart').css('max-width', '600px')

  gam = brccharts.yearly({
    selector: '#bsbi-trendFig1-chart',
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
}

async function trendFig1Update(taxonId, filename) {
  if ($('#download-trend1').is(':checked')) {

    const scaleType = $('#trend-chart-scale').find(":selected").val()
    const termType = $('#trend-chart-type').find(":selected").val()
    const regionType = $('#trend-chart-region').find(":selected").val()

    // Set y axis extents
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

    // Get data
    const trendsRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/'
    const pGam = d3.csv(`${trendsRoot}${termType}/trends-gam/${regionType}/${taxonId.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`, function(d){
      return {
        year: Number(d.year),
        value: Number(d.x50),
        upper: Number(d.x95),
        lower: Number(d.x5)
      }
    })
    const pMeans = d3.csv(`${trendsRoot}${termType}/trends-lt-mean-sd/${regionType}/${taxonId.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`, function(d){
      return {
        year: Number(d.year),
        mean: Number(d.mean),
        sd: Number(d.std),
      }
    })
    const data = await Promise.allSettled([pGam, pMeans])
    if (data[0].status === 'fulfilled' && data[1].status === 'fulfilled') {
    
      const gamData = data[0].value
      const means = data[1].value

      // Update gam chart
      await gam.setChartOpts({
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
          d1.taxon = taxonId
          return d1
        }),
        dataPoints: means.map(d => {
          return {
            taxon: taxonId,
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
        taxa: [taxonId]
      })

      if (filename) {
        await gam.saveImage(true, `${filename}trend1-${regionType}-${termType}-${scaleType}`)
      }
    }
  }
  return Promise.resolve()
}

function trendIndicators() {

  trendIndicator('GB', 'long')
  trendIndicator('IR', 'long')
  trendIndicator('GB', 'short')
  trendIndicator('IR', 'short')

  function trendIndicator(country, term) {
    const $msg = $('<div>').appendTo($('#bsbi-atlas-download-left'))
    $msg.attr('id', `bsbi-${term}-msg-${country.toLowerCase()}`).css('max-width', '600px')
    $msg.text(`${country} ${term}`)
    const $indicator = $('<div>').appendTo($('#bsbi-atlas-download-left'))
    $indicator.attr('id', `bsbi-${term}-trend-summary-${country.toLowerCase()}`).css('max-width', '600px')
  }
}

async function trendsUpdate(taxonId, taxon, staceOrder) {

  if ($('#download-trend').is(':checked')) {

    $('#bsbi-long-trend-summary-gb').html('')
    $('#bsbi-long-trend-summary-ir').html('')
    $('#bsbi-short-trend-summary-gb').html('')
    $('#bsbi-short-trend-summary-ir').html('')

    trendSummary2('bsbi-long-trend-summary-gb', 'Minion Pro', '14pt')
    trendSummary2('bsbi-long-trend-summary-ir', 'Minion Pro', '14pt')
    trendSummary2('bsbi-short-trend-summary-gb', 'Minion Pro', '14pt')
    trendSummary2('bsbi-short-trend-summary-ir', 'Minion Pro', '14pt')

    const agg = trendAggs.find(a => a['mapped.ddb.id']===taxonId)
    let ltIdentifier = taxonId
    let stIdentifier = taxonId
    let staceOrderWithAggLong = staceOrder
    let staceOrderWithAggShort = staceOrder
    if (agg && agg['analysisType'] === 'long') {
      ltIdentifier = agg['agg.ddb.id']
      staceOrderWithAggLong += '_trendagg'
    }
    if (agg && agg['analysisType'] === 'short') {
      stIdentifier = agg['agg.ddb.id']
      staceOrderWithAggShort += '_trendagg'
    }

    const trendRootLong = ds.bsbi_atlas.dataRoot + 'bsbi/trends/long/trends-summaries'
    const trendRootShort = ds.bsbi_atlas.dataRoot + 'bsbi/trends/short/trends-summaries'
    const trendCountRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/hectad-counts'
    const longTrendGb = `${trendRootLong}/Britain/${ltIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const longTrendIr = `${trendRootLong}/Ireland/${ltIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const shortTrendGb = `${trendRootShort}/Britain/${stIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const shortTrendIr = `${trendRootShort}/Ireland/${stIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    
    const trendCountsLong = `${trendCountRoot}/${ltIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const trendCountsShort = `${trendCountRoot}/${stIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const trendCountsOriginal = `${trendCountRoot}/${taxonId.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`

    const pTrendCountsLong = d3.csv(trendCountsLong)
    const pTrendCountsShort = d3.csv(trendCountsShort)
    const pTrendCountsOriginal = d3.csv(trendCountsOriginal)

    const pGBlong = d3.csv(longTrendGb)
    const pIRlong = d3.csv(longTrendIr)
    const pGBshort = d3.csv(shortTrendGb)
    const pIRshort = d3.csv(shortTrendIr)

    const pSave1 = updateTrend(pTrendCountsOriginal, pTrendCountsLong, pGBlong, 'GB', 'long')
    const pSave2 = updateTrend(pTrendCountsOriginal, pTrendCountsLong, pIRlong, 'IR', 'long')
    const pSave3 = updateTrend(pTrendCountsOriginal, pTrendCountsShort, pGBshort, 'GB', 'short')
    const pSave4 = updateTrend(pTrendCountsOriginal, pTrendCountsShort, pIRshort, 'IR', 'short')
  
    async function updateTrend(pTrendCountsOriginal, pTrendCount, pData, country, term) {

      const trendExcludeAttr = encodeTrendExclusion(noTrend.find(d => d.taxonId === taxonId))
      const explicitExlusion = trendExclusion(trendExcludeAttr, country === 'GB' ? 'br' : 'ir', term)
      //console.log('Exclusion for', country, term, explicitExlusion)

      const threshold = country == 'GB' ? 16 : 7
      const column = `${country[0]}${country[1].toLowerCase()}${term[0].toUpperCase()}${term.substr(1)}`
      const d = await Promise.allSettled([pTrendCount, pData, pTrendCountsOriginal])

      //if (!noTrend.find(d => d.taxonId === taxonId)) {
      if (!explicitExlusion) {
        if (d[0].status === 'fulfilled' && d[2].status === 'fulfilled') {
          if (d[1].status === 'fulfilled') {
            //if (Number(d[0].value[0][column]) >= threshold && Number(d[2].value[0][column]) > 0) {
            if (Number(d[0].value[0][column]) >= threshold) {
                updateTrendSummary2(`bsbi-${term}-trend-summary-${country.toLowerCase()}`, d[1].value[0])
              $(`#bsbi-${term}-msg-${country.toLowerCase()}`).text(`${country} ${term}`)
            // } else if (Number(d[0].value[0][column]) > 0 && Number(d[2].value[0][column]) === 0) {
            //   updateTrendSummary2(`bsbi-${term}-trend-summary-${country.toLowerCase()}`, null)
            //   $(`#bsbi-${term}-msg-${country.toLowerCase()}`).text(`${country} ${term} - agg taxa not present in country in this time period`)
            } else {
              updateTrendSummary2(`bsbi-${term}-trend-summary-${country.toLowerCase()}`, null)
              $(`#bsbi-${term}-msg-${country.toLowerCase()}`).text(`${country} ${term} - hectad threshold not met (${d[0].value[0][column]})`)
            }
          } else {
            updateTrendSummary2(`bsbi-${term}-trend-summary-${country.toLowerCase()}`, null)
            $(`#bsbi-${term}-msg-${country.toLowerCase()}`).text(`${country} ${term} - no trend file`)
          }
        } else {
          updateTrendSummary2(`bsbi-${term}-trend-summary-${country.toLowerCase()}`, null)
          $(`#bsbi-${term}-msg-${country.toLowerCase()}`).text(`${country} ${term} - trend count file absent`)
        }
      } else {
        updateTrendSummary2(`bsbi-${term}-trend-summary-${country.toLowerCase()}`, null)
        $(`#bsbi-${term}-msg-${country.toLowerCase()}`).text(`${country} ${term} - trend explicitly excluded`)
      }
    }

    await Promise.all([pSave1, pSave2, pSave3, pSave4])

    // I can't figure out why, but if I don't put a delay in here, then batch generation of only
    // trend charts from same batch file produced variable number of download files.
    function delay(milliseconds){
      return new Promise(resolve => {
          setTimeout(resolve, milliseconds)
      })
    }
    await delay(1000)

    if (taxon) {
      await trendSave('bsbi-long-trend-summary-gb', `${taxonToFile(taxon, taxonId, staceOrderWithAggLong)}trend-long-gb`)
      await trendSave('bsbi-long-trend-summary-ir', `${taxonToFile(taxon, taxonId, staceOrderWithAggLong)}trend-long-ir`)
      await trendSave('bsbi-short-trend-summary-gb', `${taxonToFile(taxon, taxonId, staceOrderWithAggShort)}trend-short-gb`)
      await trendSave('bsbi-short-trend-summary-ir', `${taxonToFile(taxon, taxonId, staceOrderWithAggShort)}trend-short-ir`)
    }
  }
  return Promise.resolve()
}

function clearCharts() {
  if (!$('#download-map').is(':checked')) {
    const staticMap = getStaticMap()
    //console.log('clear map')
    staticMap.clearMap()
  }
  if (!$('#download-apparency').is(':checked')) 
    phen1.setChartOpts({data: []})
  if (!$('#download-phenology').is(':checked')) 
    phen2.setChartOpts({data: []})
  if (!$('#download-altlat').is(':checked')) 
    altlat.setChartOpts({data: []})
  if (!$('#download-trend').is(':checked')) {
    $('#bsbi-long-trend-summary-gb').html('')
    $('#bsbi-long-trend-summary-ir').html('')
    $('#bsbi-short-trend-summary-gb').html('')
    $('#bsbi-short-trend-summary-ir').html('')
  }
}

function taxonSelectors() {

  // Overall control container
  const $container = $('<div>').appendTo($('.bsbi-atlas-taxon-selector'))
  $container.addClass('atlas-taxon-selector-div')

  // Selector
  const $sel = $('<select>').appendTo($container)
  $sel.addClass('atlas-taxon-selector-sel')

  const pTaxonList = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/taxon_list.csv?prevent-cache=${pcache}`)
  const pTrendAggs = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/trends/aggregateMappings.csv?prevent-cache=${pcache}`)
  const pNoTrend = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/trends/no-trend.csv?prevent-cache=${pcache}`)

  Promise.all([pTaxonList, pTrendAggs, pNoTrend]).then(function(data) {

    trendAggs = data[1]
    noTrend = data[2]
    const taxaList = data[0]

    taxaList.forEach(function(d) {
      let name = ''
      if (d['vernacular']) {
        name = '<b>' + d['vernacular'] + '</b> '
      }
      name = name + d['formattedName']

      const $opt = $('<option>')
      $opt.attr('data-content', name)
      $opt.attr('value', d['ddbid'])
      $opt.attr('data-taxon-name', d['taxonName'])
      //$opt.attr('data-vernacular', d['vernacular'])
      $opt.attr('data-is-hybrid', d['hybrid'])
      $opt.attr('data-no-status', d['atlasNoStatus'])

      $opt.html(name).appendTo($sel)
    })

    $sel.attr('data-size', '10')
    $sel.attr('data-live-search', 'true')
    $sel.attr('data-header', 'Start typing the name of a taxon')
    $sel.attr('title', 'Select a taxon')
    $sel.selectpicker()
    $sel.on('changed.bs.select', function () {

      //console.log('Identifier:', $(this).val())

      clearCharts()

      currentTaxon.identifier = $(this).val()
      currentTaxon.name =  $(this).find(":selected").attr("data-content")
      currentTaxon.shortName =  $(this).find(":selected").attr("data-taxon-name")
      currentTaxon.isHybrid = $(this).find(":selected").attr("data-is-hybrid") === 't'
      currentTaxon.noStatus = $(this).find(":selected").attr("data-no-status") !== ''

      // Ensure that status is set correctly for mapping
      const isHybrid = $(this).find(":selected").attr("data-is-hybrid") === 't'
      const noStatus = aNoStatus.indexOf($(this).val()) > -1
      bsbiDataAccess.showStatus = !isHybrid && !noStatus

      mappingUpdate(currentTaxon.identifier)
      apparencyUpdate(currentTaxon.identifier)
      phenologyUpdate(currentTaxon.identifier)
      altlatUpdate(currentTaxon.identifier)
      trendsUpdate(currentTaxon.identifier)
      trendFig1Update(currentTaxon.identifier)
    })

    // For batch mapping
    aIsHybrid = taxaList.filter(t => t.hybrid === 't').map(t => t.ddbid)
    aNoStatus = taxaList.filter(t => t.atlasNoStatus !== '').map(t => t.ddbid)
  })
}