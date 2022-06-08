import * as d3 from 'd3'
// import lightGallery from 'lightGallery'
import { bsbiDataAccess } from './dataAccessAtlas'
import { setBaseMetaTags, addMetaTags } from './metaTags'
import { createEcology, changeEcology } from './ecology'
import { createGallery } from './gallery'
import { copyToClipboard,  getCitation } from './utils'
import { mapSetCurrentTaxon, createMaps, changeMap, createMapControls, setControlState, updateBsbiDataAccess} from './mapping'
import { develMainMapStyles } from './devel'
import { downloadPage } from './download'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef
const pcache = '26052022x7'

export function main() {

  let taxaList = []
  const currentTaxon = {
    identifier: null,
    name: null,
    shortName: null,
    tetrad: null,
    hybridMapping: false
  }
  mapSetCurrentTaxon(currentTaxon)

  $(document).ready(function () {

    addEventListener('popstate', event => { 
      //console.log('popstate', event)
      if (event.state && event.state.identifier) {
        $('.atlas-taxon-selector-sel').selectpicker('val', event.state.identifier)
      }
    })

    if(location.pathname === '/download') {
      // Download page

      downloadPage()

    } else {
      // Main atlas page

      // Set meta tags
      setBaseMetaTags()

      // Initialise main content
      mainAtlasContent()

      // Devel block
      //develChangeMapColours('#bsbi-atlas-development', changeMap)
      develMainMapStyles('#bsbi-atlas-development', changeMap)
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
        title: 'Conservation status',
        fn: sectionEmpty,
      },
      {
        group: null,
        id: 'gallery',
        title: 'Gallery',
        fn: sectionGallery,
      },
      {
        group: 'CHARACTERISTICS',
        id: 'ecology',
        title: 'Ecology',
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
      } else {
        $('.bsbi-atlas-map-controls').hide()
      }

      if (target === '#bsbi-atlas-section-ecology') {
        // Regenerate graphics (to deal with bad legend display if map hidden when created)
        changeEcologyTab()
      }

      if (target === '#bsbi-atlas-section-gallery') {
        createGallery('bsbi-gallery', currentTaxon.identifier)
      }
    })
  }

  function taxonSelectors() {

    // Overall control container
    const $container = $('<div>').appendTo($('.bsbi-atlas-taxon-selector'))
    $container.addClass('atlas-taxon-selector-div')

    // Selector
    const $sel = $('<select>').appendTo($container)
    $sel.addClass('atlas-taxon-selector-sel')

    // Copy taxon
    const $link = $('<button>').appendTo($container)
    $link.addClass('atlas-taxon-selector-link')
    $link.attr('title', 'Copy link for taxon into clipboard')
    $link.addClass('btn btn-default')
    $link.html('&#128279;')
    $link.css('padding', '6px 6px')
    $link.on('click', function() {
      if (currentTaxon.identifier) {
        copyToClipboard(location.origin + '/atlas/' + currentTaxon.identifier)
      }
    })

    d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/taxon_list.csv?prevent-cache=${pcache}`).then(function(data) {

      taxaList = data
      taxaList.forEach(function(d) {
        let name = ''
        if (d['vernacular']) {
          name = '<b>' + d['vernacular'] + '</b> '
        }
        name = name + d['formattedName']

        // name = name + '<i>' + d['taxonName'] + '</i>'
        // if (d['qualifier']) {
        //   name = name + ' <b><i>' + d['qualifier'] + '</i></b>'
        // }
        // if (d['authority']) {
        //   name = name + ' <span style="color: grey">' + d['authority'] + '</span>'
        // }

        const $opt = $('<option>')
        $opt.attr('data-content', name)
        $opt.attr('value', d['ddbid'])
        //$opt.attr('data-canonical', d['canonical'])
        $opt.attr('data-taxon-name', d['taxonName'])
        //$opt.attr('data-qualifier', d['qualifier'])
        $opt.attr('data-vernacular', d['vernacular'])

        const aParentids = d['hybridParentIds'].split(';')
        const aParents = d['hybridParents'].split(';')
        const hybridMapping = (aParents.length === 2 && aParentids.length === 2)
        $opt.attr('data-hybrid-mapping', hybridMapping)

        //$opt.attr('data-tetrad', d['tetrad'])
        //$opt.attr('data-monad', d['monad'])

        $opt.html(name).appendTo($sel)
      })

      $sel.attr('data-size', '10')
      $sel.attr('data-live-search', 'true')
      $sel.attr('data-header', 'Start typing the name of a taxon')
      $sel.attr('title', 'Select a taxon')
      $sel.selectpicker()

      $sel.on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {

        //console.log(e, clickedIndex, newValue, oldValue)
        //console.log('Identifier:', $(this).val())

        // Because more than one selector can be present on page
        // (one for mobile and one for larger devices), if this rountine
        // is reached by $sel.selectpicker() then it will be invoked more
        // once for each picker, so the comparison below ensures that
        // the code here is only executed once.
        if (currentTaxon.identifier !== $(this).val()) {

          currentTaxon.identifier = $(this).val()
          currentTaxon.name =  $(this).find(":selected").attr("data-content")
          currentTaxon.shortName = $(this).find(":selected").attr("data-taxon-name")
          currentTaxon.hybridMapping = $(this).find(":selected").attr("data-hybrid-mapping") === 'true'

          // If selection was made programatically (browser back or forward
          // button), don't add to history.
          if (clickedIndex) {
            window.history.pushState({identifier: currentTaxon.identifier}, `BSBI Atlas - ${currentTaxon.shortName}`, `/atlas/${currentTaxon.identifier}`)
          }

          mapSetCurrentTaxon(currentTaxon)
          setControlState()
          changeMap()
          changeCaption() //Also changes taxon name display in sections
          changeEcologyTab()
          createGallery('bsbi-gallery', currentTaxon.identifier)
        }
      })

      // If identifier passed in URL, set the value and add to history
      if (ds.bsbi_atlas.identifier) {
        $sel.selectpicker('val', ds.bsbi_atlas.identifier)
        window.history.pushState({identifier: ds.bsbi_atlas.identifier}, `BSBI Atlas - ${ds.bsbi_atlas.identifier}`, `/atlas/${currentTaxon.identifier}`)
      }

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

      // Get list of taxa for which no status exists
      // (for use elsewhere - might as well be done here)
      d3.csv(`${ds.bsbi_atlas.dataRoot}bsbi/no_status.csv?prevent-cache=${pcache}`).then(function(data) {
        updateBsbiDataAccess('taxaNoStatusList',  data.map(function(d) {return d['ddb id']}))
      })
    }).catch(function(){
      console.log('Error reading taxon CSV')
    })
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

    //$left.append('<h4>Atlas map point</h4>')
    $left.append('<div id="dotCaption" width="100%" style="margin-top:1em"></div>')

    $left.append('<h4>Status etc for devel</h4>')
    $left.append('<div id="statusDevel" width="100%"></div>')

    const $taxon = $('<div class="bsbi-selected-taxon-name bsbi-section-summary"></div>').appendTo($right)
    $taxon.css('font-size', '1.3em')
    $right.append('<hr/>')
    $right.append('<div id="bsbi-caption"></div>')
    
    createMaps("#bsbiMapDiv")
    createMapControls('.bsbi-atlas-map-controls')
    setControlState()
  }

  function sectionEcology(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-phenology"></div>')

    createEcology("#bsbi-phenology")
  }

  function sectionGallery(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-gallery" class="inline-gallery-container"></div>')
    const $copyright = $('<div id="bsbi-gallery-copyright"></div>').appendTo($sect)
    $copyright.text("TODO - Copyright text to acknowledge Rob Still and Chris Gibson")
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

  function changeEcologyTab() {
   
    changeEcology(ds.bsbi_atlas.dataRoot, currentTaxon.identifier)
  }

  function changeCaption() {
    let $p
    const $caption = $('#bsbi-caption')
    $caption.html('')
    const captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions/'
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
          $caption.append('<h4>Description</h4>')
          $p = $('<p>').appendTo($caption)
          $p.append(postProcessCaptionText(d[0].atlasSpeciesDescription))
        }

        // Taxa covered
        if (d[0].captionedChildTaxonIds) {
          $caption.append('<h4>Taxa covered <span id="bsbi-taxa-covered-toggle">[show]</span></h4>')
          //$p = $('<p id="bsbi-taxa-covered-toggle">').appendTo($caption)
          //$p.html('[show]')
          const $ul = $('<ul id="bsbi-taxa-covered-list">').appendTo($caption)
          const ddbids = d[0].captionedChildTaxonIds.split(';')
          ddbids.forEach(function(ddbid) {
            const $li = $('<li>').appendTo($ul)
            const taxon = taxaList.find(function(t) {return t['ddbid'] === ddbid})
            console.log('taxon', taxon)
            if (taxon) {
              //$li.html(getFormattedTaxonName(taxon['vernacular'], taxon['formattedName']))
              const $i = $('<i>').appendTo($li)
              const $a = $('<a>').appendTo($i)
              $a.attr('href', `/atlas/${ddbid}`)
              $a.attr('alt', `Link to ${taxon.taxonName}`)
              $a.text(taxon.taxonName)
            }
          })
          let taxaCoveredShown = false
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
          $caption.append('<h4>Trends</h4>')
          $p = $('<p>').appendTo($caption)
          $p.append(postProcessCaptionText(d[0].atlasSpeciesTrends))
        }

        // Biogeography
        if (d[0].atlasSpeciesBiogeography) {
          $caption.append('<h4>Biogeography</h4>')
          $p = $('<p>').appendTo($caption)
          $p.append(postProcessCaptionText(d[0].atlasSpeciesBiogeography))
        }

        // Status etc
        $('#statusDevel').html('')
        const $ulStatus = $('<ul>').appendTo($('#statusDevel'))
        const vals = ['statusGB','statusIE','statusCI','csRedListEngland','csRedListWales','csNationalStatus','csRedListIreland','csRedDataList2005','csRedDataList2021']
        vals.forEach(v => {
          const $li=$('<li>').appendTo($ulStatus)
          $li.html(`${v}: ${d[0][v]}`)
        })
        
        // Parent taxa (for hybrids)
        if (d[0].hybridParents) {

          $caption.append('<h4>Hybrid parents</h4>')
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
            const captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions/'
            const captionFile = `${captionRoot}${id.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
            const res = await fetch(captionFile,
              { method: "HEAD" }
            )
            return res.ok
          }
        }

        // Authors
        if (d[0].captionAuthors) {
          $caption.append('<h4>Authors</h4>')
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
        $caption.append('<h4>References <span id="bsbi-reference-toggle">[show]</span></h4>')
        const $divref = $('<div id="bsbi-reference-div">').appendTo($caption)
        $p = $('<p id="bsbi-reference-text">').appendTo($divref)
        $p.text('TODO - references')

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
        $caption.append('<h4>Recommended citation <span id="bsbi-citation-toggle">[show]</span></h4>')
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
        addMetaTags('title', d[0].taxonName + ' in BSBI Online Plant Atlas 2020', true)
      })
  }

  function ecoFlora(identifier) {
    alert("link to ecoflora for: " + identifier)
  }

  function worldFloraOnline(identifier) {
    alert("link to world flora online for: " + identifier)
  }
}