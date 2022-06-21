const $ = jQuery // eslint-disable-line no-undef

export function updateTrendSummary(id, d, rgbColourString) {

  const baseColour = rgbColourString.substring(0,rgbColourString.length-1).replace('rgb', 'rgba')

  $(`#${id}_decline_strong`).css('background-color', `${baseColour},${Number(d.declineStrong)/100})`)
  $(`#${id}_decline_mod`).css('background-color', `${baseColour},${Number(d.declineMod)/100})`)
  $(`#${id}_stable`).css('background-color', `${baseColour},${Number(d.stable)/100})`)
  $(`#${id}_increase_mod`).css('background-color', `${baseColour},${Number(d.increaseMod)/100})`)
  $(`#${id}_increase_strong`).css('background-color', `${baseColour},${Number(d.increaseStrong)/100})`)
}

export function trendSummary(id) {

  const $divParent = $('<div>')
  $divParent.attr('id', id)

  // Graphic
  const maxWidth = '160px'
  const $tg = $('<div>').appendTo($divParent)
  $tg.css('display', 'flex')
  $tg.css('font-weight', 'bold')
  $tg.css('max-width', maxWidth)

  tgSwatch('--', 'Strong decline', `${id}_decline_strong`)
  tgSwatch('-', 'Moderate decline', `${id}_decline_mod`)
  tgSwatch('0', 'Stable', `${id}_stable`)
  tgSwatch('+', 'Moderate decline', `${id}_increase_mod`)
  tgSwatch('++', 'Strong decline', `${id}_increase_strong`)

  const $tgt = $('<div>').appendTo($divParent)
  $tgt.css('display', 'flex')
  $tgt.css('font-size', '0.8em')
  $tgt.css('margin-bottom', '1em')
  $tgt.css('max-width', maxWidth)

  const $tgt1 = $('<div>').appendTo($tgt)
  $tgt1.css('flex', '2')
  $tgt1.css('text-align', 'center')
  $tgt1.text('decrease <<')

  const $tgt2 = $('<div>').appendTo($tgt)
  $tgt2.css('flex', '1')

  const $tgt3 = $('<div>').appendTo($tgt)
  $tgt3.css('flex', '2')
  $tgt3.css('text-align', 'center')
  $tgt3.text(' >> increase')

  return $divParent

  function tgSwatch(text, tip, id) {
    const $tgs = $('<div>').appendTo($tg)
    $tgs.attr('id', id)
    $tgs.css('flex', '1')
    $tgs.css('height', '30px')
    $tgs.css('text-align', 'center')
    $tgs.css('line-height', '30px')
    $tgs.css('vertical-align', 'middle')
    $tgs.css('border-left', '1px solid silver')
    $tgs.css('border-top', '1px solid silver')
    $tgs.css('border-bottom', '1px solid silver')
    if (text === '++') {
      $tgs.css('border-right', '1px solid silver')
    }
    $tgs.text(text)
    $tgs.prop('title', tip)
  }
}

