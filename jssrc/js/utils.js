const $ = jQuery // eslint-disable-line no-undef

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

export function getCitation(currentTaxon, forImageDownload) {

  //const taxon =  currentTaxon.shortName.replace(/ x /g, ' × ')
  //const taxon = $('<p>').html(currentTaxon.name).text()
  const taxon = $('<p>').html(currentTaxon.formattedName).text()

  if (forImageDownload) {
    return `<i>${taxon.replace(/\s/g, '</i> <i>')}</i> in <i>BSBI</i> <i>Online</i> <i>Atlas</i> <i>2020</i>, eds P.A. Stroh, T. A. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ${location.origin}/atlas/${currentTaxon.identifier} [Accessed ${new Date().toLocaleDateString('en-GB')}]`
  } else {
    return `<i>${taxon}</i> in <i>BSBI Online Plant Atlas 2020</i>, eds P.A. Stroh, T. A. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ${location.origin}/atlas/${currentTaxon.identifier} [Accessed ${new Date().toLocaleDateString('en-GB')}]`
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