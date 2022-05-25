import { createMaps, getStaticMap, changeMap, mapSetCurrentTaxon } from './mapping'
import { bsbiDataAccess } from './dataAccessAtlas'
import { apparency, phenology, altLat } from './ecology'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

const currentTaxon = {
  identifier: '',
  name: null,
  shortName: null,
  tetrad: null,
  parent1: '',
  parent2: ''
}
let phen1, phen2, altlat
let browsedFileData
let bCancelled = false

export function downloadPage() {
  taxonSelectors()
  downloadButton()

  $('<hr/>').appendTo($('#bsbi-atlas-download'))

  const $instructions = $('<p>').appendTo($('#bsbi-atlas-download'))
  $instructions.html(`
    For batch downloads, first select a CSV file from your computer
    that has two columns: <i>taxonId</i> which has the ddbid for each 
    taxon and <i>taxon</i> which specifies a taxon name. 
    The taxon name is only used to name the file and
    doesn't have to be exactly the same as 
    the name used elsewhere on the site. The ddbid will also be used 
    in the filename in case of any ambiguity.
  `)
  fileUploadButton()
  downloadBatchButton()
  cancelDownloadBatchButton()

  $('<hr/>').appendTo($('#bsbi-atlas-download'))

  makeCheckbox('map', 'Map')
  makeCheckbox('apparency', 'Apparency')
  makeCheckbox('phenology', 'Phenology')
  makeCheckbox('altlat', 'Alt/Lat')

  mapping()
  apparencyChart()
  phenologyChart()
  altlatChart()
}

function taxonToFile(taxon, id) {
  let filename = `${taxon}_${id}_`
  filename = filename.replace(/ /g, '_')
  filename = filename.replace(/\s+/g, '')
  filename = filename.replace(/\./g, '_')
  filename = filename.replace(/_+/g, '_')

  return filename
}

async function downloadTaxa() {

  const data = await d3.csv(browsedFileData)
  bCancelled = false

  for (let i=0; i<data.length; i++) {

    if (bCancelled) {
      break
    }
    // Taxon
    const t = data[i]
    const filename = taxonToFile(t.taxon, t.taxonId)

    // Map
    const p1 = mappingUpdate(t.taxonId, filename)
    const p2 = apparencyUpdate(t.taxonId, filename)
    const p3 = phenologyUpdate(t.taxonId, filename)
    const p4 = altlatUpdate(t.taxonId, filename)

    await Promise.all([p1, p2, p3, p4])
  }
}

function fileUploadButton() {

  const $file = $('<input>').appendTo($('#bsbi-atlas-download'))
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
  const $button = $('<button>').appendTo($('#bsbi-atlas-download'))
  $button.addClass('btn btn-default')
  $button.text('Download batch')
  $button.on('click', function(){
    clearCharts()
    downloadTaxa()
  })
}

function cancelDownloadBatchButton() {
  const $button = $('<button>').appendTo($('#bsbi-atlas-download'))
  $button.addClass('btn btn-default')
  $button.css('margin-left', '1em')
  $button.text('Cancel')
  $button.on('click', function(){
    bCancelled = true
  })
}

function downloadButton() {
  const $button = $('<button>').appendTo($('#bsbi-atlas-download'))
  $button.addClass('btn btn-default')
  $button.text('Download selected')

  $button.on('click', function(){
    clearCharts()
    const filename = taxonToFile(currentTaxon.shortName, currentTaxon.identifier)
    const staticMap = getStaticMap()

    if ($('#download-map').is(':checked')) 
      staticMap.saveMap(true, null, `${filename}map`)
    if ($('#download-apparency').is(':checked')) 
      phen1.saveImage(true, `${filename}apparency`)
    if ($('#download-phenology').is(':checked')) 
      phen2.saveImage(true, `${filename}phenology`)
    if ($('#download-altlat').is(':checked')) 
      altlat.saveImage(true, `${filename}altlat`)
  })
}

