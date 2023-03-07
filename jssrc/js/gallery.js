import { pcache } from './gen'

const $ = jQuery // eslint-disable-line no-undef
const ds = drupalSettings // eslint-disable-line no-undef

export function createGallery(id, ddbid, shortName) {

  // DO I NEED TO HAVE SEPARATE FUNCTIONS FOR CREATE AND UPDATED GALLERY
  // FOR CONSISTENCY ON MAIN.JS?

  document.getElementById(id).innerHTML = ''
  if (ddbid) {

    // Images are listed in the caption file, so fetch it
    const captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions2/'
    const captionFile = `${captionRoot}${ddbid.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    
    d3.csv(captionFile)
      .then(function(d) {

        //console.log('images caption file', d)
        // Image captions
        if (!d[0].imageCaptions) { // catch if imageCaptions column not yet added to CSV
          d[0].imageCaptions = ''
        }
        const captions = d[0].imageCaptions ? d[0].imageCaptions.split(';').filter(i => i) : []
        const dynamicEl = d[0].images.split(';').filter(i => i).map((img, indx) => {
          // Copyright Rob Still/Chris Gibson
          const caption = captions[indx] ? captions[indx] : 'All rights reserved'
          return {
            alt: `Image of ${shortName} - ${caption}`,
            src: img.replace('{PIXELSIZE}', '1920'),
            thumb: img.replace('{PIXELSIZE}', '192'),
            subHtml: `
              <div class="lightGallery-captions">
                <div style="background-color: black; opacity: 0.7">
                <p style="margin: 0.3em">${caption}</p>
                <div>
              </div>`
          }
        })

        const lgContainer = document.getElementById(id)
        
        if (dynamicEl.length) {
          
          // After https://www.lightgalleryjs.com/demos/inline/ & https://codepen.io/sachinchoolur/pen/zYZqaGm
          const inlineGallery = lightGallery(lgContainer, { // eslint-disable-line no-undef
            container: lgContainer,
            dynamic: true,
            // Turn off hash plugin in case if you are using it
            // as we don't want to change the url on slide change
            hash: false,
            // Do not allow users to close the gallery
            closable: false,
            // Hide download button
            download: false,
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
          lgContainer.innerHTML = `No images are available for this taxon`
          $('#bsbi-gallery-copyright').hide()
        }
      })
  }
}