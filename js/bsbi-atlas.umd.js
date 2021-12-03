(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var name = "bsbi-atlas";
  var version = "0.1.0";
  var description = "Javscript code for BSBI atlas.";
  var type = "module";
  var main$1 = "../js/bsbi-atlas.umd.js";
  var browser = "../js/bsbi-atlas.umd.js";
  var browser_min = "../js/bsbi-atlas-min.umd.js";
  var browser_css = "../css/bsbi-atlas.css";
  var scripts = {
  	lint: "npx eslint js",
  	build: "rollup --config"
  };
  var author = "UKCEH Biological Records Centre";
  var license = "GPL-3.0-only";
  var devDependencies = {
  	"@babel/core": "^7.10.4",
  	"@babel/preset-env": "^7.10.4",
  	"@rollup/plugin-babel": "^5.0.4",
  	"@rollup/plugin-commonjs": "^13.0.0",
  	"@rollup/plugin-json": "^4.1.0",
  	"@rollup/plugin-node-resolve": "^8.1.0",
  	eslint: "^7.4.0",
  	rollup: "^2.23.0",
  	"rollup-plugin-css-only": "^2.1.0",
  	"rollup-plugin-eslint": "^4.0.0",
  	"rollup-plugin-terser": "^6.1.0"
  };
  var dependencies = {
  };
  var pkg = {
  	name: name,
  	version: version,
  	description: description,
  	type: type,
  	main: main$1,
  	browser: browser,
  	browser_min: browser_min,
  	browser_css: browser_css,
  	scripts: scripts,
  	author: author,
  	license: license,
  	devDependencies: devDependencies,
  	dependencies: dependencies
  };

  var $;
  function main(_$, _drupalSettings) {
    // Set globals
    $ = _$;

    setBaseMetaTags();
  }

  function setBaseMetaTags() {
    addMetaTags('title', 'BSBI Online Atlas 2020');
    addMetaTags('authors', 'Stroh, P. A., Humphrey, T., Burkmar, R. J., Pescott, O. L., , Roy, D.B., and Walker, K. J.');
    addMetaTags('author', 'Stroh, P. A.');
    addMetaTags('author', 'Humphrey, T.');
    addMetaTags('author', 'Burkmar, R. J.');
    addMetaTags('author', 'Pescott, O. L.');
    addMetaTags('author', 'Roy, D. B.');
    addMetaTags('author', 'Walker, K. J.');
    addMetaTags('year', '2022');
    addMetaTags('url', location.origin + '/atlas');
  }

  function addMetaTags(type, value, update) {
    var addHeadTag = function addHeadTag(name, content, update) {
      if (update) {
        $('meta[name="' + name + '"').attr('content', content);
      } else {
        $('head').append('<meta name="' + name + '" content="' + content + '" />');
      }
    }; // http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata


    switch (type) {
      case 'title':
        $('title').html(value);
        addHeadTag("citation_title", value, update);
        addHeadTag("dc.title", value, update);
        addHeadTag("dcterms.title", value, update);
        addHeadTag("prism.alternateTitle", value, update);
        addHeadTag("eprints.title", value, update);
        addHeadTag("bepress_citation_title", value, update);
        break;

      case 'author':
        addHeadTag("citation_author", value);
        addHeadTag("dc.creator", value);
        addHeadTag("dcterms.creator", value);
        addHeadTag("eprints.creators_name", value);
        addHeadTag("bepress_citation_author", value);
        break;

      case 'authors':
        addHeadTag("author", value);
        addHeadTag("citation_authors", value);
        break;

      case 'year':
        addHeadTag("citation_year", value);
        addHeadTag("citation_date", value);
        addHeadTag("citation_publication_date", value);
        addHeadTag("dc.date", value);
        addHeadTag("dcterms.date", value);
        addHeadTag("dcterms.created", value);
        addHeadTag("prism.copyrightYear", value);
        addHeadTag("prism.coverDate", value);
        addHeadTag("prism.publicationDate", value);
        addHeadTag("eprints.datestamp", value);
        addHeadTag("eprints.date", value);
        addHeadTag("bepress_citation_date", value);
        break;

      case 'url':
        addHeadTag("citation_public_url", value);
        addHeadTag("prism.url", value);
        addHeadTag("eprints.official_url", value);
        addHeadTag("bepress_citation_pdf_url", value);
    }
  }

  (function ($, Drupal, drupalSettings) {
    // Output version from package json to console
    // to assist with trouble shooting.
    console.log("Running ".concat(pkg.name, " version ").concat(pkg.version)); // Call main function

    main($);
  })(jQuery, Drupal, drupalSettings);

}));
