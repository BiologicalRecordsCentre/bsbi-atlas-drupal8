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

export function updateTrendSummary2(id, d) {

  if (d) {
    $(`#${id}-swatches`).css('display', '') //.show()
    $(`#${id}-no-trend`).css('display', 'none') //.hide()
    setColour(`${id}_decline_strong`, d.declineStrong)
    setColour(`${id}_decline_mod`, d.declineMod)
    setColour(`${id}_stable`, d.stable)
    setColour(`${id}_increase_mod`, d.increaseMod)
    setColour(`${id}_increase_strong`, d.increaseStrong)
  } else {
    $(`#${id}-swatches`).css('display', 'none') //.hide()
    $(`#${id}-no-trend`).css('display', '') //.show()
  }

  function setColour(id, val) {

    d3.select(`#${id}`).attr('fill', `rgb(${255 - 255 * Number(val)/100},255,255)`)
    const grey = 220 - Math.floor((val/100) * 220)
    d3.select(`#${id}-path`).attr('fill', `rgb(${grey},${grey},${grey})`)

    let title = d3.select(`#${id}`).select('title').attr('data-title')
    d3.select(`#${id}`).select('title').text(`${title}: ${val}%`)
    d3.select(`#${id}-path`).select('title').text(`${title}: ${val}%`)
  }
}

export function trendSummary2(id, font, fontSize) {

  const svgArrow = `M 2250 7256 l 0 -2813 l -61 -7 c -34 -3 -526 -6 -1093 -6 l -1031 -1 l 66 -62 c 36 -34 756 -714 1600 -1512 c 844 -797 1820 -1719 2169 -2049 c 349 -329 667 -630 705 -668 l 70 -68 l 230 217 c 1454 1373 3719 3512 4012 3790 l 373 353 l -1090 0 l -1090 0 l 0 2820 l 0 2820 l -2430 0 l -2430 0 l 0 -2814 z`
  const svgSquare = `M 5 3968 c -3 -7 -4 -897 -3 -1978 l 3 -1965 l 2080 0 l 2080 0 l 0 1975 l 0 1975 l -2078 3 c -1657 2 -2079 0 -2082 -10 z`
  const ss = 25
  const sr = 22

  const swatches = [
    {
      svg: svgArrow,
      scale: 0.6,
      rot: 180,
      text: `Strong decline`,
      id: `${id}_decline_strong`,
      da: [ss * 4]
    },
    {
      svg: svgArrow,
      scale: 0.4,
      rot: 180,
      text: `Moderate decline`,
      id: `${id}_decline_mod`,
      da: [ss*3, ss]
    },
    {
      svg: svgSquare,
      scale: 0.2,
      rot: 45,
      text: 'Stable',
      id: `${id}_stable`,
      da: [ss*3, ss]
    },
    {
      svg: svgArrow,
      scale: 0.4,
      rot: 0,
      text: `Moderate increase`,
      id: `${id}_increase_mod`,
      da: [ss*3, ss]
    },
    {
      svg: svgArrow,
      scale: 0.6,
      rot: 0,
      text: `Strong increase`,
      id: `${id}_increase_strong`,
      da: [ss*3, ss]
    }
  ]

  // Graphic
  const divParent = d3.select(`#${id}`)
  const svg = divParent.append('svg')
    .attr('width', ss * 5 + 2)
    .attr('height', ss + 2)
    .style('overflow', 'visible')
    .style('vertical-align', 'bottom')

  const gMain = svg.append('g')
  gMain.attr('transform', 'translate(1 1)')
  // Don't set display of gSwatches to 'none' here otherwise Firefox doesn't calculate bbox
  const gSwatches = gMain.append('g').attr('id', `${id}-swatches`) //.style('display', 'none')
  const tNoTrend = gMain.append('text').attr('id', `${id}-no-trend`).text('No trend').style('display', 'none')
    .style('display', 'none')
    .attr('text-anchor', 'middle')
    .attr('x', ss * 5 / 2)
    .attr('y', ss/2)
    .attr('dominant-baseline', 'mathematical')

  if (font) {
    tNoTrend.style('font-family', font)
    tNoTrend.style('font-size', fontSize)
  }

  gMain.append('rect')
    .attr('width', ss * 5)
    .attr('height', ss)
    .attr('stroke','grey')
    .attr('fill','none')
    .style('vertical-align', 'bottom')

  // Swatches
  swatches.forEach((s,i) => {

    const indicator = gSwatches.append('rect')
      .attr('id', s.id)
      .attr('width', ss)
      .attr('height', ss)
      .attr('x', i * ss)
      .attr('fill', 'white')

    indicator.append('title').attr('data-title', s.text).text(s.text)

    if (s.svg) {
      const path = gSwatches.append('path').attr('d', s.svg).style('visibility', 'hidden')
      const svgbbox = path.node().getBBox()
      path.remove()

      // Note the order of the transformations is right to left
      // in the translate clause
      const iScale = (ss / svgbbox.width) * s.scale
      const xAdj = i * ss + (ss - svgbbox.width * iScale)/2
      const yAdj = (ss - svgbbox.height * iScale)/2
      const xRot = ss/2 + i*ss
      const yRot = ss/2

      const symbol = gSwatches.append('path')
        .attr('id', `${s.id}-path`)
        .attr('d', s.svg)
        .attr('transform', `
          rotate(${s.rot}, ${xRot}, ${yRot})
          translate(${xAdj} ${yAdj}) 
          scale(${iScale})
        `)

        symbol.append('title').text(s.text)
    }
  })

  gSwatches.style('display', 'none')
}

export async function trendSave(id, filename) {

  const svg = d3.select(`#${id} svg`)

  return new Promise((resolve) => {
    const blob1 =  serialize(svg)
    if(filename) {
      download(blob1, filename)
    }
    resolve(blob1)
  })

  function download(data, filename) {
    const dataUrl = URL.createObjectURL(data)
    const file = `${filename}.svg`
    downloadLink(dataUrl, file)
  }

  function serialize(svg) {
    const xmlns = "http://www.w3.org/2000/xmlns/"
    const xlinkns = "http://www.w3.org/1999/xlink"
    const svgns = "http://www.w3.org/2000/svg"
  
    const domSvg = svg.node()
    const cloneSvg = domSvg.cloneNode(true)
    const d3Clone = d3.select(cloneSvg)
    // Explicitly change text in clone to required font
    d3Clone.selectAll('text').style('Minion Pro')
  
    cloneSvg.setAttributeNS(xmlns, "xmlns", svgns)
    cloneSvg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns)
    const serializer = new window.XMLSerializer
    const string = serializer.serializeToString(cloneSvg)
    return new Blob([string], {type: "image/svg+xml"})
  }

  function downloadLink(dataUrl, file) {

    // Create a link element
    const link = document.createElement("a")
    // Set link's href to point to the data URL
    link.href = dataUrl
    link.download = file

    // Append link to the body
    document.body.appendChild(link)

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
      })
    )
    // Remove link from body
    document.body.removeChild(link)
  }
}
