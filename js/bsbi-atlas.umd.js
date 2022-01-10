(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('d3')) :
  typeof define === 'function' && define.amd ? define(['d3'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3));
})(this, (function (d3) { 'use strict';

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var d3__namespace = /*#__PURE__*/_interopNamespace(d3);

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
  	d3: "^5.16.0",
  	lightgallery: "^2.3.0"
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

  var $$4 = jQuery; // eslint-disable-line no-undef

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
        $$4('meta[name="' + name + '"').attr('content', content);
      } else {
        $$4('head').append('<meta name="' + name + '" content="' + content + '" />');
      }
    }; // http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata


    switch (type) {
      case 'title':
        $$4('title').html(value);
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

  var $$3 = jQuery; // eslint-disable-line no-undef

  var phen1, phen2, phen3, altlat;
  function createEcology(sel) {
    $$3('<h4>').appendTo($$3(sel)).text('Phenology & Apparency');
    var $p1 = $$3('<p>').appendTo($$3(sel));
    $p1.text("Explanation of apparency and phenology charts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.");
    var $phenFlexParent = $$3('<div>').appendTo($$3(sel));
    $phenFlexParent.attr('class', 'phenRow');
    var $phenFlexLeft = $$3('<div>').appendTo($phenFlexParent);
    $phenFlexLeft.attr('class', 'phenColumn');
    var $phenFlexRight = $$3('<div>').appendTo($phenFlexParent);
    $phenFlexRight.attr('class', 'phenColumn');
    $$3('<h4>').appendTo($$3(sel)).text('Altitude vs Latitude');
    var $p2 = $$3('<p>').appendTo($$3(sel));
    $p2.text("Explanation of latitude/altitude chart. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.");
    var $altlat = $$3('<div>').appendTo($$3(sel));
    var $apparency = $$3('<div>').appendTo($phenFlexLeft);
    $apparency.attr('id', 'bsbi-apparency-chart').css('max-width', '400px');
    phen1 = brccharts.phen1({
      selector: '#bsbi-apparency-chart',
      data: [],
      taxa: ['taxon'],
      metrics: [{
        prop: 'n',
        label: 'Apparency',
        colour: 'green',
        fill: '#ddffdd'
      }],
      width: 400,
      height: 250,
      headPad: 35,
      perRow: 1,
      expand: true,
      showTaxonLabel: false,
      axisLeft: 'off',
      showLegend: false,
      interactivity: 'none'
    });
    var $phenology = $$3('<div>').appendTo($phenFlexLeft);
    $phenology.attr('id', 'bsbi-phenology-chart').css('max-width', '400px');
    phen2 = brccharts.phen2({
      selector: '#bsbi-phenology-chart',
      data: [],
      taxa: ['taxon'],
      metrics: [],
      width: 400,
      height: 25,
      headPad: 35,
      chartPad: 35,
      perRow: 1,
      expand: true,
      showTaxonLabel: false,
      interactivity: 'none'
    });
    var $phenSource = $$3('<div>').appendTo($phenFlexLeft);
    $phenSource.attr('id', 'bsbi-phenology-source');
    $phenSource.css('font-size', '0.8em');
    $phenSource.css('padding-left', '32px');
    $phenSource.css('max-width', '400px');
    var $apparencyByLat = $$3('<div>').appendTo($phenFlexRight);
    $apparencyByLat.attr('id', 'bsbi-apparency-by-lat-chart').css('max-width', '400px'); // $apparencyByLat = $('<div>').appendTo($phenFlexRight)
    // $apparencyByLat.attr('id', 'bsbi-apparency-by-lat-chart').css('max-width', '400px')

    phen3 = brccharts.phen1({
      selector: '#bsbi-apparency-by-lat-chart',
      data: [],
      taxa: ['taxon'],
      metrics: [],
      lines: ['white', 'white', '#dddddd', 'white', 'white', '#dddddd', 'white', 'white', '#dddddd', 'white', 'white', '#dddddd'],
      width: 400,
      height: 410,
      spread: true,
      perRow: 1,
      expand: true,
      showTaxonLabel: false,
      showLegend: false,
      interactivity: 'mousemove',
      margin: {
        left: 40,
        right: 0,
        top: 20,
        bottom: 5
      },
      axisLeftLabel: 'Latitudinal band',
      axisLabelFontSize: 12
    });
    latPhenNormalizeCheckbox($phenFlexRight, phen3); // Alt vs Lat visualisation

    $altlat.attr('id', 'bsbi-altlat-chart');
    $altlat.css('max-width', '600px');
    var opts = {
      selector: '#bsbi-altlat-chart',
      data: [],
      ranges: [{
        min: 0,
        max: 0.99999,
        radius: 8,
        legend: '<1%'
      }, {
        min: 1,
        max: 10,
        radius: 14,
        legend: '1-10%'
      }, {
        min: 10.00001,
        max: 100,
        radius: 20,
        legend: '11-100%'
      }],
      taxa: ['dummy'],
      width: 600,
      height: 300,
      perRow: 1,
      expand: true,
      margin: {
        left: 45,
        right: 10,
        top: 20,
        bottom: 35
      },
      showTaxonLabel: false,
      showLegend: true,
      axisLabelFontSize: 12,
      legendFontSize: 10,
      interactivity: 'toggle'
    };
    altlat = brccharts.altlat(opts); // Website style is overriding some charts style, so reset it

    $$3('.brc-chart-phen1').css('overflow', 'visible'); // Chart line width - not currently a chart option

    $$3('#bsbi-apparency-by-lat-chart .phen-path').css('stroke-width', 1);
  }

  function latPhenNormalizeCheckbox($parent, phenChart) {
    // Overall control container
    var $container = $$3('<div style="margin-left: 0px">').appendTo($parent);
    $container.addClass('atlas-phen-normalize-checkbox-control');
    $container.css('margin-left', '35px'); // Status on/off toggle

    var $checDiv = $$3('<div class="checkbox">').appendTo($container);
    $checDiv.css('margin-top', '0');
    $$3('<label><input type="checkbox" class="atlas-phen-normalize-checkbox"/><span>Normalize over latitudes</span></label>').appendTo($checDiv);
    $$3('.atlas-phen-normalize-checkbox').change(function () {
      var normalize = $$3(this).is(':checked');
      phenChart.setChartOpts({
        ytype: normalize ? 'normalized' : 'count'
      });
    });
  }

  function changeEcology(dataRoot, identifier) {
    if (!identifier) return;
    var apparencyRoot = dataRoot + 'bsbi/apparency/';
    var phenologyRoot = dataRoot + 'bsbi/phenology/';
    var mapRoot = dataRoot + 'bsbi/20210923/'; // Apparency all

    var fileAll = apparencyRoot + 'all/' + identifier.replace(/\./g, "_") + '.csv';
    d3__namespace.csv(fileAll + '?prevent-cache=').then(function (data) {
      apparency(data);
    })["catch"](function () {
      // TEMPORARY CODE FOR TESTING so that a file always returned 
      var fileDefault = apparencyRoot + 'all/dummy.csv';
      d3__namespace.csv(fileDefault + '?prevent-cache=').then(function (data) {
        apparency(data);
      });
    }); // Apparency by latitude

    var fileLat = apparencyRoot + 'byLat/' + identifier.replace(/\./g, "_") + '.csv';
    d3__namespace.csv(fileLat + '?prevent-cache=').then(function (data) {
      apparencyByLat(data);
    })["catch"](function () {
      // TEMPORARY CODE FOR TESTING so that a file always returned 
      var fileDefault = apparencyRoot + 'byLat/dummy.csv';
      d3__namespace.csv(fileDefault + '?prevent-cache=').then(function (data) {
        apparencyByLat(data);
      });
    }); // For Oli's stuff October - reformatted 

    function apparency(data) {
      // Map text to numeric values and add taxon
      var numeric = data.map(function (d) {
        return {
          taxon: 'taxon',
          week: Number(d.week),
          n: Number(d.n)
        };
      }); // Sort it - just in case

      var sorted = numeric.sort(function (a, b) {
        return a.week > b.week;
      }); // Update the apparency chart

      phen1.setChartOpts({
        data: sorted
      });
    }

    function apparencyByLat(data) {
      // Map text to numeric values and add taxon
      var numeric = data.map(function (d) {
        var nd = {
          taxon: 'taxon'
        };
        Object.keys(d).forEach(function (k) {
          nd[k] = Number(d[k]);
        });
        return nd;
      }); //const latitudes = Object.keys(data[0]).filter(f => f.length === 2)

      var latitudes = ['50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'];
      var metrics = latitudes.map(function (l) {
        return {
          prop: l,
          label: l,
          colour: 'green',
          fill: '#ddffdd'
        };
      }); // Sort it - just in case

      var sorted = numeric.sort(function (a, b) {
        return a.week > b.week;
      }); // Update the apparency chart

      phen3.setChartOpts({
        data: sorted,
        metrics: metrics
      });
    } // Phenology


    var file = phenologyRoot + identifier.replace(/\./g, "_") + '.csv';
    d3__namespace.csv(file + '?prevent-cache=').then(function (data) {
      phenology(data);
    })["catch"](function () {
      // TEMPORARY CODE FOR TESTING so that a file always returned 
      var fileDefault = phenologyRoot + 'dummy-phenology.csv';
      d3__namespace.csv(fileDefault + '?prevent-cache=').then(function (data) {
        phenology(data);
      });
    });

    function phenology(data) {
      //console.log("phenology data", data[0])
      // Chart
      var m2d = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 365];
      var flower = data[0].flower.split('-');
      var leaf = data[0].leaf.split('-');
      var flowerStart = m2d[Number(flower[0]) - 1];
      var flowerEnd = flower[1] ? m2d[Number(flower[1])] : m2d[Number(flower[0])];
      var leafStart = m2d[Number(leaf[0]) - 1];
      var leafEnd = leaf[1] ? m2d[Number(leaf[1])] : m2d[Number(leaf[0])];
      var svgLeaf = "m12941 19084-175-112-108 54c-59 30-112 54-117 54s-97-112-203-250l-193-250h-150-151l-177-188c-97-104-186-197-197-207-19-17-23-16-139 49-66 36-124 66-128 65-6 0-219-276-359-464-10-14-30-7-149 53l-138 70-26-32c-15-17-103-124-195-238-92-115-171-208-175-208s-61 25-127 55l-119 55-90-92c-50-51-149-155-220-230l-130-138-112 100c-61 55-115 100-120 100-4 0-123-122-263-269-140-148-260-270-266-270-5-1-65 39-131 88l-122 90-233-207c-129-114-264-233-300-265l-66-58-138 80-139 80-139-147c-77-81-181-189-231-240l-91-94-161 80-160 81-169-201c-93-110-176-209-184-219-15-19-19-18-174 26-87 25-162 42-167 39s-79-90-164-194c-140-171-158-188-178-181-12 5-73 30-134 56-62 26-116 45-121 43-5-1-105-104-222-226-192-202-216-223-239-218-14 3-82 23-151 44l-126 38-249-262c-138-145-252-263-255-263s-45 55-95 124c-49 68-92 121-96 117s-98-138-209-299l-201-292-138 69-139 69-223-336c-123-184-227-339-230-344s-83-20-177-33c-95-12-174-25-176-27s-52-107-111-234c-59-126-111-233-114-237-4-4-62 8-130 27-69 19-125 34-127 32-1-1-57-139-125-307-67-168-124-307-125-309-2-2-69-14-150-27-80-12-147-24-149-26-3-2-30-125-60-273-31-149-58-272-60-274-3-2-68 2-146 8-77 7-144 10-147 6-3-3-16-132-28-286s-23-281-25-283-79-18-171-36l-168-34-2-380-3-381-193-79c-139-57-192-84-192-95 0-9 29-149 65-310s65-295 63-296c-2-2-86-43-188-91s-188-90-192-93 45-170 108-371l114-365-67-65c-38-36-110-104-162-152l-93-86 136-329c75-181 136-332 136-337 0-4-58-90-128-190-71-99-132-187-136-194-6-10 62-142 290-561 15-26 21-48 16-55-5-6-66-82-135-170-70-87-127-162-127-166 0-5 108-183 239-396l240-387-90-99c-49-54-89-102-89-107s111-164 246-353c136-188 253-353 261-365 13-20 10-32-43-149-55-124-56-128-38-143 11-9 182-159 381-334l361-317-5-43c-3-23-13-105-24-182-10-77-16-141-15-143 4-3 510-150 857-248 15-4 13-20-18-141-18-74-32-137-31-139 2-1 138-21 303-42 279-37 309-43 431-86 238-83 552-155 824-188 141-17 699-17 840 0 648 79 1266 287 1860 624 111 64 378 237 494 320 46 34 67 44 62 32-4-11-35-107-68-214-397-1294-750-2359-915-2764-72-178-107-247-165-332-72-104-110-172-148-269-56-142-97-325-73-325 29 0 420 94 429 104 6 6 46 128 89 271 42 143 142 478 222 745 79 267 202 679 273 915 71 237 185 621 255 855s151 506 181 604c30 99 54 185 54 193 0 27 18 12 35-30 31-80 204-397 305-558 282-454 581-807 1323-1564l245-250 114 113c62 61 116 112 120 112s118-122 253-270c136-149 250-270 254-270 3 0 40 68 81 151s78 152 82 155c3 2 122-66 263-152 180-110 259-153 264-145 5 7 18 57 30 112l22 99h515c283 0 514 1 514 3s-20 52-44 112l-44 110 479 3c310 1 479 6 479 12s-14 58-31 116-30 106-28 108c2 1 179 26 392 56 214 30 392 57 398 60 5 4-4 44-21 95-16 49-30 94-30 100 0 7 112 32 288 64 158 29 296 55 307 58 20 4 20 7 9 141-7 75-12 138-11 138 5 5 558 214 564 214 5 0 14 4 21 9 13 8 10 15-74 227-3 5 144 82 326 169 181 88 330 164 330 170s-30 84-66 174c-53 134-63 166-52 176 7 7 105 85 218 175s210 168 217 174c9 8-1 46-42 164-30 84-55 157-55 162s101 91 225 190 225 183 225 186-56 66-124 140l-125 135 194 217c107 119 195 219 194 222 0 3-45 41-100 85-54 44-111 90-125 101l-26 21 145 289c80 159 147 294 148 299 1 6-25 25-57 44-33 18-78 44-101 57l-41 24 124 226c69 124 124 229 122 234-2 4-42 42-90 84l-87 76 28 63c15 34 72 158 126 276l98 214-39 36c-21 20-68 61-103 93l-64 56 136 261c76 144 137 263 137 265 0 3-57 23-127 46-71 24-132 46-136 50-4 3 33 128 82 276s88 270 86 272-45-6-95-18c-51-11-95-19-98-16-5 6-4 13 77 405 28 135 49 246 47 248-1 2-36-11-76-27-39-17-74-30-76-27-2 2 1 111 6 243 5 131 10 284 10 339v100l-87-10c-49-6-89-8-90-5s29 140 66 305 67 301 66 303c-2 2-53-22-114-52-91-46-111-53-111-39 0 10 9 144 20 298s20 297 20 317v37l-72-20c-40-11-81-22-90-25-17-5-18 16-18 350 0 278-3 356-12 356-7 0-53-9-102-20s-91-19-92-17c-1 1-17 106-35 232-18 127-35 233-38 237-3 3-39-7-79-24s-74-29-76-27c-3 2-15 155-27 339s-23 336-25 338c-1 2-45-15-98-39-53-23-99-39-102-36s-17 167-30 364c-12 197-23 359-24 361 0 1-43-32-96-73s-99-75-103-75-26 141-50 313c-23 171-44 319-47 328-4 14-14 14-102-6-53-12-100-20-103-16-4 3-31 143-60 309-30 167-57 309-61 315-4 7-30 0-77-21-39-18-73-32-76-32s-5 149-5 330c0 182-3 330-6 330s-49-29-101-65c-53-36-97-64-98-63-2 2-8 154-15 338-6 184-13 337-15 338-2 2-40-24-85-57-44-34-84-61-89-61-4 0-7 10-5 23 2 12 11 139 19 282s18 291 21 329l6 69-126-5c-114-5-126-4-122 11 8 27 126 657 126 673 0 10-37 25-115 48-104 30-114 35-110 54 3 12 16 71 30 131 102 438 125 539 125 551 0 10-24 14-99 16l-98 3 112 248 113 248-27 10c-14 6-61 22-104 35l-77 25 52 97c28 53 75 142 105 196 29 55 52 100 51 101-2 1-42 17-90 35-49 18-88 38-88 45s11 86 25 175c14 90 24 166 23 170-2 4-81-43-177-106z";
      var svgFlower = "M1048.256,633.499c212.849-356.854,285.555-335.845-191.845-590.438C384.889,283.217,484.493,353.496,664.566,633.499 c-310.065-285.921-239.639-396.021-620.823,0c64.157,504.336,28.591,448.084,502.257,364.911 c-416.078,181.718-421.368,113.233-191.845,590.438c503.843,103.322,428.181,97.12,502.257-364.911 c69.825,407.236,10.978,486.041,502.257,364.911c233.666-457.592,211.268-427.46-191.845-590.438 c452.881,101.063,461.097,199.985,502.257-364.911C1305.872,228.612,1381.606,318.787,1048.256,633.499z M856.411,1100.523 c-114.579,0-207.463-92.884-207.463-207.463s92.884-207.463,207.463-207.463c114.578,0,207.463,92.884,207.463,207.463 S970.989,1100.523,856.411,1100.523z";
      phen2.setChartOpts({
        data: [{
          taxon: 'taxon',
          band2: {
            start: leafStart,
            end: leafEnd
          },
          band1: {
            start: flowerStart,
            end: flowerEnd
          }
        }],
        metrics: [{
          prop: 'band2',
          label: 'In leaf',
          colour: '#00990066',
          svg: svgLeaf
        }, {
          prop: 'band1',
          label: 'Flowering',
          colour: '#ff9900aa',
          svg: svgFlower
        }]
      }); // Source

      var source = "Data for flower phenology from <i>" + data[0].flowerSource + "</i>. Data for leafing phenology from <i>" + data[0].leafSource + "</i>.";
      $$3('#bsbi-phenology-source').html(source);
    } // Alt/Lat
    // Using raw tetrad mapping data
    // const tetrads = `${mapRoot}tetrads/${identifier.replace(/\./g, "_")}.csv`
    // d3.csv(tetrads, function(row) {
    //   return row.tetrad
    // }).then(function(data){
    //   altlat.dataFromTetrads(data).then(function(data) {
    //     altlat.setChartOpts({data: data })
    //   })
    // })
    // Using pre-processed altlat data


    var altlatdata = "".concat(mapRoot, "altlat/").concat(identifier.replace(/\./g, "_"), ".csv");
    d3__namespace.csv(altlatdata, function (r) {
      return {
        distance: Number(r.distance),
        altitude: Number(r.altitude),
        metric: Number(r.percent),
        taxon: 'dummy'
      };
    }).then(function (data) {
      altlat.setChartOpts({
        data: data
      });
    });
  }

  var $$2 = jQuery; // eslint-disable-line no-undef

  function createGallery(id, ddbid) {
    // DO I NEED TO HAVE SEPARATE FUNCTIONS FOR CREATE AND UPDATED GALLERY
    // FOR CONSISTENCY ON MAIN.JS?
    document.getElementById(id).innerHTML = '';

    if (ddbid) {
      (function () {
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
        var pThumbs = [];
        var iThumbs = [];

        var _loop = function _loop(i) {
          var $thumb = $$2('<img>').attr('src', "https://atlasimages.bsbi.org/processed/".concat(ddbid, "/").concat(ddbid, "-").concat(i, "/").concat(ddbid, "-").concat(i, "-192w.webp"));
          var p = new Promise(function (resolve) {
            $thumb.on('load', function () {
              iThumbs[i] = true;
              resolve(true);
            }).on('error', function () {
              iThumbs[i] = false;
              resolve(false);
            });
          });
          pThumbs.push(p);
        };

        for (var i = 1; i <= 50; i++) {
          _loop(i);
        }

        Promise.all(pThumbs).then(function () {
          var lgContainer = document.getElementById(id);
          var imagesFound = iThumbs.some(function (thumbFound) {
            return thumbFound;
          });

          if (imagesFound) {
            var dynamicEl = iThumbs.filter(function (thumbFound) {
              return thumbFound;
            }).map(function (v, i) {
              return {
                src: "https://atlasimages.bsbi.org/processed/".concat(ddbid, "/").concat(ddbid, "-").concat(i + 1, "/").concat(ddbid, "-").concat(i + 1, "-1920w.webp"),
                thumb: "https://atlasimages.bsbi.org/processed/".concat(ddbid, "/").concat(ddbid, "-").concat(i + 1, "/").concat(ddbid, "-").concat(i + 1, "-192w.webp"),
                subHtml: "\n              <div class=\"lightGallery-captions\">\n                <div style=\"background-color: black; opacity: 0.7\">\n                <p style=\"margin: 0.3em\">TODO - Copyright text to acknowledge Rob Still and Chris Gibson</p>\n                <div>\n              </div>"
              };
            }); // After https://www.lightgalleryjs.com/demos/inline/ & https://codepen.io/sachinchoolur/pen/zYZqaGm

            var inlineGallery = lightGallery(lgContainer, {
              // eslint-disable-line no-undef
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
              plugins: [lgZoom, lgThumbnail],
              // eslint-disable-line no-undef
              dynamicEl: dynamicEl,
              thumbWidth: 90,
              thumbHeight: "60px",
              thumbMargin: 4
            }); // Since we are using dynamic mode, we need to programmatically open lightGallery

            setTimeout(function () {
              inlineGallery.openGallery();
              $$2('#bsbi-gallery-copyright').show();
            }, 200);
          } else {
            lgContainer.innerHTML = "<i>No images are available for this taxon.</i>";
            $$2('#bsbi-gallery-copyright').hide();
          }
        });
      })();
    }
  }

  function copyToClipboard(textToCopy) {
    // https://stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
    // navigator clipboard api needs a secure context (https)
    // return a promise
    if (navigator.clipboard && window.isSecureContext) {
      // navigator clipboard api method'
      return navigator.clipboard.writeText(textToCopy);
    } else {
      // text area method
      var textArea = document.createElement("textarea");
      textArea.value = textToCopy; // make the textarea out of viewport

      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise(function (res, rej) {
        // here the magic happens
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
    }
  }
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];

      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }

      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return "";
  }
  function getCitation(currentTaxon, forImageDownload) {
    if (forImageDownload) {
      return "<i>".concat(currentTaxon.shortName.replace(/\s/g, '</i> <i>'), "</i> in <i>BSBI</i> <i>Online</i> <i>Atlas</i> <i>2020</i>, eds P.A. Stroh, T. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ").concat(location.origin, "/atlas/").concat(currentTaxon.identifier, " [Accessed ").concat(new Date().toLocaleDateString('en-GB'), "]");
    } else {
      return "<i>".concat(currentTaxon.shortName, "</i> in <i>BSBI Online Atlas 2020</i>, eds P.A. Stroh, T. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ").concat(location.origin, "/atlas/").concat(currentTaxon.identifier, " [Accessed ").concat(new Date().toLocaleDateString('en-GB'), "]");
    }
  }

  // access structure. All the data access functions
  // are members of this structure.

  var bsbiDataAccess = {};
  bsbiDataAccess.bsbiDataRoot = '';
  bsbiDataAccess.showStatus = true;
  bsbiDataAccess.resolution = 'hectad';
  bsbiDataAccess.displayedMapType = 'static';
  bsbiDataAccess.taxaHybridList = [];
  bsbiDataAccess.taxaNoStatusList = [];
  bsbiDataAccess.devel = {
    changeColours: ['#FAD0C8', '#DD5A2F', '#525252'],
    symboltype: 'circle'
  }; // The periodMappsing code added 19/01/2020 to deal with mapping periods required in app
  // that are different from those expressed in CSV files that I have available at that time.
  // Was extended to meet the requirement of showing faded symbols for hectads where recorded
  // in earlier time period.

  var periodMappings = {
    "to 1929": {
      prior: [],
      csvperiods: ["to 1929"]
    },
    "1930 - 1969": {
      prior: ["to 1929"],
      csvperiods: ["1930 - 1969"]
    },
    "1970 - 1986": {
      prior: ["to 1929", "1930 - 1969"],
      csvperiods: ["1970 - 1986"]
    },
    "1987 - 1999": {
      prior: ["to 1929", "1930 - 1969", "1970 - 1986"],
      csvperiods: ["1987 - 1999"]
    },
    "2000 - 2019": {
      prior: ["to 1929", "1930 - 1969", "1970 - 1986", "1987 - 1999"],
      csvperiods: ["2000 - 2009", "2010 - 2019"]
    }
  };

  bsbiDataAccess.distAllClasses = function (identifier) {
    if (bsbiDataAccess.resolution === 'hectad') {
      return distAllClasses(identifier);
    } else if (bsbiDataAccess.resolution === 'tetrad') {
      return distAllClassesTetrad(identifier);
    } else {
      return distAllClassesMonad(identifier);
    }
  };

  bsbiDataAccess.status_29 = function (identifier) {
    return nativeSpeciesStatus(identifier, 'to 1929');
  };

  bsbiDataAccess.status_30_69 = function (identifier) {
    return nativeSpeciesStatus(identifier, '1930 - 1969');
  };

  bsbiDataAccess.status_70_86 = function (identifier) {
    return nativeSpeciesStatus(identifier, '1970 - 1986');
  };

  bsbiDataAccess.status_87_99 = function (identifier) {
    return nativeSpeciesStatus(identifier, '1987 - 1999');
  };

  bsbiDataAccess.status_00_19 = function (identifier) {
    return nativeSpeciesStatus(identifier, '2000 - 2019');
  };

  bsbiDataAccess.hybrid = function (identifier) {
    var hybridInfo = bsbiDataAccess.taxaHybridList.find(function (h) {
      return h.taxon === identifier;
    });

    function markup(text) {
      // Look for ' x ' and replace either size with '</i> x <i>'
      var textOut = text.replace(/ x /g, '</i> x <i>');
      return '<i>' + textOut + '</i>';
    }

    var pHybrid = new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier)).then(function (data) {
        resolve(data);
      })["catch"](function (e) {
        reject(e);
      });
    });
    var pParent1 = new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(hybridInfo.parent1)).then(function (data) {
        resolve(data);
      })["catch"](function (e) {
        reject(e);
      });
    });
    var pParent2 = new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(hybridInfo.parent2)).then(function (data) {
        resolve(data);
      })["catch"](function (e) {
        reject(e);
      });
    });
    return new Promise(function (resolve, reject) {
      Promise.all([pHybrid, pParent1, pParent2]).then(function (data) {
        //https://nbn.org.uk/wp-content/uploads/2020/01/Preston_et_al-2015-Biological_Journal_of_the_Linnean_Society.pdf
        var pink = '#E4C3AA';
        var blue = '#A8CBE2';
        var yellow = '#F7F619';
        var all = [];
        data.filter(function (d, i) {
          return i > 0;
        }).forEach(function (taxonData, iTaxonData) {
          taxonData.forEach(function (r) {
            var match = all.find(function (ar) {
              return r.hectad === ar.gr;
            });

            if (match) {
              match.presence[iTaxonData] = true;
            } else {
              var presence = [false, false];
              presence[iTaxonData] = true;
              all.push({
                gr: r.hectad,
                presence: presence
              });
            }
          });
        });
        all.forEach(function (r) {
          r.colour = r.presence[0] && r.presence[1] ? yellow : r.presence[0] ? pink : blue;
        });
        data[0].forEach(function (r) {
          all.push({
            gr: r.hectad,
            shape: 'square',
            size: 0.6,
            colour: 'black'
          });
        });
        resolve({
          records: all,
          precision: 10000,
          shape: 'circle',
          size: 1,
          opacity: 1,
          legend: {
            lines: [{
              colour: 'black',
              text: 'Hybrid recorded',
              shape: 'square',
              size: 0.6
            }, {
              colour: pink,
              text: markup(hybridInfo.parent1Name)
            }, {
              colour: blue,
              text: markup(hybridInfo.parent2Name)
            }, {
              colour: yellow,
              text: 'Both parents'
            }]
          }
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  };

  function getCSV(identifier, type) {
    var folder = type ? type : 'hectads';
    var file = "".concat(bsbiDataAccess.bsbiDataRoot).concat(folder, "/").concat(identifier.replace(".", "_"), ".csv");
    return file;
  }

  function distAllClasses(identifier) {
    var statusColour = {
      n: 'blue',
      a: 'red',
      bullseye: 'black',
      missing: 'black'
    };
    var legendText = {
      "to 1929": "pre-1930",
      "1930 - 1969": "1930-69",
      "1970 - 1986": "1970-86",
      "1987 - 1999": "1987-99",
      "2000 - 2019": "2000-19"
    };
    var opacities = {
      "to 1929": 0.3,
      "1930 - 1969": 0.4,
      "1970 - 1986": 0.6,
      "1987 - 1999": 0.8,
      "2000 - 2019": 1
    };
    var periods = Object.keys(periodMappings).reverse();
    return new Promise(function (resolve, reject) {
      var counts = {};
      periods.forEach(function (p) {
        counts[p] = {
          ire: {
            n: 0,
            a: 0,
            bullseye: 0,
            missing: 0,
            total: 0
          },
          gb: {
            n: 0,
            a: 0,
            bullseye: 0,
            missing: 0,
            total: 0
          }
        };
      });
      d3__namespace.csv(getCSV(identifier), function (r) {
        if (r.hectad) {
          // GB or Irish?
          var country;

          if (r.hectad.length === 3) {
            country = 'ire';
          } else {
            country = 'gb';
          } // Status (can be n for native, a for alien, or bullseye for reintroduced)


          var hectadstatus = r.hectadstatus ? r.hectadstatus : 'missing'; // Count the occurrences in each date category for legend
          // (not just the last one recorded in)

          var occurs = false;
          var period, recent;

          for (var iPeriod = 0; iPeriod < periods.length; iPeriod++) {
            period = periods[iPeriod];
            var csvperiods = periodMappings[period].csvperiods;

            for (var iCsvperiod = 0; iCsvperiod < csvperiods.length; iCsvperiod++) {
              var csvperiod = csvperiods[iCsvperiod];

              if (r[csvperiod] === '1') {
                counts[period][country][hectadstatus]++;
                counts[period][country]['total']++;
                occurs = true;
                recent = recent ? recent : period; //Save the most recent period

                break;
              }
            }
          } // Presence attrs - required for data download


          var attrs = {};

          for (var _iPeriod = 0; _iPeriod < periods.length; _iPeriod++) {
            period = periods[_iPeriod];
            attrs[period] = 0;
            var _csvperiods = periodMappings[period].csvperiods;

            for (var _iCsvperiod = 0; _iCsvperiod < _csvperiods.length; _iCsvperiod++) {
              var _csvperiod = _csvperiods[_iCsvperiod];

              if (r[_csvperiod] === '1') {
                attrs[period] = 1;
                break;
              }
            }
          }

          if (occurs) {
            var point;

            if (bsbiDataAccess.showStatus) {
              //const capText = statusText[hectadstatus]
              point = {
                gr: r.hectad,
                //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
                shape: 'circle',
                colour: statusColour[hectadstatus],
                size: hectadstatus === 'missing' ? 0.5 : 1,
                opacity: opacities[recent] //caption: "Hectad: <b>".concat(r.hectad, "</b></br>Status: <b>").concat(capText, "</b>"),

              };
            } else {
              point = {
                gr: r.hectad,
                //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
                shape: 'circle',
                colour: 'black',
                size: 1,
                opacity: opacities[recent] //caption: "Hectad: <b>".concat(r.hectad, "</b>"),

              };
            } // Add attributes required for download
            // Use the legend keys as the attr names


            Object.keys(attrs).forEach(function (k) {
              point[legendText[k]] = attrs[k];
            });
            return point;
          }
        }
      }).then(function (data) {
        var legend;
        var totalAlien = periods.reduce(function (t, p) {
          return t + counts[p].gb.a + counts[p].ire.a;
        }, 0);
        var totalNative = periods.reduce(function (t, p) {
          return t + counts[p].gb.n + counts[p].ire.n;
        }, 0);
        var lines = [];

        if (bsbiDataAccess.showStatus) {
          if (totalNative) {
            lines.push({
              text: ['Native', '', 'GB', 'IR'],
              underline: true
            });
            periods.forEach(function (p) {
              lines.push({
                colour: statusColour.n,
                opacity: opacities[p],
                text: [legendText[p], 'symbol', counts[p].gb.n, counts[p].ire.n],
                shape: 'circle'
              });
            });
          }

          if (totalNative && totalAlien) {
            lines.push({
              text: []
            });
          }

          if (totalAlien) {
            lines.push({
              text: ['Alien', '', 'GB', 'IR'],
              underline: true
            });
            periods.forEach(function (p) {
              lines.push({
                colour: statusColour.a,
                opacity: opacities[p],
                text: [legendText[p], 'symbol', counts[p].gb.a, counts[p].ire.a],
                shape: 'circle'
              });
            });
          }
        } else {
          lines = [{
            text: ['', '', 'GB', 'IR'],
            underline: true
          }];
          periods.forEach(function (p) {
            lines.push({
              colour: 'black',
              opacity: opacities[p],
              text: [legendText[p], 'symbol', counts[p].gb.total, counts[p].ire.total],
              shape: 'circle'
            });
          });
        }

        legend = {
          size: 0.8,
          raligned: [false, false, true, true],
          padding: 5,
          lines: lines
        };
        resolve({
          records: data,
          precision: 10000,
          size: 1,
          legend: legend
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

  function distAllClassesTetrad(identifier) {
    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier, 'tetrads'), function (r) {
        if (r.tetrad) {
          return {
            gr: r.tetrad,
            //shape: bsbiDataAccess.devel.symboltype, //'circle' dev only,
            shape: 'square',
            colour: 'black',
            size: 1,
            opacity: 1
          };
        }
      }).then(function (data) {
        resolve({
          records: data,
          precision: 2000,
          size: 1,
          legend: {
            lines: [{
              colour: 'black',
              opacity: 1,
              text: 'Present in tetrad',
              //shape: bsbiDataAccess.devel.symboltype === 'square' ? 'square' : 'circle', //'circle' dev only
              shape: 'square'
            }]
          }
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

  function distAllClassesMonad(identifier) {
    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier, 'monads'), function (r) {
        if (r.gr) {
          return {
            gr: r.gr,
            shape: 'square',
            colour: 'black',
            size: 1,
            opacity: 1
          };
        }
      }).then(function (data) {
        resolve({
          records: data,
          precision: 1000,
          size: 1,
          legend: {
            lines: [{
              colour: 'black',
              opacity: 1,
              text: 'Present in monad',
              shape: 'square'
            }]
          }
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

  function nativeSpeciesStatus(identifier, period) {
    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier), function (r) {
        if (r.hectad) {
          var occurs = false;
          periodMappings[period].csvperiods.forEach(function (csvPeriod) {
            if (r[csvPeriod] === '1') {
              occurs = true;
            }
          });
          var prior = false;
          periodMappings[period].prior.forEach(function (csvPeriod) {
            if (r[csvPeriod] === '1') {
              prior = true;
            }
          });

          if (occurs || prior) {
            return {
              gr: r.hectad,
              shape: 'circle',
              size: 1,
              colour: 'black',
              opacity: occurs ? 1 : 0.5 //caption: "Hectad: <b>".concat(r.hectad, "</b>")

            };
          }
        }
      }).then(function (data) {
        var legend = {
          precision: 10000,
          size: 1,
          lines: [{
            colour: 'black',
            opacity: 1,
            text: period === "to 1929" ? "pre-1930" : period.replace(" - ", "-"),
            shape: 'circle'
          }, {
            colour: 'black',
            opacity: 0.5,
            text: 'Earlier',
            shape: 'circle'
          }]
        }; // If period is 'to 1929' remove the 'earlier' line

        if (period == 'to 1929') {
          legend.lines.pop();
        }

        resolve({
          records: data,
          precision: 10000,
          opacity: 1,
          size: 1,
          legend: legend
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

  bsbiDataAccess.change_1987_1999_vs_2000_2019 = function (identifier) {
    return change(identifier, ['1987 - 1999'], ['2000 - 2009', '2010 - 2019'], 'Change from 1987-1999 to 2000-2019');
  };

  bsbiDataAccess.change_1930_1969_vs_2000_2019 = function (identifier) {
    return change(identifier, ['1930 - 1949', '1950 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930-1969 to 2000-2019');
  };

  function change(identifier, early, late, legendTitle) {
    var shapes = ['square', 'triangle-up', 'triangle-down']; //const colours = ['#FAD0C8', '#DD5A2F', '#525252']

    var colours = bsbiDataAccess.devel.changeColours;
    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier), function (r) {
        var presentEarly = early.some(function (f) {
          return r[f] === '1';
        });
        var presentLate = late.some(function (f) {
          return r[f] === '1';
        });
        var i;

        if (presentEarly && presentLate) {
          i = 0; //present
        } else if (!presentEarly && presentLate) {
          i = 1; //gain
        } else if (presentEarly && !presentLate) {
          i = 2; //loss
        } else {
          i = 100; //not present in either period
        }

        if (r.hectad && i < 100) {
          return {
            gr: r.hectad,
            colour: colours[i],
            shape: shapes[i] //caption: "Hectad: <b>".concat(r.hectad, "</b></br>Change: <b>").concat(capText, "</b>")

          };
        }
      }).then(function (data) {
        resolve({
          records: data,
          size: 1,
          precision: 10000,
          opacity: 1,
          legend: {
            title: legendTitle,
            size: 1,
            precision: 10000,
            opacity: 1,
            lines: [{
              colour: colours[1],
              text: 'Gain',
              shape: 'triangle-up'
            }, {
              colour: colours[0],
              text: 'No change',
              shape: 'square'
            }, {
              colour: colours[2],
              text: 'Loss',
              shape: 'triangle-down'
            }]
          }
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

  bsbiDataAccess.bsbiHectadDateTetFreq = function (identifier) {
    var legendSizeFact = 0.5; //const colour = d3.scaleLinear().domain([1, 13, 25]).range(['#edf8b1', '#7fcdbb', '#2c7fb8'])

    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier), function (r) {
        var tetrads = Number(r['distinct tetrads']);
        var tetround = Math.ceil(tetrads / 5) * 5;

        if (r.hectad && tetrads) {
          return {
            gr: r.hectad,
            size: Math.sqrt(tetround) / 5 //caption: "Hectad: <b>".concat(r.hectad, "</b></br>Tetrads where present: <b>").concat(tetrads, "</b>")

          };
        }
      }).then(function (data) {
        resolve({
          records: data,
          //size: 1,
          colour: 'black',
          //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
          shape: 'circle',
          precision: 10000,
          opacity: 1,
          legend: {
            title: 'Tetrad frequency',
            size: 1,
            shape: 'circle',
            colour: 'black',
            precision: 10000,
            opacity: 1,
            lines: [{
              text: '1-5',
              size: Math.sqrt(5) / 5 * legendSizeFact
            }, {
              text: '6-10',
              size: Math.sqrt(10) / 5 * legendSizeFact
            }, {
              text: '11-15',
              size: Math.sqrt(15) / 5 * legendSizeFact
            }, {
              text: '16-20',
              size: Math.sqrt(20) / 5 * legendSizeFact
            }, {
              text: '21-25',
              size: Math.sqrt(25) / 5 * legendSizeFact
            }]
          }
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  };

  var $$1 = jQuery; // eslint-disable-line no-undef

  var ds$1 = drupalSettings; // eslint-disable-line no-undef

  var currentTaxon;
  var gridStyle = getCookie('gridstyle') ? getCookie('gridstyle') : 'solid';
  var slippyMap, staticMap;
  var mapType = 'allclass';
  var insetType = 'BI4';
  var showStatus = false;
  var displayedMapType = 'static';
  var resolution = 'hectad';
  var atlasRangeIndex = 5;
  var atlasTrendIndex = 2;
  var slippyLegendOpts = {
    display: true,
    scale: 0.8,
    x: 10,
    y: 0,
    data: null
  };
  var svgLegendOpts = {
    display: true,
    scale: 1,
    x: 10,
    y: 5,
    data: null
  };
  var periods = [{
    min: '',
    max: 1929,
    access: 'status_29',
    caption: '1929 and before'
  }, {
    min: 1930,
    max: 1969,
    access: 'status_30_69',
    caption: '1930 - 1969'
  }, {
    min: 1970,
    max: 1986,
    access: 'status_70_86',
    caption: '1970 - 1986'
  }, {
    min: 1987,
    max: 1999,
    access: 'status_87_99',
    caption: '1987 - 1999'
  }, {
    min: 2000,
    max: 2019,
    access: 'status_00_19',
    caption: '2000 - 2019'
  }];
  var trends = [{
    lower: '1930-69',
    upper: '2000-19',
    access: 'change_1930_1969_vs_2000_2019',
    caption: '1930-69 vs 2000-19'
  }, {
    lower: '1987-99',
    upper: '2000-19',
    access: 'change_1987_1999_vs_2000_2019',
    caption: '1987-99 vs 2000-19'
  }];

  function mapControlRow(selector, classname) {
    var $div = $$1('<div>').appendTo($$1(selector));
    $div.addClass('atlas-map-control-row');

    if (classname) {
      $div.addClass(classname);
    }

    return $div;
  }

  function setControlState() {
    // map display
    if (displayedMapType === "static") {
      $$1('#slippyAtlasMain').hide();
      $$1('#staticAtlasMain').show();
    } else {
      $$1('#staticAtlasMain').hide();
      $$1('#slippyAtlasMain').show();
    } // save map image button


    if (displayedMapType === 'static') {
      $$1('.atlas-save-map-image').show();
    } else {
      $$1('.atlas-save-map-image').hide();
    } // download map data button


    $$1('.atlas-download-map-data').show();

    if (mapType === 'allclass' && resolution === 'hectad') {
      $$1('.atlas-download-map-data input, .atlas-download-map-data button').attr('disabled', false);
    } else {
      $$1('.atlas-download-map-data input, .atlas-download-map-data button').attr('disabled', true);
    } // backdrop selector


    if (displayedMapType === "static") {
      $$1('.atlas-backdrop-selector').show();
    } else {
      $$1('.atlas-backdrop-selector').hide();
    } // inset control


    if (displayedMapType === "static") {
      $$1('.atlas-inset-control').show();
    } else {
      $$1('.atlas-inset-control').hide();
    } // grid type control


    if (displayedMapType === "static") {
      $$1('.atlas-grid-type-control').show();
    } else {
      $$1('.atlas-grid-type-control').hide();
    } // period slider visibility


    if (mapType === 'status') {
      $$1('.atlas-period-slider-control').show();
    } else {
      $$1('.atlas-period-slider-control').hide();
    } // trend slider control


    if (mapType === 'trends') {
      $$1('.atlas-trend-slider-control').show();
    } else {
      $$1('.atlas-trend-slider-control').hide();
    } // show status checkbox


    if (mapType === 'allclass' || mapType === 'slippy') {
      $$1('.atlas-status-checkbox-control').show();
    } else {
      $$1('.atlas-status-checkbox-control').hide();
    } // show opacity slider


    if (displayedMapType === 'slippy') {
      $$1('.atlas-opacity-slider-control').show();
    } else {
      $$1('.atlas-opacity-slider-control').hide();
    } // status checkbox enabled and checked value


    var disableStatus = bsbiDataAccess.taxaNoStatusList.indexOf(currentTaxon.identifier) > -1;

    if (disableStatus) {
      showStatus = false;
      bsbiDataAccess.showStatus = false;
      $$1('.atlas-status-checkbox-control span').text('No status info for this taxon');
      $$1('.atlas-status-checkbox-control span').css('color', 'silver');
    } else {
      $$1('.atlas-status-checkbox-control span').text('Show status');
      $$1('.atlas-status-checkbox-control span').css('color', 'black');
    }

    if (disableStatus || displayedMapType === 'slippy' && mapType === 'allclass' && resolution !== 'hectad') {
      // Uncheck and disable status checkbutton if not hectad resolution or no status info
      $$1('.atlas-status-checkbox').prop('checked', false);
      $$1('.atlas-status-checkbox').attr('disabled', true);
    } else {
      // Display and set checked status to current value of showStatus global
      $$1('.atlas-status-checkbox').attr('disabled', false);
      $$1('.atlas-status-checkbox').prop('checked', showStatus);
    } // atlas resolution control visibility


    if (displayedMapType === "slippy" && mapType === 'allclass') {
      $$1('.atlas-resolution-control').show();
    } else {
      $$1('.atlas-resolution-control').hide();
    } // atlas resolution control value and global variables


    if (displayedMapType === "slippy" && mapType === 'allclass') {
      // Reset resolution if currently set to a value that is not
      // appropriate for the taxon
      // if (resolution === 'tetrad' && !currentTaxon.tetrad) {
      //   resolution = 'hectad'
      // }
      bsbiDataAccess.resolution = resolution; // Ensure right option is selected

      $$1('.bsbi-resolution-' + resolution).prop('checked', true); // Enable/disable tetrad option as appropriate
      // if (currentTaxon.tetrad) {
      //   $('.bsbi-resolution-tetrad').attr('disabled', false)
      // } else {
      //   $('.bsbi-resolution-tetrad').attr('disabled', true)
      // }
    } else {
      bsbiDataAccess.resolution = 'hectad';
    } // Enable/disable the hybrid map type option as appropriate


    var isHybrid = currentTaxon.parent1 !== '';
    var $hybridopts = $$1('.atlas-map-type-selector option[value="hybrid"]');

    if (isHybrid) {
      $hybridopts.show();
    } else {
      $hybridopts.hide(); // Select another option if currently selected

      if (mapType === 'hybrid') {
        $hybridopts.prop('selected', false);
        $$1('.atlas-map-type-selector option[value="allclass"]').prop('selected', true);
        mapType = 'allclass';
      }
    }

    $$1('.atlas-map-type-selector').selectpicker('refresh');
  }

  function gridStyleRadios($parent, i) {
    // Overall control container
    var $container = $$1('<div>').appendTo($parent);

    function makeRadio(label, val, checked) {
      //$('<div class="radio"><label><input type="radio" name="atlas-grid-type" value="'+ val + '" ' + checked + '>' + label + '</label></div>').appendTo($container)
      var $div = $$1('<div>').appendTo($container);
      $div.attr('class', 'radio');
      var $label = $$1('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$1('<input>').appendTo($label);
      var $span = $$1('<span>').appendTo($label);
      $span.text(label);
      $span.css('padding-left', '20px');
      $radio.attr('type', 'radio');
      $radio.attr('name', 'atlas-grid-type-' + i);
      $radio.attr('class', 'atlas-grid-type-' + val);
      $radio.attr('value', val);
      $radio.css('margin-left', 0);
      if (checked) $radio.prop('checked', true);
      $radio.change(function () {
        gridStyle = $$1(this).val();
        setCookie('gridstyle', gridStyle, 30);
        staticMap.setGridLineStyle(gridStyle); // Update controls mirrored in other blocks

        $$1('.atlas-grid-type-' + val).prop("checked", true);
      });
    }

    makeRadio('Solid grid lines', 'solid', gridStyle === 'solid' ? 'checked' : '');
    makeRadio('Dashed grid lines', 'dashed', gridStyle === 'dashed' ? 'checked' : '');
    makeRadio('No grid lines', 'none', gridStyle === 'none' ? 'checked' : '');
  }

  function mapInterfaceToggle($parent) {
    var $container = $$1('<div style="display: flex">').appendTo($parent); // Buttons

    var $bgrp = $$1('<div class="btn-group" data-toggle="buttons">').appendTo($container);
    var $staticLabel = $$1('<label class="btn btn-primary active">').appendTo($bgrp);
    $$1('<input type="radio" name="mapType" value="static" checked>').appendTo($staticLabel);
    $staticLabel.append("Overview");
    var $slippyLabel = $$1('<label class="btn btn-primary">').appendTo($bgrp);
    $$1('<input type="radio" name="mapType" value="slippy">').appendTo($slippyLabel);
    $slippyLabel.append("Zoomable"); // Busy indicator

    var $loader = $$1('<div id="atlas-loader" style="display: none">').appendTo($container);
    $$1('<div class="atlas-loader">').appendTo($loader);
    $$1('input[type=radio][name="mapType"]').change(function () {
      displayedMapType = $$1(this).val();
      bsbiDataAccess.displayedMapType = displayedMapType;

      if (displayedMapType === "slippy") {
        // Get current width of static map
        var $svg = $$1('#staticAtlasMain svg');
        var w = $svg.width();
        var h = $svg.height();
        slippyMap.setSize(w, h);
      }

      setControlState();
      changeMap();

      if (displayedMapType === "slippy") {
        slippyMap.invalidateSize();
      }
    });
  }

  function mapTypeSelector($parent) {
    // Main type selector
    var $sel = $$1('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-map-type-selector');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      mapType = $$1(this).val();
      setControlState();
      changeMap();
    });
    var types = [{
      caption: 'Distribution overview',
      val: 'allclass'
    }, {
      caption: 'Distribution by year range',
      val: 'status'
    }, {
      caption: 'Change maps',
      val: 'trends'
    }, {
      caption: 'Tetrad frequency',
      val: 'tetrad'
    }, {
      caption: 'Map hybrid with parents',
      val: 'hybrid'
    }];
    types.forEach(function (t) {
      var $opt = $$1('<option>');
      $opt.attr('value', t.val);
      $opt.html(t.caption).appendTo($sel);
    }); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function backdropSelector($parent) {
    var rasterRoot = ds$1.bsbi_atlas.dataRoot + 'rasters/'; // Backdrops

    var backdrops = [{
      caption: 'No backdrop',
      val: ''
    }, {
      caption: 'Colour elevation',
      val: 'colour_elevation'
    }, {
      caption: 'Grey elevation',
      val: 'grey_elevation_300'
    }]; // Main type selector

    var $sel = $$1('<select>').appendTo($parent);
    $sel.addClass('selectpicker'); //$sel.addClass('atlas-backdrop-selector')

    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      // Remove all backdrops
      backdrops.forEach(function (b) {
        if (b.val) {
          staticMap.basemapImage(b.val, false, rasterRoot + b.val + '.png', rasterRoot + b.val + '.pgw');
        }
      }); // Display selected backdrop

      var val = $$1(this).val();

      if (val) {
        staticMap.basemapImage(val, true, rasterRoot + val + '.png', rasterRoot + val + '.pgw');
      }
    });
    backdrops.forEach(function (b) {
      var $opt = b.selected ? $$1('<option>') : $$1('<option>');
      $opt.attr('value', b.val);
      $opt.html(b.caption).appendTo($sel);
    });
    $sel.val("colour_elevation"); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function mapImageButton($parent, i) {
    var imageType = 'png'; // Overall control container

    var $container = $$1('<div>').appendTo($parent);
    $container.addClass('atlas-save-map-image');
    $container.hide();
    var $svg = $$1('<svg>').appendTo($container);
    var $t = $$1('<text>').appendTo($svg);
    $t.attr('x', '10');
    $t.attr('y', '20');
    $$1('<br>').appendTo($container);
    var $button = $$1('<button>').appendTo($container);
    $button.addClass('btn btn-default');
    $button.text('Download image');
    $button.on('click', function () {
      var info = {
        text: getCitation(currentTaxon, true),
        margin: 10,
        fontSize: 10,
        img: "".concat(ds$1.bsbi_atlas.dataRoot, "combined-logos.png")
      };
      staticMap.saveMap(imageType === 'svg', info);
    });
    makeRadio('PNG', 'png', true);
    makeRadio('SVG', 'svg', false);

    function makeRadio(label, val, checked) {
      var $div = $$1('<div>').appendTo($container);
      $div.css('display', 'inline-block');
      $div.css('margin-left', '0.5em');
      $div.attr('class', 'radio');
      var $label = $$1('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$1('<input>').appendTo($label);
      var $span = $$1('<span>').appendTo($label);
      $span.text(label);
      $span.css('padding-left', '20px');
      $radio.attr('type', 'radio');
      $radio.attr('name', 'img-download-type-' + i);
      $radio.attr('class', 'img-download-type-' + val);
      $radio.attr('value', val);
      $radio.css('margin-left', 0);
      if (checked) $radio.prop('checked', true);
      $radio.change(function () {
        // Update controls mirrored in other blocks
        $$1('.img-download-type-' + val).prop("checked", true);
        imageType = val;
      });
    }
  }

  function mapDownloadButton($parent, i) {
    var downloadType = 'csv'; // Overall control container

    var $container = $$1('<div>').appendTo($parent);
    $container.addClass('atlas-download-map-data');
    $container.hide();
    var $button = $$1('<button>').appendTo($container);
    $button.addClass('btn btn-default');
    $button.text('Download data');
    $button.on('click', function () {
      var displayedMap;

      if (displayedMapType === 'static') {
        displayedMap = staticMap;
      } else {
        displayedMap = slippyMap;
      }

      displayedMap.downloadData(downloadType === 'geojson');
    });
    makeRadio('CSV', 'csv', true);
    makeRadio('GeoJson', 'geojson', false);

    function makeRadio(label, val, checked) {
      var $div = $$1('<div>').appendTo($container);
      $div.css('display', 'inline-block');
      $div.css('margin-left', '0.5em');
      $div.attr('class', 'radio');
      var $label = $$1('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$1('<input>').appendTo($label);
      var $span = $$1('<span>').appendTo($label);
      $span.text(label);
      $span.css('padding-left', '20px');
      $radio.attr('type', 'radio');
      $radio.attr('name', 'download-type-' + i);
      $radio.attr('class', 'download-type-' + val);
      $radio.attr('value', val);
      $radio.css('margin-left', 0);
      if (checked) $radio.prop('checked', true);
      $radio.change(function () {
        // Update controls mirrored in other blocks
        $$1('.download-type-' + val).prop("checked", true);
        downloadType = val;
      });
    }
  }

  function opacitySlider($parent) {
    var initOpacity = 70;
    $$1('#atlas-leaflet-svg').css('opacity', initOpacity / 100); // Overall control container

    var $container = $$1('<div>').appendTo($parent);
    $container.addClass('atlas-opacity-slider-control');
    $container.hide(); // Label

    var $sliderLabel = $$1('<div>').appendTo($container);
    $sliderLabel.addClass('atlas-opacity-slider-label');
    $sliderLabel.text('Opacity:'); // Slider

    var $sliderContainer = $$1('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    $sliderContainer.addClass('atlas-opacity-slider-slider');
    var $slider = $$1('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', '100').attr('value', initOpacity).attr('id', 'atlas-opacity-slider');
    $slider.change(function () {
      $$1('#atlas-leaflet-svg').css('opacity', $$1(this).val() / 100);
    });
  }

  function statusCheckbox($parent) {
    // Overall control container
    var $container = $$1('<div>').appendTo($parent);
    $container.addClass('atlas-status-checkbox-control'); // Status on/off toggle

    var $checDiv = $$1('<div class="checkbox">').appendTo($container); //$checDiv.css('margin-top', '4.3em')

    $$1('<label><input type="checkbox" class="atlas-status-checkbox"/><span>Show status</span></label>').appendTo($checDiv);
    $$1('.atlas-status-checkbox').change(function () {
      showStatus = $$1(this).is(':checked');
      bsbiDataAccess.showStatus = showStatus;
      changeMap();
    });
  }

  function statusControl($parent) {
    // Overall control container
    var $container = $$1('<div>').appendTo($parent);
    $container.addClass('atlas-period-slider-control');
    $container.hide(); // Period display
    // const $indicator = $('<div>').appendTo($container)
    // $indicator.css('font-size', '1.5em')
    // $indicator.css('margin-bottom', '0.2em')
    // $indicator.text(periods[periods.length - 1].caption)
    // Slider

    var $sliderContainer = $$1('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    var $slider = $$1('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', periods.length).attr('id', 'atlas-range-select');
    $slider.change(function () {
      atlasRangeIndex = $$1(this).val();
      changeMap();
    });
    var $scaleContainer = $$1('<div>').appendTo($sliderContainer);
    $scaleContainer.addClass('atlas-range-tick-container');
    $scaleContainer.css('margin-bottom', '4.3em');
    periods.forEach(function (p, i) {
      var $tick = $$1('<span>').appendTo($scaleContainer);
      $tick.addClass('atlas-range-tick');
      var percent = i / (periods.length - 1) * 100;
      $tick.css('left', percent.toString() + '%');
      $tick.text('|');
      $tick.append('<br>');
      var $tickText = $$1('<span>').appendTo($tick);
      $tickText.addClass('atlas-range-tick-text');
      $tickText.html((p.min ? p.min : 'pre') + '<br>' + (p.max === 1929 ? 1930 : p.max)); //$tickText.html(p.min + '<br>' + p.max)
    }); // // Status on/off toggle
    // const $checDiv = $('<div class="checkbox">').appendTo($container)
    // $checDiv.css('margin-top', '4.3em')
    // $('<label><input type="checkbox" id="atlas-status-checkbox">Show status</label>').appendTo($checDiv)
    // $('#atlas-status-checkbox').change(function() {
    //   showStatus = $(this).is(':checked')
    //   bsbiDataAccess.showStatus = showStatus
    //   changeMap()
    // })
  }

  function resolutionControl($parent, i) {
    // Overall control container
    var $container = $$1('<div>').appendTo($parent);

    function makeRadio(label, val, checked) {
      var $div = $$1('<div>').appendTo($container);
      $div.attr('class', 'radio');
      var $radio = $$1('<input>').appendTo($div);
      $radio.attr('type', 'radio');
      $radio.attr('name', 'bsbi-resolution-' + i);
      $radio.attr('class', 'bsbi-resolution-' + val);
      $radio.attr('value', val);
      $radio.css('margin-left', 0);
      if (checked) $radio.prop('checked', true);
      var $label = $$1('<label>').appendTo($div);
      $label.attr('for', 'bsbi-resolution-' + val);
      $label.text(label);
      $radio.change(function () {
        resolution = $$1(this).val(); // Update controls mirrored in other blocks

        $$1('.bsbi-resolution-' + resolution).prop("checked", true);
        setControlState();
        changeMap();
      });
    }

    makeRadio('Hectads', 'hectad', true);
    makeRadio('Tetrads', 'tetrad', false); //makeRadio('Monads', 'monad', false)
  }

  function trendControl($parent) {
    // Overall control container
    var $container = $$1('<div>').appendTo($parent);
    $container.addClass('atlas-trend-slider-control');
    $container.hide(); // Trend display
    // const $indicator = $('<div>').appendTo($container)
    // $indicator.css('font-size', '1.5em')
    // $indicator.css('margin-bottom', '0.2em')
    // $indicator.text(trends[trends.length - 1].caption)
    // Slider

    var $sliderContainer = $$1('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    $sliderContainer.addClass('atlas-trend-select-container');
    var $slider = $$1('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', trends.length).addClass('atlas-trend-select');
    $slider.change(function () {
      atlasTrendIndex = $$1(this).val();
      changeMap();
    });
    var $scaleContainer = $$1('<div>').appendTo($sliderContainer);
    $scaleContainer.addClass('atlas-trend-tick-container');
    trends.forEach(function (p, i) {
      var $tick = $$1('<span>').appendTo($scaleContainer);
      $tick.addClass('atlas-trend-tick');
      var percent = i / (trends.length - 1) * 100;
      $tick.css('left', percent.toString() + '%');
      $tick.text('|');
      $tick.append('<br>');
      var $tickText = $$1('<span>').appendTo($tick);
      $tickText.addClass('atlas-trend-tick-text');
      $tickText.addClass('atlas-trend-tick-text-' + i);
      $tickText.html(p.lower + '<br>v.<br>' + p.upper);
    });
    $container.css('margin-bottom', '5.3em');
  }

  function insetRadios($parent, i) {
    // Overall control container
    var $container = $$1('<div>').appendTo($parent); //$container.attr('id', 'atlas-inset-control')

    function makeRadio(label, val, checked) {
      var $div = $$1('<div>').appendTo($container);
      $div.attr('class', 'radio');
      var $label = $$1('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$1('<input>').appendTo($label);
      var $span = $$1('<span>').appendTo($label);
      $span.text(label);
      $span.css('padding-left', '20px');
      $radio.attr('type', 'radio');
      $radio.attr('name', 'bsbi-inset-type-' + i);
      $radio.attr('class', 'bsbi-inset-type-' + val);
      $radio.attr('value', val);
      $radio.css('margin-left', 0);
      if (checked) $radio.prop('checked', true);
      $radio.change(function () {
        insetType = $$1(this).val(); // Update controls mirrored in other blocks

        $$1('.bsbi-inset-type-' + insetType).prop("checked", true);
        staticMap.setTransform(insetType);
        setCookie('inset', insetType, 30);
        changeMap();
      });
    }

    var selectedInset = getCookie('inset') ? getCookie('inset') : insetType;
    makeRadio('No insets', 'BI1', selectedInset === 'BI1' ? 'checked' : '');
    makeRadio('Channel Isles inset', 'BI2', selectedInset === 'BI2' ? 'checked' : '');
    makeRadio('Northern and Channel Isles inset', 'BI4', selectedInset === 'BI4' ? 'checked' : '');
  }

  function mapSetCurrentTaxon(taxon) {
    currentTaxon = taxon;
    var hybrid = bsbiDataAccess.taxaHybridList.find(function (h) {
      return h.taxon === currentTaxon.identifier;
    });
    currentTaxon.parent1 = hybrid ? hybrid.parent1 : '';
    currentTaxon.parent2 = hybrid ? hybrid.parent2 : '';
  }
  function createMaps(selector) {
    // Modify standard UK opts to remove any without CI
    var transOptsSel = JSON.parse(JSON.stringify(brcatlas.namedTransOpts));
    delete transOptsSel.BI3; // Remove the options without CI
    // Modify the BI4 - northern Isle inset option to go further west in order
    // to give more room for legends!

    transOptsSel.BI4.bounds.xmin = -240000, // Init
    bsbiDataAccess.bsbiDataRoot = ds$1.bsbi_atlas.dataRoot + 'bsbi/20210923/';
    bsbiDataAccess.showStatus = false; // Data access 

    var mapTypesSel = {
      'status_29': bsbiDataAccess.status_29,
      'status_30_69': bsbiDataAccess.status_30_69,
      'status_70_86': bsbiDataAccess.status_70_86,
      'status_87_99': bsbiDataAccess.status_87_99,
      'status_00_19': bsbiDataAccess.status_00_19,
      'Tetrad frequency': bsbiDataAccess.bsbiHectadDateTetFreq,
      'change_1987_1999_vs_2000_2019': bsbiDataAccess.change_1987_1999_vs_2000_2019,
      'change_1930_1969_vs_2000_2019': bsbiDataAccess.change_1930_1969_vs_2000_2019,
      'distAllClasses': bsbiDataAccess.distAllClasses,
      'hybrid': bsbiDataAccess.hybrid
    }; // Basemaps

    var basemapConfigs = [{
      name: 'Open Street Map',
      type: 'tileLayer',
      selected: true,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      opts: {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    }, {
      name: 'Stamen Black & White',
      type: 'tileLayer',
      selected: false,
      url: 'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
      opts: {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
      }
    }, {
      name: 'Open Topo Map',
      type: 'tileLayer',
      selected: false,
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      opts: {
        maxZoom: 17,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }
    }, {
      name: 'GEBCO 2020 Elevation',
      type: 'wms',
      selected: false,
      url: 'https://www.gebco.net/data_and_products/gebco_web_services/2020/mapserv?',
      opts: {
        layers: 'GEBCO_2020_Grid_2',
        maxZoom: 17,
        attribution: 'Imagery reproduced from the GEBCO_2020 Grid, GEBCO Compilation Group (2020) GEBCO 2020 Grid (doi:10.5285/a29c5465-b138-234d-e053-6c86abc040b9)'
      }
    }, {
      name: 'Copernicus elevation aspect',
      type: 'wms',
      selected: false,
      url: 'https://copernicus.discomap.eea.europa.eu/arcgis/services/Elevation/Aspect/MapServer/WMSServer?',
      opts: {
        layers: 'image',
        maxZoom: 17,
        attribution: '&copy; European Commission'
      }
    }]; // Map height

    var height = 650; // Create the static map

    staticMap = brcatlas.svgMap({
      selector: selector,
      mapid: "staticAtlasMain",
      captionId: "dotCaption",
      height: height,
      expand: true,
      legendOpts: svgLegendOpts,
      transOptsKey: getCookie('inset') ? getCookie('inset') : insetType,
      transOptsSel: transOptsSel,
      mapTypesKey: 'status_10_19',
      mapTypesSel: mapTypesSel,
      mapTypesControl: false,
      transOptsControl: false,
      seaFill: 'white',
      gridLineColour: '#7C7CD3',
      gridLineStyle: gridStyle,
      boundaryColour: '#7C7CD3'
    }); // Initial backgrop image

    var rasterRoot = ds$1.bsbi_atlas.dataRoot + 'rasters/';
    staticMap.basemapImage('colour_elevation', true, rasterRoot + 'colour_elevation.png', rasterRoot + 'colour_elevation.pgw'); // Callbacks for slippy maps

    function startLoad() {
      document.getElementById('atlas-loader').style.display = 'inline-block'; //develStartMapTiming("download")
    }

    function endLoad() {
      document.getElementById('atlas-loader').style.display = 'none'; //develStopMapTiming("download")
    }

    function startDraw() {
      document.getElementById('atlas-loader').style.display = 'inline-block'; //develStartMapTiming("display")
    }

    function endDraw() {
      document.getElementById('atlas-loader').style.display = 'none'; //develStopMapTiming("display")
    } // Create the slippy map


    slippyMap = brcatlas.leafletMap({
      selector: selector,
      mapid: 'slippyAtlasMain',
      height: height,
      width: staticMap.getMapWidth(),
      captionId: "dotCaption",
      mapTypesKey: 'status_10_19',
      mapTypesSel: mapTypesSel,
      legendOpts: slippyLegendOpts,
      basemapConfigs: basemapConfigs,
      callbacks: [startDraw, endDraw, startLoad, endLoad],
      showVcs: true
    });
    $$1('#slippyAtlasMain').hide();
  }
  function changeMap() {
    var displayedMap;

    if (displayedMapType === 'static') {
      displayedMap = staticMap;
    } else {
      displayedMap = slippyMap;
    }

    if (mapType === 'status') {
      var access = periods[atlasRangeIndex - 1].access;
      displayedMap.setMapType(access);
    } else if (mapType === 'allclass') {
      displayedMap.setMapType('distAllClasses');
    } else if (mapType === 'trends') {
      var _access = trends[atlasTrendIndex - 1].access;
      displayedMap.setMapType(_access);
    } else if (mapType === 'tetrad') {
      displayedMap.setMapType('Tetrad frequency');
    } else if (mapType === 'hybrid') {
      displayedMap.setMapType('hybrid');
    } // To try to keep the legend around the same apparent size when
    // actual map size changes due to inset change, we set a scale
    // factor to apply to the legend depending on what inset value
    // is specified.


    svgLegendOpts.scale = 0.9;

    if (insetType == 'BI1') {
      svgLegendOpts.scale = svgLegendOpts.scale * 0.77;
    }

    if (insetType == 'BI2') {
      svgLegendOpts.scale = svgLegendOpts.scale * 0.85;
    }

    staticMap.setLegendOpts(svgLegendOpts);

    if (currentTaxon.identifier) {
      displayedMap.setIdentfier(currentTaxon.identifier);
      displayedMap.redrawMap();
    }
  }
  function createMapControls(selector) {
    mapInterfaceToggle(mapControlRow(selector));
    mapTypeSelector(mapControlRow(selector));
    statusControl(mapControlRow(selector));
    statusCheckbox(mapControlRow(selector));
    opacitySlider(mapControlRow(selector));
    trendControl(mapControlRow(selector));
    backdropSelector(mapControlRow(selector, 'atlas-backdrop-selector'));
    $$1(selector).each(function (i) {
      // We loop through the selection so that we can use the
      // index value to differentiate the equivalent controls
      // from different blocks. This is vital for radio controls
      // otherwise value can only be selected in one block and
      // therefore initialisation may be wrong.
      var sel = 'bsbi-atlas-map-controls-' + i;
      var $div = $$1('<div>').appendTo($$1(this));
      $div.addClass(sel);
      sel = '.' + sel; // Potentially we can also use this to ensure that selection
      // in one block is mirrored in the other. This is only important
      // if user might switch between blocks during use - but this
      // is very unlikely. (But nevertheless has been implemented
      // for the radio buttons below.)

      insetRadios(mapControlRow(sel, 'atlas-inset-control'), i);
      gridStyleRadios(mapControlRow(sel, 'atlas-grid-type-control'), i);
      resolutionControl(mapControlRow(sel, 'atlas-resolution-control'), i);
      mapImageButton(mapControlRow(sel, 'atlas-image-button'), i);
      mapDownloadButton(mapControlRow(sel, 'atlas-download-button'), i);
    }); //DevelMappingPerformance($, selector, changeMap, bsbiDataAccess)
  }
  function updateBsbiDataAccess(key, value) {
    bsbiDataAccess[key] = value;
  }

  var $ = jQuery; // eslint-disable-line no-undef

  var ds = drupalSettings; // eslint-disable-line no-undef

  function main() {
    var taxaList = [];
    var currentTaxon = {
      identifier: null,
      name: null,
      shortName: null,
      tetrad: null,
      parent1: '',
      parent2: ''
    };
    mapSetCurrentTaxon(currentTaxon);
    $(document).ready(function () {
      // Set meta tags
      setBaseMetaTags(); // Initialise main content

      mainAtlasContent(); // Devel block
      // develChangeMapColours('#bsbi-atlas-development', changeMap, bsbiDataAccess)
    });

    function mainAtlasContent() {
      var sections = [{
        group: null,
        id: 'summary',
        title: 'Summary',
        fn: sectionSummary
      }, {
        group: null,
        id: 'conservation',
        title: 'Conservation status',
        fn: sectionEmpty
      }, {
        group: null,
        id: 'gallery',
        title: 'Gallery',
        fn: sectionGallery
      }, {
        group: 'CHARACTERISTICS',
        id: 'ecology',
        title: 'Ecology',
        fn: sectionEcology
      }, {
        group: 'EXTERNAL LINKS',
        id: 'ecoflora',
        title: 'EcoFlora',
        fn: ecoFlora,
        external: true
      }, {
        group: 'EXTERNAL LINKS',
        id: 'worldfloraonline',
        title: 'World Flora Online',
        fn: worldFloraOnline,
        external: true
      }, {
        group: 'BIBLIOGRAPHY',
        id: 'references',
        title: 'References',
        fn: sectionEmpty
      }]; // Taxon selection controls

      taxonSelectors(); // Select summary (map) tab initially

      var selected = 'summary'; // Clear current content (including dialog boxes from SVG maps)

      $('.brc-atlas-map-opts').remove();
      $('#bsbi-atlas-gui').html(null); // Make the section tabs

      var $ul = $('<ul class="nav nav-tabs"></ul>').appendTo($('#bsbi-atlas-gui'));
      sections.forEach(function (s) {
        if (!s.external) {
          $ul.append(makeTabButton(s.id, s.title, selected));
        }
      }); // Create the empty content sections

      var $content = $('<div class="tab-content"></div>').appendTo($('#bsbi-atlas-gui'));
      sections.forEach(function (s) {
        if (!s.external) {
          $content.append(makeSection(s.id, s.title, selected));
        }
      }); // Create the detailed section content

      sections.forEach(function (s) {
        if (!s.external) {
          s.fn(s.id);
        }
      }); // Add behaviour for particular sections on display

      $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var target = $(e.target).attr("href"); // activated tab
        // Show/hide the map controls appropriately

        if (target === '#bsbi-atlas-section-summary') {
          $('.bsbi-atlas-map-controls').show(); // Regenerate map (to deal with bad legend display if map hidden when created)

          changeMap();
        } else {
          $('.bsbi-atlas-map-controls').hide();
        }

        if (target === '#bsbi-atlas-section-ecology') {
          // Regenerate graphics (to deal with bad legend display if map hidden when created)
          changeEcologyTab();
        }

        if (target === '#bsbi-atlas-section-gallery') {
          createGallery('bsbi-gallery', currentTaxon.identifier);
        }
      });
    }

    function taxonSelectors() {
      // Overall control container
      var $container = $('<div>').appendTo($('.bsbi-atlas-taxon-selector'));
      $container.addClass('atlas-taxon-selector-div'); // Selector

      var $sel = $('<select>').appendTo($container);
      $sel.addClass('atlas-taxon-selector-sel'); // Copy taxon

      var $link = $('<button>').appendTo($container);
      $link.addClass('atlas-taxon-selector-link');
      $link.attr('title', 'Copy link for taxon into clipboard');
      $link.addClass('btn btn-default');
      $link.html('&#128279;');
      $link.css('padding', '6px 6px');
      $link.on('click', function () {
        if (currentTaxon.identifier) {
          copyToClipboard(location.origin + '/atlas/' + currentTaxon.identifier);
        }
      });
      d3__namespace.csv(ds.bsbi_atlas.dataRoot + 'bsbi/taxon_list.csv').then(function (data) {
        taxaList = data;
        taxaList.forEach(function (d) {
          var name = '';

          if (d['vernacular']) {
            name = '<b>' + d['vernacular'] + '</b> ';
          }

          name = name + '<i>' + d['taxon name'] + '</i>';

          if (d['qualifier']) {
            name = name + ' <b><i>' + d['qualifier'] + '</i></b>';
          }

          if (d['authority']) {
            name = name + ' <span style="color: grey">' + d['authority'] + '</span>';
          }

          var $opt = $('<option>');
          $opt.attr('data-content', name);
          $opt.attr('value', d['ddb id']);
          $opt.attr('data-canonical', d['canonical']);
          $opt.attr('data-taxon-name', d['taxon name']);
          $opt.attr('data-qualifier', d['qualifier']);
          $opt.attr('data-vernacular', d['vernacular']);
          $opt.attr('data-tetrad', d['tetrad']); //$opt.attr('data-monad', d['monad'])

          $opt.html(name).appendTo($sel);
        });
        $sel.attr('data-size', '10');
        $sel.attr('data-live-search', 'true');
        $sel.attr('data-header', 'Start typing the name of a taxon');
        $sel.attr('title', 'Select a taxon to display');
        $sel.selectpicker(); //$sel.on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

        $sel.on('changed.bs.select', function () {
          console.log('Identifier:', $(this).val());
          currentTaxon.identifier = $(this).val();
          currentTaxon.name = $(this).find(":selected").attr("data-content");
          currentTaxon.shortName = $(this).find(":selected").attr("data-taxon-name");
          mapSetCurrentTaxon(currentTaxon);
          setControlState();
          changeMap();
          changeCaption(); //Also changes taxon name display in sections

          changeEcologyTab();
          createGallery('bsbi-gallery', currentTaxon.identifier);
        }); // If identifier passed in URL, set the value

        if (ds.bsbi_atlas.identifier) {
          $sel.selectpicker('val', ds.bsbi_atlas.identifier);
        } // Get list of hybrid taxa which can be mapped with their parents
        // This is done after taxon list loaded so that data can be enriched
        // with names.


        d3__namespace.csv(ds.bsbi_atlas.dataRoot + 'bsbi/hybrids.csv', function (h) {
          var ddbid = h['ddb id'];
          var parentDdbids = h['hybrid parent ids'].split(';');

          if (parentDdbids.length === 2) {
            var p1ddbid = parentDdbids[0];
            var p2ddbid = parentDdbids[1];
            var mTaxon = taxaList.find(function (t) {
              return t['ddb id'] === ddbid;
            });
            var mParent1 = taxaList.find(function (t) {
              return t['ddb id'] === p1ddbid;
            });
            var mParent2 = taxaList.find(function (t) {
              return t['ddb id'] === p2ddbid;
            });

            if (mTaxon && mParent1 && mParent2) {
              return {
                taxon: ddbid,
                parent1: p1ddbid,
                parent2: p2ddbid,
                taxonName: mTaxon['taxon name'],
                parent1Name: mParent1['taxon name'],
                parent2Name: mParent2['taxon name']
              };
            } else {
              if (!mTaxon) console.error('Cannot find ' + ddbid + ' in taxon list');
              if (!mParent1) console.error('Cannot find ' + p1ddbid + ' in taxon list');
              if (!mParent2) console.error('Cannot find ' + p2ddbid + ' in taxon list');
              return null;
            }
          } else {
            return null; // Excludes from result
          }
        }).then(function (data) {
          delete data.columns;
          updateBsbiDataAccess('taxaHybridList', data);
        }); // Get list of taxa for which no status exists
        // (for use elsewhere - might as well be done here)

        d3__namespace.csv(ds.bsbi_atlas.dataRoot + 'bsbi/no_status.csv').then(function (data) {
          updateBsbiDataAccess('taxaNoStatusList', data.map(function (d) {
            return d['ddb id'];
          }));
        });
      })["catch"](function () {
        console.log('Error reading taxon CSV');
      });
    }

    function makeTabButton(id, title, selected) {
      var $li = $('<li>');

      if (selected === id) {
        $li.addClass('active');
      }

      var $a = $('<a data-toggle="tab" href="#bsbi-atlas-section-' + id + '">').appendTo($li);
      $a.text(title);
      return $li;
    }

    function makeSection(id, title, selected) {
      var $div = $('<div/>', {
        id: 'bsbi-atlas-section-' + id
      });
      $div.addClass('tab-pane');
      $div.addClass('fade');

      if (selected === id) {
        $div.addClass('in');
        $div.addClass('active');
      }

      var $h = $('<p class="bsbi-selected-taxon-name"></p>');
      $h.css('font-size', '1.3em');
      $h.css('margin-top', '0.5em');
      $h.addClass('bsbi-atlas-section-header');
      $div.append($h);
      return $div;
    }

    function sectionEmpty(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      var $p1 = $('<p>').appendTo($sect);
      $p1.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
      var $p2 = $('<p>').appendTo($sect);
      $p2.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
    }

    function sectionSummary(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      var $d = $('<div class=".container-fluid">').appendTo($sect);
      var $r = $('<div class="row">').appendTo($d);
      var $left = $('<div class="col-sm-8">').appendTo($r);
      var $right = $('<div class="col-sm-4">').appendTo($r);
      $left.append('<div id="bsbiMapDiv" width="100%"></div>');
      var $taxon = $('<div class="bsbi-selected-taxon-name bsbi-section-summary"></div>').appendTo($right);
      $taxon.css('font-size', '1.3em');
      $right.append('<hr/>');
      $right.append('<div id="bsbi-caption"></div>');
      createMaps("#bsbiMapDiv");
      createMapControls('.bsbi-atlas-map-controls');
      setControlState();
    }

    function sectionEcology(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      $sect.append('<div id="bsbi-phenology"></div>');
      createEcology("#bsbi-phenology");
    }

    function sectionGallery(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      $sect.append('<div id="bsbi-gallery" class="inline-gallery-container"></div>');
      var $copyright = $('<div id="bsbi-gallery-copyright"></div>').appendTo($sect);
      $copyright.text("TODO - Copyright text to acknowledge Rob Still and Chris Gibson");
      $('#bsbi-gallery-copyright').hide();
    }

    function postProcessCaptionText(txt) {
      var txtn = txt;
      var bsbidburl = ds.bsbi_atlas.dataBsbidb;
      txtn = txtn.replace(/href="\/object.php/g, 'target="_blank" href="' + bsbidburl + 'object.php');
      txtn = txtn.replace(/href='\/object.php/g, 'target=\'_blank\' href=\'' + bsbidburl + 'object.php');
      return txtn;
    }

    function getFormattedTaxonName(vernacular, scientific, authority) {
      var vernacularHtml = vernacular ? '<span class="taxname"><b>' + vernacular + ' </b></span>' : '';
      var scientificHtml = scientific ? '<span class="taxname"><i>' + scientific + ' </i></span>' : '';
      var authorityHtml = authority ? '<span class="taxname"><span style="color: grey">' + authority + '</span></span>' : '';
      return vernacularHtml + scientificHtml + authorityHtml;
    }

    function changeEcologyTab() {
      changeEcology(ds.bsbi_atlas.dataRoot, currentTaxon.identifier);
    }

    function changeCaption() {
      var $p;
      var $caption = $('#bsbi-caption');
      $caption.html('');
      var captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions/';
      d3__namespace.csv(captionRoot + currentTaxon.identifier.replace(/\./g, "_") + '.csv?prevent-cache=09092021').then(function (d) {
        // Set taxon name
        $('.bsbi-selected-taxon-name').html(getFormattedTaxonName(d[0].vernacular, d[0].taxonName, d[0].authority)); // For caption, set the various sections
        // Description

        if (d[0].atlasSpeciesDescription) {
          $caption.append('<h4>Description</h4>');
          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesDescription));
        } // Taxa covered


        if (d[0].captionedChildTaxonIds) {
          $caption.append('<h4>Taxa covered <span id="bsbi-taxa-covered-toggle">[show]</span></h4>'); //$p = $('<p id="bsbi-taxa-covered-toggle">').appendTo($caption)
          //$p.html('[show]')

          var $ul = $('<ul id="bsbi-taxa-covered-list">').appendTo($caption);
          var ddbids = d[0].captionedChildTaxonIds.split(';');
          ddbids.forEach(function (ddbid) {
            var $li = $('<li>').appendTo($ul);
            var taxon = taxaList.find(function (t) {
              return t['ddb id'] === ddbid;
            });

            if (taxon) {
              $li.html(getFormattedTaxonName(taxon['vernacular'], taxon['taxon name'], taxon['authority']));
            }
          });
          var taxaCoveredShown = false;
          $('#bsbi-taxa-covered-toggle').click(function () {
            taxaCoveredShown = !taxaCoveredShown;

            if (taxaCoveredShown) {
              $('#bsbi-taxa-covered-list').show();
              $('#bsbi-taxa-covered-toggle').html('[hide]');
            }

            if (!taxaCoveredShown) {
              $('#bsbi-taxa-covered-list').hide();
              $('#bsbi-taxa-covered-toggle').html('[show]');
            }
          });
        } // Biogeography


        if (d[0].atlasSpeciesBiogeography) {
          $caption.append('<h4>Biogeography</h4>');
          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesBiogeography));
        } // Trends


        if (d[0].atlasSpeciesTrends) {
          $caption.append('<h4>Trends</h4>');
          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesTrends));
        }

        if (d[0].captionAuthors) {
          $caption.append('<h4>Authors</h4>');

          var _$ul = $('<ul>').appendTo($caption);

          d[0].captionAuthors.split(';').forEach(function (a) {
            var $li = $('<li>').appendTo(_$ul);
            $li.text(a);
          });
        } // Citation


        $caption.append('<h4>Recommended citation <span id="bsbi-citation-toggle">[show]</span></h4>');
        var $div = $('<div id="bsbi-citation-div">').appendTo($caption);
        $p = $('<p id="bsbi-citation-text">').appendTo($div);
        $p.append(getCitation(currentTaxon)); // $p.append('<i>' + d[0].taxonName + ',</i> ')
        // $p.append('in <i>BSBI Online Atlas 2020</i>, eds P.A. Stroh, T. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ')
        // $p.append(location.origin + '/atlas/' + currentTaxon.identifier)
        // $p.append(' [Accessed ' + new Date().toLocaleDateString('en-GB') + ']')

        var $but1 = $('<button id="bsbi-citation-copy-text">Copy as text</button>').appendTo($div);
        $but1.addClass('btn btn-default');
        var $but2 = $('<button id="bsbi-citation-copy-html">Copy as HTML</button>').appendTo($div);
        $but2.addClass('btn btn-default');
        var taxaCitationShown = false;
        $('#bsbi-citation-toggle').click(function () {
          taxaCitationShown = !taxaCitationShown;

          if (taxaCitationShown) {
            $('#bsbi-citation-div').show();
            $('#bsbi-citation-toggle').html('[hide]');
          }

          if (!taxaCitationShown) {
            $('#bsbi-citation-div').hide();
            $('#bsbi-citation-toggle').html('[show]');
          }
        });
        $('#bsbi-citation-copy-text').click(function () {
          copyToClipboard($('#bsbi-citation-text').text());
        });
        $('#bsbi-citation-copy-html').click(function () {
          copyToClipboard($('#bsbi-citation-text').html());
        }); // Update meta tags

        addMetaTags('title', d[0].taxonName + ' in BSBI Online Atlas 2020', true);
      });
    }

    function ecoFlora(identifier) {
      alert("link to ecoflora for: " + identifier);
    }

    function worldFloraOnline(identifier) {
      alert("link to world flora online for: " + identifier);
    }
  }

  // to assist with trouble shooting.

  console.log("Running ".concat(pkg.name, " version ").concat(pkg.version)); // Call main function

  main();

}));
