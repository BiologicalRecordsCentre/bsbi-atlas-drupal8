
const $ = jQuery // eslint-disable-line no-undef

export function createGallery(id, ddbid) {

  // DO I NEED TO HAVE SEPARATE FUNCTIONS FOR CREATE AND UPDATED GALLERY
  // FOR CONSISTENCY ON MAIN.JS?

  document.getElementById(id).innerHTML = ''
  if (ddbid) {
    // Fetch the images available for current taxon
    // const pThumbs = []
    // const urlThumbs = []
    // for (let i=1; i<101; i++) {
    //   const imageUrl = `https://atlasimages.bsbi.org/processed/${ddbid}/${ddbid}-${i}/${ddbid}-${i}-1920w.webp`
    //   const p = fetch(imageUrl, {method: 'GET',  mode: 'no-cors'})
    //     .then(response => {
    //       if (!response.ok) {
    //         return response.blob()
    //       } else {
    //         throw Error(response.statusText)
    //       }
    //     })
    //     .then(imageBlob => {
    //       urlThumbs[i] = URL.createObjectURL(imageBlob)
    //     })
    //     .catch(error => {
    //       urlThumbs[i] = null
    //     })
    //   pThumbs.push(p)
    // }
    // Promise.all(pThumbs).then(() => {
    //   console.log('Thumbnails fetched')
    //   console.log(urlThumbs)
    // })

    // Wanted to do the following by fetching header (see ablove), but can't because of cors
    // so instead fetch use image objects and store the indices of those that succeed

    const pThumbs=[]
    const iThumbs=[]

    for (let i=1; i<=50; i++) {
      const $thumb = $('<img>').attr('src', `https://atlasimages.bsbi.org/processed/${ddbid}/${ddbid}-${i}/${ddbid}-${i}-192w.webp`)

      const p = new Promise(
        (resolve) => {
          $thumb.on('load', function() {
            iThumbs[i] = true
            resolve(true)
          }).on('error', function() {
            iThumbs[i] = false
            resolve(false)
          })
        }
      )
      pThumbs.push(p)  
    }

    Promise.all(pThumbs).then(() => {

      const lgContainer = document.getElementById(id)

      const imagesFound = iThumbs.some(thumbFound => thumbFound)

      if (imagesFound) {
        const dynamicEl = iThumbs.filter(thumbFound => thumbFound).map((v,i) => {
          return {
            src: `https://atlasimages.bsbi.org/processed/${ddbid}/${ddbid}-${i+1}/${ddbid}-${i+1}-1920w.webp`,
            thumb: `https://atlasimages.bsbi.org/processed/${ddbid}/${ddbid}-${i+1}/${ddbid}-${i+1}-192w.webp`,
            subHtml: `
              <div class="lightGallery-captions">
                <div style="background-color: black; opacity: 0.7">
                <p style="margin: 0.3em">TODO - Copyright text to acknowledge Rob Still and Chris Gibson</p>
                <div>
              </div>`
          }
        })
        // After https://www.lightgalleryjs.com/demos/inline/ & https://codepen.io/sachinchoolur/pen/zYZqaGm
        const inlineGallery = lightGallery(lgContainer, { // eslint-disable-line no-undef
          container: lgContainer,
          dynamic: true,
          // Turn off hash plugin in case if you are using it
          // as we don't want to change the url on slide change
          hash: false,
          // Do not allow users to close the gallery
          closable: false,
          // Add maximize icon to enlarge the gallery
          showMaximizeIcon: true,
          // Append caption inside the slide item
          // to apply some animation for the captions (Optional)
          appendSubHtmlTo: '.lg-item',
          // Delay slide transition to complete captions animations
          // before navigating to different slides (Optional)
          // You can find caption animation demo on the captions demo page
          slideDelay: 400,
          plugins: [lgZoom, lgThumbnail], // eslint-disable-line no-undef
          dynamicEl: dynamicEl,
          thumbWidth: 90,
          thumbHeight: "60px",
          thumbMargin: 4
        })
        // Since we are using dynamic mode, we need to programmatically open lightGallery
        setTimeout(() => {
          inlineGallery.openGallery()
          $('#bsbi-gallery-copyright').show()
        }, 200)
      } else {
        lgContainer.innerHTML = `<i>No images are available for this taxon.</i>`
        $('#bsbi-gallery-copyright').hide()
      }
    })
  }
}