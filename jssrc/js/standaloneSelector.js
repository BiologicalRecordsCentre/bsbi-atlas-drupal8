import * as d3 from 'd3-fetch'
import { pcache } from './utils'
import { getCookie } from './utils'
import { TaxonPickerField, Taxon } from 'taxonpicker'
import taxa from './atlasnames'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

export function main() {

  $(document).ready(function () {

    $('.bsbi-atlas-taxon-selector').each(function() {

      const defaultDdbid = null

      //const idString = $(this).parent().attr('data-sel-id')
      const idString = Math.floor(Math.random() * 100000)
      const $container = $('<div>').appendTo($(this))
      $container.addClass('atlas-taxon-selector-div')
      $container.attr('id', `atlas-taxon-selector-div-${idString}`)

      Taxon.setTaxa(taxa) // must be called before picker initialization
      const taxonPicker = new TaxonPickerField
      taxonPicker.alwaysFireChangeEvent = true
      const taxonPickerContainer = document.getElementById(`atlas-taxon-selector-div-${idString}`)
      taxonPicker.addField(taxonPickerContainer)
      taxonPicker.setTaxonFromId(defaultDdbid)
      taxonPicker.addListener(TaxonPickerField.EVENT_CHANGE, () => {
        window.location.href = `/atlas/${taxonPicker.value.taxonId}`
      })

      let ddbid
      if (sessionStorage.getItem('ddbid')) {
        ddbid = sessionStorage.getItem('ddbid')
      } else if (getCookie('ddbid')) {
        ddbid = getCookie('ddbid')
      } else {
        ddbid = defaultDdbid
      }
      taxonPicker.setTaxonFromId(ddbid)
    })
  })
}