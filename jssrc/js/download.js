import { createMaps, getStaticMap, changeMap, mapSetCurrentTaxon } from './mapping'
import { bsbiDataAccess } from './dataAccessAtlas'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

export function downloadPage() {

  console.log('download page')

  $('<div id="bsbiMapDiv" style="max-width: 300px">').appendTo($('#bsbi-atlas-download'))

  createMaps("#bsbiMapDiv")

  const staticMap = getStaticMap()

  // Northern and Channel Isles inset
  staticMap.setTransform('BI4')

  // No grid lines
  staticMap.setGridLineStyle('none')

  // No boundaries
  staticMap.setCountryLineStyle('none')

  // Ensure right map is selected
  // allclass is the default, so no need to change, but need to
  // update showStatus
  bsbiDataAccess.showStatus = true


  // Set taxon
  // 2cd4p9h.yrr,Meconopsis cambrica,,(L.) Vig.,Welsh Poppy,Meconopsis cambrica
  const currentTaxon = {
    identifier: '2cd4p9h.yrr',
    name: null,
    shortName: null,
    tetrad: null,
    parent1: '',
    parent2: ''
  }
  mapSetCurrentTaxon(currentTaxon)

  changeMap()
}