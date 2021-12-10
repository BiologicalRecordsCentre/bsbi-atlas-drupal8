import * as d3 from 'd3'
// import lightGallery from 'lightGallery'
import { setBaseMetaTags, addMetaTags } from './metaTags'
import { createPhenology, changePhenology } from './phenology'
import { createGallery } from './gallery'
import { copyToClipboard } from './utils'
import { mapSetCurrentTaxon, createMaps, changeMap, createMapControls, setControlState, updateBsbiDataAccess} from './mapping'
// import { develChangeMapColours } from './devel'

const $ = jQuery

export function main() {

  let taxaList = []
  const currentTaxon = {
    identifier: null,
    name: null,
    tetrad: null,
    parent1: '',
    parent2: ''
  }
  mapSetCurrentTaxon(currentTaxon)

  $(document).ready(function () {

    // Set meta tags
    setBaseMetaTags()

    // Initialise main content
    mainAtlasContent()

    // Devel block
    // develChangeMapColours('#bsbi-atlas-development', changeMap, bsbiDataAccess)
  })

  function mainAtlasContent() {

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
      {
        group: 'BIBLIOGRAPHY',
        id: 'references',
        title: 'References',
        fn: sectionEmpty,
      },
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
        changeEcology()
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

    d3.csv(drupalSettings.bsbi_atlas.dataRoot + 'bsbi/taxon_list.csv').then(function(data) {
      taxaList = data
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
        $opt.attr('data-qualifier', d['qualifier'])
        $opt.attr('data-vernacular', d['vernacular'])

        $opt.attr('data-tetrad', d['tetrad'])
        //$opt.attr('data-monad', d['monad'])

        $opt.html(name).appendTo($sel)
      })

      $sel.attr('data-size', '10')
      $sel.attr('data-live-search', 'true')
      $sel.attr('data-header', 'Start typing the name of a taxon')
      $sel.attr('title', 'Select a taxon to display')
      $sel.selectpicker()
      //$sel.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
      $sel.on('changed.bs.select', function () {

        console.log('Identifier:', $(this).val())
        currentTaxon.identifier = $(this).val()
        currentTaxon.name =  $(this).find(":selected").attr("data-content")
        
        mapSetCurrentTaxon(currentTaxon)
        setControlState()
        changeMap()
        changeCaption() //Also changes taxon name display in sections
        changeEcology()
        createGallery('bsbi-gallery', currentTaxon.identifier)
      })

      // If identifier passed in URL, set the value
      if (drupalSettings.bsbi_atlas.identifier) {
        $sel.selectpicker('val', drupalSettings.bsbi_atlas.identifier)
      }

      // Get list of hybrid taxa which can be mapped with their parents
      // This is done after taxon list loaded so that data can be enriched
      // with names.
      d3.csv(drupalSettings.bsbi_atlas.dataRoot + 'bsbi/hybrids.csv', function(h) {

        const ddbid = h['ddb id']
        const parentDdbids = h['hybrid parent ids'].split(';')
        if (parentDdbids.length === 2) {
          const p1ddbid = parentDdbids[0]
          const p2ddbid = parentDdbids[1]

          const mTaxon = taxaList.find(function(t){return t['ddb id'] === ddbid})
          const mParent1 = taxaList.find(function(t){return t['ddb id'] === p1ddbid})
          const mParent2 = taxaList.find(function(t){return t['ddb id'] === p2ddbid})

          if (mTaxon && mParent1 && mParent2) {
            return {
              taxon: ddbid,
              parent1: p1ddbid,
              parent2: p2ddbid,
              taxonName: mTaxon['taxon name'],
              parent1Name: mParent1['taxon name'],
              parent2Name: mParent2['taxon name'],
            }
          } else {
            if (!mTaxon) console.error('Cannot find ' + ddbid + ' in taxon list')
            if (!mParent1) console.error('Cannot find ' + p1ddbid + ' in taxon list')
            if (!mParent2) console.error('Cannot find ' + p2ddbid + ' in taxon list')
            return null
          }
        } else {
          return null // Excludes from result
        }
      }).then(function(data) {
        delete data.columns
        updateBsbiDataAccess('taxaHybridList', data)
      })

      // Get list of taxa for which no status exists
      // (for use elsewhere - might as well be done here)
      d3.csv(drupalSettings.bsbi_atlas.dataRoot + 'bsbi/no_status.csv').then(function(data) {
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

    createPhenology("#bsbi-phenology")
  }

  function sectionGallery(id) {
    const $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-gallery" class="inline-gallery-container"></div>')

    //createGallery('bsbi-gallery')
  }

  function postProcessCaptionText(txt) {
    let txtn = txt
    const bsbidburl = drupalSettings.bsbi_atlas.dataBsbidb
    txtn  = txtn.replace(/href="\/object.php/g, 'target="_blank" href="' + bsbidburl + 'object.php')
    txtn  = txtn.replace(/href='\/object.php/g, 'target=\'_blank\' href=\'' + bsbidburl + 'object.php')
    return txtn
  }

  function getFormattedTaxonName(vernacular, scientific, authority) {
    const vernacularHtml = vernacular ? '<span class="taxname"><b>' + vernacular + ' </b></span>' : ''
    const scientificHtml = scientific ? '<span class="taxname"><i>' + scientific + ' </i></span>' : ''
    const authorityHtml = authority ? '<span class="taxname"><span style="color: grey">' + authority + '</span></span>' : ''

    return vernacularHtml+ scientificHtml + authorityHtml
  }

  function changeEcology() {
   
    changePhenology(drupalSettings.bsbi_atlas.dataRoot, currentTaxon.identifier)
  }

  function changeCaption() {
    let $p
    const $caption = $('#bsbi-caption')
    $caption.html('')
    const captionRoot = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/captions/'
    d3.csv(captionRoot + currentTaxon.identifier.replace(/\./g, "_") + '.csv?prevent-cache=09092021')
      .then(function(d) {
        
        // Set taxon name
        $('.bsbi-selected-taxon-name').html(getFormattedTaxonName(d[0].vernacular, d[0].taxonName, d[0].authority))

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
            const taxon = taxaList.find(function(t) {return t['ddb id'] === ddbid})
            if (taxon) {
              $li.html(getFormattedTaxonName(taxon['vernacular'], taxon['taxon name'], taxon['authority']))
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
        
        // Biogeography
        if (d[0].atlasSpeciesBiogeography) {
          $caption.append('<h4>Biogeography</h4>')
          $p = $('<p>').appendTo($caption)
          $p.append(postProcessCaptionText(d[0].atlasSpeciesBiogeography))
        }

        // Trends
        if (d[0].atlasSpeciesTrends) {
          $caption.append('<h4>Trends</h4>')
          $p = $('<p>').appendTo($caption)
          $p.append(postProcessCaptionText(d[0].atlasSpeciesTrends))
        }
        if (d[0].captionAuthors) {
          $caption.append('<h4>Authors</h4>')
          const $ul = $('<ul>').appendTo($caption)
          d[0].captionAuthors.split(';').forEach(function(a) {
            const $li = $('<li>').appendTo($ul)
            $li.text(a)
          })
        }

        // Citation
        $caption.append('<h4>Recommended citation <span id="bsbi-citation-toggle">[show]</span></h4>')
        const $div = $('<div id="bsbi-citation-div">').appendTo($caption)
        $p = $('<p id="bsbi-citation-text">').appendTo($div)
        $p.append('<i>' + d[0].taxonName + ',</i> ')
        $p.append('in <i>BSBI Online Atlas 2020</i>, eds P.A. Stroh, T. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ')
        $p.append(location.origin + '/atlas/' + currentTaxon.identifier)
        $p.append(' [Accessed ' + new Date().toLocaleDateString('en-GB') + ']')
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
        addMetaTags('title', d[0].taxonName + ' in BSBI Online Atlas 2020', true)
      })
  }

  function ecoFlora(identifier) {
    alert("link to ecoflora for: " + identifier)
  }

  function worldFloraOnline(identifier) {
    alert("link to world flora online for: " + identifier)
  }
}