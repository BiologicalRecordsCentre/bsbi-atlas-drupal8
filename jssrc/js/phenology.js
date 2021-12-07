let $

export function createPhenology(_$, sel) {

  $ = _$

  $('<h4>').appendTo($(sel)).text('Phenology & Apparency')

  const $p1 = $('<p>').appendTo($(sel))
  $p1.text("Explanation of apparency and phenology charts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.")
  
  const $phenFlexParent = $('<div>').appendTo($(sel))
  $phenFlexParent.attr('class', 'phenRow')
  const $phenFlexLeft = $('<div>').appendTo($phenFlexParent)
  $phenFlexLeft.attr('class', 'phenColumn')
  const $phenFlexRight = $('<div>').appendTo($phenFlexParent)
  $phenFlexRight.attr('class', 'phenColumn')

  const $apparency = $('<div>').appendTo($phenFlexLeft)
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
  
  const $phenology = $('<div>').appendTo($phenFlexLeft)
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

  const $phenSource = $('<div>').appendTo($phenFlexLeft)
  $phenSource.attr('id', 'bsbi-phenology-source')
  $phenSource.css('font-size', '0.8em')
  $phenSource.css('padding-left', '32px')
  $phenSource.css('max-width', '400px')

  const $apparencyByLat = $('<div>').appendTo($phenFlexRight)
  $apparencyByLat.attr('id', 'bsbi-apparency-by-lat-chart').css('max-width', '400px')

  // $apparencyByLat = $('<div>').appendTo($phenFlexRight)
  // $apparencyByLat.attr('id', 'bsbi-apparency-by-lat-chart').css('max-width', '400px')

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
    interactivity: 'mousemove',
    margin: {left: 40, right: 0, top: 20, bottom: 5},
    axisLeftLabel: 'Latitudinal band',
    axisLabelFontSize: 12
  })

  latPhenNormalizeCheckbox($phenFlexRight, phen3) 

  // Website style is overriding some charts style, so reset it
  $('.brc-chart-phen1').css('overflow', 'visible')

  // Chart line width - not currently a chart option
  $('#bsbi-apparency-by-lat-chart .phen-path').css('stroke-width', 1)
}

function latPhenNormalizeCheckbox($parent, phenChart) {
  // Overall control container
  const $container = $('<div style="margin-left: 0px">').appendTo($parent)
  $container.addClass('atlas-phen-normalize-checkbox-control')

  // Status on/off toggle
  const $checDiv = $('<div class="checkbox">').appendTo($container)
  //$checDiv.css('margin-top', '4.3em')

  $('<label><input type="checkbox" class="atlas-phen-normalize-checkbox"/><span>Normalize over latitudes</span></label>').appendTo($checDiv)

  $('.atlas-phen-normalize-checkbox').change(function() {
    const normalize = $(this).is(':checked')
    phenChart.setChartOpts({ytype: normalize ? 'normalized' : 'count'})
  })
}