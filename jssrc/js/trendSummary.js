const $ = jQuery // eslint-disable-line no-undef

export function trendSummary(v1, v2, v3, v4, v5) {

  const $divParent = $('<div>')

  // Graphic
  const maxWidth = '160px'
  const $tg = $('<div>').appendTo($divParent)
  $tg.css('display', 'flex')
  $tg.css('font-weight', 'bold')
  $tg.css('max-width', maxWidth)

  tgSwatch(0.8, '--', 'Strong decline')
  tgSwatch(0.5, '-', 'Moderate decline')
  tgSwatch(0.4, '0', 'Stable')
  tgSwatch(0.6, '+', 'Moderate decline')
  tgSwatch(0.7, '++', 'Strong decline')

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

  function tgSwatch(opacity, text, tip) {
    const $tgs = $('<div>').appendTo($tg)
    $tgs.css('flex', '1')
    $tgs.css('height', '30px')
    //$tgs.css('background-color', `rgba(255,0,0,${opacity})`)
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

