let $

export function setBaseMetaTags(_$) {
  $ = _$
  
  addMetaTags('title', 'BSBI Online Atlas 2020')
  addMetaTags('authors', 'Stroh, P. A., Humphrey, T., Burkmar, R. J., Pescott, O. L., , Roy, D.B., and Walker, K. J.')
  addMetaTags('author', 'Stroh, P. A.')
  addMetaTags('author', 'Humphrey, T.')
  addMetaTags('author', 'Burkmar, R. J.')
  addMetaTags('author', 'Pescott, O. L.')
  addMetaTags('author', 'Roy, D. B.')
  addMetaTags('author', 'Walker, K. J.')
  addMetaTags('year', '2022')
  addMetaTags('url', location.origin + '/atlas')
}

export function addMetaTags(type, value, update) {

  const addHeadTag = (name, content, update) => {
    if (update) {
      $('meta[name="' + name + '"').attr('content', content) 
    } else {
      $('head').append('<meta name="' + name + '" content="' + content + '" />') 
    }
  }

  // http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata
  switch(type) {
    case 'title':
      $('title').html(value)
      addHeadTag("citation_title", value, update)
      addHeadTag("dc.title", value, update)
      addHeadTag("dcterms.title", value, update)
      addHeadTag("prism.alternateTitle", value, update)
      addHeadTag("eprints.title", value, update)
      addHeadTag("bepress_citation_title", value, update)
      break
    case 'author':
      addHeadTag("citation_author", value)
      addHeadTag("dc.creator", value)
      addHeadTag("dcterms.creator", value)
      addHeadTag("eprints.creators_name", value)
      addHeadTag("bepress_citation_author", value)
      break
    case 'authors':
      addHeadTag("author", value)
      addHeadTag("citation_authors", value)
      break
    case 'year':
      addHeadTag("citation_year", value)
      addHeadTag("citation_date", value)
      addHeadTag("citation_publication_date", value)
      addHeadTag("dc.date", value)
      addHeadTag("dcterms.date", value)
      addHeadTag("dcterms.created", value)
      addHeadTag("prism.copyrightYear", value)
      addHeadTag("prism.coverDate", value)
      addHeadTag("prism.publicationDate", value)
      addHeadTag("eprints.datestamp", value)
      addHeadTag("eprints.date", value)
      addHeadTag("bepress_citation_date", value)
      break
    case 'url':
      addHeadTag("citation_public_url", value)
      addHeadTag("prism.url", value)
      addHeadTag("eprints.official_url", value)
      addHeadTag("bepress_citation_pdf_url", value)
  }
}


