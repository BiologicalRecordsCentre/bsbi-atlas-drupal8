 
var bsbiDataRoot
(function ($, Drupal, drupalSettings) {

  //bsbiatlas.setDataRoot(drupalSettings.bsbi_atlas.dataRoot + 'atlas_taxa_2020_08_25/hectad-dateclass-status/')

  bsbiDataRoot = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/atlas_taxa_2020_08_25/hectad-dateclass-status/'
  var captionRoot = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/captions/'
  var rasterRoot = drupalSettings.bsbi_atlas.dataRoot + 'rasters/'
  var taxaCsv = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/taxon_list.csv'
  var currentTaxon = {
    identifier: null,
    name: null,
    tetrad: null,
    monad: null
  }
  var slippyMap, staticMap
  var mapType = 'allclass'
  var showStatus = false
  var displayedMapType = 'static'
  var resolution = 'hectad'
  var atlasRangeIndex = 5
  var atlasTrendIndex = 2
  var slippyLegendOpts = {
    display: true,
    scale: 0.8,
    x: 10,
    y: 0,
    data: null
  }
  var svgLegendOpts = {
    display: true,
    scale: 1,
    x: 10,
    y: 5,
    data: null
  }

  var sections = [
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
      fn: sectionEmpty,
    },
    // {
    //   group: 'CHARACTERISTICS',
    //   id: 'attributes',
    //   title: 'Attributes',
    //   fn: sectionEmpty,
    // },
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

  var periods = [
    {
      min: '',
      max: 1929,
      access: 'status_29',
      caption: '1929 and before'
    },
    // {
    //   min: 1930,
    //   max: 1949,
    //   access: 'status_30_49',
    //   caption: '1930 - 1949'
    // },
    // {
    //   min: 1950,
    //   max: 1969,
    //   access: 'status_50_69',
    //   caption: '1950 - 1969'
    // },
    {
      min: 1930,
      max: 1969,
      access: 'status_30_69',
      caption: '1930 - 1969'
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
    // {
    //   min: 2000,
    //   max: 2009,
    //   access: 'status_00_09',
    //   caption: '2000 - 2009'
    // },
    // {
    //   min: 2010,
    //   max: 2019,
    //   access: 'status_10_19',
    //   caption: '2010 - 2019'
    // },
    {
      min: 2000,
      max: 2019,
      access: 'status_00_19',
      caption: '2000 - 2019'
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
    //console.log('inset cookie', getCookie('inset'))

    // Page title - reflects selected taxon
    // var $title = $('<div id="bsbi-taxon-title"></div>').appendTo($('#bsbi-atlas-gui'))
    // $title.append('<a href="#top">')
    // $title.css('font-size', '2.3em')
    // $title.text("No taxon selected")
    // $('#bsbi-atlas-gui').append('<hr>')

    // Initialise main content
    $('#bsbi-atlas-gui').append('<div id="main-atlas-content"></div>')
    var tabs = drupalSettings.bsbi_atlas.useTabs
    mainAtlasContent(tabs)

    // Taxon selection control
    taxonSelectors('.bsbi-atlas-taxon-selector')

    // Navigation block
    navigationBlock('.bsbi-atlas-navigation')

    // Devel block
    develBlock('#bsbi-atlas-development')
  })

  function mainAtlasContent(tabs) {
    var selected = 'summary'

    // Clear current content (including dialog boxes from SVG maps)
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

      // Hide the map controls unless map tab is displayed
      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href") // activated tab
        
        if (target === '#bsbi-atlas-section-summary') {
          $('.bsbi-atlas-map-controls').show()
        } else {
          $('.bsbi-atlas-map-controls').hide()
        }
        //console.log(target)
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
    //$h = $('<h2>')
    //$h.text(title)

    var $h = $('<p class="bsbi-selected-taxon-name"></p>')
    $h.css('font-size', '1.3em')
    $h.css('margin-top', '0.5em')
    $h.addClass('bsbi-atlas-section-header')
    $div.append($h)

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

  function sectionSummary(id, tabs) {
    var $sect = $('#bsbi-atlas-section-' + id)

    var $d = $('<div class=".container-fluid">').appendTo($sect)
    var $r = $('<div class="row">').appendTo($d)
    var $left = $('<div class="col-sm-8">').appendTo($r)
    var $right = $('<div class="col-sm-4">').appendTo($r)
    $left.append('<div id="bsbiMapDiv" width="100%"></div>')

    var $taxon = $('<div class="bsbi-selected-taxon-name"></div>').appendTo($right)
    $taxon.css('font-size', '1.3em')
    $right.append('<hr/>')
    $right.append('<div id="bsbi-caption"></div>')
    
    createMaps("#bsbiMapDiv")
    createMapControls('.bsbi-atlas-map-controls')
    sectionEnd($sect, tabs)
  }

  function sectionEcology(id, tabs) {
    var $sect, $p, $h
    $sect = $('#bsbi-atlas-section-' + id)
    $p = $('<p>').appendTo($sect)
    $p.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    $h = $('<h3>').appendTo($sect).text('Attributes')
    $p = $('<p>').appendTo($sect)
    $p.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    
    sectionEnd($sect, tabs)
  }

  function mapControlRow(selector, classname) {
    var $div =  $('<div>').appendTo($(selector))
    $div.addClass('atlas-map-control-row')
    if (classname) {
      $div.addClass(classname)
    }
    return $div
  }

  function createMapControls(selector) {

    mapInterfaceToggle(mapControlRow(selector))
    mapTypeSelector(mapControlRow(selector))
    statusControl(mapControlRow(selector))
    statusCheckbox(mapControlRow(selector))
    trendControl(mapControlRow(selector))
    backdropSelector(mapControlRow(selector, 'atlas-map-overview-only'))

    $(selector).each(function(i) {

      // We loop through the selection so that we can use the
      // index value to differentiate the equivalent controls
      // from different blocks. This is vital for radio controls
      // otherwise value can only be selected in one block and
      // therefore initialisation may be wrong.
      var sel = 'bsbi-atlas-map-controls-' + i
      $div = $('<div>').appendTo($(this))
      $div.addClass(sel)
      sel = '.' + sel

      // Potentially we can also use this to ensure that selection
      // in one block is mirrored in the other. This is only important
      // if user might switch between blocks during use - but this
      // is very unlikely. (But nevertheless has been implemented
      // for the radio buttons below.)
      insetRadios(mapControlRow(sel,'atlas-map-overview-only'), i)
      gridStyleRadios(mapControlRow(sel, 'atlas-map-overview-only'), i)
      resolutionControl(mapControlRow(sel), i)
    })
    
  }

  function gridStyleRadios($parent, i) {
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.attr('id', 'atlas-grid-type-control')

    function makeRadio(label, val, checked) {
      //$('<div class="radio"><label><input type="radio" name="atlas-grid-type" value="'+ val + '" ' + checked + '>' + label + '</label></div>').appendTo($container)
    
      var $div = $('<div>').appendTo($container)
      $div.attr('class', 'radio')
      var $radio = $('<input>').appendTo($div)
      $radio.attr('type', 'radio')
      $radio.attr('name', 'atlas-grid-type-' + i)
      $radio.attr('class', 'atlas-grid-type-' + val)
      $radio.attr('value', val)
      $radio.css('margin-left', 0)
      if (checked) $radio.prop('checked', true)
      var $label = $('<label>').appendTo($div)
      $label.attr('for', 'atlas-grid-type-' + val)
      $label.text(label)

      $radio.change(function () {
        var style = $(this).val()
        if (style === 'dashed') {
          $('#bsbiMapDiv g#grid path').css('stroke-dasharray', '3,2')
          $('#bsbiMapDiv g#grid path').show()
        } else if (style === 'solid') {
          $('#bsbiMapDiv g#grid path').css('stroke-dasharray', '')
          $('#bsbiMapDiv g#grid path').show()
        } else {
          $('#bsbiMapDiv g#grid path').hide()
        }

        // Update controls mirrored in other blocks
        $('.atlas-grid-type-' + val).prop("checked", true)
      })
    }
    var gridStyle = getCookie('gridstyle') ? getCookie('gridstyle') : 'solid'

    makeRadio('Solid grid lines', 'solid', gridStyle === 'solid' ? 'checked' : '')
    makeRadio('Dashed grid lines', 'dashed', gridStyle === 'dashed' ? 'checked' : '')
    makeRadio('No grid lines', 'none', gridStyle === 'none' ? 'checked' : '')
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
      if (displayedMapType === "slippy") {
        // Get current width of static map
        var $svg = $('#staticAtlasMain svg')
        var w = $svg.width()
        var h = $svg.height()
        setControlState()
        slippyMap.setSize(w, h)
      } else {
        if (resolution !== 'hectad') {
          bsbiDataAccess.resolution = 'hectad'
          setControlState()
        } else {
          setControlState()
        }
      }
      changeMap()
    })
  }

  function setControlState() {

    console.log('setControlState')
    if (displayedMapType === "static") {
      $('.atlas-map-overview-only').show()
      $('#slippyAtlasMain').hide()
      $('#staticAtlasMain').show()
    } else {
      $('.atlas-map-overview-only').hide()
      $('#staticAtlasMain').hide()
      $('#slippyAtlasMain').show()
    }

    if (mapType === 'status') {
      $('.atlas-period-slider-control').show()
    } else {
      $('.atlas-period-slider-control').hide()
    }

    if (mapType === 'allclass' || mapType === 'status') {
      $('.atlas-status-checkbox-control').show()
    } else {
      $('.atlas-status-checkbox-control').hide()
    }

    if (mapType === 'trends') {
      $('.atlas-trend-slider-control').show()
    } else {
      $('.atlas-trend-slider-control').hide()
    }

    if (mapType === 'allclass' && displayedMapType === 'slippy') {
      $('.atlas-resolution-control').show()
      // Enable/disable options depending on availability of resolution data
      var identifier = currentTaxon.identifier
      console.log('tetrad', currentTaxon.tetrad, 'monad', currentTaxon.monad)

      if (identifier) {
        var fileTetrad = "".concat(bsbiDataRoot, 'tetrad/').concat(identifier.replace(".", "_"), ".csv")
        var fileMonad = "".concat(bsbiDataRoot, 'monad/').concat(identifier.replace(".", "_"), ".csv")

        //checkCsv(fileTetrad,)
        //checkCsv(fileMonad)
        
        //console.log(fileTetrad, fileTetrad)

        if (resolution === 'monad' && !currentTaxon.monad) {
          resolution = 'hectad'
        } else if (resolution === 'tetrad' && !currentTaxon.tetrad) {
          resolution = 'hectad'
        }
        bsbiDataAccess.resolution = resolution

        $('.bsbi-resolution-' + resolution).prop('checked', true)
        console.log('id', '.bsbi-resolution-' + resolution)
        
        $('.bsbi-resolution-hectad').attr('disabled', false)
        if (currentTaxon.tetrad){
          $('.bsbi-resolution-tetrad').attr('disabled', false)
        } else {
          $('.bsbi-resolution-tetrad').attr('disabled', true)
        }
        if (currentTaxon.monad){
          $('.bsbi-resolution-monad').attr('disabled', false)
        } else {
          $('.bsbi-resolution-monad').attr('disabled', true)
        }

        // Uncheck and disable status checkbutton if not hectad resolution
        if (resolution === 'hectad') {
          $('.atlas-status-checkbox-control').show()
        } else {
          $('.atlas-status-checkbox-control').hide()
        }   
      } else {
        $('.bsbi-resolution-monad').prop('checked', false)
        $('.bsbi-resolution-tetrad').prop('checked', false)
        $('.bsbi-resolution-hectad').prop('checked', true)

        $('.bsbi-resolution-monad').attr('disabled', true)
        $('.bsbi-resolution-tetrad').attr('disabled', true)
        $('.bsbi-resolution-hectad').attr('disabled', true)
      }

    } else {
      $('.atlas-resolution-control').hide()
    }
  }

  function mapTypeSelector($parent) {

    // Main type selector
    var $sel = $('<select>').appendTo($parent)
    $sel.addClass('selectpicker')
    $sel.addClass('atlas-map-type-selector')
    $sel.attr('data-width', '100%')
    $sel.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
      mapType = $(this).val()
      setControlState()
      changeMap()
    })
    var types = [
      {
        caption: 'Distribution overview',
        val: 'allclass'
      },
      {
        caption: 'Distribution by year range',
        val: 'status'
      },
      {
        caption: 'Change maps',
        val: 'trends'
      },
      {
        caption: 'Tetrad frequency',
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

  function backdropSelector($parent) {

    // Backdrops
    var backdrops = [
      {
        caption: 'No backdrop',
        val: ''
      },
      {
        caption: 'Colour elevation',
        val: 'colour_elevation'
      },
      {
        caption: 'Grey elevation',
        val: 'grey_elevation_300'
      },
    ]

    // Main type selector
    var $sel = $('<select>').appendTo($parent)
    $sel.addClass('selectpicker')
    $sel.addClass('atlas-backdrop-selector')
    $sel.attr('data-width', '100%')
    $sel.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
      // Remove all backdrops
      backdrops.forEach(function(b){
        if (b.val) {
          staticMap.basemapImage(b.val, false, rasterRoot + b.val + '.png', rasterRoot + b.val + '.pgw')
        }
      })
      // Display selected backdrop
      var val = $(this).val()
      if (val) {
        staticMap.basemapImage(val, true, rasterRoot + val + '.png', rasterRoot + val + '.pgw')
      }
    })
    backdrops.forEach(function(b){
      var $opt = b.selected  ? $('<option>') : $('<option>')
      $opt.attr('value', b.val)
      $opt.html(b.caption).appendTo($sel)
    })
    $sel.val("colour_elevation")

    // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.
    $sel.selectpicker()
  }

  function statusCheckbox($parent) {
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.addClass('atlas-status-checkbox-control')

    // Status on/off toggle
    var $checDiv = $('<div class="checkbox">').appendTo($container)
    //$checDiv.css('margin-top', '4.3em')

    $('<label><input type="checkbox" class="atlas-status-checkbox">Show status</label>').appendTo($checDiv)

    $('.atlas-status-checkbox').change(function() {
      showStatus = $(this).is(':checked')
      bsbiDataAccess.showStatus = showStatus
      changeMap()
    })
  }

  function statusControl($parent) {
    
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.addClass('atlas-period-slider-control')
    $container.hide()

    // Period display
    // var $indicator = $('<div>').appendTo($container)
    // $indicator.css('font-size', '1.5em')
    // $indicator.css('margin-bottom', '0.2em')
    // $indicator.text(periods[periods.length - 1].caption)

    // Slider
    var $sliderContainer = $('<div>').appendTo($container)
    $sliderContainer.addClass('slidecontainer')
    var $slider = $('<input>').appendTo($sliderContainer)
    $slider.addClass('slider')
    $slider.attr('type', 'range').attr('min', '1').attr('max', periods.length).attr('id', 'atlas-range-select')
    $slider.change(function() {
      atlasRangeIndex = $(this).val()
      changeMap()
    })

    var $scaleContainer = $('<div>').appendTo($sliderContainer)
    $scaleContainer.addClass('atlas-range-tick-container')
    $scaleContainer.css('margin-bottom', '4.3em')
    periods.forEach(function(p, i){
      var $tick = $('<span>').appendTo($scaleContainer)
      $tick.addClass('atlas-range-tick')
      var percent = i/(periods.length - 1)*100
      $tick.css('left',  percent.toString() + '%')
      $tick.text('|')
      $tick.append('<br>')
      var $tickText = $('<span>').appendTo($tick)
      $tickText.addClass('atlas-range-tick-text')
      $tickText.html((p.min ? p.min : 'pre') + '<br>' + (p.max === 1929 ? 1930 : p.max))
      //$tickText.html(p.min + '<br>' + p.max)
    })

    // // Status on/off toggle
    // var $checDiv = $('<div class="checkbox">').appendTo($container)
    // $checDiv.css('margin-top', '4.3em')

    // $('<label><input type="checkbox" id="atlas-status-checkbox">Show status</label>').appendTo($checDiv)

    // $('#atlas-status-checkbox').change(function() {
    //   showStatus = $(this).is(':checked')
    //   bsbiDataAccess.showStatus = showStatus
    //   changeMap()
    // })
  }

  function resolutionControl($parent, i) {
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.addClass('atlas-resolution-control')
    $container.hide()

    function makeRadio(label, val, checked) {
      var $div = $('<div>').appendTo($container)
      $div.attr('class', 'radio')
      var $radio = $('<input>').appendTo($div)
      $radio.attr('type', 'radio')
      $radio.attr('name', 'bsbi-resolution-' + i)
      $radio.attr('class', 'bsbi-resolution-' + val)
      $radio.attr('value', val)
      $radio.css('margin-left', 0)
      if (checked) $radio.prop('checked', true)
      var $label = $('<label>').appendTo($div)
      $label.attr('for', 'bsbi-resolution-' + val)
      $label.text(label)

      $radio.change(function () {

        resolution = $(this).val()
   
        // Update controls mirrored in other blocks
        $('.bsbi-resolution-' + resolution).prop("checked", true)
        setControlState()
        changeMap()
      })
    }
    makeRadio('Hectads', 'hectad', true)
    makeRadio('Tetrads', 'tetrad', false)
    makeRadio('Monads', 'monad', false)
  }

  function trendControl($parent) {
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.addClass('atlas-trend-slider-control')
    $container.hide()

    // Trend display
    // var $indicator = $('<div>').appendTo($container)
    // $indicator.css('font-size', '1.5em')
    // $indicator.css('margin-bottom', '0.2em')
    // $indicator.text(trends[trends.length - 1].caption)

    // Slider
    var $sliderContainer = $('<div>').appendTo($container)
    $sliderContainer.addClass('slidecontainer')
    $sliderContainer.addClass('atlas-trend-select-container')
    var $slider = $('<input>').appendTo($sliderContainer)
    $slider.addClass('slider')
    $slider.attr('type', 'range').attr('min', '1').attr('max', trends.length).addClass('atlas-trend-select')
    $slider.change(function() {
      atlasTrendIndex = $(this).val()
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
      $tickText.addClass('atlas-trend-tick-text-' + i)
      $tickText.html(p.lower + '<br>v.<br>' + p.upper)
    })

    $container.css('margin-bottom', '5.3em')

  }

  function insetRadios($parent, i) { 
    
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.attr('id', 'atlas-inset-control')

    function makeRadio(label, val, checked) {
      var $div = $('<div>').appendTo($container)
      $div.attr('class', 'radio')
      var $radio = $('<input>').appendTo($div)
      $radio.attr('type', 'radio')
      $radio.attr('name', 'bsbi-inset-type-' + i)
      $radio.attr('class', 'bsbi-inset-type-' + val)
      $radio.attr('value', val)
      $radio.css('margin-left', 0)
      if (checked) $radio.prop('checked', true)
      var $label = $('<label>').appendTo($div)
      $label.attr('for', 'bsbi-inset-type-' + val)
      $label.text(label)

      $radio.change(function () {

        var val = $(this).val()
   
        // Update controls mirrored in other blocks
        $('.bsbi-inset-type-' + val).prop("checked", true)

        staticMap.setTransform(val)
        setCookie('inset', val, 30)
        changeMap()
      })
    }
    var selectedInset = getCookie('inset') ? getCookie('inset') : 'BI4'
    makeRadio('No insets', 'BI1', selectedInset === 'BI1' ? 'checked' : '')
    makeRadio('Channel Isles inset', 'BI2', selectedInset === 'BI2' ? 'checked' : '')
    makeRadio('Northern and Channel Isles inset', 'BI4', selectedInset === 'BI4' ? 'checked' : '')
  }

  function createMaps(selector) {

    // Modify standard UK opts to remove any without CI
    var transOptsSel =  JSON.parse(JSON.stringify(brcatlas.namedTransOpts))
    delete transOptsSel.BI3 // Remove the options without CI

    // Modify the BI4 - northern Isle inset option to go further west in order
    // to give more room for legends!
    transOptsSel.BI4.bounds.xmin = -240000,

    // Init
    bsbiDataAccess.showStatus = false

    // Data access 

    console.log()
    var mapTypesSel = {
      'status_29': bsbiDataAccess.status_29,
      // 'status_30_49': bsbiDataAccess.status_30_49,
      // 'status_50_69': bsbiDataAccess.status_50_69,
      'status_30_69': bsbiDataAccess.status_30_69,
      'status_70_86': bsbiDataAccess.status_70_86,
      'status_87_99': bsbiDataAccess.status_87_99,
      // 'status_00_09': bsbiDataAccess.status_00_09,
      // 'status_10_19': bsbiDataAccess.status_10_19,
      'status_00_19': bsbiDataAccess.status_00_19,
      'Tetrad frequency': bsbiDataAccess.bsbiHectadDateTetFreq,
      'change_1987_1999_vs_2000_2019': bsbiDataAccess.change_1987_1999_vs_2000_2019,
      'change_1930_1969_vs_2000_2019': bsbiDataAccess.change_1930_1969_vs_2000_2019,
      'distAllClasses': bsbiDataAccess.distAllClasses
    }

    // Basemaps
    var basemapConfigs = [
      {
        name: 'Open Street Map',
        type: 'tileLayer',
        selected: true,
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        opts: {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }
      },
      {
        name: 'Stamen Black & White',
        type: 'tileLayer',
        selected: false,
        url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
        opts: {
          attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          subdomains: 'abcd',
          minZoom: 0,
          maxZoom: 20,
          ext: 'png'
        }
      },
      {
        name: 'Open Topo Map',
        type: 'tileLayer',
        selected: false,
        url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
        opts: {
          maxZoom: 17,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        }
      },
      {
        name: 'GEBCO 2020 Elevation',
        type: 'wms',
        selected: false,
        url: 'https://www.gebco.net/data_and_products/gebco_web_services/2020/mapserv?',
        opts: {
          layers: 'GEBCO_2020_Grid_2',
          maxZoom: 17,
          attribution: 'Imagery reproduced from the GEBCO_2020 Grid, GEBCO Compilation Group (2020) GEBCO 2020 Grid (doi:10.5285/a29c5465-b138-234d-e053-6c86abc040b9)'
        }
      },
      {
        name: 'Copernicus elevation aspect',
        type: 'wms',
        selected: false,
        url: 'https://copernicus.discomap.eea.europa.eu/arcgis/services/Elevation/Aspect/MapServer/WMSServer?',
        opts: {
          layers: 'image',
          maxZoom: 17,
          attribution: '&copy; European Commission'
        }
      },
      // Removed NLS historic because Ireland not included (as per instruction from January 2021)
      // {
      //   name: 'NLS Historic',
      //   type: 'wms',
      //   selected: false,
      //   url: 'https://nls-{s}.tileserver.com/nls/{z}/{x}/{y}.jpg', 
      //   opts: {
      //     attribution: '<a href="https://maps.nls.uk/projects/api//">National Library of Scotland Historic Maps</a>',
      //     bounds: [[49.6, -12], [61.7, 3]],
      //     minZoom: 1,
      //     maxZoom: 18,
      //     subdomains: '0123'
      //   }
      // },
    ]

    // Map height
    const height = 650
    // Create the static map
    staticMap = brcatlas.svgMap({
      selector: selector,
      mapid: "staticAtlasMain",
      captionId: "dotCaption",
      height: height,
      expand: true,
      //legend: true,
      //legendScale: 1,
      legendOpts: svgLegendOpts,
      transOptsKey: getCookie('inset') ? getCookie('inset') : 'BI4',
      transOptsSel: transOptsSel,
      mapTypesKey: 'status_10_19',
      mapTypesSel: mapTypesSel,
      mapTypesControl: false,
      transOptsControl: false,
      seaFill: 'white',
      gridLineColour: '#7C7CD3',
      boundaryColour: '#7C7CD3',
    })
    //staticMap.basemapImage('greyelev', true, rasterRoot + 'grey_elevation_300.png', rasterRoot + 'grey_elevation_300.pgw')
    // Initial backgrop image
    staticMap.basemapImage('colour_elevation', true, rasterRoot + 'colour_elevation.png', rasterRoot + 'colour_elevation.pgw')
    //staticMap.basemapImage('greyelev', false)

    // Create the slippy map
    slippyMap = brcatlas.leafletMap({
      selector: selector,
      mapid: 'slippyAtlasMain',
      height: height,
      width: staticMap.getMapWidth(),
      captionId: "dotCaption",
      mapTypesKey: 'status_10_19',
      mapTypesSel: mapTypesSel,
      //legend: true,
      //legendScale: 1,
      legendOpts: slippyLegendOpts,
      basemapConfigs: basemapConfigs,
    })
    $('#slippyAtlasMain').hide()
  }

  function taxonSelectors(selector) {
    var $sel = $('<select>').appendTo($(selector))
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

        $opt.attr('data-tetrad', d['tetrad'])
        $opt.attr('data-monad', d['monad'])

        $opt.html(name).appendTo($sel)
      })

      $sel.attr('data-size', '10')
      $sel.attr('data-live-search', 'true')
      $sel.attr('data-header', 'Start typing the name of a taxon')
      $sel.attr('title', 'Select a taxon to display')
      $sel.attr('data-width', '100%')
      $sel.selectpicker()
      $sel.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        currentTaxon.identifier = $(this).val()
        currentTaxon.name =  $(this).find(":selected").attr("data-content")
        currentTaxon.tetrad = $(this).find(":selected").attr("data-tetrad")
        currentTaxon.monad = $(this).find(":selected").attr("data-monad")
        $('.bsbi-selected-taxon-name').html(currentTaxon.name)
        setControlState()
        changeMap()
        changeCaption()
      })

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

    svgLegendOpts.scale=0.9
    
    console.log('mapType', mapType)
    if (mapType === 'status') {
      //var access = periods[$('#atlas-range-select').val()-1].access
      var access = periods[atlasRangeIndex-1].access
      displayedMap.setMapType(access)
      slippyLegendOpts.width = showStatus ? 135 : 90
      //staticMap.basemapImage('colourelev', true)
    } else if (mapType === 'allclass') {
      displayedMap.setMapType('distAllClasses')
      slippyLegendOpts.width=135
      //staticMap.basemapImage('colourelev', true)
    } else if (mapType === 'trends') {
      var access = trends[atlasTrendIndex-1].access
      displayedMap.setMapType(access)
      slippyLegendOpts.width=220
      //staticMap.basemapImage('colourelev', false)
    } else if (mapType === 'tetrad') {
      displayedMap.setMapType('Tetrad frequency')
      slippyLegendOpts.width=110
      //staticMap.basemapImage('colourelev', true)
    }

    // To try to keep the legend around the same apparent size when
    // actual map size changes due to inset change, we set a scale
    // factor to apply to the legend depending on what inset value
    // is specified.
    var inset = $('input:radio[name=bsbi-inset-type]:checked').val()
    if (inset == 'BI1') {
      svgLegendOpts.scale = svgLegendOpts.scale * 0.77
    }
    if (inset == 'BI2') {
      svgLegendOpts.scale = svgLegendOpts.scale * 0.85
    }
    
    staticMap.setLegendOpts(svgLegendOpts)
    slippyMap.setLegendOpts(slippyLegendOpts)

    if (currentTaxon.identifier) {
      //$('#bsbi-taxon-title').html(currentTaxon.name)
      displayedMap.setIdentfier(currentTaxon.identifier) 
      displayedMap.redrawMap()
    }
    // // Legend display
    // if (displayedMapType !== 'static') {
    //   // if (mapType === 'status') {
    //   //   slippyLegendOpts.display = showStatus
    //   // } else {
    //   //   slippyLegendOpts.display = true
    //   // }
    //   slippyMap.setLegendOpts(slippyLegendOpts)
    // }
  }

  function changeCaption() {
    //console.log('caption', currentTaxon)

    var $p
    var $caption = $('#bsbi-caption')
    $caption.html('')
    d3.csv(captionRoot + currentTaxon.identifier.replace(/\./g, "_") + '.csv')
      .then(function(d) {
        if (d[0].description) {
          $caption.append('<h4>Description</h4>')
          $p = $('<p>').appendTo($caption)
          $p.append(d[0].description)
        }
        if (d[0].biogeography) {
          $caption.append('<h4>Biogeography</h4>')
          $p = $('<p>').appendTo($caption)
          $p.append(d[0].biogeography)
        }
        if (d[0].trends) {
          $caption.append('<h4>Trends</h4>')
          $p = $('<p>').appendTo($caption)
          $p.append(d[0].trends)
        }
        if (d[0].authors) {
          $caption.append('<h4>Authors</h4>')
          var $ul = $('<ul>').appendTo($caption)
          d[0].authors.split(';').forEach(function(a) {
            var $li = $('<li>').appendTo($ul)
            $li.text(a)
          })
        }
      })
    //$p = $('<p>').appendTo($caption)
    //$p.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    
  }

  function develBlock(selector) {
    // // Tabs on/off
    // var $bgrp = $('<div class="btn-group" data-toggle="buttons">').appendTo($(selector))
    // var $onLabel = $('<label class="btn btn-primary active">').appendTo($bgrp)
    // $('<input type="radio" name="tabsToggle" value="on" checked>').appendTo($onLabel)
    // $onLabel.append("Show tabs")
    // var $offLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
    // $('<input type="radio" name="tabsToggle" value="off">').appendTo($offLabel)
    // $offLabel.append("No tabs")

    // $('input[type=radio][name="tabsToggle"]').change(function() {
    //   mainAtlasContent($(this).val() === "on")
    //   changeMap()
    // });

    // mainAtlasContent($(this).val() === "on")
    // changeMap()
    
    // Colours
    var $colours = $('<div style="margin-top: 1em">').appendTo($(selector))

    // No change colour
    var $divNoChange = $('<div>').appendTo($colours)
    $('<input type="text" style="width: 120px" id="noChangeColour">').appendTo($divNoChange)
    $('<label for="noChangeColour" style="margin-left: 1em">Change map - no change colour</label>').appendTo($divNoChange)
    const noChangeColour = new JSColor('#noChangeColour', {onChange: colourChange})
    noChangeColour.fromString(bsbiDataAccess.devel.changeColours[0])

    // Gain colour
    var $divGain = $('<div>').appendTo($colours)
    $('<input type="text" style="width: 120px" id="gainColour">').appendTo($divGain)
    $('<label for="gainColour" style="margin-left: 1em">Change map - gain colour</label>').appendTo($divGain)
    const gainColour = new JSColor('#gainColour', {onChange: colourChange})
    gainColour.fromString(bsbiDataAccess.devel.changeColours[1])

    // Loss colour
    var $divLoss = $('<div>').appendTo($colours)
    $('<input type="text" style="width: 120px" id="lossColour">').appendTo($divLoss)
    $('<label for="lossColour" style="margin-left: 1em">Change map - loss colour</label>').appendTo($divLoss)
    const lossColour = new JSColor('#lossColour', {onChange: colourChange})
    lossColour.fromString(bsbiDataAccess.devel.changeColours[2])

    function colourChange() {
      bsbiDataAccess.devel.changeColours[0]=noChangeColour.toHEXString()
      bsbiDataAccess.devel.changeColours[1]=gainColour.toHEXString()
      bsbiDataAccess.devel.changeColours[2]=lossColour.toHEXString()
      changeMap()
    }

    // Backdrop - keeping because useful reminder of impelmentation of button group
    // var $bgrp = $('<div class="btn-group" data-toggle="buttons" style="margin-top: 1em">').appendTo($(selector))
    // var $greyLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
    // $('<input type="radio" name="mapBackground" value="grey_elevation_300">').appendTo($greyLabel)
    // $greyLabel.append("Grey elev")
    // var $colourLabel = $('<label class="btn btn-primary active">').appendTo($bgrp)
    // $('<input type="radio" name="mapBackground" value="colour_elevation" checked>').appendTo($colourLabel)
    // $colourLabel.append("Colour elev")
    // var $noneLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
    // $('<input type="radio" name="mapBackground" value="">').appendTo($noneLabel)
    // $noneLabel.append("None")

    // $('input[type=radio][name="mapBackground"]').change(function() {

    //   var greyelev = false
    //   var colourelev = false
    //   var opt = $(this).val()
    //   if (opt) {
    //     if (opt === 'grey_elevation_300') {
    //       greyelev = true
    //     }
    //     if (opt === 'colour_elevation') {
    //       colourelev = true
    //     }
    //   }
    //   staticMap.basemapImage('greyelev', greyelev, rasterRoot + 'grey_elevation_300.png', rasterRoot + 'grey_elevation_300.pgw')
    //   staticMap.basemapImage('colourelev', colourelev, rasterRoot + 'colour_elevation.png', rasterRoot + 'colour_elevation.pgw')
    // });
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

  function setCookie(cname, cvalue, exdays) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays*24*60*60*1000))
    var expires = "expires="+ d.toUTCString()
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
  }

  function getCookie(cname) {
    var name = cname + "="
    var decodedCookie = decodeURIComponent(document.cookie)
    var ca = decodedCookie.split(';')
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length)
      }
    }
    return ""
  }

})(jQuery, Drupal, drupalSettings)