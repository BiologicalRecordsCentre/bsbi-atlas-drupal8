 
var bsbiDataRoot
(function ($, Drupal, drupalSettings) {

  //bsbiatlas.setDataRoot(drupalSettings.bsbi_atlas.dataRoot + 'atlas_taxa_2020_08_25/hectad-dateclass-status/')

  bsbiDataRoot = drupalSettings.bsbi_atlas.dataRoot + 'atlas_taxa_2020_08_25/hectad-dateclass-status/'
  var taxaCsv = drupalSettings.bsbi_atlas.dataRoot + 'taxon_list.csv'
  var currentTaxon = {
    identifier: null,
    name: null,
  }
  var slippyMap, staticMap
  var displayedMapType = 'static'
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

  var periods = [
    {
      min: '',
      max: 1929,
      access: 'status_29',
      caption: '1929 and before'
    },
    {
      min: 1930,
      max: 1949,
      access: 'status_30_49',
      caption: '1930 - 1949'
    },
    {
      min: 1950,
      max: 1969,
      access: 'status_50_69',
      caption: '1950 - 1969'
    },
    {
      min: 1970,
      max: 1986,
      access: 'status_70_86',
      caption: '1970 - 1986'
    },
    {
      min: 1987,
      max: 1999,
      access: 'status_87_99',
      caption: '1987 - 1999'
    },
    {
      min: 2000,
      max: 2009,
      access: 'status_00_09',
      caption: '2000 - 2009'
    },
    {
      min: 2010,
      max: 2019,
      access: 'status_10_19',
      caption: '2010 - 2019'
    }
  ]

  var trends = [
    {
      lower: '1930-69',
      upper: '2000-19',
      access: 'change_1930_1969_vs_2000_2019',
      caption: '1930-69 vs 2000-19'
    },
    {
      lower: '1987-99',
      upper: '2000-19',
      access: 'change_1987_1999_vs_2000_2019',
      caption: '1987-99 vs 2000-19'
    }
  ]

  $(document).ready(function () {
    //console.log(drupalSettings)

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
    //$('.brc-atlas-map-opts').remove()
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
    var $sect = $('#bsbi-atlas-section-' + id)
    var $p = $('<p>').appendTo($sect)
    $p.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
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

  function mapControlRow(selector) {
    var $div =  $('<div>').appendTo($(selector))
    $div.addClass('atlas-map-control-row')
    return $div
  }

  function createMapControls(selector) {
    mapInterfaceToggle(mapControlRow(selector))
    mapTypeSelector(mapControlRow(selector))
    statusControl(mapControlRow(selector))
    trendControl(mapControlRow(selector))
  }

  function mapInterfaceToggle($parent) {
    var $bgrp = $('<div class="btn-group" data-toggle="buttons">').appendTo($parent)

    var $staticLabel = $('<label class="btn btn-primary active">').appendTo($bgrp)
    var $staticButton = $('<input type="radio" name="mapType" value="static" checked>').appendTo($staticLabel)
    $staticLabel.append("Overview")

    var $slippyLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
    var $slippyButton = $('<input type="radio" name="mapType" value="slippy">').appendTo($slippyLabel)
    $slippyLabel.append("Zoomable")

    $('input[type=radio][name="mapType"]').change(function() {
      displayedMapType = $(this).val()

      if (displayedMapType === "static") {
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
      changeMap()
    })
  }

  function mapTypeSelector($parent) {

    // Main type selector
    var $sel = $('<select>').appendTo($parent)
    $sel.addClass('selectpicker')
    $sel.attr('id', 'atlas-map-type-selector')
    $sel.attr('data-width', '100%')
    $sel.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

      if ($(this).val() === 'status') {
        $('#atlas-period-slider-control').show()
      } else {
        $('#atlas-period-slider-control').hide()
      }

      if ($(this).val() === 'trends') {
        $('#atlas-trend-slider-control').show()
      } else {
        $('#atlas-trend-slider-control').hide()
      }

      changeMap()
    })
    var types = [
      {
        caption: 'Distribution by atlas period',
        val: 'status'
      },
      {
        caption: 'Trend maps',
        val: 'trends'
      },
      {
        caption: 'Tetrad density',
        val: 'tetrad'
      },
    ]
    types.forEach(function(t){
      var $opt = $('<option>')
      $opt.attr('value', t.val)
      $opt.html(t.caption).appendTo($sel)
    })

    // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.
    $sel.selectpicker()
  }

  function statusControl($parent) {
    
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.attr('id', 'atlas-period-slider-control')

    // Period display
    var $indicator = $('<div>').appendTo($container)
    $indicator.css('font-size', '1.5em')
    $indicator.css('margin-bottom', '0.2em')
    $indicator.text(periods[periods.length - 1].caption)

    // Slider
    var $sliderContainer = $('<div>').appendTo($container)
    $sliderContainer.addClass('slidecontainer')
    var $slider = $('<input>').appendTo($sliderContainer)
    $slider.addClass('slider')
    $slider.attr('type', 'range').attr('min', '1').attr('max', periods.length).attr('id', 'atlas-range-select')
    $slider.change(function() {
      $indicator.text(periods[$('#atlas-range-select').val()-1].caption)
      changeMap()
    })

    var $scaleContainer = $('<div>').appendTo($sliderContainer)
    $scaleContainer.addClass('atlas-range-tick-container')
    periods.forEach(function(p, i){
      var $tick = $('<span>').appendTo($scaleContainer)
      $tick.addClass('atlas-range-tick')
      var percent = i/(periods.length - 1)*100
      $tick.css('left',  percent.toString() + '%')
      $tick.text('|')
      $tick.append('<br>')
      var $tickText = $('<span>').appendTo($tick)
      $tickText.addClass('atlas-range-tick-text')
      $tickText.html(p.min + '<br>' + p.max)
    })

    // Status on/off toggle
    var $checDiv = $('<div>').appendTo($container)
    $checDiv.css('margin-top', '4.3em')

    var $check = $('<input>').appendTo($checDiv)
    $check.addClass('form-check-input')
    $check.attr('type', 'checkbox')
    $check.attr('checked', 'checked')
    $check.attr('id', 'atlas-status-checkbox')
    var $label = $('<label>').appendTo($checDiv)
    $label.addClass('form-check-label')
    $label.attr('for', 'atlas-status-checkbox')
    $label.css('margin-left', '0.5em')
    $label.text('Show status')

    $check.change(function() {
      bsbiDataAccess.showStatus = $(this).is(':checked')
      changeMap()
    })
  }

  function trendControl($parent) {
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.attr('id', 'atlas-trend-slider-control')
    $container.hide()

    // Trend display
    var $indicator = $('<div>').appendTo($container)
    $indicator.css('font-size', '1.5em')
    $indicator.css('margin-bottom', '0.2em')
    $indicator.text(trends[trends.length - 1].caption)

    // Slider
    var $sliderContainer = $('<div>').appendTo($container)
    $sliderContainer.addClass('slidecontainer')
    $sliderContainer.attr('id', 'atlas-trend-select-container')
    var $slider = $('<input>').appendTo($sliderContainer)
    $slider.addClass('slider')
    $slider.attr('type', 'range').attr('min', '1').attr('max', trends.length).attr('id', 'atlas-trend-select')
    $slider.change(function() {
      $indicator.text(trends[$('#atlas-trend-select').val()-1].caption)
      changeMap()
    })

    var $scaleContainer = $('<div>').appendTo($sliderContainer)
    $scaleContainer.addClass('atlas-trend-tick-container')
    trends.forEach(function(p, i){
      var $tick = $('<span>').appendTo($scaleContainer)
      $tick.addClass('atlas-trend-tick')
      var percent = i/(trends.length - 1)*100
      $tick.css('left',  percent.toString() + '%')
      $tick.text('|')
      $tick.append('<br>')
      var $tickText = $('<span>').appendTo($tick)
      $tickText.addClass('atlas-trend-tick-text')
      $tickText.attr('id', 'atlas-trend-tick-text-' + i)
      $tickText.html(p.lower + '<br>' + p.upper)
    })

  }

  function createMaps(selector) {

    // Modify standard UK opts to remove any without CI
    var transOptsSel =  JSON.parse(JSON.stringify(brcatlas.namedTransOpts))
    delete transOptsSel.BI3 // Remove the options without CI

    // Data access 
    var mapTypesSel = {
      'status_29': bsbiDataAccess.status_29,
      'status_30_49': bsbiDataAccess.status_30_49,
      'status_50_69': bsbiDataAccess.status_50_69,
      'status_70_86': bsbiDataAccess.status_70_86,
      'status_87_99': bsbiDataAccess.status_87_99,
      'status_00_09': bsbiDataAccess.status_00_09,
      'status_10_19': bsbiDataAccess.status_10_19,
      'Tetrad frequency': bsbiDataAccess.bsbiHectadDateTetFreq,
      'change_1987_1999_vs_2000_2019': bsbiDataAccess.change_1987_1999_vs_2000_2019,
      'change_1930_1969_vs_2000_2019': bsbiDataAccess.change_1930_1969_vs_2000_2019
    }

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
      mapTypesKey: 'status_10_19',
      mapTypesSel: mapTypesSel,
      mapTypesControl: false,
    })

    // Create the slippy map
    slippyMap = brcatlas.leafletMap({
      selector: selector,
      mapid: 'slippyAtlasMain',
      height: height,
      width: staticMap.getMapWidth(),
      captionId: "dotCaption",
      mapTypesKey: 'status_10_19',
      mapTypesSel: mapTypesSel,
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
      changeMap()
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
      //
      console.log("opts loaded")
      $sel.selectpicker()

    }).catch(function(e){
      console.log('Error reading taxon CSV')
    })
  }

  function changeMap() {

    if (displayedMapType === 'static') {
      displayedMap = staticMap
    } else {
      displayedMap = slippyMap
    }
    var mapType = $('#atlas-map-type-selector').val()
    if (mapType === 'status') {
      var access = periods[$('#atlas-range-select').val()-1].access
      displayedMap.setMapType(access)
    } else if (mapType === 'trends') {
      var access = trends[$('#atlas-trend-select').val()-1].access
      displayedMap.setMapType(access)
    } else if (mapType === 'tetrad') {
      displayedMap.setMapType('Tetrad frequency')
    }

    if (currentTaxon.identifier) {
      $('#bsbi-taxon-title').html(currentTaxon.name)
      displayedMap.setIdentfier(currentTaxon.identifier) 
      displayedMap.redrawMap()
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
      changeMap()
    });

    // 
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

})(jQuery, Drupal, drupalSettings)