function makeCheckbox(id, label ) {
  const $cb = $(`<input type="checkbox" id="download-${id}" style="margin:0.5em" checked>`).appendTo($('#bsbi-atlas-download'))
  $(`<label for="download-${id}">${label}</label>`).appendTo($('#bsbi-atlas-download'))
}

function mapping() {
  $('<div id="bsbiMapDiv" style="max-width: 500px">').appendTo($('#bsbi-atlas-download'))

  createMaps("#bsbiMapDiv")
  const staticMap = getStaticMap()
  // Northern and Channel Isles inset
  staticMap.setTransform('BI4')
  // No grid lines
  staticMap.setGridLineStyle('none')
  // No boundaries
  staticMap.setCountryLineStyle('none')
  // Background
  staticMap.basemapImage('colour_elevation', false)
  // Ensure right map is selected
  // allclass is the default, so no need to change, but need to
  // update showStatus and also indicated that 4 classes are to be used
  bsbiDataAccess.periodClasses = 'print'
  bsbiDataAccess.showStatus = true
}

async function mappingUpdate(taxonId ,taxon) {

  const staticMap = getStaticMap()
  if ($('#download-map').is(':checked')) {
    currentTaxon.identifier = taxonId
    mapSetCurrentTaxon(currentTaxon)
    await changeMap()
    if (taxon) {
      await staticMap.saveMap(true, null, `${taxonToFile(taxon, taxonId)}map`)
    }
  }
  return Promise.resolve()
}

function apparencyChart() {
  const $apparency = $('<div>').appendTo($('#bsbi-atlas-download'))
  $apparency.attr('id', 'bsbi-apparency-chart').css('max-width', '400px')

  phen1 = brccharts.phen1({
    selector: '#bsbi-apparency-chart',
    data: [],
    taxa: ['taxon'],
    metrics: [{ prop: 'n', label: 'Apparency', colour: 'green', fill: '#ddffdd' }],
    width: 400,
    height: 250,
    headPad: 35,
    perRow: 1,
    expand: true,
    showTaxonLabel: false,
    axisLeft: 'off',
    showLegend: false,
    interactivity: 'none'
  })
}

async function apparencyUpdate(taxonId ,taxon) {
  if ($('#download-apparency').is(':checked')) {
    const apparencyRoot = `${ds.bsbi_atlas.dataRoot}bsbi/apparency/`
    const file = apparencyRoot + 'all/' + taxonId.replace(/\./g, "_") + '.csv'
    let data = await d3.csv(file + '?prevent-cache=').catch(() => null)
    if (!data) {
      // TEMPORARY CODE FOR TESTING so that a file always returned 
      const fileDefault = apparencyRoot + 'all/dummy.csv'
      data = await d3.csv(fileDefault + '?prevent-cache=')
    }
    await apparency(phen1, data)
    if (taxon) {
      await phen1.saveImage(true, `${taxonToFile(taxon, taxonId)}apparency`)
    } 
  }
  return Promise.resolve()
}

function phenologyChart() {
  const $phenology = $('<div>').appendTo($('#bsbi-atlas-download'))
  $phenology.attr('id', 'bsbi-phenology-chart').css('max-width', '400px')

  phen2 = brccharts.phen2({
    selector: '#bsbi-phenology-chart',
    data: [],
    taxa: ['taxon'],
    metrics: [],
    width: 400,
    height: 25,
    headPad: 35,
    chartPad: 35,
    perRow: 1,
    expand: true,
    showTaxonLabel: false,
    interactivity: 'none'
  })
}

async function phenologyUpdate(taxonId ,taxon) {
  if ($('#download-phenology').is(':checked')) {
    const phenologyRoot = ds.bsbi_atlas.dataRoot + 'bsbi/phenology/'
    const file = phenologyRoot + taxonId.replace(/\./g, "_") + '.csv'
    let data = await d3.csv(file + '?prevent-cache=').catch(() => null)
    if (!data) {
      // TEMPORARY CODE FOR TESTING so that a file always returned 
      const fileDefault = phenologyRoot + 'dummy-phenology.csv'
      data = await d3.csv(fileDefault + '?prevent-cache=')
    }
    await phenology(phen2, data, null)
    if (taxon) {
      await phen2.saveImage(true, `${taxonToFile(taxon, taxonId)}phenology`)
    }
  }
  return Promise.resolve()
}

