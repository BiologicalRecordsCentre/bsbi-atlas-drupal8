import * as d3 from 'd3-fetch'
import { pcache } from './gen'
import { getCookie } from './utils'
import { TaxonPickerField, Taxon } from 'taxonpicker'
import taxa from './atlasnames.json'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

export function main() {

  $(document).ready(function () {

    $('.bsbi-atlas-taxon-selector').each(function() {

      const defaultDdbid = null
  
      const idString = $(this).parent().attr('data-sel-id')
      const $container = $('<div>').appendTo($(this))
      $container.addClass('atlas-taxon-selector-div')
      $container.attr('id', `atlas-taxon-selector-div-${idString}`)
  
      Taxon.setTaxa(taxa) // must be called before picker initialization
      const taxonPicker = new TaxonPickerField
      const taxonPickerContainer = document.getElementById(`atlas-taxon-selector-div-${idString}`)
      taxonPicker.addField(taxonPickerContainer)
      taxonPicker.setTaxonFromId(defaultDdbid)
      taxonPicker.addListener(TaxonPickerField.EVENT_CHANGE, () => {
        window.location.href = `/atlas/${taxonPicker.value.taxonId}`
      })
  
      let ddbid
      if (getCookie('ddbid')) {
        ddbid = getCookie('ddbid')
      } else {
        ddbid = defaultDdbid
      }
      taxonPicker.setTaxonFromId(ddbid)
    })
  })
}