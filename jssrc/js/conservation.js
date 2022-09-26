const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

export function createConservation(sel) {

  console.log('Creating')

  const $sect = $(sel)
  let $tr, $td
  const $table = $('<table id="bsbi-conservation-table">').appendTo($sect)
  $tr = $('<tr>').appendTo($table)
  $td = $('<td style="font-weight: bold">').text('Rarity').appendTo($tr)
  $td = $('<td style="font-weight: bold">').text('Categories').appendTo($tr)
  $td = $('<td style="font-weight: bold">').text('Links').appendTo($tr)
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').html('Rare or scarce Great Britain (revised 2022)<span class="ss">1</span>').appendTo($tr)
  $td = $('<td id="bsbi-conservation-rarity-gb">').appendTo($tr)
  $td = $('<td>').appendTo($tr)
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').html('Rare or scarce Ireland (revised 2022)<span class="ss">2</span>').appendTo($tr)
  $td = $('<td id="bsbi-conservation-rarity-ir">').appendTo($tr)
  $td = $('<td>').appendTo($tr)
  $tr = $('<tr>').appendTo($table)
  $td = $('<td colspan="3">').appendTo($tr)

  $tr = $('<tr>').appendTo($table)
  $td = $('<td style="font-weight: bold">').html('Threat<span class="ss">3</span>').appendTo($tr)
  $td = $('<td>').appendTo($tr)
  $td = $('<td>').appendTo($tr)
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('Great Britain Red List (revised Feb 2021)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-threat-gb">').appendTo($tr)
  const $l1 = genLink('https://hub.jncc.gov.uk/assets/cc1e96f8-b105-4dd0-bd87-4a4f60449907')
  const $l2 = genLink('https://bsbi.org/taxon-lists')
  $td = $('<td>').appendTo($tr).html(`${$l1[0].outerHTML} (revised Feb 2021 ${$l2[0].outerHTML})`)
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('England Red List (2014)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-threat-en">').appendTo($tr)
  $td = $('<td>').appendTo($tr).append(genLink('https://bsbi.org/england'))
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('Wales Red List (2008)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-threat-wa">').appendTo($tr)
  $td = $('<td>').appendTo($tr).append(genLink('https://www.plantlife.org.uk/uk/our-work/publications/vascular-plant-red-data-list-wales'))
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('Ireland Red List (2015)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-threat-ir">').appendTo($tr)
  $td = $('<td>').appendTo($tr).append(genLink('https://www.npws.ie/publications/red-lists'))
  $tr = $('<tr>').appendTo($table)
  $td = $('<td colspan="3">').appendTo($tr)

  $tr = $('<tr>').appendTo($table)
  $td = $('<td style="font-weight: bold">').text('Conservation designation').appendTo($tr)
  $td = $('<td>').appendTo($tr)
  $td = $('<td>').appendTo($tr)
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('Schedule 8 (Great Britain)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-designation-gb-sched8">').appendTo($tr)
  $td = $('<td>').appendTo($tr).append(genLink('https://www.legislation.gov.uk/ukpga/1981/69/schedule/8'))
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('Schedule 8 (Northern Ireland)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-designation-ni-sched8">').appendTo($tr)
  $td = $('<td>').appendTo($tr).append(genLink('https://www.legislation.gov.uk/nisi/1985/171/contents'))
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('Irish Flora (Protection) Order (revised 2022)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-designation-ifpo">').appendTo($tr)
  $td = $('<td>').appendTo($tr).append(genLink('https://cedrec.com/legislation/56058/56059/fulltext'))
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('England NERC list (Section 41)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-designation-en-s41">').appendTo($tr)
  $td = $('<td>').appendTo($tr).append(genLink('http://publications.naturalengland.org.uk/publication/4958719460769792'))
  $tr = $('<tr>').appendTo($table)
  $td = $('<td>').text('Wales NERC list (Section 7)').appendTo($tr)
  $td = $('<td id="bsbi-conservation-designation-wa-s41">').appendTo($tr)
  $td = $('<td>').appendTo($tr).append(genLink('https://www.biodiversitywales.org.uk/Section-7'))

  const $refs = $('<div style="font-size: 0.8em; margin: 0.5em 0 1em 0">').appendTo($sect)
  $('<span style="vertical-align: super">').text('1').appendTo($refs)
  $('<span>').text(' Rare - species recorded in 15 or fewer hectads in GB 2000-2019; scarce - species recorded in 16-100 hectads in GB 2000-2019; not rare or scarce - species recorded in more than 100 hectads in GB 2000-2019.').appendTo($refs)
  $refs.append($('<br/>'))
  $('<span style="vertical-align: super">').text('2').appendTo($refs)
  $('<span>').text(' Rare - species recorded in 10 or fewer hectads in Ireland 2000-2019; scarce - species recorded in 11-25 hectads in Ireland 2000-2019; not rare or scarce - species recorded in more than 25 hectads in Ireland 2000-2019.').appendTo($refs)
  $refs.append($('<br/>'))
  $('<span style="vertical-align: super">').text('3').appendTo($refs)
  $('<span>').text(' EX – extinct; EW – extinct in the wild; RE – regionally extinct; CR – critically endangered; EN – endangered; VU – vulnerable; NT – near threatened; LC – least concern; WL – waiting list; PL – parking list.').appendTo($refs)

  const $p1 = $('<p>').appendTo($sect)
  $p1.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')

  function genLink(url) {
    const $a = $('<a>')
    $a.attr('href', url)
    $a.attr('target', '_blank')
    $a.text(url)
    return($a)
  }
}

export function changeConservation(taxon) {
  // 'statusGB','statusIE','statusCI','csRedListEngland','csRedListWales','csRedListIreland','csRedDataList2005','csRedDataList2021', 'csRareScarceIr2020', 'csRareScarceGb2020'
  
  console.log('update conservation table ', taxon)

  $('#bsbi-conservation-rarity-gb').text(taxon['csRareScarceGb2020'] ? taxon['csRareScarceGb2020'] : 'not rare or scarce')
  $('#bsbi-conservation-rarity-ir').text(taxon['csRareScarceIr2020'] ? taxon['csRareScarceIr2020'] : 'not rare or scarce')

  $('#bsbi-conservation-threat-gb').text(taxon['csRedDataList2021'])
  $('#bsbi-conservation-threat-en').text(taxon['csRedListEngland'])
  $('#bsbi-conservation-threat-wa').text(taxon['csRedListWales'])
  $('#bsbi-conservation-threat-ir').text(taxon['csRedListIreland'])

  $('#bsbi-conservation-designation-gb-sched8').text('')
  $('#bsbi-conservation-designation-ni-sched8').text('')
  $('#bsbi-conservation-designation-ifpo').text('')
  $('#bsbi-conservation-designation-en-s41').text('')
  $('#bsbi-conservation-designation-wa-s41').text('')

  
}