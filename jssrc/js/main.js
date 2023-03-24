import * as d3 from 'd3'
import { bsbiDataAccess } from './dataAccessAtlas'
import { addMetaTags } from './metaTags'
import { createEcology, changeEcology, createPhenology, changePhenology, createPhenologyControls } from './ecology'
import { createTrends, changeTrends, createTrendControls, setTrendsAggHtml, encodeTrendExclusion } from './trends'
import { createConservation, changeConservation } from './conservation'
import { createGallery } from './gallery'
import { copyToClipboard,  getCitation, setCookie, getCookie, addSvgAccessibility } from './utils'
import { mapSetCurrentTaxon, createMaps, changeMap, createMapControls, setControlState, updateBsbiDataAccess} from './mapping'
import { downloadPage } from './download'
import { updateTrendSummary2, trendSummary2, trendSave } from './trendSummary'
import { trendExclusion } from './trends'
import { pcache } from './gen'
import { TaxonPickerField, Taxon } from 'taxonpicker'
import taxa from './atlasnames.json'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

//let develSummaryTrendColour = 'rgb(0,255,255)'

export function main() {

  let taxaList = []
  const currentTaxon = {
    identifier: null,
    name: null,
    shortName: null,
    tetrad: null,
    noStatus: null,
    isHybrid: false,
    hybridMapping: false,
    longTrendAgg: null,
    shortTrendAgg: null,
    longTrendAggName: null,
    shortTrendAggName: null,
    trendAggTaxa: null,
    trendAggTaxaNames: null,
    trendExclude: false // If marked as an excluded trend (currently only used for book download)
  }
  const consKeys = ['statusGB','statusIE','statusCI','csRedListEngland','csRedListWales','csRedListIreland','csRedDataList2021','csRareScarceIr2020', 'csRareScarceGb2020','csNercS41','csWalesS7','csGBSched8','csNISched8','csIFPO']
  consKeys.forEach(k => {
    currentTaxon[k] = null
  })
  let taxonSelected // Function that will be set later
  
  mapSetCurrentTaxon(currentTaxon)

  $(document).ready(function () {

    addEventListener('popstate', event => { 
      //console.log('popstate', event.state.identifier)
      if (event.state && event.state.identifier && taxonSelected) {
        taxonSelected(event.state.identifier, true)
      }
    })

    if(location.pathname === '/download') {
      // Download page

      downloadPage()

    } else {
      // Main atlas page

      // Set meta tags
      // setBaseMetaTags() // Now done in general library

      // Initialise main content
      mainAtlasContent()

      // Devel block
      //develChangeMapColours('#bsbi-atlas-development', changeMap)
      //develMainMapStyles('#bsbi-atlas-development', changeMap)
      // develTrendSummary('#bsbi-atlas-development', (colour) => {
      //   console.log(colour)
      //   develSummaryTrendColour = colour
      //   changeCaption()
      // })
    }
  })

  function mainAtlasContent() {

    bsbiDataAccess.periodClasses = 'standard'

    const sections = [
      {
        group: null,
        id: 'summary',
        title: 'Summary',
        fn: sectionSummary,
      },
      {
        group: null,
        id: 'conservation',
        title: 'Conservation',
        fn: sectionConservation,
      },
      {
        group: null,
        id: 'gallery',
        title: 'Gallery',
        fn: sectionGallery,
      },
      {
        group: null,
        id: 'trends',
        title: 'Trends',
        fn: sectionTrends,
      },
      {
        group: 'CHARACTERISTICS',
        id: 'phenology',
        title: 'Phenology',
        fn: sectionPhenology,
      },
      {
        group: 'CHARACTERISTICS',
        id: 'ecology',
        title: 'Altitude',
        fn: sectionEcology,
      },
      {
        group: 'EXTERNAL LINKS',
        id: 'ecoflora',
        title: 'EcoFlora',
        fn: ecoFlora,
        external: true,
      },
      {
        group: 'EXTERNAL LINKS',
        id: 'worldfloraonline',
        title: 'World Flora Online',
        fn: worldFloraOnline,
        external: true,
      },
      // {
      //   group: 'BIBLIOGRAPHY',
      //   id: 'references',
      //   title: 'References',
      //   fn: sectionEmpty,
      // },
    ]

    // Taxon selection controls
    taxonSelectors()

    // Select summary (map) tab initially
    const selected = 'summary'

    // Clear current content (including dialog boxes from SVG maps)
    $('.brc-atlas-map-opts').remove()
    $('#bsbi-atlas-gui').html(null)

    // Other inits
    $('.bsbi-atlas-trend-controls').hide()
    $('.bsbi-atlas-phenology-controls').hide()

    // Make the section tabs
    const $ul = $('<ul class="nav nav-tabs"></ul>').appendTo($('#bsbi-atlas-gui'))
    sections.forEach(function(s){
      if (!s.external){
        $ul.append(makeTabButton(s.id, s.title, selected))
      }
    })

    // Create the empty content sections
    const $content = $('<div class="tab-content"></div>').appendTo($('#bsbi-atlas-gui'))
    sections.forEach(function(s){
      if (!s.external){
        $content.append(makeSection(s.id, s.title, selected))
      }
    })

    // Create the detailed section content
    sections.forEach(function(s){
      if (!s.external){
        s.fn(s.id)
      }
    })

    // Add behaviour for particular sections on display
    $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {

      const target = $(e.target).attr("href") // activated tab
      
      // Show/hide the map controls appropriately
      if (target === '#bsbi-atlas-section-summary') {
        $('.bsbi-atlas-map-controls').show()
        // Regenerate map (to deal with bad legend display if map hidden when created)
        changeMap()
        // Regenerate summary trends because they will not be correctly displayed
        // if hidden when created
        updateSummaryTrends()
      } else {
        $('.bsbi-atlas-map-controls').hide()
      }

      if (target === '#bsbi-atlas-section-phenology') {
        $('.bsbi-atlas-phenology-controls').show()
        // Regenerate graphics
        changePhenologyTab()
      } else {
        $('.bsbi-atlas-phenology-controls').hide()
      }

      if (target === '#bsbi-atlas-section-ecology') {
        // Regenerate graphics
        changeEcologyTab()
      }

      if (target === '#bsbi-atlas-section-conservation') {
        // Regenerate graphics
        changeConservationTab()
      }

      if (target === '#bsbi-atlas-section-trends') {
        $('.bsbi-atlas-trend-controls').show()
        // Regenerate graphics
        changeTrendsTab()
      } else {
        $('.bsbi-atlas-trend-controls').hide()
      }

      if (target === '#bsbi-atlas-section-gallery') {
        createGallery('bsbi-gallery', currentTaxon.identifier, currentTaxon.shortName)
      }
    })
  }

  function taxonSelectors() {

    const selectorIds = [] 
    const taxonPickers = []
    const taxaListRef = []
    const defaultDdbid = null

    $('.bsbi-atlas-taxon-selector').each(function() {
      selectorIds.push($(this).parent().attr('data-sel-id'))
    })

    $('.bsbi-atlas-taxon-selector').each(function() {

      const idString = $(this).parent().attr('data-sel-id')

      const $selFlexParent = $('<div>').appendTo($(this))
      $selFlexParent.addClass('bsbi-atlas-taxon-selector-flex-parent')

      const $container = $('<div>').appendTo($selFlexParent)
      $container.addClass('atlas-taxon-selector-div')
      $container.attr('id', `atlas-taxon-selector-div-${idString}`)

      Taxon.setTaxa(taxa) // must be called before picker initialization
      const taxonPicker = new TaxonPickerField
      const taxonPickerContainer = document.getElementById(`atlas-taxon-selector-div-${idString}`)
      taxonPicker.addField(taxonPickerContainer)
      taxonPicker.setTaxonFromId(defaultDdbid)
      taxonPickers.push(taxonPicker)

      // Copy taxon
      const $link = $('<button>').appendTo($selFlexParent)
      $link.addClass('atlas-taxon-selector-link')
      $link.attr('title', 'Copy link for taxon into clipboard')
      $link.addClass('btn btn-default')
      $link.html('&#128279;')
      $link.on('click', function() {
        if (currentTaxon.identifier) {
          copyToClipboard(location.origin + '/atlas/' + currentTaxon.identifier)
        }
      })
    })

    taxonPickers.forEach((taxonPicker, tpi) => {
      taxonPicker.addListener(TaxonPickerField.EVENT_CHANGE, () => {
        //console.log({'taxon change event': taxonPicker.value})
        const ddbid = taxonPicker.value.taxonId
        taxonSelected (ddbid)
        // Other taxon pickers need to stay in sync
        taxonPickers.forEach((otherTaxonPicker, otpi) => {
          if (tpi !== otpi) {
            otherTaxonPicker.setTaxonFromId(ddbid) // doesn't trigger selection event
          }
        })
      })
    })

    // Globally available
    taxonSelected = (ddbid, noHistory) => {

      if (ddbid) {

        const matchTaxon = taxaListRef.find(t => t.value === ddbid)
        // Save ddbid to cookie
        setCookie('ddbid', ddbid, 30)
        currentTaxon.identifier = ddbid
        currentTaxon.name = matchTaxon["content"]
        currentTaxon.formattedName = matchTaxon["formatted-name"]
        currentTaxon.shortName = matchTaxon["taxon-name"]
        currentTaxon.isHybrid = matchTaxon["is-hybrid"] === 't'
        currentTaxon.noStatus = matchTaxon["no-status"] !== ''
        currentTaxon.hybridMapping = matchTaxon["hybrid-mapping"]
        currentTaxon.longTrendAgg = matchTaxon["long-trend-agg"]
        currentTaxon.shortTrendAgg = matchTaxon["short-trend-agg"]
        currentTaxon.longTrendAggName = matchTaxon["long-trend-agg-name"]
        currentTaxon.shortTrendAggName = matchTaxon["short-trend-agg-name"]
        currentTaxon.trendAggTaxa = matchTaxon["trend-agg-taxa"]
        currentTaxon.trendAggTaxaNames = matchTaxon["trend-agg-taxa-names"]
        currentTaxon.trendExclude = matchTaxon["trend-exclude"]

        //console.log('currentTaxon', currentTaxon)

        // If selection was made by browser back or forward don't add to history.
        if (!noHistory) {
          window.history.pushState({identifier: currentTaxon.identifier}, `BSBI Atlas - ${currentTaxon.shortName}`, `/atlas/${currentTaxon.identifier}`)
        }

        mapSetCurrentTaxon(currentTaxon)
        setControlState()
        changeMap()
        changeCaption() //Also changes taxon name display in sections
        changePhenologyTab()
        changeEcologyTab()
        changeTrendsTab()
        // Don't call changeConservationTab from here because it needs
        // to be done once caption file is read. Do from changeCaption instead
        //changeConservationTab()
        createGallery('bsbi-gallery', currentTaxon.identifier, currentTaxon.shortName)
      }
    }

    const pTaxonList = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/taxon_list.csv?prevent-cache=${pcache}`)
    const pTrendAggs = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/trends/aggregateMappings.csv?prevent-cache=${pcache}`)
    const pNoTrend = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/trends/no-trend.csv?prevent-cache=${pcache}`)

    Promise.all([pTaxonList, pTrendAggs, pNoTrend]).then(function(data) {

      const trendAggs = data[1]
      const noTrend = data[2]
      taxaList = data[0]

      taxaList.forEach(function(d) {

        const taxaRef = {}
        taxaListRef.push(taxaRef)
        taxaRef.value = d.ddbid

        let name = ''
        if (d['vernacular']) {
          name = '<b>' + d['vernacular'] + '</b> '
        }
        name = name + d['formattedName']
        taxaRef['formatted-name'] = d['formattedName']
        taxaRef['content'] = name
        taxaRef['taxon-name'] = d['taxonName']
        taxaRef['vernacular'] = d['taxonName']
        taxaRef['is-hybrid'] = d['hybrid']
        taxaRef['no-status'] = d['atlasNoStatus']

        const aParentids = d['hybridParentIds'].split(';')
        const aParents = d['hybridParents'].split(';')
        //const hybridMapping = (aParents.length === 2 && aParentids.length === 2)
        //taxaRef['hybrid-mapping'] = hybridMapping
        taxaRef['hybrid-mapping'] = false
        if (aParents.length === 2 && aParentids.length === 2) {
          if (taxaList.find(t => t.ddbid === aParentids[0]) && taxaList.find(t => t.ddbid === aParentids[1]) ) {
            taxaRef['hybrid-mapping'] = true
          }
        }
        const agg = trendAggs.find(a => a['mapped.ddb.id']===d['ddbid'])
        const trendExclude = encodeTrendExclusion(noTrend.find(t => t['taxonId']===d['ddbid']))

        // if (agg) {
        //   console.log('agg', agg)
        // }

        if (agg) {
          if (agg['analysisType'] === 'long') {
            taxaRef['long-trend-agg'] = agg['agg.ddb.id']
            taxaRef['long-trend-agg-name'] = agg['agg.fullName']
          }
          if (agg['analysisType'] === 'short') {
            taxaRef['short-trend-agg'] = agg['agg.ddb.id']
            taxaRef['short-trend-agg-name'] = agg['agg.fullName']
          }
          const aggTaxa = trendAggs.filter(a => a['agg.ddb.id']===agg['agg.ddb.id']).map(a => a['mapped.ddb.id'])
          const aggTaxaNames = trendAggs.filter(a => a['agg.ddb.id']===agg['agg.ddb.id']).map(a => a['mapped.fullName'])
          taxaRef['trend-agg-taxa'] = aggTaxa.join(',')
          taxaRef['trend-agg-taxa-names'] = aggTaxaNames.join(',')
        }
        taxaRef['trend-exclude'] = trendExclude
      })
      // Get list of hybrid taxa which can be mapped with their parents
      const hybridTaxa = taxaList.filter(t => t['hybridParentIds'].split(';').length === 2).map(t => {

        const parentIds = t['hybridParentIds'].split(';')
        const parentNames = t['hybridParents'].split(';')

        return {
          taxon: t['ddbid'],
          parent1: parentIds[0],
          parent2: parentIds[1],
          //taxonName: t['canonical'],
          taxonName: t['taxonName'],
          parent1Name: parentNames[0],
          parent2Name: parentNames[1],
        }
      })
      updateBsbiDataAccess('taxaHybridList', hybridTaxa)

      // Get list of taxa for which tetrads should not be displayed
      const sensitiveTetrad = taxaList.filter(t => t['atlasSensitive'] === '1').map(t => t['ddbid'])
      updateBsbiDataAccess('sensitiveTetrad', sensitiveTetrad)

      // If identifier passed in URL, set the value and add to history
      // else get from cookie if set
      let ddbid
      if (ds.bsbi_atlas.identifier) {
        ddbid = ds.bsbi_atlas.identifier
      } else if (getCookie('ddbid')) {
        ddbid = getCookie('ddbid')
      } else {
        ddbid = defaultDdbid
      }
      if (ddbid && ddbid !== 'null') {
        //console.log('ddbid', ddbid)
        taxonSelected(ddbid)
        taxonPickers.forEach(taxonPicker => {
          taxonPicker.setTaxonFromId(ddbid)
        })
        window.history.pushState({identifier: ddbid}, `BSBI Atlas - ${ddbid}`, `/atlas/${currentTaxon.identifier}`)
      }
    })

    //##################

    // // Overall control container
    // const $container = $('<div>').appendTo($('.bsbi-atlas-taxon-selector'))
    // $container.addClass('atlas-taxon-selector-div')

    // // Selector
    // const $sel = $('<select>').appendTo($container)
    // $sel.addClass('atlas-taxon-selector-sel')

    // // Next bit is need to resize the control to give space for link button when
    // // control panel is very compressed. In this context, width seems to be a 
    // // minimum width.
    // $sel.on('rendered.bs.select', function () {
    //   $('.dropdown.bootstrap-select.atlas-taxon-selector-sel').css("width", "100px")
    // })
    // // Copy taxon
    // const $link = $('<button>').appendTo($container)
    // $link.addClass('atlas-taxon-selector-link')
    // $link.attr('title', 'Copy link for taxon into clipboard')
    // $link.addClass('btn btn-default')
    // $link.html('&#128279;')
    // $link.on('click', function() {
    //   if (currentTaxon.identifier) {
    //     copyToClipboard(location.origin + '/atlas/' + currentTaxon.identifier)
    //   }
    // })

    // const pTaxonList = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/taxon_list.csv?prevent-cache=${pcache}`)
    // const pTrendAggs = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/trends/aggregateMappings.csv?prevent-cache=${pcache}`)
    // const pNoTrend = d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/trends/no-trend.csv?prevent-cache=${pcache}`)

    // Promise.all([pTaxonList, pTrendAggs, pNoTrend]).then(function(data) {

    //   const trendAggs = data[1]
    //   const noTrend = data[2]
    //   taxaList = data[0]
    //   taxaList.forEach(function(d) {
    //     let name = ''
    //     if (d['vernacular']) {
    //       name = '<b>' + d['vernacular'] + '</b> '
    //     }
    //     name = name + d['formattedName']

    //     const $opt = $('<option>')
    //     $opt.attr('data-content', name)
    //     $opt.attr('value', d['ddbid'])
    //     //$opt.attr('data-canonical', d['canonical'])
    //     $opt.attr('data-taxon-name', d['taxonName'])
    //     //$opt.attr('data-qualifier', d['qualifier'])
    //     $opt.attr('data-vernacular', d['vernacular'])
    //     $opt.attr('data-is-hybrid', d['hybrid'])
    //     $opt.attr('data-no-status', d['atlasNoStatus'])

    //     const aParentids = d['hybridParentIds'].split(';')
    //     const aParents = d['hybridParents'].split(';')
    //     const hybridMapping = (aParents.length === 2 && aParentids.length === 2)
    //     $opt.attr('data-hybrid-mapping', hybridMapping)

    //     const agg = trendAggs.find(a => a['mapped.ddb.id']===d['ddbid'])
    //     const trendExclude = encodeTrendExclusion(noTrend.find(t => t['taxonId']===d['ddbid']))

    //     // if (agg && agg['analysisType'] === 'long') {
    //     //   $opt.attr('data-long-trend-agg', agg['agg.ddb.id'])
    //     //   $opt.attr('data-long-trend-agg-name', agg['agg.fullName'])
    //     // }
    //     // if (agg && agg['analysisType'] === 'short') {
    //     //   $opt.attr('data-short-trend-agg', agg['agg.ddb.id'])
    //     //   $opt.attr('data-short-trend-agg-name', agg['agg.fullName'])
    //     // }

    //     if (agg) {
    //       if (agg['analysisType'] === 'long') {
    //         $opt.attr('data-long-trend-agg', agg['agg.ddb.id'])
    //         $opt.attr('data-long-trend-agg-name', agg['agg.fullName'])
    //       }
    //       if (agg['analysisType'] === 'short') {
    //         $opt.attr('data-short-trend-agg', agg['agg.ddb.id'])
    //         $opt.attr('data-short-trend-agg-name', agg['agg.fullName'])
    //       }
    //       const aggTaxa = trendAggs.filter(a => a['agg.ddb.id']===agg['agg.ddb.id']).map(a => a['mapped.ddb.id'])
    //       const aggTaxaNames = trendAggs.filter(a => a['agg.ddb.id']===agg['agg.ddb.id']).map(a => a['mapped.fullName'])
    //       $opt.attr('data-trend-agg-taxa', aggTaxa.join(','))
    //       $opt.attr('data-trend-agg-taxa-names', aggTaxaNames.join(','))
    //     }
    //     $opt.attr('data-trend-exclude', trendExclude)
    //     $opt.html(name).appendTo($sel)
    //   })

    //   $sel.attr('data-size', '10')
    //   $sel.attr('data-live-search', 'true')
    //   $sel.attr('data-header', 'Start typing the name of a taxon')
    //   $sel.attr('title', 'Select a taxon')
    //   $sel.selectpicker()

    //   $sel.on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {

    //     //console.log(e, clickedIndex, newValue, oldValue)
    //     //console.log('Identifier:', $(this).val())
        
    //     // Because more than one selector can be present on page
    //     // (one for mobile and one for larger devices), if this rountine
    //     // is reached by $sel.selectpicker() then it will be invoked more
    //     // than once for each picker, so the comparison below ensures that
    //     // the code here is only executed once.
    //     if (currentTaxon.identifier !== $(this).val()) {

    //       // Save ddbid to cookie
    //       setCookie('ddbid', $(this).val(), 30)

    //       currentTaxon.identifier = $(this).val()
    //       currentTaxon.name =  $(this).find(":selected").attr("data-content")
    //       currentTaxon.shortName = $(this).find(":selected").attr("data-taxon-name")
    //       currentTaxon.isHybrid = $(this).find(":selected").attr("data-is-hybrid") === 't'
    //       currentTaxon.noStatus = $(this).find(":selected").attr("data-no-status") !== ''
    //       currentTaxon.hybridMapping = $(this).find(":selected").attr("data-hybrid-mapping") === 'true'
    //       currentTaxon.longTrendAgg = $(this).find(":selected").attr("data-long-trend-agg")
    //       currentTaxon.shortTrendAgg = $(this).find(":selected").attr("data-short-trend-agg")
    //       currentTaxon.longTrendAggName = $(this).find(":selected").attr("data-long-trend-agg-name")
    //       currentTaxon.shortTrendAggName = $(this).find(":selected").attr("data-short-trend-agg-name")
    //       currentTaxon.trendAggTaxa = $(this).find(":selected").attr("data-trend-agg-taxa")
    //       currentTaxon.trendAggTaxaNames = $(this).find(":selected").attr("data-trend-agg-taxa-names")
    //       currentTaxon.trendExclude = $(this).find(":selected").attr("data-trend-exclude")

    //       // If selection was made programatically (browser back or forward
    //       // button), don't add to history.
    //       if (clickedIndex) {
    //         window.history.pushState({identifier: currentTaxon.identifier}, `BSBI Atlas - ${currentTaxon.shortName}`, `/atlas/${currentTaxon.identifier}`)
    //       }

    //       mapSetCurrentTaxon(currentTaxon)
    //       setControlState()
    //       changeMap()
    //       changeCaption() //Also changes taxon name display in sections
    //       changePhenologyTab()
    //       changeEcologyTab()
    //       changeTrendsTab()
    //       // Don't call changeConservationTab from here because it needs
    //       // to be done once caption file is read. Do from changeCaption 
    //       // instead
    //       //changeConservationTab()
    //       createGallery('bsbi-gallery', currentTaxon.identifier, currentTaxon.shortName)
    //     }
    //   })

    //   // If identifier passed in URL, set the value and add to history
    //   // else get from cookie if set
    //   // if (ds.bsbi_atlas.identifier) {
    //   //   $sel.selectpicker('val', ds.bsbi_atlas.identifier)
    //   //   window.history.pushState({identifier: ds.bsbi_atlas.identifier}, `BSBI Atlas - ${ds.bsbi_atlas.identifier}`, `/atlas/${currentTaxon.identifier}`)
    //   // } 
    //   let ddbid
    //   if (ds.bsbi_atlas.identifier) {
    //     ddbid = ds.bsbi_atlas.identifier
    //   } else if (getCookie('ddbid')) {
    //     ddbid = getCookie('ddbid')
    //   }
    //   if (ddbid) {
    //     $sel.selectpicker('val', ddbid)
    //     window.history.pushState({identifier: ddbid}, `BSBI Atlas - ${ddbid}`, `/atlas/${currentTaxon.identifier}`)
    //   }
  
    //   // Get list of hybrid taxa which can be mapped with their parents
    //   const hybridTaxa = taxaList.filter(t => t['hybridParentIds'].split(';').length === 2).map(t => {

    //     const parentIds = t['hybridParentIds'].split(';')
    //     const parentNames = t['hybridParents'].split(';')

    //     return {
    //       taxon: t['ddbid'],
    //       parent1: parentIds[0],
    //       parent2: parentIds[1],
    //       //taxonName: t['canonical'],
    //       taxonName: t['taxonName'],
    //       parent1Name: parentNames[0],
    //       parent2Name: parentNames[1],
    //     }
    //   })
    //   updateBsbiDataAccess('taxaHybridList', hybridTaxa)
    // })
  }

  function makeTabButton(id, title, selected) {
    const $li = $('<li>')
    if (selected === id) {
      $li.addClass('active')
    }
    const $a = $('<a data-toggle="tab" href="#bsbi-atlas-section-' + id + '">').appendTo($li)
    $a.text(title)
    return $li
  }

  function makeSection(id, title, selected) {
    const $div = $('<div/>', {
      id: 'bsbi-atlas-section-' + id
    })

    $div.addClass('tab-pane')
    $div.addClass('fade')
    if (selected === id) {
      $div.addClass('in')
      $div.addClass('active')
    }
    const $h = $('<p class="bsbi-selected-taxon-name"></p>')
    $h.css('font-size', '1.3em')
    $h.css('margin-top', '0.5em')
    $h.addClass('bsbi-atlas-section-header')
    $div.append($h)

    return $div
  }

  function sectionEmpty(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    const $p1 = $('<p>').appendTo($sect)
    $p1.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    const $p2 = $('<p>').appendTo($sect)
    $p2.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  }

  function sectionSummary(id) {
    const $sect = $('#bsbi-atlas-section-' + id)

    const $d = $('<div class=".container-fluid">').appendTo($sect)
    const $r = $('<div class="row">').appendTo($d)
    const $left = $('<div class="col-sm-8">').appendTo($r)
    const $right = $('<div class="col-sm-4">').appendTo($r)
    $left.append('<div id="bsbiMapDiv" width="100%"></div>')

    $left.append('<div id="dotCaption" width="100%" style="margin-top:1em"></div>')

    const $taxon = $('<div class="bsbi-selected-taxon-name bsbi-section-summary"></div>').appendTo($right)
    $taxon.css('font-size', '1.3em')
    $right.append('<hr/>')
    $right.append('<div id="bsbi-caption"></div>')
    
    createMaps("#bsbiMapDiv")
    createMapControls('.bsbi-atlas-map-controls')
    setControlState()
  }

  function sectionConservation(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-conservation"></div>')

    createConservation("#bsbi-conservation")
  }

  function sectionTrends(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-trends"></div>')

    createTrends("#bsbi-trends")
    createTrendControls('.bsbi-atlas-trend-controls')
  }

  function sectionPhenology(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-phenology"></div>')

    createPhenology("#bsbi-phenology")
    createPhenologyControls('.bsbi-atlas-phenology-controls')
  }

  function sectionEcology(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-altitude"></div>')

    createEcology("#bsbi-altitude")
  }

  function sectionGallery(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-gallery" class="inline-gallery-container"></div>')
    const $copyright = $('<div id="bsbi-gallery-copyright"></div>').appendTo($sect)
    $copyright.text("All rights reserved, unless otherwise specified")
    $('#bsbi-gallery-copyright').hide()
  }

  function postProcessCaptionText(txt) {
    let txtn = txt
    const bsbidburl = ds.bsbi_atlas.dataBsbidb
    //txtn  = txtn.replace(/href="\/object.php/g, 'target="_blank" href="' + bsbidburl + 'object.php')
    //txtn  = txtn.replace(/href='\/object.php/g, 'target=\'_blank\' href=\'' + bsbidburl + 'object.php')

    txtn  = txtn.replace(/object.php\?entityid=/g, 'atlas/')
    txtn  = txtn.replace(/&amp;class=TaxonInstance/g, '')

    return txtn
  }

  function getFormattedTaxonName(vernacular, formatted) {
    // const vernacularHtml = vernacular ? '<span class="taxname"><b>' + vernacular + ' </b></span>' : ''
    // const scientificHtml = scientific ? '<span class="taxname"><i>' + scientific + ' </i></span>' : ''
    // const authorityHtml = authority ? '<span class="taxname"><span style="color: grey">' + authority + '</span></span>' : ''

    // return vernacularHtml+ scientificHtml + authorityHtml

    return `<b>${vernacular}</b> ${formatted}`
  }

  function changePhenologyTab() {
    changePhenology(ds.bsbi_atlas.dataRoot, currentTaxon.identifier, currentTaxon.shortName)
  }

  function changeEcologyTab() {
    changeEcology(ds.bsbi_atlas.dataRoot, currentTaxon.identifier, currentTaxon.shortName)
  }

  function changeConservationTab() {
    changeConservation(currentTaxon)
  }

  function changeTrendsTab() {
    changeTrends(currentTaxon)
  }

  function updateSummaryTrends() {

    if (!currentTaxon.identifier) return

    const trendRootLong = ds.bsbi_atlas.dataRoot + 'bsbi/trends/long/trends-summaries'
    const trendRootShort = ds.bsbi_atlas.dataRoot + 'bsbi/trends/short/trends-summaries'
    const trendCountRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/hectad-counts'

    const ltIdentifier = currentTaxon.longTrendAgg ? currentTaxon.longTrendAgg : currentTaxon.identifier
    const stIdentifier = currentTaxon.shortTrendAgg ? currentTaxon.shortTrendAgg : currentTaxon.identifier

    const trendGbLong = `${trendRootLong}/Britain/${ltIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const trendIrLong = `${trendRootLong}/Ireland/${ltIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const trendGbShort = `${trendRootShort}/Britain/${stIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const trendIrShort = `${trendRootShort}/Ireland/${stIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const trendCountsLong = `${trendCountRoot}/${ltIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    const trendCountsShort = `${trendCountRoot}/${stIdentifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    
    const $trends = $('#trend-summaries')
    $trends.html('')
    //$trends.css('font-weight', 'bold')
    $trends.css('margin-bottom', '0.5em')

    const $trendHeaderLong = $('<div>').text('Post-1930 effort-adjusted 10 km trends').appendTo($trends)
    $trendHeaderLong.css('margin-bottom', '0.2em')

    const $divLong = $('<div>').attr('class', 'grid-trend-sum').appendTo($trends)
    $('<div>').text('Britain:').appendTo($divLong)
    $('<div>').attr('id', 'trend-sum-gb-long').attr('class', 'grid-trend-sum-item').appendTo($divLong)
    $('<div>').text('Ireland:').appendTo($divLong)
    $('<div>').attr('id', 'trend-sum-ir-long').attr('class', 'grid-trend-sum-item').appendTo($divLong)
    trendSummary2('trend-sum-gb-long')
    trendSummary2('trend-sum-ir-long')

    // Set the SVG accessibility
    addSvgAccessibility('trend-sum-gb-long', '>svg', 'British long-term trend summary', `Long-term trend summary in Britain for ${currentTaxon.shortName}`)
    addSvgAccessibility('trend-sum-ir-long', '>svg', 'Irish long-term trend summary', `Long-term trend summary in Ireland for ${currentTaxon.shortName}`)

    const longExclude = trendExclusion(currentTaxon.trendExclude, 'br', 'long') && trendExclusion(currentTaxon.trendExclude, 'ir', 'long')
    if (currentTaxon.longTrendAgg && !longExclude) {
      $('<div id="trend-sum-ir-long-note" style="font-size: 0.8em">').appendTo($trends)
    }
    
    const $trendHeaderShort = $('<div>').text('Post-1987 effort-adjusted 10 km trends').appendTo($trends)
    $trendHeaderShort.css('margin', '0.4em 0 0.2em 0')

    const $divShort = $('<div>').attr('class', 'grid-trend-sum').appendTo($trends)
    $('<div>').text('Britain:').appendTo($divShort)
    $('<div>').attr('id', 'trend-sum-gb-short').attr('class', 'grid-trend-sum-item').appendTo($divShort)
    $('<div>').text('Ireland:').appendTo($divShort)
    $('<div>').attr('id', 'trend-sum-ir-short').attr('class', 'grid-trend-sum-item').appendTo($divShort)
    trendSummary2('trend-sum-gb-short')
    trendSummary2('trend-sum-ir-short')

    // Set the SVG accessibility
    addSvgAccessibility('trend-sum-gb-short', '>svg', 'British short-term trend summary', `Short-term trend summary in Britain for ${currentTaxon.shortName}`)
    addSvgAccessibility('trend-sum-ir-short', '>svg', 'Irish short-term trend summary', `Short-term trend summary in Ireland for ${currentTaxon.shortName}`)
    

    const shortExclude = trendExclusion(currentTaxon.trendExclude, 'br', 'short') && trendExclusion(currentTaxon.trendExclude, 'ir', 'short')
    if (currentTaxon.shortTrendAgg && !shortExclude) {
      $('<div id="trend-sum-ir-short-note" style="font-size: 0.8em">').appendTo($trends)
    }
    
    const pTrendGbLong = d3.csv(trendGbLong)
    const pTrendIrLong = d3.csv(trendIrLong)
    const pTrendGbShort = d3.csv(trendGbShort)
    const pTrendIrShort = d3.csv(trendIrShort)
    const pTrendCountsLong = d3.csv(trendCountsLong)
    const pTrendCountsShort = d3.csv(trendCountsShort)

    Promise.allSettled([pTrendGbLong, pTrendIrLong, pTrendGbShort, pTrendIrShort, pTrendCountsLong, pTrendCountsShort]).then(d => {
      const dTrendGbLong=d[0]
      const dTrendIrLong=d[1]
      const dTrendGbShort=d[2]
      const dTrendIrShort=d[3]
      const dTrendCountsLong=d[4]
      const dTrendCountsShort=d[5]

      if (dTrendCountsLong.status === 'fulfilled' && 
          Number(dTrendCountsLong.value[0].GbLong) >= 16 && 
          dTrendGbLong.status === 'fulfilled' && 
          !trendExclusion(currentTaxon.trendExclude, 'br', 'long')) {
        updateTrendSummary2('trend-sum-gb-long', dTrendGbLong.value[0])
        setTrendsAggHtml(currentTaxon, 'long', $('#trend-sum-ir-long-note')) // Will only update if div created above
      } else {
        updateTrendSummary2('trend-sum-gb-long', null)
      }
      if (dTrendCountsLong.status === 'fulfilled' && 
          Number(dTrendCountsLong.value[0].IrLong) >= 7 && 
          dTrendIrLong.status === 'fulfilled' && 
          !trendExclusion(currentTaxon.trendExclude, 'ir', 'long')) {
        updateTrendSummary2('trend-sum-ir-long', dTrendIrLong.value[0])
        setTrendsAggHtml(currentTaxon, 'long', $('#trend-sum-ir-long-note')) // Will only update if div created above
      } else {
        updateTrendSummary2('trend-sum-ir-long', null)
      }


      if (dTrendCountsShort.status === 'fulfilled' && 
          Number(dTrendCountsShort.value[0].GbShort) >= 16 && 
          dTrendGbShort.status === 'fulfilled' && 
          !trendExclusion(currentTaxon.trendExclude, 'br', 'short')) {
        updateTrendSummary2('trend-sum-gb-short', dTrendGbShort.value[0])
        setTrendsAggHtml(currentTaxon, 'short', $('#trend-sum-ir-short-note')) // Will only update if div created above
      } else {
        updateTrendSummary2('trend-sum-gb-short', null)
      }
      if (dTrendCountsShort.status === 'fulfilled' && 
          Number(dTrendCountsShort.value[0].IrShort) >= 7 && 
          dTrendIrShort.status === 'fulfilled' && 
          !trendExclusion(currentTaxon.trendExclude, 'ir', 'short')) {
        updateTrendSummary2('trend-sum-ir-short', dTrendIrShort.value[0])
        setTrendsAggHtml(currentTaxon, 'short', $('#trend-sum-ir-short-note')) // Will only update if div created above
      } else {
        updateTrendSummary2('trend-sum-ir-short', null)
      }
    })

    // Hidden download function
    window.bsbi_download_trendsum = function(asBmp) {
      const filename = `${currentTaxon.shortName.replace(' ','-')}-${currentTaxon.identifier.replace('.','-')}`
      const asSvg = !asBmp

      trendSave('trend-sum-gb-long', `${filename}-trend-long-gb`)
      trendSave('trend-sum-ir-long', `${filename}-trend-long-ir`)
      trendSave('trend-sum-gb-short', `${filename}-trend-short-gb`)
      trendSave('trend-sum-ir-short', `${filename}-trend-short-ir`)
    }
  }

  function changeCaption() {
    let $p
    const $caption = $('#bsbi-caption')
    $caption.html('')
    const captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions2/'
    const captionFile = `${captionRoot}${currentTaxon.identifier.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    d3.csv(captionFile)
      .then(function(d) {

        //console.log('caption file', d)
        
        // Set taxon name
        const tName = getFormattedTaxonName(d[0].vernacular, d[0].formattedName)
        $('.bsbi-selected-taxon-name').html(`${tName}`)

        // For caption, set the various sections
        // Description
        if (d[0].atlasSpeciesDescription) {
          $p = $('<p>').appendTo($caption)
          $p.append(postProcessCaptionText(d[0].atlasSpeciesDescription))
          $p = $('<p>').appendTo($caption)

          //let status = d[0].overallStatus
          //$p.append(`${status.charAt(0).toUpperCase()}${status.slice(1)}.`)
        }

        // Taxa covered
        // if (d[0].captionedChildTaxonIds) {
        //   $caption.append('<div class="sect-subhead">Taxa covered <span id="bsbi-taxa-covered-toggle">[show]</span></div>')
        //   //$p = $('<p id="bsbi-taxa-covered-toggle">').appendTo($caption)
        //   //$p.html('[show]')
        //   const $ul = $('<ul id="bsbi-taxa-covered-list">').appendTo($caption)
        //   const ddbids = d[0].captionedChildTaxonIds.split(';')
        //   ddbids.forEach(function(ddbid) {
        //     const $li = $('<li>').appendTo($ul)
        //     const taxon = taxaList.find(function(t) {return t['ddbid'] === ddbid})
        //     //console.log('taxon', taxon)
        //     if (taxon) {
        //       //$li.html(getFormattedTaxonName(taxon['vernacular'], taxon['formattedName']))
        //       const $i = $('<i>').appendTo($li)
        //       const $a = $('<a>').appendTo($i)
        //       $a.attr('href', `/atlas/${ddbid}`)
        //       $a.attr('alt', `Link to ${taxon.taxonName}`)
        //       $a.text(taxon.taxonName)
        //     }
        //   })
        //   let taxaCoveredShown = false
        //   $('#bsbi-taxa-covered-toggle').click(function() {
        //     taxaCoveredShown = !taxaCoveredShown
        //     if (taxaCoveredShown) {
        //       $('#bsbi-taxa-covered-list').show()
        //       $('#bsbi-taxa-covered-toggle').html('[hide]')
        //     }
        //     if (!taxaCoveredShown) {
        //       $('#bsbi-taxa-covered-list').hide()
        //       $('#bsbi-taxa-covered-toggle').html('[show]')
        //     }
        //   })
        // }

        // Taxa covered 
        if (d[0].captionedChildSummaries) {
          $caption.append('<div class="sect-subhead">Taxa covered <span id="bsbi-taxa-covered-toggle">[show]</span></div>')
          const $divChildSummaries = $('<div>').appendTo($caption)
          $divChildSummaries.html(d[0].captionedChildSummaries)
          let taxaCoveredShown = false

          $('#bsbi-taxa-covered-list').hide()
          $('#bsbi-taxa-covered-toggle').html('[show]')

          $('#bsbi-taxa-covered-toggle').click(function() {
            taxaCoveredShown = !taxaCoveredShown
            if (taxaCoveredShown) {
              $('#bsbi-taxa-covered-list').show()
              $('#bsbi-taxa-covered-toggle').html('[hide]')
            }
            if (!taxaCoveredShown) {
              $('#bsbi-taxa-covered-list').hide()
              $('#bsbi-taxa-covered-toggle').html('[show]')
            }
          })
        }
        
        // Trends
        if (d[0].atlasSpeciesTrends) {
          $caption.append('<div class="sect-subhead">Trends</div>')

          $('<div>').attr('id', 'trend-summaries').appendTo($caption)

          updateSummaryTrends()

          // Text
          $p = $('<p>').appendTo($caption)
          $p.append(postProcessCaptionText(d[0].atlasSpeciesTrends))
        }

        // Biogeography
        if (d[0].atlasSpeciesBiogeography) {
          $caption.append('<div class="sect-subhead">Biogeography</div>')
          $p = $('<p>').appendTo($caption)
          $p.append(postProcessCaptionText(d[0].atlasSpeciesBiogeography))
        }

        // Conservation status etc
        consKeys.forEach(k => {
          currentTaxon[k] = d[0][k]
        })
        changeConservationTab()

        // $('#statusDevel').html('')
        // const $ulStatus = $('<ul>').appendTo($('#statusDevel'))
        // consKeys.forEach(k => {
        //   const $li=$('<li>').appendTo($ulStatus)
        //   $li.html(`${k}: ${d[0][k]}`)
        // })
        
        // Parent taxa (for hybrids)
        if (d[0].hybridParents) {

          $caption.append('<div class="sect-subhead">Hybrid parents</div>')
          const $ul = $('<ul>').appendTo($caption)

          const parents = d[0].hybridParents.split(';')
          const parentIds = d[0].hybridParentIds.split(';')

          // A parent id may not exist as a taxon in the altas
          // in which case do not link to it. Check if it exists
          // by checking whether the caption file exists.
          parents.forEach(async (p,i) => {
            const pid = parentIds[i] ? parentIds[i] : ''
            const inAtlas = await captionExists(pid)
            const $li = $('<li>').appendTo($ul)
            const $i = $('<i>').appendTo($li)
            if (inAtlas) {
              const $a = $('<a>').appendTo($i)
              $a.attr('href', `/atlas/${pid}`)
              $a.attr('alt', `Link to ${p}`)
              $a.text(p)
            } else {
              $i.text(p)
            }
          })

          async function captionExists(id) {
            const captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions2/'
            const captionFile = `${captionRoot}${id.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
            const res = await fetch(captionFile,
              { method: "HEAD" }
            )
            return res.ok
          }
        }

        // Authors
        if (d[0].captionAuthors) {
          $caption.append('<div class="sect-subhead">Authors</div>')
          const $pAuthors = $('<p>').appendTo($caption)
          const aAuthors = d[0].captionAuthors.split(';')
          let tAuthors
          for (let i=0; i< aAuthors.length; i++) {
            if (i === 0) {
              tAuthors = aAuthors[i]
            } else if (i === aAuthors.length-1) {
              tAuthors = `${tAuthors} and ${aAuthors[i]}`
            } else {
              tAuthors = `${tAuthors}, ${aAuthors[i]}`
            }
          }
          $pAuthors.text(tAuthors)
        }

        // References
        $caption.append('<div class="sect-subhead">References <span id="bsbi-reference-toggle">[show]</span></div>')
        const $divref = $('<div id="bsbi-reference-div">').appendTo($caption)
        $divref.html(d[0].captionRefs)
        // The references from CSV file sometimes have a span with class doi
        // which are somehow translated to links. Add a target attribute to
        // these links to ensure that they open in a new tab.
        $divref.find('a').attr('target', '_blank')

        //console.log('a links:', $divref.find('a').length)

        let taxaReferenceShown = false
        $('#bsbi-reference-toggle').click(function() {
          taxaReferenceShown = !taxaReferenceShown
          if (taxaReferenceShown) {
            $('#bsbi-reference-div').show()
            $('#bsbi-reference-toggle').html('[hide]')
          }
          if (!taxaReferenceShown) {
            $('#bsbi-reference-div').hide()
            $('#bsbi-reference-toggle').html('[show]')
          }
        })

        // Citation
        $caption.append('<div class="sect-subhead">Recommended citation <span id="bsbi-citation-toggle">[show]</span></div>')
        const $div = $('<div id="bsbi-citation-div">').appendTo($caption)
        $p = $('<p id="bsbi-citation-text">').appendTo($div)
        $p.append(getCitation(currentTaxon))

        // $p.append('<i>' + d[0].taxonName + ',</i> ')
        // $p.append('in <i>BSBI Online Plant Atlas 2020</i>, eds P.A. Stroh, T. A. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ')
        // $p.append(location.origin + '/atlas/' + currentTaxon.identifier)
        // $p.append(' [Accessed ' + new Date().toLocaleDateString('en-GB') + ']')

        const $but1 = $('<button id="bsbi-citation-copy-text">Copy as text</button>').appendTo($div)
        $but1.addClass('btn btn-default')
        const $but2 = $('<button id="bsbi-citation-copy-html">Copy as HTML</button>').appendTo($div)
        $but2.addClass('btn btn-default')

        let taxaCitationShown = false
        $('#bsbi-citation-toggle').click(function() {
          taxaCitationShown = !taxaCitationShown
          if (taxaCitationShown) {
            $('#bsbi-citation-div').show()
            $('#bsbi-citation-toggle').html('[hide]')
          }
          if (!taxaCitationShown) {
            $('#bsbi-citation-div').hide()
            $('#bsbi-citation-toggle').html('[show]')
          }
        })

        $('#bsbi-citation-copy-text').click(function() {
          copyToClipboard($('#bsbi-citation-text').text())
        })

        $('#bsbi-citation-copy-html').click(function() {
          copyToClipboard($('#bsbi-citation-text').html())
        })

        // Update meta tags
        //const taxon = $('<p>').html(currentTaxon.formattedName).text()
        //const taxon = currentTaxon.formattedName
        const title = getCitation(currentTaxon, false, true)
        //addMetaTags('title', d[0].taxonName + ' in BSBI Online Plant Atlas 2020', true)
        addMetaTags('title', title, true)
        addMetaTags('url', location.origin + '/atlas/' + currentTaxon.identifier, true)
      })
  }

  function ecoFlora(identifier) {
    alert("link to ecoflora for: " + identifier)
  }

  function worldFloraOnline(identifier) {
    alert("link to world flora online for: " + identifier)
  }
}