function altlatChart() {

  const $altlat = $('<div>').appendTo($('#bsbi-atlas-download'))
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
        legend: '1-10%'
      },
      {
        min: 10.00001,
        max: 30,
        radius: 14,
        legend: '11-30%'
      },
      {
        min: 30.00001,
        max: 40,
        radius: 16,
        legend: '31-40%'
      },
      {
        min: 40.00001,
        max: 50,
        radius: 18,
        legend: '41-50%'
      },
      {
        min: 50.00001,
        max: 100,
        radius: 20,
        legend: '51-100%'
      }
    ],
    taxa: ['dummy'],
    width: 600,
    height: 300,
    perRow: 1,
    expand: true,
    margin: {left: 45, right: 10, top: 20, bottom: 35},
    showTaxonLabel: false,
    showLegend: true,
    axisLabelFontSize: 12,
    legendFontSize: 10,
    interactivity: 'toggle'
  }

  altlat = brccharts.altlat(opts)
}

async function altlatUpdate(taxonId ,taxon) {
  if ($('#download-altlat').is(':checked')) {
    const altlatRoot = ds.bsbi_atlas.dataRoot + 'bsbi/20210923/altlat/'
    const altlatfile = `${altlatRoot}${taxonId.replace(/\./g, "_")}.csv`
    const altlatdata = await d3.csv(altlatfile)
    await altLat(altlat, altlatdata)
    if (taxon) {
      await altlat.saveImage(true, `${taxonToFile(taxon, taxonId)}altlat`)
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
}

function taxonSelectors() {

  // Overall control container
  const $container = $('<div>').appendTo($('.bsbi-atlas-taxon-selector'))
  $container.addClass('atlas-taxon-selector-div')

  // Selector
  const $sel = $('<select>').appendTo($container)
  $sel.addClass('atlas-taxon-selector-sel')

  //console.log('csv', ds.bsbi_atlas.dataRoot + 'bsbi/taxon_list.csv')

  d3.csv(ds.bsbi_atlas.dataRoot + 'bsbi/taxon_list.csv').then(function(data) {
    const taxaList = data
    taxaList.forEach(function(d) {
      let name = ''
      if (d['vernacular']) {
        name = '<b>' + d['vernacular'] + '</b> '
      }
      name = name + '<i>' + d['taxon name'] + '</i>'
      if (d['qualifier']) {
        name = name + ' <b><i>' + d['qualifier'] + '</i></b>'
      }
      if (d['authority']) {
        name = name + ' <span style="color: grey">' + d['authority'] + '</span>'
      }

      const $opt = $('<option>')
      $opt.attr('data-content', name)
      $opt.attr('value', d['ddb id'])
      $opt.attr('data-canonical', d['canonical'])
      $opt.attr('data-taxon-name', d['taxon name'])
      $opt.attr('data-qualifier', d['qualifier'])
      $opt.attr('data-vernacular', d['vernacular'])

      $opt.attr('data-tetrad', d['tetrad'])
      //$opt.attr('data-monad', d['monad'])

      $opt.html(name).appendTo($sel)
    })

    $sel.attr('data-size', '10')
    $sel.attr('data-live-search', 'true')
    $sel.attr('data-header', 'Start typing the name of a taxon')
    $sel.attr('title', 'Select a taxon')
    $sel.selectpicker()
    $sel.on('changed.bs.select', function () {

      console.log('Identifier:', $(this).val())

      clearCharts()

      currentTaxon.identifier = $(this).val()
      currentTaxon.name =  $(this).find(":selected").attr("data-content")
      currentTaxon.shortName =  $(this).find(":selected").attr("data-taxon-name")

      mappingUpdate(currentTaxon.identifier)
      apparencyUpdate(currentTaxon.identifier)
      phenologyUpdate(currentTaxon.identifier)
      altlatUpdate(currentTaxon.identifier)
    })
  }).catch(function(){
    console.log('Error reading taxon CSV')
  })
}