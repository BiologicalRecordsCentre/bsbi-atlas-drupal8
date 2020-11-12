(function ($, Drupal, drupalSettings) {

  // Make the following a setting in the module
  bsbiatlas.setDataRoot('http://localhost/atlas-data/bsbi/atlas_taxa_2020_08_25/hectad-dateclass-status/')
  // Make the following a setting in the module
  var taxaCsv = 'http://localhost/atlas-data/bsbi/taxon_list.csv'


  var currentTaxon = {
    identifier: null,
    name: null,
  }
  var slippyMap, staticMap
  var sections = [
    {
      group: null,
      id: 'distribution',
      title: 'Distribution',
      fn: sectionDistribution,
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
      fn: sectionEmpty,
    },
    {
      group: 'CHARACTERISTICS',
      id: 'attributes',
      title: 'Attributes',
      fn: sectionEmpty,
    },
    {
      group: 'CHARACTERISTICS',
      id: 'ecology',
      title: 'Ecology',
      fn: sectionEmpty,
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
    {
      group: 'BIBLIOGRAPHY',
      id: 'acknowledgements',
      title: 'Acknowledgements',
      fn: sectionEmpty,
    },
  ]

  $(document).ready(function () {
    console.log("BSBI GUI library loaded")
    console.log(drupalSettings)

    // Page title - reflects selected taxon
    var $title = $('<div id="bsbi-taxon-title"></div>').appendTo($('#bsbi-atlas-gui'))
    $title.append('<a href="#top">')

    $title.css('font-size', '2.3em')
    $title.text("No taxon selected")
    $('#bsbi-atlas-gui').append('<hr>')

    // Initialise main content
    $('#bsbi-atlas-gui').append('<div id="main-atlas-content"></div>')
    var tabs = drupalSettings.bsbi_atlas.useTabs
    mainAtlasContent(tabs)

    // Taxon selection control
    taxonSelectors('.bsbi-atlas-taxon-selector')

    // Navigation block
    navigationBlock('#bsbi-atlas-navigation')

    // Devel block
    develBlock('#bsbi-atlas-development')
  })

  function mainAtlasContent(tabs) {
    var selected = 'distribution'

    // Clear current content
    $('.brc-atlas-map-opts').remove()
    $('#main-atlas-content').html(null)

    // Generate main content with or without tabs
    if (tabs) {
      var $ul = $('<ul class="nav nav-tabs"></ul>').appendTo($('#main-atlas-content'))
      sections.forEach(function(s){
        if (!s.external){
          $ul.append(makeTabButton(s.id, s.title, selected))
        }
      })
    }
    var $content = $('<div class="tab-content"></div>').appendTo($('#main-atlas-content'))
    sections.forEach(function(s){
      if (!s.external){
        $content.append(makeSection(s.id, s.title, tabs, selected))
      }
    })

    // Detailed section content
    sections.forEach(function(s){
      if (!s.external){
        s.fn(s.id, tabs)
      }
    })
  }

  function makeSection(id, title, tabs, selected) {
    var $div = $('<div/>', {
      id: 'bsbi-atlas-section-' + id
    })
    if (tabs) {
      $div.addClass('tab-pane')
      $div.addClass('fade')
      if (selected === id) {
        $div.addClass('in')
        $div.addClass('active')
      }
    }
    $div.append('<h2>' + title + '</h2>')
    return $div
  }

  function makeTabButton(id, title, selected) {
    var $li = $('<li>')
    if (selected === id) {
      $li.addClass('active')
    }
    var $a = $('<a data-toggle="tab" href="#bsbi-atlas-section-' + id + '">').appendTo($li)
    $a.text(title)
    return $li
  }

  function sectionEmpty(id, tabs) {
    $sect = $('#bsbi-atlas-section-' + id)
    $p = $('<p>').appendTo($sect)
    $p.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    sectionEnd($sect, tabs)
  }

  function sectionEnd($sect, tabs) {
    if (!tabs) {
      $pLink = $('<p>').appendTo($sect)
      $aLink = $('<a>').appendTo($pLink)
      //$aLink.html('&lArr;')
      $aLink.html('(Back to top)')
      $aLink.attr('href', '#top')
      $sect.append('<hr>')
    }
  }

  function sectionDistribution(id, tabs) {
    $sect = $('#bsbi-atlas-section-' + id)

    $d = $('<div class=".container-fluid">').appendTo($sect)
    $r = $('<div class="row">').appendTo($d)
    $left = $('<div class="col-sm-8">').appendTo($r)
    $right = $('<div class="col-sm-4">').appendTo($r)
    $left.append('<div id="bsbiMapDiv" width="100%"></div>')
    $right.append('<div id="mapControls"></div>')

    createMaps("#bsbiMapDiv")
    createMapControls('#mapControls')
    sectionEnd($sect, tabs)
  }

  function createMapControls(selector) {

    var $bgrp = $('<div class="btn-group" data-toggle="buttons">').appendTo($(selector))

    var $staticLabel = $('<label class="btn btn-primary active">').appendTo($bgrp)
    var $staticButton = $('<input type="radio" name="mapType" value="static" checked>').appendTo($staticLabel)
    $staticLabel.append("Static map")

    var $slippyLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
    var $slippyButton = $('<input type="radio" name="mapType" value="slippy">').appendTo($slippyLabel)
    $slippyLabel.append("Slippy map")

    $('input[type=radio][name="mapType"]').change(function() {
      if ($(this).val() === "static") {
        $('#slippyAtlasMain').hide()
        $('#staticAtlasMain').show()
      } else {
        var $svg = $('#staticAtlasMain svg')
        var w = $svg.width()
        var h = $svg.height()
        $('#staticAtlasMain').hide()
        $('#slippyAtlasMain').show()
        slippyMap.setSize(w, h)
      }
    });
  }

  function createMaps(selector) {
    // Modify standard UK opts to remove any without CI
    const transOptsSel =  JSON.parse(JSON.stringify(brcatlas.namedTransOpts))
    delete transOptsSel.BI3 // Remove the options without CI

    // Map height
    const height = 650
    // Create the static map
    staticMap = brcatlas.svgMap({
      selector: selector,
      mapid: "staticAtlasMain",
      captionId: "dotCaption",
      height: height,
      expand: true,
      legend: true,
      legendScale: 1,
      legendOpts: {
        display: true,
        scale: 1,
        x: 10,
        y: 5,
        data: null
      },
      transOptsKey: 'BI2',
      transOptsSel: transOptsSel,
      mapTypesKey: 'Tetrad frequency',
      mapTypesSel: {
        'No hectad map': brcatlas.noData,
        'Date classes (newest on top)': bsbiatlas.bsbiHectadDateClassesNewest,
        'Date classes (oldest on top)': bsbiatlas.bsbiHectadDateClassesOldest,
        'Tetrad frequency': bsbiatlas.bsbiHectadDateTetFreq,
        'Native species status': bsbiatlas.nativeSpeciesStatus,
        'Change from 1987-1999 to 2000-2019': bsbiatlas.change_1987_1999_vs_2000_2019,
        'Change from 1930-1969 vs 2000-2019': bsbiatlas.change_1930_1969_vs_2000_2019
      },
      mapTypesControl: false,
    })

    // Create the slippy map
    slippyMap = brcatlas.leafletMap({
      selector: selector,
      mapid: 'slippyAtlasMain',
      height: height,
      width: staticMap.getMapWidth(),
      captionId: "dotCaption",
      mapTypesKey: 'Tetrad frequency',
      mapTypesSel: {
        'No hectad map': brcatlas.noData,
        'Date classes (newest on top)': bsbiatlas.bsbiHectadDateClassesNewest,
        'Date classes (oldest on top)': bsbiatlas.bsbiHectadDateClassesOldest,
        'Tetrad frequency': bsbiatlas.bsbiHectadDateTetFreq,
        'Native species status': bsbiatlas.nativeSpeciesStatus,
        'Change from 1987-1999 to 2000-2019': bsbiatlas.change_1987_1999_vs_2000_2019,
        'Change from 1930-1969 vs 2000-2019': bsbiatlas.change_1930_1969_vs_2000_2019
      },
      legend: true,
      legendScale: 1,
      legendOpts: {
        display: true,
        scale: 1,
        x: 10,
        y: 0,
        data: null
      },
    })
    $('#slippyAtlasMain').hide()
  }

  function taxonSelectors(selector) {
    var $sel = $('<select class="selectpicker" data-live-search="true" data-size="10">').appendTo($(selector))
    $sel.attr('data-header', 'Start typing the name of a taxon')
    $sel.attr('title', 'Select a taxon to display')
    $sel.attr('data-width', '100%')
    $sel.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
      currentTaxon.identifier = $(this).val()
      currentTaxon.name =  $(this).find(":selected").attr("data-content")
      taxonSelected()
    })

    d3.csv(taxaCsv).then(function(data) {
      data.forEach(function(d) {

        var name = ''
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

        var $opt = $('<option>')
        $opt.attr('data-content', name)
        $opt.attr('value', d['ddb id'])
        $opt.attr('data-canonical', d['canonical'])
        $opt.attr('data-qualifier', d['qualifier'])
        $opt.attr('data-vernacular', d['vernacular'])

        $opt.html(name).appendTo($sel)
      })
    }).catch(function(e){
      console.log('Error reading taxon CSV')
    })
  }

  function taxonSelected() {
    if (currentTaxon.identifier) {
      $('#bsbi-taxon-title').html(currentTaxon.name)
      slippyMap.setIdentfier(currentTaxon.identifier) 
      slippyMap.redrawMap()
      staticMap.setIdentfier(currentTaxon.identifier)
      staticMap.redrawMap()
    }
  }

  function develBlock(selector) {
    // Tabs on/off
    var $bgrp = $('<div class="btn-group" data-toggle="buttons">').appendTo($(selector))
    var $onLabel = $('<label class="btn btn-primary active">').appendTo($bgrp)
    $('<input type="radio" name="tabsToggle" value="on" checked>').appendTo($onLabel)
    $onLabel.append("Show tabs")
    var $offLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
    $('<input type="radio" name="tabsToggle" value="off">').appendTo($offLabel)
    $offLabel.append("No tabs")

    $('input[type=radio][name="tabsToggle"]').change(function() {
      mainAtlasContent($(this).val() === "on")
      taxonSelected()
    });
  }

  function ecoFlora(identifier) {
    alert("link to ecoflora for: " + identifier)
  }

  function worldFloraOnline(identifier) {
    alert("link to world flora online for: " + identifier)
  }

  function navigationBlock(selector) {

    var lastGroup = ''
    var $ul
    sections.forEach(function(s){

      if (s.group !== lastGroup) {
        if (s.group) {
          $('<h6>').text(s.group).appendTo($(selector))
        }
        $ul = $('<ul></ul>').appendTo($(selector))
        lastGroup = s.group
      }
      var $li = $('<li>').appendTo($ul)
      var $a = $('<a href="#bsbi-atlas-section-' + s.id + '">').appendTo($li)
      $a.text(s.title)
      $a.click(function(){
        if (s.external) {
          s.fn(currentTaxon.identifier)
        } else {
          $('.nav-tabs a[href="#bsbi-atlas-section-' + s.id + '').tab('show')
        }
      })
    })
  }

})(jQuery, Drupal, drupalSettings);