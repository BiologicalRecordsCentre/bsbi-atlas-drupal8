import * as d3 from 'd3'

const $=jQuery // eslint-disable-line no-undef
let phen1, phen2, phen3, altlat
let apparencyByLatData
import { pcache } from './gen'

export function createPhenology(sel) {

  //$('<h4>').appendTo($(sel)).text('Phenology')

  const $phenFlexParent = $('<div>').appendTo($(sel))

  //const $phenSource = $('<div>').appendTo($phenFlexLeft)
  const $phenSource = $('<div>').appendTo($(sel))
  $phenSource.attr('id', 'bsbi-phenology-source')
  $phenSource.css('font-size', '0.8em')
  //$phenSource.css('padding-left', '32px')
  //$phenSource.css('max-width', '400px')
  $phenSource.css('margin-bottom', '0.8em')

  const $p1 = $('<p>').appendTo($(sel))
  $p1.text("Explanation of apparency and phenology charts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.")

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
    height: 303,
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
    split: true,
    headPad: 35,
    chartPad: 35,
    perRow: 1,
    expand: true,
    showTaxonLabel: false,
    interactivity: 'none'
  })

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

  //latPhenNormalizeCheckbox($phenFlexRight, phen3) 
  //latPhenDataTypeDropdown($phenFlexRight) 

  // Website style is overriding some charts style, so reset it
  $('.brc-chart-phen1').css('overflow', 'visible')

  // Chart line width - not currently a chart option
  $('#bsbi-apparency-by-lat-chart .phen-path').css('stroke-width', 1)
}

