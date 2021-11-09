 
var bsbiDataRoot
(function ($, Drupal, drupalSettings) {

  console.log('Identifier', drupalSettings.bsbi_atlas.identifier)

  //bsbiatlas.setDataRoot(drupalSettings.bsbi_atlas.dataRoot + 'atlas_taxa_2020_08_25/hectad-dateclass-status/')

  bsbiDataRoot = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/atlas_taxa_2020_08_25/hectad-dateclass-status/'
  var captionRoot = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/captions/'
  var apparencyRoot = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/apparency/'
  var phenologyRoot = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/phenology/'
  var bsbidburl = drupalSettings.bsbi_atlas.dataBsbidb
  var rasterRoot = drupalSettings.bsbi_atlas.dataRoot + 'rasters/'
  var taxaCsv = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/taxon_list.csv'
  var taxaNoStatusCsv = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/no_status.csv'
  var taxaHybridsCsv = drupalSettings.bsbi_atlas.dataRoot + 'bsbi/hybrids.csv'
  var taxaList = []
  var taxaNoStatusList = []
  var taxaHybridList = []
  var currentTaxon = {
    identifier: null,
    name: null,
    tetrad: null,
    parent1: '',
    parent2: '',
    //monad: null
  }
  var gridStyle = getCookie('gridstyle') ? getCookie('gridstyle') : 'solid'
  var slippyMap, staticMap
  var phen1, phen2
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

    // Meta tags
    setBaseMetaTags()
    
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

  function addMetaTags(type, value, update) {

    function addHeadTag(name, content, update) {
      if (update) {
        $('meta[name="' + name + '"').attr('content', content) 
      } else {
        $('head').append('<meta name="' + name + '" content="' + content + '" />') 
      }
    }

    // http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata
    switch(type) {
      case 'title':
        $('title').html(value)
        addHeadTag("citation_title", value, update)
        addHeadTag("dc.title", value, update)
        addHeadTag("dcterms.title", value, update)
        addHeadTag("prism.alternateTitle", value, update)
        addHeadTag("eprints.title", value, update)
        addHeadTag("bepress_citation_title", value, update)
        break
      case 'author':
        addHeadTag("citation_author", value)
        addHeadTag("dc.creator", value)
        addHeadTag("dcterms.creator", value)
        addHeadTag("eprints.creators_name", value)
        addHeadTag("bepress_citation_author", value)
        break
      case 'authors':
        addHeadTag("author", value)
        addHeadTag("citation_authors", value)
        break
      case 'year':
        addHeadTag("citation_year", value)
        addHeadTag("citation_date", value)
        addHeadTag("citation_publication_date", value)
        addHeadTag("dc.date", value)
        addHeadTag("dcterms.date", value)
        addHeadTag("dcterms.created", value)
        addHeadTag("prism.copyrightYear", value)
        addHeadTag("prism.coverDate", value)
        addHeadTag("prism.publicationDate", value)
        addHeadTag("eprints.datestamp", value)
        addHeadTag("eprints.date", value)
        addHeadTag("bepress_citation_date", value)
        break
      case 'url':
        addHeadTag("citation_public_url", value)
        addHeadTag("prism.url", value)
        addHeadTag("eprints.official_url", value)
        addHeadTag("bepress_citation_pdf_url", value)
    }
  }

  function setBaseMetaTags() {
    addMetaTags('title', 'BSBI Online Atlas 2020')
    addMetaTags('authors', 'Stroh, P. A., Humphrey, T., Burkmar, R. J., Pescott, O. L., , Roy, D.B., and Walker, K. J.')
    addMetaTags('author', 'Stroh, P. A.')
    addMetaTags('author', 'Humphrey, T.')
    addMetaTags('author', 'Burkmar, R. J.')
    addMetaTags('author', 'Pescott, O. L.')
    addMetaTags('author', 'Roy, D. B.')
    addMetaTags('author', 'Walker, K. J.')
    addMetaTags('year', '2022')
    addMetaTags('url', location.origin + '/atlas')
  }

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
          changeMap()
        } else {
          $('.bsbi-atlas-map-controls').hide()
        }

        if (target === '#bsbi-atlas-section-ecology') {
          console.log('ecology tab aselected')
          changeEcology()
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

    var $taxon = $('<div class="bsbi-selected-taxon-name bsbi-section-summary"></div>').appendTo($right)
    $taxon.css('font-size', '1.3em')
    $right.append('<hr/>')
    $right.append('<div id="bsbi-caption"></div>')
    
    createMaps("#bsbiMapDiv")
    createMapControls('.bsbi-atlas-map-controls')
    setControlState()
    sectionEnd($sect, tabs)
  }

  function sectionEcology(id, tabs) {
    var $sect, $p, $h
    $sect = $('#bsbi-atlas-section-' + id)
    $sect.append('<div id="bsbi-phenology"></div>')

    createPhenology("#bsbi-phenology")

    sectionEnd($sect, tabs)
  }

  function createPhenology(sel) {

    var $h = $('<h4>').appendTo($(sel)).text('Phenology')

    var $p1 = $('<p>').appendTo($(sel))
    $p1.text("Explanation of apparency and phenology charts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.")
    
    $phenFlexParent = $('<div>').appendTo($(sel))
    $phenFlexParent.attr('class', 'phenRow')
    $phenFlexLeft = $('<div>').appendTo($phenFlexParent)
    $phenFlexLeft.attr('class', 'phenColumn')
    $phenFlexRight = $('<div>').appendTo($phenFlexParent)
    $phenFlexRight.attr('class', 'phenColumn')

    $apparency = $('<div>').appendTo($phenFlexLeft)
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

    $phenology = $('<div>').appendTo($phenFlexLeft)
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

    $phenSource = $('<div>').appendTo($phenFlexLeft)
    $phenSource.attr('id', 'bsbi-phenology-source')
    $phenSource.css('font-size', '0.8em')
    $phenSource.css('padding-left', '32px')
    $phenSource.css('max-width', '400px')

    $apparencyByLat = $('<div>').appendTo($phenFlexRight)
    $apparencyByLat.attr('id', 'bsbi-apparency-by-lat-chart').css('max-width', '400px')

    phen3 = brccharts.phen1({
      selector: '#bsbi-apparency-by-lat-chart',
      data: [],
      taxa: ['taxon'],
      metrics: [],
      lines: ['white', 'white', '#dddddd', 'white', 'white', '#dddddd', 'white', 'white', '#dddddd', 'white', 'white', '#dddddd'],
      width: 400,
      height: 410,
      spread: true,
      perRow: 1,
      expand: true,
      showTaxonLabel: false,
      showLegend: false,
      interactivity: 'mousemove'
    })

    // Website style is overriding some charts style, so reset it
    $('.brc-chart-phen1').css('overflow', 'visible')

    // Chart line width - not currently a chart option
    $('#bsbi-apparency-by-lat-chart .phen-path').css('stroke-width', 1)
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
    opacitySlider(mapControlRow(selector))
    trendControl(mapControlRow(selector))
    backdropSelector(mapControlRow(selector, 'atlas-backdrop-selector'))

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
      insetRadios(mapControlRow(sel,'atlas-inset-control'), i)
      gridStyleRadios(mapControlRow(sel, 'atlas-grid-type-control'), i)
      resolutionControl(mapControlRow(sel, 'atlas-resolution-control'), i)
      mapImageButton(mapControlRow(sel, 'atlas-image-button'), i)
    })

    //devStuff(selector)
  }

  function setControlState() {

    // map display
    if (displayedMapType === "static") {
      $('#slippyAtlasMain').hide()
      $('#staticAtlasMain').show()
    } else {
      $('#staticAtlasMain').hide()
      $('#slippyAtlasMain').show()
    }

    // save map image button
    if (displayedMapType === 'static') {
      $('.atlas-save-map-image').show()
    } else {
      $('.atlas-save-map-image').hide()
    }

    // backdrop selector
    if (displayedMapType === "static") {
      $('.atlas-backdrop-selector').show()
    } else {
      $('.atlas-backdrop-selector').hide()
    }

    // inset control
    if (displayedMapType === "static") {
      $('.atlas-inset-control').show()
    } else {
      $('.atlas-inset-control').hide()
    }

    // grid type control
    if (displayedMapType === "static") {
      $('.atlas-grid-type-control').show()
    } else {
      $('.atlas-grid-type-control').hide()
    }

    // period slider visibility
    if (mapType === 'status') {
      $('.atlas-period-slider-control').show()
    } else {
      $('.atlas-period-slider-control').hide()
    }

    // trend slider control
    if (mapType === 'trends') {
      $('.atlas-trend-slider-control').show()
    } else {
      $('.atlas-trend-slider-control').hide()
    }

    // show status checkbox
    if (mapType === 'allclass' || mapType === 'slippy') {
      $('.atlas-status-checkbox-control').show()
    } else {
      $('.atlas-status-checkbox-control').hide()
    }

    // show opacity slider
    if (displayedMapType === 'slippy') {
      $('.atlas-opacity-slider-control').show()
    } else {
      $('.atlas-opacity-slider-control').hide()
    }

    // status checkbox enabled and checked value
    var disableStatus = taxaNoStatusList.indexOf(currentTaxon.identifier) > -1
    if (disableStatus) {
      showStatus = false
      bsbiDataAccess.showStatus = false
      $('.atlas-status-checkbox-control span').text('No status info for this taxon')
      $('.atlas-status-checkbox-control span').css('color', 'silver')
    } else {
      $('.atlas-status-checkbox-control span').text('Show status')
      $('.atlas-status-checkbox-control span').css('color', 'black')
    }
    if (disableStatus || (displayedMapType === 'slippy' && mapType === 'allclass' && resolution !== 'hectad')) {
      console.log('disable')
      // Uncheck and disable status checkbutton if not hectad resolution or no status info
      $('.atlas-status-checkbox').prop('checked', false)
      $('.atlas-status-checkbox').attr('disabled', true)
    } else {
      // Display and set checked status to current value of showStatus global
      $('.atlas-status-checkbox').attr('disabled', false)
      $('.atlas-status-checkbox').prop('checked', showStatus)
    }

    // atlas resolution control visibility
    if (displayedMapType === "slippy" && mapType === 'allclass') {
      $('.atlas-resolution-control').show()
    } else {
      $('.atlas-resolution-control').hide()
    }

    // atlas resolution control value and global variables
    if (displayedMapType === "slippy" && mapType === 'allclass') {
      // Reset resolution if currently set to a value that is not
      // appropriate for the taxon
      if (resolution === 'tetrad' && !currentTaxon.tetrad) {
        resolution = 'hectad'
      }
      bsbiDataAccess.resolution = resolution

      // Ensure right option is selected
      $('.bsbi-resolution-' + resolution).prop('checked', true)

      // Enable/disable tetrad option as appropriate
      if (currentTaxon.tetrad) {
        $('.bsbi-resolution-tetrad').attr('disabled', false)
      } else {
        $('.bsbi-resolution-tetrad').attr('disabled', true)
      }
    } else {
      bsbiDataAccess.resolution = 'hectad'
    }

    // Enable/disable the hybrid map type option as appropriate
    var isHybrid = currentTaxon.parent1 !== ''
    var $hybridopts = $('.atlas-map-type-selector option[value="hybrid"]') 
    if (isHybrid) {
      $hybridopts.show()
    } else {
      $hybridopts.hide()
      // Select another option if currently selected
      if (mapType === 'hybrid') {
        $hybridopts.prop('selected', false)
        $('.atlas-map-type-selector option[value="allclass"]').prop('selected', true)
        mapType='allclass'
      }
    }
    $('.atlas-map-type-selector').selectpicker('refresh')
  }

  function gridStyleRadios($parent, i) {
    // Overall control container
    var $container = $('<div>').appendTo($parent)

    function makeRadio(label, val, checked) {
      //$('<div class="radio"><label><input type="radio" name="atlas-grid-type" value="'+ val + '" ' + checked + '>' + label + '</label></div>').appendTo($container)
    
      var $div = $('<div>').appendTo($container)
      $div.attr('class', 'radio')
      var $label = $('<label>').appendTo($div)
      $label.css('padding-left', '0')
      var $radio = $('<input>').appendTo($label)
      var $span = $('<span>').appendTo($label)
      $span.text(label)
      $span.css('padding-left', '20px')
      $radio.attr('type', 'radio')
      $radio.attr('name', 'atlas-grid-type-' + i)
      $radio.attr('class', 'atlas-grid-type-' + val)
      $radio.attr('value', val)
      $radio.css('margin-left', 0)
      if (checked) $radio.prop('checked', true)

      $radio.change(function () {
        gridStyle = $(this).val()
        setCookie('gridstyle', gridStyle, 30)
        staticMap.setGridLineStyle(gridStyle)
        // Update controls mirrored in other blocks
        $('.atlas-grid-type-' + val).prop("checked", true)
      })
    }
    makeRadio('Solid grid lines', 'solid', gridStyle === 'solid' ? 'checked' : '')
    makeRadio('Dashed grid lines', 'dashed', gridStyle === 'dashed' ? 'checked' : '')
    makeRadio('No grid lines', 'none', gridStyle === 'none' ? 'checked' : '')
  }

  function devStuff($parent) {

    // dev only
    var $container = $('<div id="slippy-dev" style="padding: 0.5em; display: none; background-color: yellow">').appendTo($parent)

    var $title = $('<div>').appendTo($container)
    $title.html('<b>Testing tetrad styles &amp; performance</b>')
    
    var $radios = $('<div style="margin-top: 0.5em">').appendTo($container)
    $('<input type="radio" name="symboltype" value="circle" id="symb-poly-circle">').appendTo($radios)
    $('<label for="symb-poly-circle" style="font-weight: 500">').html('&nbsp;Polygon circles').appendTo($radios)
    
    $('<br/><input type="radio" name="symboltype" value="square" id="symb-poly-square">').appendTo($radios)
    $('<label for="symb-poly-square" style="font-weight: 500">').html('&nbsp;Polygon squares').appendTo($radios)

    $('<br/><input type="radio" name="symboltype" value="circlerad" id="symb-circle">').appendTo($radios)
    $('<label for="symb-circle" style="font-weight: 500">').html('&nbsp;SVG Circles').appendTo($radios)

    $('#symb-poly-circle').prop( "checked", true )

    $('input[name="symboltype"]').on("change", function() {
      console.log($('input[name="symboltype"]:checked').val())
      bsbiDataAccess.devel.symboltype=$('input[name="symboltype"]:checked').val()
      changeMap()
    })

    $('<div id="dev-download-time">').appendTo($container)
    $('<div id="dev-display-time">').appendTo($container)
  }

  function mapInterfaceToggle($parent) {

    var $container = $('<div style="display: flex">').appendTo($parent)

    // Buttons
    var $bgrp = $('<div class="btn-group" data-toggle="buttons">').appendTo($container)

    var $staticLabel = $('<label class="btn btn-primary active">').appendTo($bgrp)
    var $staticButton = $('<input type="radio" name="mapType" value="static" checked>').appendTo($staticLabel)
    $staticLabel.append("Overview")

    var $slippyLabel = $('<label class="btn btn-primary">').appendTo($bgrp)
    var $slippyButton = $('<input type="radio" name="mapType" value="slippy">').appendTo($slippyLabel)
    $slippyLabel.append("Zoomable")

    // Busy indicator
    var $loader = $('<div id="atlas-loader" style="display: none">').appendTo($container) 
    var $spinner = $('<div class="atlas-loader">').appendTo($loader)

    $('input[type=radio][name="mapType"]').change(function() {
      displayedMapType = $(this).val()
      bsbiDataAccess.displayedMapType = displayedMapType

      if (displayedMapType === "slippy") {
        // Get current width of static map
        var $svg = $('#staticAtlasMain svg')
        var w = $svg.width()
        var h = $svg.height()
        setControlState()
        slippyMap.setSize(w, h)

        slippyMap.setLegendOpts(slippyLegendOpts)
        
        // Dev only stuff...
        // $('#slippy-dev').show()
      } else {
        setControlState()

        // Dev only stuff...
        // $('#slippy-dev').hide()
      }
      changeMap()
    })
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
      {
        caption: 'Map hybrid with parents',
        val: 'hybrid'
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
    //$sel.addClass('atlas-backdrop-selector')
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

  function mapImageButton($parent, i) {

    var imageType = 'png'

    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.addClass('atlas-save-map-image')
    $container.hide()

    var $button = $('<button>').appendTo($container)
    $button.addClass('btn btn-default')
    $button.text('Download image')
    $button.on('click', function(){
      console.log('download', imageType)
      staticMap.saveMap(imageType === 'svg')
    })

    makeRadio('PNG', 'png', true)
    makeRadio('SVG', 'svg', false)

    function makeRadio(label, val, checked) {

      var $div = $('<div>').appendTo($container)
      $div.css('display', 'inline-block')
      $div.css('margin-left', '0.5em')
      $div.attr('class', 'radio')
      var $label = $('<label>').appendTo($div)
      $label.css('padding-left', '0')
      var $radio = $('<input>').appendTo($label)
      var $span = $('<span>').appendTo($label)
      $span.text(label)
      $span.css('padding-left', '20px')
      $radio.attr('type', 'radio')
      $radio.attr('name', 'download-type-' + i)
      $radio.attr('class', 'download-type-' + val)
      $radio.attr('value', val)
      $radio.css('margin-left', 0)
      if (checked) $radio.prop('checked', true)

      $radio.change(function () {
        // Update controls mirrored in other blocks
        $('.download-type-' + val).prop("checked", true)
        imageType = val
      })
    }
  }

  function opacitySlider($parent) {

    const initOpacity = 70
    $('#atlas-leaflet-svg').css('opacity', initOpacity/100)
    
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.addClass('atlas-opacity-slider-control')
    $container.hide()

    // Label
    var $sliderLabel = $('<div>').appendTo($container)
    $sliderLabel.addClass('atlas-opacity-slider-label')
    $sliderLabel.text('Opacity:')

    // Slider
    var $sliderContainer = $('<div>').appendTo($container)
    $sliderContainer.addClass('slidecontainer')
    $sliderContainer.addClass('atlas-opacity-slider-slider')
    var $slider = $('<input>').appendTo($sliderContainer)
    $slider.addClass('slider')
    $slider.attr('type', 'range').attr('min', '1').attr('max', '100').attr('value', initOpacity).attr('id', 'atlas-opacity-slider')
    $slider.change(function() {
      $('#atlas-leaflet-svg').css('opacity', $(this).val()/100)
    })
  }

  function statusCheckbox($parent) {
    // Overall control container
    var $container = $('<div>').appendTo($parent)
    $container.addClass('atlas-status-checkbox-control')

    // Status on/off toggle
    var $checDiv = $('<div class="checkbox">').appendTo($container)
    //$checDiv.css('margin-top', '4.3em')

    $('<label><input type="checkbox" class="atlas-status-checkbox"/><span>Show status</span></label>').appendTo($checDiv)

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
    //makeRadio('Monads', 'monad', false)
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
    //$container.attr('id', 'atlas-inset-control')

    function makeRadio(label, val, checked) {
      var $div = $('<div>').appendTo($container)
      $div.attr('class', 'radio')
      var $label = $('<label>').appendTo($div)
      $label.css('padding-left', '0')
      var $radio = $('<input>').appendTo($label)
      var $span = $('<span>').appendTo($label)
      $span.text(label)
      $span.css('padding-left', '20px')
      $radio.attr('type', 'radio')
      $radio.attr('name', 'bsbi-inset-type-' + i)
      $radio.attr('class', 'bsbi-inset-type-' + val)
      $radio.attr('value', val)
      $radio.css('margin-left', 0)
      if (checked) $radio.prop('checked', true)

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
      'distAllClasses': bsbiDataAccess.distAllClasses,
      'hybrid': bsbiDataAccess.hybrid
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
      gridLineStyle: gridStyle,
      boundaryColour: '#7C7CD3',
    })
    //staticMap.basemapImage('greyelev', true, rasterRoot + 'grey_elevation_300.png', rasterRoot + 'grey_elevation_300.pgw')
    // Initial backgrop image
    staticMap.basemapImage('colour_elevation', true, rasterRoot + 'colour_elevation.png', rasterRoot + 'colour_elevation.pgw')
    //staticMap.basemapImage('greyelev', false)

    // Callbacks for slippy maps
    function startLoad() {
      t1 = Math.floor(Date.now() / 100)
      document.getElementById('atlas-loader').style.display = 'inline-block'
      //document.getElementById('dev-download-time').innerHTML= "Downloading data..."
    }
    function endLoad() {
      document.getElementById('atlas-loader').style.display = 'none'
      //var t2 = Math.floor(Date.now() / 100)
      //document.getElementById('dev-download-time').innerHTML= "Downloading took <b>" + String((t2-t1)/10) + "</b> seconds"
    }
    function startDraw() {
      //t1 = Math.floor(Date.now() / 100)
      document.getElementById('atlas-loader').style.display = 'inline-block'
      //document.getElementById('dev-display-time').innerHTML= "Displaying data..."
    }
    function endDraw() {
      document.getElementById('atlas-loader').style.display = 'none'
      //var t2 = Math.floor(Date.now() / 100)
      //document.getElementById('dev-display-time').innerHTML= "Displaying took <b>" + String((t2-t1)/10) + "</b> seconds"
    }

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
      callbacks: [startDraw, endDraw, startLoad, endLoad]
    })
    $('#slippyAtlasMain').hide()
  }

  // return a promise
  function copyToClipboard(textToCopy) {
    // https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
    // navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(textToCopy)
    } else {
      // text area method
      let textArea = document.createElement("textarea")
      textArea.value = textToCopy
      // make the textarea out of viewport
      textArea.style.position = "fixed"
      textArea.style.left = "-999999px"
      textArea.style.top = "-999999px"
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand('copy') ? res() : rej()
          textArea.remove()
      })
    }
  }

  function taxonSelectors(selector) {
    //var $sel = $('<select>').appendTo($(selector))

    // Get list of taxa for which no status exists
    // (for use elsewhere - might as well be done here)
    d3.csv(taxaNoStatusCsv).then(function(data) {
      console.log('Taxa with no status info', data)
      taxaNoStatusList = data.map(function(d) {return d['ddb id']})
    })

    // Overall control container
    var $container = $('<div>').appendTo($(selector))
    $container.addClass('atlas-taxon-selector-div')

    // Selector
    var $sel = $('<select>').appendTo($container)
    $sel.addClass('atlas-taxon-selector-sel')

    // Slider
    var $link = $('<button>').appendTo($container)
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

    d3.csv(taxaCsv).then(function(data) {
      taxaList = data
      taxaList.forEach(function(d) {
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
        //$opt.attr('data-monad', d['monad'])

        $opt.html(name).appendTo($sel)
      })

      $sel.attr('data-size', '10')
      $sel.attr('data-live-search', 'true')
      $sel.attr('data-header', 'Start typing the name of a taxon')
      $sel.attr('title', 'Select a taxon to display')
      //$sel.attr('data-width', '100%')
      $sel.selectpicker()
      $sel.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

        console.log('Identifier:', $(this).val())
        currentTaxon.identifier = $(this).val()
        currentTaxon.name =  $(this).find(":selected").attr("data-content")
        currentTaxon.tetrad = $(this).find(":selected").attr("data-tetrad")
        //currentTaxon.monad = $(this).find(":selected").attr("data-monad")
        var hybrid = taxaHybridList.find(function(h){return h.taxon === currentTaxon.identifier})
        currentTaxon.parent1 = hybrid ? hybrid.parent1 : ''
        currentTaxon.parent2 = hybrid ? hybrid.parent2 : ''
        //$('.bsbi-selected-taxon-name').html(currentTaxon.name)
        setControlState()
        changeMap()
        changeCaption() //Also changes taxon name display in sections
        changeEcology()
      })

      // If identifier passed in URL, set the value
      if (drupalSettings.bsbi_atlas.identifier) {
        $sel.selectpicker('val', drupalSettings.bsbi_atlas.identifier)
      }

      // Get list of hybrid taxa which can be mapped with their parents
      // Thi is done after taxon list loaded so that data can be enriched
      // with names.
      d3.csv(taxaHybridsCsv, function(h) {
        
        var mTaxon = taxaList.find(function(t){return t['ddb id'] === h.taxon.trim()})
        var mParent1 = taxaList.find(function(t){return t['ddb id'] === h.parent1.trim()})
        var mParent2 = taxaList.find(function(t){return t['ddb id'] === h.parent2.trim()})

        return {
          taxon: h.taxon.trim(),
          parent1: h.parent1.trim(),
          parent2: h.parent2.trim(),
          taxonName: mTaxon['taxon name'],
          parent1Name: mParent1['taxon name'],
          parent2Name: mParent2['taxon name'],
        }
      }).then(function(data) {
        console.log(data)
        taxaHybridList = data
        bsbiDataAccess.taxaHybridList = data
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
    } else if (mapType === 'hybrid') {
      displayedMap.setMapType('hybrid')
      //slippyLegendOpts.width=110
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

  function postProcessCaptionText(txt) {
    var txtn = txt
    txtn  = txtn.replace(/href="\/object.php/g, 'target="_blank" href="' + bsbidburl + 'object.php')
    txtn  = txtn.replace(/href='\/object.php/g, 'target=\'_blank\' href=\'' + bsbidburl + 'object.php')
    return txtn
  }

  function getFormattedTaxonName(vernacular, scientific, authority) {
    var vernacular = vernacular ? '<span class="taxname"><b>' + vernacular + ' </b></span>' : ''
    var scientific = scientific ? '<span class="taxname"><i>' + scientific + ' </i></span>' : ''
    var authority = authority ? '<span class="taxname"><span style="color: grey">' + authority + '</span></span>' : ''

    return vernacular + scientific + authority
  }

  function changeEcology() {
   
    if (!currentTaxon.identifier) return 

    // Apparency all
    var file = apparencyRoot + 'all/' + currentTaxon.identifier.replace(/\./g, "_") + '.csv'
    d3.csv(file + '?prevent-cache=')
      .then(function(data) {
        apparency(data)
      })
      .catch(function() {
        // TEMPORARY CODE FOR TESTING so that a file always returned 
        var fileDefault = apparencyRoot + 'all/dummy.csv'
        d3.csv(fileDefault + '?prevent-cache=')
          .then(function(data) {
            apparency(data)
          })
      })

    // Apparency by latitude
    var file = apparencyRoot + 'byLat/' + currentTaxon.identifier.replace(/\./g, "_") + '.csv'
    d3.csv(file + '?prevent-cache=')
      .then(function(data) {
        apparencyByLat(data)
      })
      .catch(function() {
        // TEMPORARY CODE FOR TESTING so that a file always returned 
        var fileDefault = apparencyRoot + 'byLat/dummy.csv'
        d3.csv(fileDefault + '?prevent-cache=')
          .then(function(data) {
            apparencyByLat(data)
          })
      })

    // For Oli's stuff October - reformatted 
    function apparency(data) {
      // Map text to numeric values and add taxon
      const numeric = data.map(d => {
        return {
          taxon: 'taxon',
          week: Number(d.week),
          n: Number(d.n)
        }
      })
      // Sort it - just in case
      const sorted = numeric.sort((a,b) => a.week > b.week)
      // Update the apparency chart
      phen1.setChartOpts({
        data: sorted,
      })
    }

    function apparencyByLat(data) {
      // Map text to numeric values and add taxon
      const numeric = data.map(d => {
        var nd = {taxon: 'taxon'}
        Object.keys(d).forEach(function(k){
          nd[k] = Number(d[k])
        })
        return nd
      })

      var latitudes = Object.keys(data[0]).filter(f => f.length === 2)
      var metrics = latitudes.map(l => {
        return {prop: l, label: l, colour: 'green', fill: '#ddffdd' }
      })

      // Sort it - just in case
      const sorted = numeric.sort((a,b) => a.week > b.week)
      // Update the apparency chart
      phen3.setChartOpts({
        data: sorted,
        metrics: metrics
      })
    }

    // Phenology
    var file = phenologyRoot + currentTaxon.identifier.replace(/\./g, "_") + '.csv'
    d3.csv(file + '?prevent-cache=')
      .then(function(data) {
        phenology(data)
      })
      .catch(function() {
        // TEMPORARY CODE FOR TESTING so that a file always returned 
        var fileDefault = phenologyRoot + 'dummy-phenology.csv'
        d3.csv(fileDefault + '?prevent-cache=')
          .then(function(data) {
            phenology(data)
          })
      })
    function phenology(data) {
      console.log("phenology data", data[0])

      // Chart
      m2d = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 365]
      var flower = data[0].flower.split('-')
      var leaf = data[0].leaf.split('-')

      var flowerStart = m2d[Number(flower[0])-1]
      var flowerEnd = flower[1] ? m2d[Number(flower[1])] : m2d[Number(flower[0])]
      var leafStart = m2d[Number(leaf[0])-1]
      var leafEnd = leaf[1] ? m2d[Number(leaf[1])] : m2d[Number(leaf[0])]

      var svgLeaf="m12941 19084-175-112-108 54c-59 30-112 54-117 54s-97-112-203-250l-193-250h-150-151l-177-188c-97-104-186-197-197-207-19-17-23-16-139 49-66 36-124 66-128 65-6 0-219-276-359-464-10-14-30-7-149 53l-138 70-26-32c-15-17-103-124-195-238-92-115-171-208-175-208s-61 25-127 55l-119 55-90-92c-50-51-149-155-220-230l-130-138-112 100c-61 55-115 100-120 100-4 0-123-122-263-269-140-148-260-270-266-270-5-1-65 39-131 88l-122 90-233-207c-129-114-264-233-300-265l-66-58-138 80-139 80-139-147c-77-81-181-189-231-240l-91-94-161 80-160 81-169-201c-93-110-176-209-184-219-15-19-19-18-174 26-87 25-162 42-167 39s-79-90-164-194c-140-171-158-188-178-181-12 5-73 30-134 56-62 26-116 45-121 43-5-1-105-104-222-226-192-202-216-223-239-218-14 3-82 23-151 44l-126 38-249-262c-138-145-252-263-255-263s-45 55-95 124c-49 68-92 121-96 117s-98-138-209-299l-201-292-138 69-139 69-223-336c-123-184-227-339-230-344s-83-20-177-33c-95-12-174-25-176-27s-52-107-111-234c-59-126-111-233-114-237-4-4-62 8-130 27-69 19-125 34-127 32-1-1-57-139-125-307-67-168-124-307-125-309-2-2-69-14-150-27-80-12-147-24-149-26-3-2-30-125-60-273-31-149-58-272-60-274-3-2-68 2-146 8-77 7-144 10-147 6-3-3-16-132-28-286s-23-281-25-283-79-18-171-36l-168-34-2-380-3-381-193-79c-139-57-192-84-192-95 0-9 29-149 65-310s65-295 63-296c-2-2-86-43-188-91s-188-90-192-93 45-170 108-371l114-365-67-65c-38-36-110-104-162-152l-93-86 136-329c75-181 136-332 136-337 0-4-58-90-128-190-71-99-132-187-136-194-6-10 62-142 290-561 15-26 21-48 16-55-5-6-66-82-135-170-70-87-127-162-127-166 0-5 108-183 239-396l240-387-90-99c-49-54-89-102-89-107s111-164 246-353c136-188 253-353 261-365 13-20 10-32-43-149-55-124-56-128-38-143 11-9 182-159 381-334l361-317-5-43c-3-23-13-105-24-182-10-77-16-141-15-143 4-3 510-150 857-248 15-4 13-20-18-141-18-74-32-137-31-139 2-1 138-21 303-42 279-37 309-43 431-86 238-83 552-155 824-188 141-17 699-17 840 0 648 79 1266 287 1860 624 111 64 378 237 494 320 46 34 67 44 62 32-4-11-35-107-68-214-397-1294-750-2359-915-2764-72-178-107-247-165-332-72-104-110-172-148-269-56-142-97-325-73-325 29 0 420 94 429 104 6 6 46 128 89 271 42 143 142 478 222 745 79 267 202 679 273 915 71 237 185 621 255 855s151 506 181 604c30 99 54 185 54 193 0 27 18 12 35-30 31-80 204-397 305-558 282-454 581-807 1323-1564l245-250 114 113c62 61 116 112 120 112s118-122 253-270c136-149 250-270 254-270 3 0 40 68 81 151s78 152 82 155c3 2 122-66 263-152 180-110 259-153 264-145 5 7 18 57 30 112l22 99h515c283 0 514 1 514 3s-20 52-44 112l-44 110 479 3c310 1 479 6 479 12s-14 58-31 116-30 106-28 108c2 1 179 26 392 56 214 30 392 57 398 60 5 4-4 44-21 95-16 49-30 94-30 100 0 7 112 32 288 64 158 29 296 55 307 58 20 4 20 7 9 141-7 75-12 138-11 138 5 5 558 214 564 214 5 0 14 4 21 9 13 8 10 15-74 227-3 5 144 82 326 169 181 88 330 164 330 170s-30 84-66 174c-53 134-63 166-52 176 7 7 105 85 218 175s210 168 217 174c9 8-1 46-42 164-30 84-55 157-55 162s101 91 225 190 225 183 225 186-56 66-124 140l-125 135 194 217c107 119 195 219 194 222 0 3-45 41-100 85-54 44-111 90-125 101l-26 21 145 289c80 159 147 294 148 299 1 6-25 25-57 44-33 18-78 44-101 57l-41 24 124 226c69 124 124 229 122 234-2 4-42 42-90 84l-87 76 28 63c15 34 72 158 126 276l98 214-39 36c-21 20-68 61-103 93l-64 56 136 261c76 144 137 263 137 265 0 3-57 23-127 46-71 24-132 46-136 50-4 3 33 128 82 276s88 270 86 272-45-6-95-18c-51-11-95-19-98-16-5 6-4 13 77 405 28 135 49 246 47 248-1 2-36-11-76-27-39-17-74-30-76-27-2 2 1 111 6 243 5 131 10 284 10 339v100l-87-10c-49-6-89-8-90-5s29 140 66 305 67 301 66 303c-2 2-53-22-114-52-91-46-111-53-111-39 0 10 9 144 20 298s20 297 20 317v37l-72-20c-40-11-81-22-90-25-17-5-18 16-18 350 0 278-3 356-12 356-7 0-53-9-102-20s-91-19-92-17c-1 1-17 106-35 232-18 127-35 233-38 237-3 3-39-7-79-24s-74-29-76-27c-3 2-15 155-27 339s-23 336-25 338c-1 2-45-15-98-39-53-23-99-39-102-36s-17 167-30 364c-12 197-23 359-24 361 0 1-43-32-96-73s-99-75-103-75-26 141-50 313c-23 171-44 319-47 328-4 14-14 14-102-6-53-12-100-20-103-16-4 3-31 143-60 309-30 167-57 309-61 315-4 7-30 0-77-21-39-18-73-32-76-32s-5 149-5 330c0 182-3 330-6 330s-49-29-101-65c-53-36-97-64-98-63-2 2-8 154-15 338-6 184-13 337-15 338-2 2-40-24-85-57-44-34-84-61-89-61-4 0-7 10-5 23 2 12 11 139 19 282s18 291 21 329l6 69-126-5c-114-5-126-4-122 11 8 27 126 657 126 673 0 10-37 25-115 48-104 30-114 35-110 54 3 12 16 71 30 131 102 438 125 539 125 551 0 10-24 14-99 16l-98 3 112 248 113 248-27 10c-14 6-61 22-104 35l-77 25 52 97c28 53 75 142 105 196 29 55 52 100 51 101-2 1-42 17-90 35-49 18-88 38-88 45s11 86 25 175c14 90 24 166 23 170-2 4-81-43-177-106z"
      var svgFlower="M1048.256,633.499c212.849-356.854,285.555-335.845-191.845-590.438C384.889,283.217,484.493,353.496,664.566,633.499 c-310.065-285.921-239.639-396.021-620.823,0c64.157,504.336,28.591,448.084,502.257,364.911 c-416.078,181.718-421.368,113.233-191.845,590.438c503.843,103.322,428.181,97.12,502.257-364.911 c69.825,407.236,10.978,486.041,502.257,364.911c233.666-457.592,211.268-427.46-191.845-590.438 c452.881,101.063,461.097,199.985,502.257-364.911C1305.872,228.612,1381.606,318.787,1048.256,633.499z M856.411,1100.523 c-114.579,0-207.463-92.884-207.463-207.463s92.884-207.463,207.463-207.463c114.578,0,207.463,92.884,207.463,207.463 S970.989,1100.523,856.411,1100.523z"

      phen2.setChartOpts({
        data: [
          {
            taxon: 'taxon',
            band2: {start: leafStart, end: leafEnd},
            band1: {start: flowerStart, end: flowerEnd},
          }
        ],
        metrics: [
          { prop: 'band2', label: 'In leaf', colour: '#00990066', svg: svgLeaf },
          { prop: 'band1', label: 'Flowering', colour: '#ff9900aa', svg: svgFlower },
        ]
      })
      // Source
      $source = "Data for flower phenology from <i>" + data[0].flowerSource + "</i>. Data for leafing phenology from <i>" + data[0].leafSource + "</i>."
      $('#bsbi-phenology-source').html($source)
    }
  }

  function changeCaption() {
    var $p
    var $caption = $('#bsbi-caption')
    $caption.html('')
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
          var $ul = $('<ul id="bsbi-taxa-covered-list">').appendTo($caption)
          ddbids = d[0].captionedChildTaxonIds.split(';')
          ddbids.forEach(function(ddbid) {
            var $li = $('<li>').appendTo($ul)
            var taxon = taxaList.find(function(t) {return t['ddb id'] === ddbid})
            if (taxon) {
              $li.html(getFormattedTaxonName(taxon['vernacular'], taxon['taxon name'], taxon['authority']))
            }
          })
          var taxaCoveredShown = false
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
          var $ul = $('<ul>').appendTo($caption)
          d[0].captionAuthors.split(';').forEach(function(a) {
            var $li = $('<li>').appendTo($ul)
            $li.text(a)
          })
        }

        // Citation
        $caption.append('<h4>Recommended citation <span id="bsbi-citation-toggle">[show]</span></h4>')
        var $div = $('<div id="bsbi-citation-div">').appendTo($caption)
        $p = $('<p id="bsbi-citation-text">').appendTo($div)
        $p.append('<i>' + d[0].taxonName + ',</i> ')
        $p.append('in <i>BSBI Online Atlas 2020</i>, eds P.A. Stroh, T. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ')
        $p.append(location.origin + '/atlas/' + currentTaxon.identifier)
        $p.append(' [Accessed ' + new Date().toLocaleDateString('en-GB') + ']')
        var $but1 = $('<button id="bsbi-citation-copy-text">Copy as text</button>').appendTo($div)
        $but1.addClass('btn btn-default')
        var $but2 = $('<button id="bsbi-citation-copy-html">Copy as HTML</button>').appendTo($div)
        $but2.addClass('btn btn-default')

        var taxaCitationShown = false
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
          console.log('tab selected')
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