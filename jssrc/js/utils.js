const $ = jQuery // eslint-disable-line no-undef

export const pcache = '20230222-3'

export function copyToClipboard(textToCopy) {
  // https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
  // navigator clipboard api needs a secure context (https)
  // return a promise
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

export function setCookie(cname, cvalue, exdays) {
  const d = new Date()
  d.setTime(d.getTime() + (exdays*24*60*60*1000))
  const expires = "expires="+ d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

export function getCookie(cname) {
  const name = cname + "="
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

export function getCitation(currentTaxon, forImageDownload, titleOnly) {

  // Extract taxon name and authority from formatted HTML

  // Make a jQuery object from formattedname
  const $taxonNameAndAuthority = $('<div>')
  $taxonNameAndAuthority.html(currentTaxon.formattedName)

  // Remove class taxon-qualifier from any tags
  //$taxonNameAndAuthority.find('.taxon-qualifier').removeAttr('class')

  // Get the taxon qualifier html
  const taxonQualifierLatin = $taxonNameAndAuthority.find('b.taxon-qualifier').find('i.latin').html()
  let taxonQualifier = $taxonNameAndAuthority.find('b.taxon-qualifier').html()

  // Get the taxon authority html
  let taxonAuthority = $taxonNameAndAuthority.find('span.taxon-authority').html()

  // Get the taxon name html
  $taxonNameAndAuthority.find('b.taxon-qualifier').remove()
  $taxonNameAndAuthority.find('span.taxon-authority').remove()
  // Get taxon name replacing any nobreak spaces with a space
  let taxonName = $taxonNameAndAuthority.find('span.taxon').html().replace(/\u00a0/g, ' ').replace(/&nbsp;/g, ' ')

  taxonName = taxonName ? taxonName.trim() : ''
  taxonAuthority = taxonAuthority ? ` ${taxonAuthority.trim()}` : ''
  taxonQualifier = taxonQualifier ? ` <b>${taxonQualifier.trim()}</b>` : ''

  // Taxon names can be split into several i tag sections, e.g. hybrid. We use the % symbol here because it never
  // occurs in the nameFormatted property.
  const taxonNameImageSplit = taxonName.replace(/<i>/g, '%<i>').replace(/<\/i>/g, '</i>%').split('%').filter(t => t.length).map(t => {
    if (t.startsWith('<i>')) {
      return `i#${t.replace('<i>', '').replace('</i>', '')}`
    } else {
      return `n#${t}`
    }
  })

  let taxonQualifierImage
  if (taxonQualifierLatin) {
    taxonQualifierImage = `I#${taxonQualifierLatin.trim()}`
  } else {
    taxonQualifierImage = taxonQualifier ? `${taxonQualifier.trim().replace('<b>', 'b#').replace('</b>', '')}` : ''
  }
  const taxonAuthorityImage = taxonAuthority ? `n#${taxonAuthority.trim()}` : ''

  if (forImageDownload) {
    return [
      ...taxonNameImageSplit,
      taxonQualifierImage,
      taxonAuthorityImage,
      'n#in',
      'i#BSBI Online Plant Atlas 2020,',
      `n#eds P.A. Stroh, T. A. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ${location.origin}/atlas/${currentTaxon.identifier} [Accessed ${new Date().toLocaleDateString('en-GB')}]`
    ]
  } else if (titleOnly) {
    return `${taxonName}${taxonQualifier}${taxonAuthority} in <i>BSBI Online Plant Atlas 2020</i>`
  } else {
    return `${taxonName}${taxonQualifier}${taxonAuthority} in <i>BSBI Online Plant Atlas 2020</i>, eds P.A. Stroh, T. A. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ${location.origin}/atlas/${currentTaxon.identifier} [Accessed ${new Date().toLocaleDateString('en-GB')}]`
  }
}

export function addSvgAccessibility(id, subsel, title, desc) {

  const $svg = $(`#${id}${subsel}`)

  const $title = $(`#${id}${subsel} > title`)
  const $desc = $(`#${id}${subsel} > desc`)
  if ($title.length) {
    $title.text(title)
  } else {
    $('<title>').attr('id', `${id}-svg-title`).text(title).appendTo($svg)
  }
  if ($desc.length) {
    $desc.text(desc)
  } else {
    $('<desc>').attr('id', `${id}-svg-desc`).text(desc).appendTo($svg)
  }
  $svg.attr('aria-labelledby', `${id}-svg-title ${id}-svg-desc`)
}

export function downloadImageButton (id, $parent, downloadCallback, types) {
  $parent.each(function(i) {
    // We loop through the selection so that we can use the
    // index value to differentiate the equivalent controls
    // from different blocks. This is vital for radio controls
    // otherwise value can only be selected in one block and
    // therefore initialisation may be wrong.
    const $div = $('<div>').appendTo($(this))
    downloadImageButton_i(id, $div, downloadCallback, types, i)
  })
}

export function downloadImageButton_i(id, $parent, downloadCallback, types, i) {

  let imageType = 'png'
  let chartType = null

  // Overall control container
  const $container = $('<div>').appendTo($parent)
  const $hr = $('<hr>').appendTo($container)
  $hr.css('margin', '2em 0 1em 0')

  // Image type selector if types array is not emtpy
  if (types.length > 0) {

    chartType = types[0].val

    const $sel = $('<select>').appendTo($container)
    $sel.addClass('selectpicker')
    $sel.attr('data-width', '100%')
    $sel.on('changed.bs.select', function () {
      chartType = $(this).val()
    })

    types.forEach(function(b){
      const $opt = b.selected  ? $('<option>') : $('<option>')
      $opt.attr('value', b.val)
      $opt.html(b.caption).appendTo($sel)
    })

    $sel.val(chartType)

    // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.
    $sel.selectpicker()
  }

  // Download button
  const $button = $('<button>').appendTo($container)
  $button.addClass('btn btn-default')
  $button.text('Download')
  $button.on('click', function(){
    //staticMap.saveMap(imageType === 'svg', info, 'atlas-image')
    downloadCallback(imageType === 'svg', chartType)
  })

  // Image type radion button
  makeRadio('PNG', 'png', true, i)
  makeRadio('SVG', 'svg', false, i)

  function makeRadio(label, val, checked) {

    const $div = $('<div>').appendTo($container)
    $div.css('display', 'inline-block')
    $div.css('margin-left', '0.5em')
    $div.attr('class', 'radio')
    const $label = $('<label>').appendTo($div)
    $label.css('padding-left', '0')
    const $radio = $('<input>').appendTo($label)
    const $span = $('<span>').appendTo($label)
    $span.text(label)
    $span.css('padding-left', '20px')
    $radio.attr('type', 'radio')
    $radio.attr('name', 'img-download-' + id + '-' + i)
    $radio.attr('class', 'img-download-' + id + '-' + val)
    $radio.attr('value', val)
    $radio.css('margin-left', 0)
    if (checked) {
      $radio.prop('checked', true)
      //$('.img-download-' + id + '-' + val).prop('checked', true)
    }
    $radio.change(function () {
      imageType = val
    })
  }
}