export function createEcology(sel) {
  
  //$('<h4>').appendTo($(sel)).text('Altitude vs Latitude')

  const $altlat = $('<div>').appendTo($(sel))

  const $p2 = $('<p>').appendTo($(sel))
  $p2.text("Explanation of latitude/altitude chart. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.")
  
  // Alt vs Lat visualisation
  $altlat.attr('id', 'bsbi-altlat-chart')
  $altlat.css('max-width', '600px')

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

function latPhenNormalizeCheckbox($parent, phenChart) {
  // Overall control container
  const $container = $('<div style="margin-left: 0px">').appendTo($parent)
  $container.addClass('atlas-phen-normalize-checkbox-control')
  $container.css('margin-left', '35px')

  // Normalize checkbox
  const $checDiv = $('<div class="checkbox">').appendTo($container)
  $checDiv.css('margin-top', '0')

  $('<label><input type="checkbox" class="atlas-phen-normalize-checkbox"/><span>Normalize over latitudes</span></label>').appendTo($checDiv)

  $('.atlas-phen-normalize-checkbox').change(function() {
    const normalize = $(this).is(':checked')
    phenChart.setChartOpts({ytype: normalize ? 'normalized' : 'count'})
  })
}

export function createPhenologyControls(selector) {
  latPhenDataTypeDropdown($(selector))
}

function latPhenDataTypeDropdown($parent) {

  const dataTypes = [
    {
      caption: 'Scale by relative abundance',
      val: 'count'
    },
    {
      caption: 'Scale across latitudes',
      val: 'scaled'
    },
    {
      caption: 'Scale within latitude',
      val: 'density'
    }
  ]

  // Main type selector
  const $div = $('<div>').appendTo($parent)
  //$div.css('margin-left', '35px')
  const $sel = $('<select>').appendTo($div)
  $sel.attr('id', 'atlas-lat-phen-data-type')
  $sel.addClass('selectpicker')
  $sel.attr('data-width', '100%')
  $sel.on('changed.bs.select', function () {
    if (apparencyByLatData.length) {
      apparencyByLat(phen3, apparencyByLatData)
    }
  })

  dataTypes.forEach(function(t){
    const $opt = t.selected  ? $('<option>') : $('<option>')
    $opt.attr('value', t.val)
    $opt.html(t.caption).appendTo($sel)
  })
 
  $sel.val('count')

  // This seems to be necessary if interface regenerated,
  // e.g. changing from tabbed to non-tabbed display.
  $sel.selectpicker()
}

export function changePhenology(dataRoot, identifier) {
   
  if (!identifier) return 

  const apparencyRoot = dataRoot + 'bsbi/apparency/'
  const captionRoot = dataRoot + 'bsbi/captions/'

  // Apparency all
  const fileAll = apparencyRoot + 'all/' + identifier.replace(/\./g, "_") + '.csv'
  d3.csv(fileAll + '?prevent-cache=')
    .then(function(data) {
      apparency(phen1, data)
    })
    .catch(function() {
      console.warn(`Apparency chart failed for ${fileAll}. Error message:`, e)
      phen1.setChartOpts({data: []})
    })

  // Apparency by latitude
  const fileLat = apparencyRoot + 'byLat/' + identifier.replace(/\./g, "_") + '.csv'
  d3.csv(fileLat + '?prevent-cache=')
    .then(function(data) {
      apparencyByLatData = data // Saved so that apparencyByLat if 
                                // data type dropdown used.
      apparencyByLat(phen3, apparencyByLatData)
    })
    .catch(function() {
      console.warn(`Apparency by latitude chart failed for ${fileLat}. Error message:`, e)
      phen3.setChartOpts({data: [], metrics: [], spread: false})
    })

  // Phenology
  const file = `${captionRoot}${identifier.replace(/\./g, "_")}.csv`

  d3.csv(file + `?prevent-cache=${pcache}`)
    .then(function(data) {
      phenology(phen2, data, 'bsbi-phenology-source')
    })
}

export function changeEcology(dataRoot, identifier) {
   
  if (!identifier) return 

  const mapRoot = dataRoot + 'bsbi/maps/'

  // Alt/Lat
  // Using pre-processed altlat data
  const altlatdata = `${mapRoot}altlat/${identifier.replace(/\./g, "_")}.csv`
  d3.csv(altlatdata).then(function(data){
    return altLat(altlat, data)
  }).catch(e => {
    console.warn(`altlat chart failed for ${altlatdata}. Error message:`, e)
    altlat.setChartOpts({data: []})
  })
}

// For Oli's stuff October - reformatted 
export function apparency(chart, data) {
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
  return chart.setChartOpts({
    data: sorted,
  })
}

export function phenology(chart, data, textId) {

  // Chart
  const m2d = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 365]

  const fs = data[0].phenFlowerStart
  const fe = data[0].phenFlowerEnd
  const ls = data[0].phenLeafStart
  const le = data[0].phenLeafEnd

  const flowerStart = m2d[Number(fs)-1]
  const flowerEnd = m2d[Number(fe)]
  const leafStart = m2d[Number(ls)-1]
  const leafEnd = m2d[Number(le)]

  //console.log('ls le', ls, le)
  
  // Work out area of overlap between flowering and leafing
  let flowerRange = []
  let leafRange = []
  let overlapRange = []
  if (flowerStart && flowerEnd) {
    if (flowerStart > flowerEnd) {
      flowerRange = [[flowerStart, 365], [1, flowerEnd]]
    } else {
      flowerRange = [[flowerStart, flowerEnd]]
    }
  }
  if (leafStart && leafEnd) {
    if (leafStart > leafEnd) {
      leafRange = [[leafStart, 365], [1, leafEnd]]
    } else {
      leafRange = [[leafStart, leafEnd]]
    }
  }
  // flowerRange.forEach(fr => {
  //   leafRange.forEach(lr => {
  //     const fs = fr[0]
  //     const fe = fr[1]
  //     const ls = lr[0]
  //     const le = lr[1]
  //     let os, oe
  //     if (fs > ls && fs < le) {
  //       os = fs
  //     }
  //     if (fe > ls && fe < le) {
  //       oe = fe
  //     }
  //     if (os && !oe) {
  //       oe = le
  //     }
  //     if (oe && !os) {
  //       os = ls
  //     }
  //     if (os) {
  //       overlapRange.push([os, oe])
  //     }
  //   })
  // })

  // console.log('flowerRange', flowerRange)
  // console.log('leafRange', leafRange)
  // console.log('overlapRange', overlapRange)

  const svgLeaf="m12941 19084-175-112-108 54c-59 30-112 54-117 54s-97-112-203-250l-193-250h-150-151l-177-188c-97-104-186-197-197-207-19-17-23-16-139 49-66 36-124 66-128 65-6 0-219-276-359-464-10-14-30-7-149 53l-138 70-26-32c-15-17-103-124-195-238-92-115-171-208-175-208s-61 25-127 55l-119 55-90-92c-50-51-149-155-220-230l-130-138-112 100c-61 55-115 100-120 100-4 0-123-122-263-269-140-148-260-270-266-270-5-1-65 39-131 88l-122 90-233-207c-129-114-264-233-300-265l-66-58-138 80-139 80-139-147c-77-81-181-189-231-240l-91-94-161 80-160 81-169-201c-93-110-176-209-184-219-15-19-19-18-174 26-87 25-162 42-167 39s-79-90-164-194c-140-171-158-188-178-181-12 5-73 30-134 56-62 26-116 45-121 43-5-1-105-104-222-226-192-202-216-223-239-218-14 3-82 23-151 44l-126 38-249-262c-138-145-252-263-255-263s-45 55-95 124c-49 68-92 121-96 117s-98-138-209-299l-201-292-138 69-139 69-223-336c-123-184-227-339-230-344s-83-20-177-33c-95-12-174-25-176-27s-52-107-111-234c-59-126-111-233-114-237-4-4-62 8-130 27-69 19-125 34-127 32-1-1-57-139-125-307-67-168-124-307-125-309-2-2-69-14-150-27-80-12-147-24-149-26-3-2-30-125-60-273-31-149-58-272-60-274-3-2-68 2-146 8-77 7-144 10-147 6-3-3-16-132-28-286s-23-281-25-283-79-18-171-36l-168-34-2-380-3-381-193-79c-139-57-192-84-192-95 0-9 29-149 65-310s65-295 63-296c-2-2-86-43-188-91s-188-90-192-93 45-170 108-371l114-365-67-65c-38-36-110-104-162-152l-93-86 136-329c75-181 136-332 136-337 0-4-58-90-128-190-71-99-132-187-136-194-6-10 62-142 290-561 15-26 21-48 16-55-5-6-66-82-135-170-70-87-127-162-127-166 0-5 108-183 239-396l240-387-90-99c-49-54-89-102-89-107s111-164 246-353c136-188 253-353 261-365 13-20 10-32-43-149-55-124-56-128-38-143 11-9 182-159 381-334l361-317-5-43c-3-23-13-105-24-182-10-77-16-141-15-143 4-3 510-150 857-248 15-4 13-20-18-141-18-74-32-137-31-139 2-1 138-21 303-42 279-37 309-43 431-86 238-83 552-155 824-188 141-17 699-17 840 0 648 79 1266 287 1860 624 111 64 378 237 494 320 46 34 67 44 62 32-4-11-35-107-68-214-397-1294-750-2359-915-2764-72-178-107-247-165-332-72-104-110-172-148-269-56-142-97-325-73-325 29 0 420 94 429 104 6 6 46 128 89 271 42 143 142 478 222 745 79 267 202 679 273 915 71 237 185 621 255 855s151 506 181 604c30 99 54 185 54 193 0 27 18 12 35-30 31-80 204-397 305-558 282-454 581-807 1323-1564l245-250 114 113c62 61 116 112 120 112s118-122 253-270c136-149 250-270 254-270 3 0 40 68 81 151s78 152 82 155c3 2 122-66 263-152 180-110 259-153 264-145 5 7 18 57 30 112l22 99h515c283 0 514 1 514 3s-20 52-44 112l-44 110 479 3c310 1 479 6 479 12s-14 58-31 116-30 106-28 108c2 1 179 26 392 56 214 30 392 57 398 60 5 4-4 44-21 95-16 49-30 94-30 100 0 7 112 32 288 64 158 29 296 55 307 58 20 4 20 7 9 141-7 75-12 138-11 138 5 5 558 214 564 214 5 0 14 4 21 9 13 8 10 15-74 227-3 5 144 82 326 169 181 88 330 164 330 170s-30 84-66 174c-53 134-63 166-52 176 7 7 105 85 218 175s210 168 217 174c9 8-1 46-42 164-30 84-55 157-55 162s101 91 225 190 225 183 225 186-56 66-124 140l-125 135 194 217c107 119 195 219 194 222 0 3-45 41-100 85-54 44-111 90-125 101l-26 21 145 289c80 159 147 294 148 299 1 6-25 25-57 44-33 18-78 44-101 57l-41 24 124 226c69 124 124 229 122 234-2 4-42 42-90 84l-87 76 28 63c15 34 72 158 126 276l98 214-39 36c-21 20-68 61-103 93l-64 56 136 261c76 144 137 263 137 265 0 3-57 23-127 46-71 24-132 46-136 50-4 3 33 128 82 276s88 270 86 272-45-6-95-18c-51-11-95-19-98-16-5 6-4 13 77 405 28 135 49 246 47 248-1 2-36-11-76-27-39-17-74-30-76-27-2 2 1 111 6 243 5 131 10 284 10 339v100l-87-10c-49-6-89-8-90-5s29 140 66 305 67 301 66 303c-2 2-53-22-114-52-91-46-111-53-111-39 0 10 9 144 20 298s20 297 20 317v37l-72-20c-40-11-81-22-90-25-17-5-18 16-18 350 0 278-3 356-12 356-7 0-53-9-102-20s-91-19-92-17c-1 1-17 106-35 232-18 127-35 233-38 237-3 3-39-7-79-24s-74-29-76-27c-3 2-15 155-27 339s-23 336-25 338c-1 2-45-15-98-39-53-23-99-39-102-36s-17 167-30 364c-12 197-23 359-24 361 0 1-43-32-96-73s-99-75-103-75-26 141-50 313c-23 171-44 319-47 328-4 14-14 14-102-6-53-12-100-20-103-16-4 3-31 143-60 309-30 167-57 309-61 315-4 7-30 0-77-21-39-18-73-32-76-32s-5 149-5 330c0 182-3 330-6 330s-49-29-101-65c-53-36-97-64-98-63-2 2-8 154-15 338-6 184-13 337-15 338-2 2-40-24-85-57-44-34-84-61-89-61-4 0-7 10-5 23 2 12 11 139 19 282s18 291 21 329l6 69-126-5c-114-5-126-4-122 11 8 27 126 657 126 673 0 10-37 25-115 48-104 30-114 35-110 54 3 12 16 71 30 131 102 438 125 539 125 551 0 10-24 14-99 16l-98 3 112 248 113 248-27 10c-14 6-61 22-104 35l-77 25 52 97c28 53 75 142 105 196 29 55 52 100 51 101-2 1-42 17-90 35-49 18-88 38-88 45s11 86 25 175c14 90 24 166 23 170-2 4-81-43-177-106z"
  const svgFlower="M1048.256,633.499c212.849-356.854,285.555-335.845-191.845-590.438C384.889,283.217,484.493,353.496,664.566,633.499 c-310.065-285.921-239.639-396.021-620.823,0c64.157,504.336,28.591,448.084,502.257,364.911 c-416.078,181.718-421.368,113.233-191.845,590.438c503.843,103.322,428.181,97.12,502.257-364.911 c69.825,407.236,10.978,486.041,502.257,364.911c233.666-457.592,211.268-427.46-191.845-590.438 c452.881,101.063,461.097,199.985,502.257-364.911C1305.872,228.612,1381.606,318.787,1048.256,633.499z M856.411,1100.523 c-114.579,0-207.463-92.884-207.463-207.463s92.884-207.463,207.463-207.463c114.578,0,207.463,92.884,207.463,207.463 S970.989,1100.523,856.411,1100.523z"
  
  // const svgBoth="M 10482.56 6334.99 c 2128.49 -3568.54 2855.55 -3358.45 -1918.45 -5904.38 C 3848.89 2832.17 4844.93 3534.96 6645.66 6334.99 c -3100.65 -2859.21 -2396.39 -3960.21 -6208.23 0 c 641.57 5043.36 285.91 4480.84 5022.57 3649.11 c -4160.78 1817.18 -4213.68 1132.33 -1918.45 5904.38 c 5038.43 1033.22 4281.81 971.2 5022.57 -3649.11 c 698.25 4072.36 109.78 4860.41 5022.57 3649.11 c 2336.66 -4575.92 2112.68 -4274.6 -1918.45 -5904.38 c 4528.81 1010.63 4610.97 1999.85 5022.57 -3649.11 C 13058.72 2286.12 13816.06 3187.87 10482.56 6334.99 z M 8564.11 11005.23 c -1145.79 0 -2074.63 -928.84 -2074.63 -2074.63 s 928.84 -2074.63 2074.63 -2074.63 c 1145.78 0 2074.63 928.84 2074.63 2074.63 S 9709.89 11005.23 8564.11 11005.23 z m-2000 7000-175-112-108 54c-59 30-112 54-117 54s-97-112-203-250l-193-250h-150-151l-177-188c-97-104-186-197-197-207-19-17-23-16-139 49-66 36-124 66-128 65-6 0-219-276-359-464-10-14-30-7-149 53l-138 70-26-32c-15-17-103-124-195-238-92-115-171-208-175-208s-61 25-127 55l-119 55-90-92c-50-51-149-155-220-230l-130-138-112 100c-61 55-115 100-120 100-4 0-123-122-263-269-140-148-260-270-266-270-5-1-65 39-131 88l-122 90-233-207c-129-114-264-233-300-265l-66-58-138 80-139 80-139-147c-77-81-181-189-231-240l-91-94-161 80-160 81-169-201c-93-110-176-209-184-219-15-19-19-18-174 26-87 25-162 42-167 39s-79-90-164-194c-140-171-158-188-178-181-12 5-73 30-134 56-62 26-116 45-121 43-5-1-105-104-222-226-192-202-216-223-239-218-14 3-82 23-151 44l-126 38-249-262c-138-145-252-263-255-263s-45 55-95 124c-49 68-92 121-96 117s-98-138-209-299l-201-292-138 69-139 69-223-336c-123-184-227-339-230-344s-83-20-177-33c-95-12-174-25-176-27s-52-107-111-234c-59-126-111-233-114-237-4-4-62 8-130 27-69 19-125 34-127 32-1-1-57-139-125-307-67-168-124-307-125-309-2-2-69-14-150-27-80-12-147-24-149-26-3-2-30-125-60-273-31-149-58-272-60-274-3-2-68 2-146 8-77 7-144 10-147 6-3-3-16-132-28-286s-23-281-25-283-79-18-171-36l-168-34-2-380-3-381-193-79c-139-57-192-84-192-95 0-9 29-149 65-310s65-295 63-296c-2-2-86-43-188-91s-188-90-192-93 45-170 108-371l114-365-67-65c-38-36-110-104-162-152l-93-86 136-329c75-181 136-332 136-337 0-4-58-90-128-190-71-99-132-187-136-194-6-10 62-142 290-561 15-26 21-48 16-55-5-6-66-82-135-170-70-87-127-162-127-166 0-5 108-183 239-396l240-387-90-99c-49-54-89-102-89-107s111-164 246-353c136-188 253-353 261-365 13-20 10-32-43-149-55-124-56-128-38-143 11-9 182-159 381-334l361-317-5-43c-3-23-13-105-24-182-10-77-16-141-15-143 4-3 510-150 857-248 15-4 13-20-18-141-18-74-32-137-31-139 2-1 138-21 303-42 279-37 309-43 431-86 238-83 552-155 824-188 141-17 699-17 840 0 648 79 1266 287 1860 624 111 64 378 237 494 320 46 34 67 44 62 32-4-11-35-107-68-214-397-1294-750-2359-915-2764-72-178-107-247-165-332-72-104-110-172-148-269-56-142-97-325-73-325 29 0 420 94 429 104 6 6 46 128 89 271 42 143 142 478 222 745 79 267 202 679 273 915 71 237 185 621 255 855s151 506 181 604c30 99 54 185 54 193 0 27 18 12 35-30 31-80 204-397 305-558 282-454 581-807 1323-1564l245-250 114 113c62 61 116 112 120 112s118-122 253-270c136-149 250-270 254-270 3 0 40 68 81 151s78 152 82 155c3 2 122-66 263-152 180-110 259-153 264-145 5 7 18 57 30 112l22 99h515c283 0 514 1 514 3s-20 52-44 112l-44 110 479 3c310 1 479 6 479 12s-14 58-31 116-30 106-28 108c2 1 179 26 392 56 214 30 392 57 398 60 5 4-4 44-21 95-16 49-30 94-30 100 0 7 112 32 288 64 158 29 296 55 307 58 20 4 20 7 9 141-7 75-12 138-11 138 5 5 558 214 564 214 5 0 14 4 21 9 13 8 10 15-74 227-3 5 144 82 326 169 181 88 330 164 330 170s-30 84-66 174c-53 134-63 166-52 176 7 7 105 85 218 175s210 168 217 174c9 8-1 46-42 164-30 84-55 157-55 162s101 91 225 190 225 183 225 186-56 66-124 140l-125 135 194 217c107 119 195 219 194 222 0 3-45 41-100 85-54 44-111 90-125 101l-26 21 145 289c80 159 147 294 148 299 1 6-25 25-57 44-33 18-78 44-101 57l-41 24 124 226c69 124 124 229 122 234-2 4-42 42-90 84l-87 76 28 63c15 34 72 158 126 276l98 214-39 36c-21 20-68 61-103 93l-64 56 136 261c76 144 137 263 137 265 0 3-57 23-127 46-71 24-132 46-136 50-4 3 33 128 82 276s88 270 86 272-45-6-95-18c-51-11-95-19-98-16-5 6-4 13 77 405 28 135 49 246 47 248-1 2-36-11-76-27-39-17-74-30-76-27-2 2 1 111 6 243 5 131 10 284 10 339v100l-87-10c-49-6-89-8-90-5s29 140 66 305 67 301 66 303c-2 2-53-22-114-52-91-46-111-53-111-39 0 10 9 144 20 298s20 297 20 317v37l-72-20c-40-11-81-22-90-25-17-5-18 16-18 350 0 278-3 356-12 356-7 0-53-9-102-20s-91-19-92-17c-1 1-17 106-35 232-18 127-35 233-38 237-3 3-39-7-79-24s-74-29-76-27c-3 2-15 155-27 339s-23 336-25 338c-1 2-45-15-98-39-53-23-99-39-102-36s-17 167-30 364c-12 197-23 359-24 361 0 1-43-32-96-73s-99-75-103-75-26 141-50 313c-23 171-44 319-47 328-4 14-14 14-102-6-53-12-100-20-103-16-4 3-31 143-60 309-30 167-57 309-61 315-4 7-30 0-77-21-39-18-73-32-76-32s-5 149-5 330c0 182-3 330-6 330s-49-29-101-65c-53-36-97-64-98-63-2 2-8 154-15 338-6 184-13 337-15 338-2 2-40-24-85-57-44-34-84-61-89-61-4 0-7 10-5 23 2 12 11 139 19 282s18 291 21 329l6 69-126-5c-114-5-126-4-122 11 8 27 126 657 126 673 0 10-37 25-115 48-104 30-114 35-110 54 3 12 16 71 30 131 102 438 125 539 125 551 0 10-24 14-99 16l-98 3 112 248 113 248-27 10c-14 6-61 22-104 35l-77 25 52 97c28 53 75 142 105 196 29 55 52 100 51 101-2 1-42 17-90 35-49 18-88 38-88 45s11 86 25 175c14 90 24 166 23 170-2 4-81-43-177-106z"
  
  // Source
  if (textId) {
    const flowerText = tweakRef(data[0].phenFlowerRef)
    const leafText = tweakRef(data[0].phenLeafRef)

    let source
    if (flowerRange.length) {
      source = `Data for flower phenology from ${flowerText}.`
    }
    if (flowerRange.length && leafRange.length) {
      //source = `${source}</br>`
      source = `${source}  `
    }
    if (leafRange.length) {
      source = `${source}Data for leafing phenology from ${leafText}.`
    }
    $(`#${textId}`).html(source)
  }

  // '#009900' '#ff9900'
  const metrics = []
  let iMetric = 0
  if (flowerRange.length) {
    metrics.push({ prop: 'flower', label: 'Flowering', colour: '#fc8d62', svg: svgFlower, legendOrder: ++iMetric })
  }
  if (leafRange.length) {
    metrics.push({ prop: 'leaf', label: 'In leaf', colour: '#66c2a5', svg: svgLeaf, legendOrder: ++iMetric })
  }
  // if (overlapRange.length) {
  //   metrics.push({ prop: 'both', label: 'In leaf & flowering', colour: '#8da0cb', svg: svgBoth , svgScale: 1.4, legendOrder: 3})
  // }
 
  return chart.setChartOpts({
    data: [
      {
        taxon: 'taxon',
        leaf: leafRange.map(r => {return {start: r[0], end: r[1]}}),
        flower: flowerRange.map(r => {return {start: r[0], end: r[1]}}),
        //both: overlapRange.map(r => {return {start: r[0], end: r[1]}}),
      }
    ],
    metrics: metrics
  })

  function tweakRef(ref) {
    const $tmp = $('<div>')
    $tmp.html(ref)

    // Replace 'Poland, J. personal observation' with 'John Poland, personal observation'
    const $span1 = $tmp.children('span').eq(0)
    const $span2 = $tmp.children('span').eq(1)
    if ($span1 && $span2 
      && $span1.text() === 'Poland, J.'
      && $span2.text() === 'personal observation') {
      $span1.text('John Poland,')
    }

    return $tmp.html()
  }
}

export function apparencyByLat(chart, data) {
  // Map text to numeric values and add taxon
  const dataType = $('#atlas-lat-phen-data-type').val()
  //console.log('dataType', dataType)

  const numeric = data.filter(d => d.type === dataType).map(d => {
    const nd = {taxon: 'taxon'}
    Object.keys(d).forEach(function(k){
      nd[k] = Number(d[k])
    })
    return nd
  })

  //const latitudes = Object.keys(data[0]).filter(f => f.length === 2)
  const latitudes = ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60']
  const metrics = latitudes.map(l => {
    return {prop: l, label: l, colour: 'green', fill: '#ddffdd' }
  })

  // Sort it - just in case
  const sorted = numeric.sort((a,b) => a.week > b.week)
  // Update the apparency chart
  return chart.setChartOpts({
    data: sorted,
    metrics: metrics,
    spread: true
  })
}

export function altLat(chart, data) {
  const mdata = data.map(function(r) {
    return {
      distance: Number(r.distance),
      altitude: Number(r.altitude),
      metric: Number(r.percent),
      taxon: 'dummy'
    }
  })
  return chart.setChartOpts({data: mdata })
}