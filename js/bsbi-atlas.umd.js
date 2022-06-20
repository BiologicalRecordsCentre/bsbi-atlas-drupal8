(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('d3')) :
  typeof define === 'function' && define.amd ? define(['d3'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.d3));
})(this, (function (d3$1) { 'use strict';

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

  var d3__namespace = /*#__PURE__*/_interopNamespace(d3$1);

  var name = "bsbi-atlas";
  var version = "0.2.0";
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

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  // access structure. All the data access functions
  // are members of this structure.

  var bsbiDataAccess = {};
  bsbiDataAccess.bsbiDataRoot = '';
  bsbiDataAccess.periodClasses = 'standard';
  bsbiDataAccess.showStatus = true;
  bsbiDataAccess.resolution = 'hectad';
  bsbiDataAccess.displayedMapType = 'static';
  bsbiDataAccess.taxaHybridList = [];
  bsbiDataAccess.taxaNoStatusList = [];
  bsbiDataAccess.changeColours = ['#FAD0C8', '#DD5A2F', '#525252'];
  bsbiDataAccess.symboltype = 'circle';
  bsbiDataAccess.periodColours = {};
  bsbiDataAccess.dotCaption = '';
  bsbiDataAccess.periodColours.standard = {
    x: {
      "to 1929": '#f7f7f7',
      "1930 - 1969": '#c6c6c6',
      "1970 - 1986": '#909090',
      "1987 - 1999": '#4e4e4e',
      "2000 - 2019": '#000000'
    },
    n: {
      "to 1929": '#eff3ff',
      "1930 - 1969": '#bdd7e7',
      "1970 - 1986": '#6baed6',
      "1987 - 1999": '#2b71a5',
      "2000 - 2019": '#004d99'
    },
    a: {
      "to 1929": '#FEE5D9',
      "1930 - 1969": '#FCBCB4',
      "1970 - 1986": '#FF8C86',
      "1987 - 1999": '#FF0000',
      "2000 - 2019": '#B30000'
    },
    bullseye: {
      "to 1929": 'black',
      "1930 - 1969": 'black',
      "1970 - 1986": 'black',
      "1987 - 1999": 'black',
      "2000 - 2019": 'black'
    },
    missing: {
      "to 1929": 'black',
      "1930 - 1969": 'black',
      "1970 - 1986": 'black',
      "1987 - 1999": 'black',
      "2000 - 2019": 'black'
    }
  };
  bsbiDataAccess.periodColours.print = {
    x: {
      "pre-1970": '#f7f7f7',
      "1970 - 1986": '#b9b9b9',
      "1987 - 1999": '#6f6f6f',
      "2000 - 2019": '#000000'
    },
    n: {
      "pre-1970": '#eff3ff',
      "1970 - 1986": '#bdd7e7',
      "1987 - 1999": '#368dcd',
      "2000 - 2019": '#004d99'
    },
    a: {
      "pre-1970": '#fee5d9',
      "1970 - 1986": '#fc9898',
      "1987 - 1999": '#ff4646',
      "2000 - 2019": '#b30000'
    },
    bullseye: {
      "pre-1970": 'black',
      "1970 - 1986": 'black',
      "1987 - 1999": 'black',
      "2000 - 2019": 'black'
    },
    missing: {
      "pre-1970": 'black',
      "1970 - 1986": 'black',
      "1987 - 1999": 'black',
      "2000 - 2019": 'black'
    }
  };
  bsbiDataAccess.periodStroke = {};
  bsbiDataAccess.periodStroke.standard = {
    x: {
      "to 1929": '#808080',
      "1930 - 1969": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    },
    n: {
      "to 1929": '#808080',
      "1930 - 1969": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    },
    a: {
      "to 1929": '#808080',
      "1930 - 1969": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    },
    bullseye: {
      "to 1929": '#808080',
      "1930 - 1969": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    },
    missing: {
      "to 1929": '#808080',
      "1930 - 1969": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    }
  };
  bsbiDataAccess.periodStroke.print = {
    x: {
      "pre-1970": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    },
    n: {
      "pre-1970": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    },
    a: {
      "pre-1970": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    },
    bullseye: {
      "pre-1970": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    },
    missing: {
      "pre-1970": '#808080',
      "1970 - 1986": '#808080',
      "1987 - 1999": '#808080',
      "2000 - 2019": '#808080'
    }
  }; // The periodMappsing code added 19/01/2020 to deal with mapping periods required in app
  // that are different from those expressed in CSV files that I have available at that time.
  // Was extended to meet the requirement of showing faded symbols for hectads where recorded
  // in earlier time period.

  var periodMappings = {};
  periodMappings.print = {
    "pre-1970": {
      prior: [],
      csvperiods: ["to 1929", "1930 - 1969"]
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
  periodMappings.standard = {
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
        console.log("Hybrid map: can't retrieve map data for hybrid taxon ".concat(identifier));
        reject(e);
      });
    });
    var pParent1 = new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(hybridInfo.parent1)).then(function (data) {
        resolve(data);
      })["catch"](function (e) {
        console.log("Hybrid map: can't retrieve map data for parent taxon ".concat(hybridInfo.parent1));
        reject(e);
      });
    });
    var pParent2 = new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(hybridInfo.parent2)).then(function (data) {
        resolve(data);
      })["catch"](function (e) {
        console.log("Hybrid map: can't retrieve map data for parent taxon ".concat(hybridInfo.parent2));
        reject(e);
      });
    });
    bsbiDataAccess.dotCaption = "Hectad: <br/>\n    <i>".concat(hybridInfo.parent1Name, "</i>: </br>\n    <i>").concat(hybridInfo.parent2Name, "</i>: </br>\n    Hybrid:");
    return new Promise(function (resolve, reject) {
      Promise.all([pHybrid, pParent1, pParent2]).then(function (data) {
        //https://nbn.org.uk/wp-content/uploads/2020/01/Preston_et_al-2015-Biological_Journal_of_the_Linnean_Society.pdf
        var pink = '#E4C3AA';
        var blue = '#A8CBE2';
        var yellow = '#F7F619';
        var all = [];
        data.forEach(function (taxonData, iTaxonData) {
          taxonData.forEach(function (r) {
            var match = all.find(function (ar) {
              return r.hectad === ar.gr;
            });

            if (match) {
              match.presence[iTaxonData] = true;
            } else {
              var presence = [false, false, false];
              presence[iTaxonData] = true;
              all.push({
                gr: r.hectad,
                presence: presence
              });
            }
          });
        });
        all.forEach(function (r) {
          r.colour = r.presence[1] && r.presence[2] ? yellow : r.presence[1] ? pink : blue;
          r.caption = "Hectad: <b>".concat(r.gr, "</b><br/>\n          <i>").concat(hybridInfo.parent1Name, "</i>: <b>").concat(r.presence[1] ? 'present' : 'absent', "</b></br>\n          <i>").concat(hybridInfo.parent2Name, "</i>: <b>").concat(r.presence[2] ? 'present' : 'absent', "</b></br>\n          Hybrid: <b>").concat(r.presence[0] ? 'present' : 'absent', "</b>");
          r.noCaption = bsbiDataAccess.dotCaption;
        });
        var n = all.length;

        for (var i = 0; i < n; i++) {
          //console.log(all[i])
          if (all[i].presence[0]) {
            all.push({
              gr: all[i].gr,
              shape: 'square',
              size: 0.6,
              colour: 'black',
              caption: all[i].caption,
              noCaption: all[i].noCaption
            });
          }
        }

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
    var statusText = {
      n: 'Native',
      //inative
      a: 'Non-native (alien)',
      //non-native (alien),
      bullseye: 'Introduced',
      missing: 'missing' //no value yet

    };
    var legendText = {
      "pre-1970": "pre-1970",
      "to 1929": "pre-1930",
      "1930 - 1969": "1930-69",
      "1970 - 1986": "1970-86",
      "1987 - 1999": "1987-99",
      "2000 - 2019": "2000-19"
    };
    var opacities = {
      "pre-1970": 1,
      "to 1929": 1,
      "1930 - 1969": 1,
      "1970 - 1986": 1,
      "1987 - 1999": 1,
      "2000 - 2019": 1
    };
    var periods = Object.keys(periodMappings[bsbiDataAccess.periodClasses]).reverse();
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

      if (bsbiDataAccess.showStatus) {
        bsbiDataAccess.dotCaption = "Hectad:<br/>\n        Most recent dateclass:<br/>\n        Status:</b>";
      } else {
        bsbiDataAccess.dotCaption = "Hectad:<br/>\n        Most recent dateclass:";
      }

      d3__namespace.csv(getCSV(identifier), function (r) {
        if (r.hectad) {
          // GB or Irish?
          var country;

          if (r.hectad.length === 3) {
            country = 'ire';
          } else {
            country = 'gb';
          } // Status (can be n for native, a for alien, or bullseye for reintroduced)


          var hectadstatus = r.hectadstatus ? r.hectadstatus : 'missing';
          var statusValid = ['n', 'a', 'bullseye', 'missing'];

          if (statusValid.indexOf(hectadstatus) === -1) {
            // If status not valid, consider missing
            hectadstatus = 'missing';
          } // Count the occurrences in each date category for legend
          // (not just the last one recorded in)


          var occurs = false;
          var period, recent;

          for (var iPeriod = 0; iPeriod < periods.length; iPeriod++) {
            period = periods[iPeriod];
            var csvperiods = periodMappings[bsbiDataAccess.periodClasses][period].csvperiods;

            for (var iCsvperiod = 0; iCsvperiod < csvperiods.length; iCsvperiod++) {
              var csvperiod = csvperiods[iCsvperiod];

              if (r[csvperiod] === '1') {
                counts[period][country][hectadstatus]++;
                counts[period][country]['total']++;
                occurs = true;
                recent = recent ? recent : period; // Save the most recent period which is used to get styles
                // If recent = 'pre-1970', reset
                // if (recent === 'pre-1970') recent = '1930 - 1969'

                break;
              }
            }
          } // Presence attrs - required for data download


          var attrs = {};

          for (var _iPeriod = 0; _iPeriod < periods.length; _iPeriod++) {
            period = periods[_iPeriod];
            attrs[period] = 0;
            var _csvperiods = periodMappings[bsbiDataAccess.periodClasses][period].csvperiods;

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
              point = {
                gr: r.hectad,
                //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
                shape: 'circle',
                colour: bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][hectadstatus][recent],
                stroke: bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][hectadstatus][recent],
                size: hectadstatus === 'missing' ? 0.5 : 1,
                opacity: opacities[recent],
                caption: "Hectad: <b>".concat(r.hectad, "</b><br/>\n                        Most recent dateclass: <b>").concat(getPeriodText(recent), "</b><br/>\n                        Status: <b>").concat(statusText[hectadstatus], "</b>"),
                noCaption: bsbiDataAccess.dotCaption
              };
            } else {
              point = {
                gr: r.hectad,
                //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
                shape: 'circle',
                colour: bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses].x[recent],
                stroke: bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses].x[recent],
                size: 1,
                opacity: opacities[recent],
                caption: "Hectad: <b>".concat(r.hectad, "</b><br/>\n                        Most recent dateclass: <b>").concat(getPeriodText(recent), "</b>"),
                noCaption: bsbiDataAccess.dotCaption
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
                colour: bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses].n[p],
                stroke: bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses].n[p],
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
                colour: bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses].a[p],
                stroke: bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses].a[p],
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
              colour: bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses].x[p],
              stroke: bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses].x[p],
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
    bsbiDataAccess.dotCaption = "Tetrad:";
    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier, 'tetrads'), function (r) {
        if (r.tetrad) {
          return {
            gr: r.tetrad,
            //shape: bsbiDataAccess.symboltype, //'circle' dev only,
            shape: 'square',
            colour: 'black',
            size: 1,
            opacity: 1,
            caption: "Tetrad: <b>".concat(r.tetrad, "</b>"),
            noCaption: bsbiDataAccess.dotCaption
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
              //shape: bsbiDataAccess.symboltype === 'square' ? 'square' : 'circle', //'circle' dev only
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

  function getPeriodText(p) {
    return p === "to 1929" ? "pre-1930" : p.replace(" - ", "-");
  }

  function nativeSpeciesStatus(identifier, period) {
    bsbiDataAccess.dotCaption = "Hectad:<br/>Occurrence:";
    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier), function (r) {
        if (r.hectad) {
          var occurs = false;
          periodMappings[bsbiDataAccess.periodClasses][period].csvperiods.forEach(function (csvPeriod) {
            if (r[csvPeriod] === '1') {
              occurs = true;
            }
          });
          var prior = false;
          periodMappings[bsbiDataAccess.periodClasses][period].prior.forEach(function (csvPeriod) {
            if (r[csvPeriod] === '1') {
              prior = true;
            }
          });

          if (occurs || prior) {
            return {
              gr: r.hectad,
              shape: 'circle',
              size: 1,
              colour: occurs ? '#000000' : '#b0b0b0',
              opacity: 1,
              stroke: '#808080',
              caption: "Hectad: <b>".concat(r.hectad, "</b><br/>\n            Occurrence: <b>").concat(occurs ? 'in' : 'prior to', "</b> the period <b>").concat(getPeriodText(period), "</b>"),
              noCaption: bsbiDataAccess.dotCaption
            };
          }
        }
      }).then(function (data) {
        var legend = {
          precision: 10000,
          size: 1,
          lines: [{
            //colour: 'black',
            colour: '#636363',
            opacity: 1,
            stroke: 'black',
            text: getPeriodText(period),
            shape: 'circle'
          }, {
            //colour: 'black',
            colour: '#bdbdbd',
            //opacity: 0.5,
            opacity: 1,
            stroke: 'black',
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
    //return change(identifier, ['1930 - 1949', '1950 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930-1969 to 2000-2019')
    //return change(identifier, ['to 1929', '1930 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930-1969 to 2000-2019')
    return change(identifier, ['1930 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930-1969 to 2000-2019');
  };

  function change(identifier, early, late, legendTitle) {
    bsbiDataAccess.dotCaption = "Hectad:</br>Change:";
    var shapes = ['square', 'triangle-up', 'triangle-down']; //const colours = ['#FAD0C8', '#DD5A2F', '#525252']

    var colours = bsbiDataAccess.changeColours;
    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier), function (r) {
        var presentEarly = early.some(function (f) {
          return r[f] === '1';
        });
        var presentLate = late.some(function (f) {
          return r[f] === '1';
        });
        var i, capText;

        if (presentEarly && presentLate) {
          i = 0; //present

          capText = 'Present in both periods';
        } else if (!presentEarly && presentLate) {
          i = 1; //gain

          capText = 'Gain';
        } else if (presentEarly && !presentLate) {
          i = 2; //loss

          capText = 'Loss';
        } else {
          i = 100; //not present in either period
        }

        if (r.hectad && i < 100) {
          return {
            gr: r.hectad,
            colour: colours[i],
            shape: shapes[i],
            caption: "Hectad: <b>".concat(r.hectad, "</b></br>Change: <b>").concat(capText, "</b>"),
            noCaption: bsbiDataAccess.dotCaption
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
    var legendSizeFact = 0.5;
    bsbiDataAccess.dotCaption = "Hectad: </br>Tetrads where present:"; //const colour = d3.scaleLinear().domain([1, 13, 25]).range(['#edf8b1', '#7fcdbb', '#2c7fb8'])

    return new Promise(function (resolve, reject) {
      d3__namespace.csv(getCSV(identifier), function (r) {
        var tetrads = Number(r['distinct tetrads']);
        var tetround = Math.ceil(tetrads / 5) * 5;

        if (r.hectad && tetrads) {
          return {
            gr: r.hectad,
            size: Math.sqrt(tetround) / 5,
            caption: "Hectad: <b>".concat(r.hectad, "</b></br>Tetrads where present: <b>").concat(tetrads, "</b>"),
            noCaption: bsbiDataAccess.dotCaption
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

  var $$7 = jQuery; // eslint-disable-line no-undef

  function setBaseMetaTags() {
    addMetaTags('title', 'BSBI Online Plant Atlas 2020');
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
        $$7('meta[name="' + name + '"').attr('content', content);
      } else {
        $$7('head').append('<meta name="' + name + '" content="' + content + '" />');
      }
    }; // http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata


    switch (type) {
      case 'title':
        $$7('title').html(value);
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

  var pcache = '20062022x1';

  var $$6 = jQuery; // eslint-disable-line no-undef

  var phen1$1, phen2$1, phen3, altlat$1;
  var apparencyByLatData;
  function createEcology(sel) {
    $$6('<h4>').appendTo($$6(sel)).text('Phenology & Apparency');
    var $p1 = $$6('<p>').appendTo($$6(sel));
    $p1.text("Explanation of apparency and phenology charts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.");
    var $phenFlexParent = $$6('<div>').appendTo($$6(sel));
    $phenFlexParent.attr('class', 'phenRow');
    var $phenFlexLeft = $$6('<div>').appendTo($phenFlexParent);
    $phenFlexLeft.attr('class', 'phenColumn');
    var $phenFlexRight = $$6('<div>').appendTo($phenFlexParent);
    $phenFlexRight.attr('class', 'phenColumn');
    $$6('<h4>').appendTo($$6(sel)).text('Altitude vs Latitude');
    var $p2 = $$6('<p>').appendTo($$6(sel));
    $p2.text("Explanation of latitude/altitude chart. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.");
    var $altlat = $$6('<div>').appendTo($$6(sel));
    var $apparency = $$6('<div>').appendTo($phenFlexLeft);
    $apparency.attr('id', 'bsbi-apparency-chart').css('max-width', '400px');
    phen1$1 = brccharts.phen1({
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
    var $phenology = $$6('<div>').appendTo($phenFlexLeft);
    $phenology.attr('id', 'bsbi-phenology-chart').css('max-width', '400px');
    phen2$1 = brccharts.phen2({
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
    var $phenSource = $$6('<div>').appendTo($phenFlexLeft);
    $phenSource.attr('id', 'bsbi-phenology-source');
    $phenSource.css('font-size', '0.8em');
    $phenSource.css('padding-left', '32px');
    $phenSource.css('max-width', '400px');
    var $apparencyByLat = $$6('<div>').appendTo($phenFlexRight);
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
    }); //latPhenNormalizeCheckbox($phenFlexRight, phen3) 

    latPhenDataTypeDropdown($phenFlexRight); // Alt vs Lat visualisation

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
        radius: 11,
        legend: '1-10%'
      }, {
        min: 10.00001,
        max: 30,
        radius: 14,
        legend: '11-30%'
      }, {
        min: 30.00001,
        max: 40,
        radius: 16,
        legend: '31-40%'
      }, {
        min: 40.00001,
        max: 50,
        radius: 18,
        legend: '41-50%'
      }, {
        min: 50.00001,
        max: 100,
        radius: 20,
        legend: '51-100%'
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
    altlat$1 = brccharts.altlat(opts); // Website style is overriding some charts style, so reset it

    $$6('.brc-chart-phen1').css('overflow', 'visible'); // Chart line width - not currently a chart option

    $$6('#bsbi-apparency-by-lat-chart .phen-path').css('stroke-width', 1);
  }

  function latPhenDataTypeDropdown($parent) {
    var dataTypes = [{
      caption: 'Scale by relative abundance',
      val: 'count'
    }, {
      caption: 'Scale across latitudes',
      val: 'scaled'
    }, {
      caption: 'Scale within latitude',
      val: 'density'
    }]; // Main type selector

    var $div = $$6('<div>').appendTo($parent);
    $div.css('margin-left', '35px');
    var $sel = $$6('<select>').appendTo($div);
    $sel.attr('id', 'atlas-lat-phen-data-type');
    $sel.addClass('selectpicker'); //$sel.attr('data-width', '100%')

    $sel.on('changed.bs.select', function () {
      if (apparencyByLatData.length) {
        apparencyByLat(phen3, apparencyByLatData);
      }
    });
    dataTypes.forEach(function (t) {
      var $opt = t.selected ? $$6('<option>') : $$6('<option>');
      $opt.attr('value', t.val);
      $opt.html(t.caption).appendTo($sel);
    });
    $sel.val('count'); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function changeEcology(dataRoot, identifier) {
    if (!identifier) return;
    var apparencyRoot = dataRoot + 'bsbi/apparency/';
    var captionRoot = dataRoot + 'bsbi/captions/';
    var mapRoot = dataRoot + 'bsbi/20220606/'; // Apparency all

    var fileAll = apparencyRoot + 'all/' + identifier.replace(/\./g, "_") + '.csv';
    d3__namespace.csv(fileAll + '?prevent-cache=').then(function (data) {
      apparency(phen1$1, data);
    })["catch"](function () {
      console.warn("Apparency chart failed for ".concat(fileAll, ". Error message:"), e);
      phen1$1.setChartOpts({
        data: []
      }); // TEMPORARY CODE FOR TESTING so that a file always returned 
      // const fileDefault = apparencyRoot + 'all/dummy.csv'
      // d3.csv(fileDefault + '?prevent-cache=')
      //   .then(function(data) {
      //     apparency(phen1, data)
      //   })
    }); // Apparency by latitude

    var fileLat = apparencyRoot + 'byLat/' + identifier.replace(/\./g, "_") + '.csv';
    d3__namespace.csv(fileLat + '?prevent-cache=').then(function (data) {
      apparencyByLatData = data; // Saved so that apparencyByLat if 
      // data type dropdown used.

      apparencyByLat(phen3, apparencyByLatData);
    })["catch"](function () {
      console.warn("Apparency by latitude chart failed for ".concat(fileLat, ". Error message:"), e);
      phen3.setChartOpts({
        data: [],
        metrics: [],
        spread: false
      }); // TEMPORARY CODE FOR TESTING so that a file always returned 
      // const fileDefault = apparencyRoot + 'byLat/dummy.csv'
      // d3.csv(fileDefault + '?prevent-cache=')
      //   .then(function(data) {
      //     apparencyByLat(phen3, data)
      //   })
    }); // Phenology

    var file = "".concat(captionRoot).concat(identifier.replace(/\./g, "_"), ".csv");
    d3__namespace.csv(file + "?prevent-cache=".concat(pcache)).then(function (data) {
      phenology(phen2$1, data, 'bsbi-phenology-source');
    })["catch"](function () {
      console.warn("Phenology chart failed for ".concat(file, ". Error message:"), e);
      phen2$1.setChartOpts({
        data: []
      }); // TEMPORARY CODE FOR TESTING so that a file always returned 
      // const fileDefault = phenologyRoot + 'dummy-phenology.csv'
      // d3.csv(fileDefault + '?prevent-cache=')
      //   .then(function(data) {
      //     phenology(phen2, data, 'bsbi-phenology-source')
      //   })
    }); // Alt/Lat
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
    d3__namespace.csv(altlatdata).then(function (data) {
      return altLat(altlat$1, data);
    })["catch"](function (e) {
      console.warn("altlat chart failed for ".concat(altlatdata, ". Error message:"), e);
      altlat$1.setChartOpts({
        data: []
      });
    });
  } // For Oli's stuff October - reformatted 

  function apparency(chart, data) {
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

    return chart.setChartOpts({
      data: sorted
    });
  }
  function phenology(chart, data, textId) {
    // Chart
    var m2d = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335, 365];
    var fs = data[0].phenFlowerStart;
    var fe = data[0].phenFlowerEnd;
    var ls = data[0].phenLeafStart;
    var le = data[0].phenLeafEnd;
    var flowerStart = m2d[Number(fs) - 1];
    var flowerEnd = m2d[Number(fe)];
    var leafStart = m2d[Number(ls) - 1];
    var leafEnd = m2d[Number(le)]; //console.log("months", fs, fe, ls, le)
    //console.log("days", flowerStart, flowerEnd, leafStart, leafEnd)

    var svgLeaf = "m12941 19084-175-112-108 54c-59 30-112 54-117 54s-97-112-203-250l-193-250h-150-151l-177-188c-97-104-186-197-197-207-19-17-23-16-139 49-66 36-124 66-128 65-6 0-219-276-359-464-10-14-30-7-149 53l-138 70-26-32c-15-17-103-124-195-238-92-115-171-208-175-208s-61 25-127 55l-119 55-90-92c-50-51-149-155-220-230l-130-138-112 100c-61 55-115 100-120 100-4 0-123-122-263-269-140-148-260-270-266-270-5-1-65 39-131 88l-122 90-233-207c-129-114-264-233-300-265l-66-58-138 80-139 80-139-147c-77-81-181-189-231-240l-91-94-161 80-160 81-169-201c-93-110-176-209-184-219-15-19-19-18-174 26-87 25-162 42-167 39s-79-90-164-194c-140-171-158-188-178-181-12 5-73 30-134 56-62 26-116 45-121 43-5-1-105-104-222-226-192-202-216-223-239-218-14 3-82 23-151 44l-126 38-249-262c-138-145-252-263-255-263s-45 55-95 124c-49 68-92 121-96 117s-98-138-209-299l-201-292-138 69-139 69-223-336c-123-184-227-339-230-344s-83-20-177-33c-95-12-174-25-176-27s-52-107-111-234c-59-126-111-233-114-237-4-4-62 8-130 27-69 19-125 34-127 32-1-1-57-139-125-307-67-168-124-307-125-309-2-2-69-14-150-27-80-12-147-24-149-26-3-2-30-125-60-273-31-149-58-272-60-274-3-2-68 2-146 8-77 7-144 10-147 6-3-3-16-132-28-286s-23-281-25-283-79-18-171-36l-168-34-2-380-3-381-193-79c-139-57-192-84-192-95 0-9 29-149 65-310s65-295 63-296c-2-2-86-43-188-91s-188-90-192-93 45-170 108-371l114-365-67-65c-38-36-110-104-162-152l-93-86 136-329c75-181 136-332 136-337 0-4-58-90-128-190-71-99-132-187-136-194-6-10 62-142 290-561 15-26 21-48 16-55-5-6-66-82-135-170-70-87-127-162-127-166 0-5 108-183 239-396l240-387-90-99c-49-54-89-102-89-107s111-164 246-353c136-188 253-353 261-365 13-20 10-32-43-149-55-124-56-128-38-143 11-9 182-159 381-334l361-317-5-43c-3-23-13-105-24-182-10-77-16-141-15-143 4-3 510-150 857-248 15-4 13-20-18-141-18-74-32-137-31-139 2-1 138-21 303-42 279-37 309-43 431-86 238-83 552-155 824-188 141-17 699-17 840 0 648 79 1266 287 1860 624 111 64 378 237 494 320 46 34 67 44 62 32-4-11-35-107-68-214-397-1294-750-2359-915-2764-72-178-107-247-165-332-72-104-110-172-148-269-56-142-97-325-73-325 29 0 420 94 429 104 6 6 46 128 89 271 42 143 142 478 222 745 79 267 202 679 273 915 71 237 185 621 255 855s151 506 181 604c30 99 54 185 54 193 0 27 18 12 35-30 31-80 204-397 305-558 282-454 581-807 1323-1564l245-250 114 113c62 61 116 112 120 112s118-122 253-270c136-149 250-270 254-270 3 0 40 68 81 151s78 152 82 155c3 2 122-66 263-152 180-110 259-153 264-145 5 7 18 57 30 112l22 99h515c283 0 514 1 514 3s-20 52-44 112l-44 110 479 3c310 1 479 6 479 12s-14 58-31 116-30 106-28 108c2 1 179 26 392 56 214 30 392 57 398 60 5 4-4 44-21 95-16 49-30 94-30 100 0 7 112 32 288 64 158 29 296 55 307 58 20 4 20 7 9 141-7 75-12 138-11 138 5 5 558 214 564 214 5 0 14 4 21 9 13 8 10 15-74 227-3 5 144 82 326 169 181 88 330 164 330 170s-30 84-66 174c-53 134-63 166-52 176 7 7 105 85 218 175s210 168 217 174c9 8-1 46-42 164-30 84-55 157-55 162s101 91 225 190 225 183 225 186-56 66-124 140l-125 135 194 217c107 119 195 219 194 222 0 3-45 41-100 85-54 44-111 90-125 101l-26 21 145 289c80 159 147 294 148 299 1 6-25 25-57 44-33 18-78 44-101 57l-41 24 124 226c69 124 124 229 122 234-2 4-42 42-90 84l-87 76 28 63c15 34 72 158 126 276l98 214-39 36c-21 20-68 61-103 93l-64 56 136 261c76 144 137 263 137 265 0 3-57 23-127 46-71 24-132 46-136 50-4 3 33 128 82 276s88 270 86 272-45-6-95-18c-51-11-95-19-98-16-5 6-4 13 77 405 28 135 49 246 47 248-1 2-36-11-76-27-39-17-74-30-76-27-2 2 1 111 6 243 5 131 10 284 10 339v100l-87-10c-49-6-89-8-90-5s29 140 66 305 67 301 66 303c-2 2-53-22-114-52-91-46-111-53-111-39 0 10 9 144 20 298s20 297 20 317v37l-72-20c-40-11-81-22-90-25-17-5-18 16-18 350 0 278-3 356-12 356-7 0-53-9-102-20s-91-19-92-17c-1 1-17 106-35 232-18 127-35 233-38 237-3 3-39-7-79-24s-74-29-76-27c-3 2-15 155-27 339s-23 336-25 338c-1 2-45-15-98-39-53-23-99-39-102-36s-17 167-30 364c-12 197-23 359-24 361 0 1-43-32-96-73s-99-75-103-75-26 141-50 313c-23 171-44 319-47 328-4 14-14 14-102-6-53-12-100-20-103-16-4 3-31 143-60 309-30 167-57 309-61 315-4 7-30 0-77-21-39-18-73-32-76-32s-5 149-5 330c0 182-3 330-6 330s-49-29-101-65c-53-36-97-64-98-63-2 2-8 154-15 338-6 184-13 337-15 338-2 2-40-24-85-57-44-34-84-61-89-61-4 0-7 10-5 23 2 12 11 139 19 282s18 291 21 329l6 69-126-5c-114-5-126-4-122 11 8 27 126 657 126 673 0 10-37 25-115 48-104 30-114 35-110 54 3 12 16 71 30 131 102 438 125 539 125 551 0 10-24 14-99 16l-98 3 112 248 113 248-27 10c-14 6-61 22-104 35l-77 25 52 97c28 53 75 142 105 196 29 55 52 100 51 101-2 1-42 17-90 35-49 18-88 38-88 45s11 86 25 175c14 90 24 166 23 170-2 4-81-43-177-106z";
    var svgFlower = "M1048.256,633.499c212.849-356.854,285.555-335.845-191.845-590.438C384.889,283.217,484.493,353.496,664.566,633.499 c-310.065-285.921-239.639-396.021-620.823,0c64.157,504.336,28.591,448.084,502.257,364.911 c-416.078,181.718-421.368,113.233-191.845,590.438c503.843,103.322,428.181,97.12,502.257-364.911 c69.825,407.236,10.978,486.041,502.257,364.911c233.666-457.592,211.268-427.46-191.845-590.438 c452.881,101.063,461.097,199.985,502.257-364.911C1305.872,228.612,1381.606,318.787,1048.256,633.499z M856.411,1100.523 c-114.579,0-207.463-92.884-207.463-207.463s92.884-207.463,207.463-207.463c114.578,0,207.463,92.884,207.463,207.463 S970.989,1100.523,856.411,1100.523z"; // Source

    if (textId) {
      var source = "Data for flower phenology from ".concat(data[0].phenFlowerRef, ".</br>Data for leafing phenology from ").concat(data[0].phenLeafRef, ".");
      $$6("#".concat(textId)).html(source);
    }

    var metrics = [];

    if (ls && le) {
      metrics.push({
        prop: 'band2',
        label: 'In leaf',
        colour: '#009900',
        opacity: 0.5,
        svg: svgLeaf
      });
    }

    if (fs && fe) {
      metrics.push({
        prop: 'band1',
        label: 'Flowering',
        colour: '#ff9900',
        opacity: 0.5,
        svg: svgFlower
      });
    }

    return chart.setChartOpts({
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
      metrics: metrics
    });
  }
  function apparencyByLat(chart, data) {
    // Map text to numeric values and add taxon
    var dataType = $$6('#atlas-lat-phen-data-type').val(); //console.log('dataType', dataType)

    var numeric = data.filter(function (d) {
      return d.type === dataType;
    }).map(function (d) {
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

    return chart.setChartOpts({
      data: sorted,
      metrics: metrics,
      spread: true
    });
  }
  function altLat(chart, data) {
    var mdata = data.map(function (r) {
      return {
        distance: Number(r.distance),
        altitude: Number(r.altitude),
        metric: Number(r.percent),
        taxon: 'dummy'
      };
    });
    return chart.setChartOpts({
      data: mdata
    });
  }

  var $$5 = jQuery; // eslint-disable-line no-undef

  var ds$3 = drupalSettings; // eslint-disable-line no-undef

  function createGallery(id, ddbid) {
    // DO I NEED TO HAVE SEPARATE FUNCTIONS FOR CREATE AND UPDATED GALLERY
    // FOR CONSISTENCY ON MAIN.JS?
    document.getElementById(id).innerHTML = '';

    if (ddbid) {
      // Images are listed in the caption file, so fetch it
      var captionRoot = ds$3.bsbi_atlas.dataRoot + 'bsbi/captions/';
      var captionFile = "".concat(captionRoot).concat(ddbid.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
      d3.csv(captionFile).then(function (d) {
        // Filter out empty image strings
        var dynamicEl = d[0].images.split(';').filter(function (i) {
          return i;
        }).map(function (img) {
          console.log(img.replace('{PIXELSIZE}', '192'));
          return {
            src: img.replace('{PIXELSIZE}', '1920'),
            thumb: img.replace('{PIXELSIZE}', '192'),
            subHtml: "\n              <div class=\"lightGallery-captions\">\n                <div style=\"background-color: black; opacity: 0.7\">\n                <p style=\"margin: 0.3em\">TODO - Copyright text to acknowledge Rob Still and Chris Gibson</p>\n                <div>\n              </div>"
          };
        }); //console.log(dynamicEl)

        var lgContainer = document.getElementById(id);

        if (dynamicEl.length) {
          // After https://www.lightgalleryjs.com/demos/inline/ & https://codepen.io/sachinchoolur/pen/zYZqaGm
          var inlineGallery = lightGallery(lgContainer, {
            // eslint-disable-line no-undef
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
            plugins: [lgZoom, lgThumbnail],
            // eslint-disable-line no-undef
            dynamicEl: dynamicEl,
            thumbWidth: 90,
            thumbHeight: "60px",
            thumbMargin: 4
          }); // Since we are using dynamic mode, we need to programmatically open lightGallery

          setTimeout(function () {
            inlineGallery.openGallery();
            $$5('#bsbi-gallery-copyright').show();
          }, 200);
        } else {
          lgContainer.innerHTML = "<i>No images are available for this taxon.</i>";
          $$5('#bsbi-gallery-copyright').hide();
        }
      });
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
      return "<i>".concat(currentTaxon.shortName.replace(/\s/g, '</i> <i>'), "</i> in <i>BSBI</i> <i>Online</i> <i>Atlas</i> <i>2020</i>, eds P.A. Stroh, T. A. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ").concat(location.origin, "/atlas/").concat(currentTaxon.identifier, " [Accessed ").concat(new Date().toLocaleDateString('en-GB'), "]");
    } else {
      return "<i>".concat(currentTaxon.shortName, "</i> in <i>BSBI Online Plant Atlas 2020</i>, eds P.A. Stroh, T. A. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ").concat(location.origin, "/atlas/").concat(currentTaxon.identifier, " [Accessed ").concat(new Date().toLocaleDateString('en-GB'), "]");
    }
  }

  var $$4 = jQuery; // eslint-disable-line no-undef

  var ds$2 = drupalSettings; // eslint-disable-line no-undef

  var currentTaxon$1;
  var gridStyle = getCookie('gridstyle') ? getCookie('gridstyle') : 'solid';
  var backdrop = getCookie('backdrop') ? getCookie('backdrop') : 'colour_elevation';
  var slippyMap, staticMap;
  var mapType = 'allclass';
  var insetType = getCookie('inset') ? getCookie('inset') : 'BI4';
  var boundaryType = getCookie('boundaries') ? getCookie('boundaries') : 'none';
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
    var $div = $$4('<div>').appendTo($$4(selector));
    $div.addClass('atlas-map-control-row');

    if (classname) {
      $div.addClass(classname);
    }

    return $div;
  }

  function setControlState() {
    // map display
    if (displayedMapType === "static") {
      $$4('#slippyAtlasMain').hide();
      $$4('#staticAtlasMain').show();
    } else {
      $$4('#staticAtlasMain').hide();
      $$4('#slippyAtlasMain').show();
    } // save map image button


    if (displayedMapType === 'static') {
      $$4('.atlas-save-map-image').show();
    } else {
      $$4('.atlas-save-map-image').hide();
    } // download map data button


    $$4('.atlas-download-map-data').show();

    if (mapType === 'allclass' && resolution === 'hectad') {
      $$4('.atlas-download-map-data input, .atlas-download-map-data button').attr('disabled', false);
    } else {
      $$4('.atlas-download-map-data input, .atlas-download-map-data button').attr('disabled', true);
    } // backdrop selector


    if (displayedMapType === "static") {
      $$4('.atlas-backdrop-selector').show();
    } else {
      $$4('.atlas-backdrop-selector').hide();
    } // inset control


    if (displayedMapType === "static") {
      $$4('.atlas-inset-control').show();
    } else {
      $$4('.atlas-inset-control').hide();
    } // grid type control


    if (displayedMapType === "static") {
      $$4('.atlas-grid-type-control').show();
    } else {
      $$4('.atlas-grid-type-control').hide();
    } // boundary type control
    // if (displayedMapType === "static") {
    //   $('.atlas-boundaries-control').show()
    // } else {
    //   $('.atlas-boundaries-control').hide()
    // }
    // period slider visibility


    if (mapType === 'status') {
      $$4('.atlas-period-slider-control').show();
    } else {
      $$4('.atlas-period-slider-control').hide();
    } // trend slider control


    if (mapType === 'trends') {
      $$4('.atlas-trend-slider-control').show();
    } else {
      $$4('.atlas-trend-slider-control').hide();
    } // show status checkbox


    if (mapType === 'allclass' || mapType === 'slippy') {
      $$4('.atlas-status-checkbox-control').show();
    } else {
      $$4('.atlas-status-checkbox-control').hide();
    } // show opacity slider


    if (displayedMapType === 'slippy') {
      $$4('.atlas-opacity-slider-control').show();
    } else {
      $$4('.atlas-opacity-slider-control').hide();
    } // status checkbox enabled and checked value


    var disableStatus = bsbiDataAccess.taxaNoStatusList.indexOf(currentTaxon$1.identifier) > -1 || currentTaxon$1.isHybrid;
    var isHybrid = currentTaxon$1.hybridMapping;

    if (disableStatus || isHybrid) {
      showStatus = false;
      bsbiDataAccess.showStatus = false;
      $$4('.atlas-status-checkbox-control span').text('No status info for this taxon');
      $$4('.atlas-status-checkbox-control span').css('color', 'silver');
    } else {
      $$4('.atlas-status-checkbox-control span').text('Show status');
      $$4('.atlas-status-checkbox-control span').css('color', 'black');
    }

    if (disableStatus || isHybrid || displayedMapType === 'slippy' && mapType === 'allclass' && resolution !== 'hectad') {
      // Uncheck and disable status checkbutton if not hectad resolution or no status info
      $$4('.atlas-status-checkbox').prop('checked', false);
      $$4('.atlas-status-checkbox').attr('disabled', true);
    } else {
      // Display and set checked status to current value of showStatus global
      $$4('.atlas-status-checkbox').attr('disabled', false);
      $$4('.atlas-status-checkbox').prop('checked', showStatus);
    } // atlas resolution control visibility


    if (displayedMapType === "slippy" && mapType === 'allclass') {
      $$4('.atlas-resolution-control').show();
    } else {
      $$4('.atlas-resolution-control').hide();
    } // atlas resolution control value and global variables


    if (displayedMapType === "slippy" && mapType === 'allclass') {
      // Reset resolution if currently set to a value that is not
      // appropriate for the taxon
      // if (resolution === 'tetrad' && !currentTaxon.tetrad) {
      //   resolution = 'hectad'
      // }
      bsbiDataAccess.resolution = resolution; // Ensure right option is selected

      $$4('.bsbi-resolution-' + resolution).prop('checked', true); // Enable/disable tetrad option as appropriate
      // if (currentTaxon.tetrad) {
      //   $('.bsbi-resolution-tetrad').attr('disabled', false)
      // } else {
      //   $('.bsbi-resolution-tetrad').attr('disabled', true)
      // }
    } else {
      bsbiDataAccess.resolution = 'hectad';
    } // Enable/disable the hybrid map type option as appropriate


    var $hybridopts = $$4('.atlas-map-type-selector option[value="hybrid"]');

    if (isHybrid) {
      $hybridopts.show();
    } else {
      $hybridopts.hide(); // Select another option if currently selected

      if (mapType === 'hybrid') {
        $hybridopts.prop('selected', false);
        $$4('.atlas-map-type-selector option[value="allclass"]').prop('selected', true);
        mapType = 'allclass';
      }
    }

    $$4('.atlas-map-type-selector').selectpicker('refresh');
  }

  function gridStyleSelector($parent) {
    var gridStyles = [{
      caption: 'Solid grid lines',
      val: 'solid'
    }, {
      caption: 'Dashed grid lines',
      val: 'dashed'
    }, {
      caption: 'No grid lines',
      val: 'none'
    }]; // Main type selector

    var $sel = $$4('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-grid-type-control');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      gridStyle = $$4(this).val();
      setCookie('gridstyle', gridStyle, 30);
      staticMap.setGridLineStyle(gridStyle);
    });
    gridStyles.forEach(function (s) {
      var $opt = s.selected ? $$4('<option>') : $$4('<option>');
      $opt.attr('value', s.val);
      $opt.html(s.caption).appendTo($sel);
    });
    $sel.val(gridStyle); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  } // function gridStyleRadios($parent, i) {
  //   // Overall control container
  //   const $container = $('<div>').appendTo($parent)
  //   function makeRadio(label, val, checked) {
  //     //$('<div class="radio"><label><input type="radio" name="atlas-grid-type" value="'+ val + '" ' + checked + '>' + label + '</label></div>').appendTo($container)
  //     const $div = $('<div>').appendTo($container)
  //     $div.attr('class', 'radio')
  //     const $label = $('<label>').appendTo($div)
  //     $label.css('padding-left', '0')
  //     const $radio = $('<input>').appendTo($label)
  //     const $span = $('<span>').appendTo($label)
  //     $span.text(label)
  //     $span.css('padding-left', '20px')
  //     $radio.attr('type', 'radio')
  //     $radio.attr('name', 'atlas-grid-type-' + i)
  //     $radio.attr('class', 'atlas-grid-type-' + val)
  //     $radio.attr('value', val)
  //     $radio.css('margin-left', 0)
  //     if (checked) $radio.prop('checked', true)
  //     $radio.change(function () {
  //       gridStyle = $(this).val()
  //       setCookie('gridstyle', gridStyle, 30)
  //       staticMap.setGridLineStyle(gridStyle)
  //       // Update controls mirrored in other blocks
  //       $('.atlas-grid-type-' + val).prop("checked", true)
  //     })
  //   }
  //   makeRadio('Solid grid lines', 'solid', gridStyle === 'solid' ? 'checked' : '')
  //   makeRadio('Dashed grid lines', 'dashed', gridStyle === 'dashed' ? 'checked' : '')
  //   makeRadio('No grid lines', 'none', gridStyle === 'none' ? 'checked' : '')
  // }


  function boundarySelector($parent) {
    var boundaries = [{
      caption: 'Country boundaries',
      val: 'country'
    }, {
      caption: 'Vice county boundaries',
      val: 'vc'
    }, {
      caption: 'No boundaries',
      val: 'none'
    }]; // Main type selector

    var $sel = $$4('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-boundaries-control');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      boundaryType = $$4(this).val();
      setCookie('boundaries', boundaryType, 30);

      if (boundaryType === 'none') {
        staticMap.setVcLineStyle('none');
        staticMap.setCountryLineStyle('none');
        staticMap.setBoundaryColour('#7C7CD3');
        slippyMap.setShowVcs(false);
        slippyMap.setShowCountries(false);
      } else if (boundaryType === 'vc') {
        staticMap.setVcLineStyle('');
        staticMap.setCountryLineStyle('none');
        staticMap.setBoundaryColour('white');
        slippyMap.setShowVcs(true);
        slippyMap.setShowCountries(false);
      } else if (boundaryType === 'country') {
        staticMap.setVcLineStyle('none');
        staticMap.setCountryLineStyle('');
        staticMap.setBoundaryColour('white');
        slippyMap.setShowVcs(false);
        slippyMap.setShowCountries(true);
      }
    });
    boundaries.forEach(function (b) {
      var $opt = b.selected ? $$4('<option>') : $$4('<option>');
      $opt.attr('value', b.val);
      $opt.html(b.caption).appendTo($sel);
    });
    $sel.val(boundaryType); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function mapInterfaceToggle($parent) {
    var $container = $$4('<div style="display: flex">').appendTo($parent); // Buttons

    var $bgrp = $$4('<div class="btn-group" data-toggle="buttons">').appendTo($container);
    var $staticLabel = $$4('<label class="btn btn-primary active">').appendTo($bgrp);
    $$4('<input type="radio" name="mapType" value="static" checked>').appendTo($staticLabel);
    $staticLabel.append("Overview");
    var $slippyLabel = $$4('<label class="btn btn-primary">').appendTo($bgrp);
    $$4('<input type="radio" name="mapType" value="slippy">').appendTo($slippyLabel);
    $slippyLabel.append("Zoomable"); // Busy indicator

    var $loader = $$4('<div id="atlas-loader" style="display: none">').appendTo($container);
    $$4('<div class="atlas-loader">').appendTo($loader);
    $$4('input[type=radio][name="mapType"]').change(function () {
      displayedMapType = $$4(this).val();
      bsbiDataAccess.displayedMapType = displayedMapType;

      if (displayedMapType === "slippy") {
        // Get current width of static map
        var $svg = $$4('#staticAtlasMain svg');
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
    var $sel = $$4('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-map-type-selector');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      mapType = $$4(this).val();
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
      var $opt = $$4('<option>');
      $opt.attr('value', t.val);
      $opt.html(t.caption).appendTo($sel);
    }); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function backdropSelector($parent) {
    var rasterRoot = ds$2.bsbi_atlas.dataRoot + 'rasters/'; // Backdrops

    var backdrops = [{
      caption: 'No backdrop',
      val: 'none'
    }, {
      caption: 'Colour elevation',
      val: 'colour_elevation'
    }, {
      caption: 'Grey elevation',
      val: 'grey_elevation_300'
    }]; // Main type selector

    var $sel = $$4('<select>').appendTo($parent);
    $sel.addClass('selectpicker'); //$sel.addClass('atlas-backdrop-selector')

    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      // Remove all backdrops
      backdrops.forEach(function (b) {
        if (b.val !== 'none') {
          staticMap.basemapImage(b.val, false, rasterRoot + b.val + '.png', rasterRoot + b.val + '.pgw');
        }
      }); // Display selected backdrop

      backdrop = $$4(this).val();
      setCookie('backdrop', backdrop, 30);

      if (backdrop !== 'none') {
        staticMap.basemapImage(backdrop, true, rasterRoot + backdrop + '.png', rasterRoot + backdrop + '.pgw');
      }
    });
    backdrops.forEach(function (b) {
      var $opt = $$4('<option>');
      $opt.attr('value', b.val);
      $opt.html(b.caption).appendTo($sel);
    });
    $sel.val(backdrop);

    if (backdrop !== 'none') {
      staticMap.basemapImage(backdrop, true, rasterRoot + "".concat(backdrop, ".png"), rasterRoot + "".concat(backdrop, ".pgw"));
    } // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.


    $sel.selectpicker();
  }

  function mapImageButton($parent, i) {
    var imageType = 'png'; // Overall control container

    var $container = $$4('<div>').appendTo($parent);
    $container.addClass('atlas-save-map-image');
    $container.hide();
    var $svg = $$4('<svg>').appendTo($container);
    var $t = $$4('<text>').appendTo($svg);
    $t.attr('x', '10');
    $t.attr('y', '20');
    $$4('<br>').appendTo($container);
    var $button = $$4('<button>').appendTo($container);
    $button.addClass('btn btn-default');
    $button.text('Download image');
    $button.on('click', function () {
      var info = {
        text: getCitation(currentTaxon$1, true),
        margin: 10,
        fontSize: 10 //img: `${ds.bsbi_atlas.dataRoot}combined-logos.png`

      };
      staticMap.saveMap(imageType === 'svg', info, 'atlas-image');
    });
    makeRadio('PNG', 'png', true);
    makeRadio('SVG', 'svg', false);

    function makeRadio(label, val, checked) {
      var $div = $$4('<div>').appendTo($container);
      $div.css('display', 'inline-block');
      $div.css('margin-left', '0.5em');
      $div.attr('class', 'radio');
      var $label = $$4('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$4('<input>').appendTo($label);
      var $span = $$4('<span>').appendTo($label);
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
        $$4('.img-download-type-' + val).prop("checked", true);
        imageType = val;
      });
    }
  }

  function mapDownloadButton($parent, i) {
    var downloadType = 'csv'; // Overall control container

    var $container = $$4('<div>').appendTo($parent);
    $container.addClass('atlas-download-map-data');
    $container.hide();
    var $button = $$4('<button>').appendTo($container);
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
    makeRadio('GJson', 'geojson', false);

    function makeRadio(label, val, checked) {
      var $div = $$4('<div>').appendTo($container);
      $div.css('display', 'inline-block');
      $div.css('margin-left', '0.5em');
      $div.attr('class', 'radio');
      var $label = $$4('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$4('<input>').appendTo($label);
      var $span = $$4('<span>').appendTo($label);
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
        $$4('.download-type-' + val).prop("checked", true);
        downloadType = val;
      });
    }
  }

  function opacitySlider($parent) {
    var initOpacity = 70;
    $$4('#atlas-leaflet-svg').css('opacity', initOpacity / 100); // Overall control container

    var $container = $$4('<div>').appendTo($parent);
    $container.addClass('atlas-opacity-slider-control');
    $container.hide(); // Label

    var $sliderLabel = $$4('<div>').appendTo($container);
    $sliderLabel.addClass('atlas-opacity-slider-label');
    $sliderLabel.text('Opacity:'); // Slider

    var $sliderContainer = $$4('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    $sliderContainer.addClass('atlas-opacity-slider-slider');
    var $slider = $$4('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', '100').attr('value', initOpacity).attr('id', 'atlas-opacity-slider');
    $slider.change(function () {
      $$4('#atlas-leaflet-svg').css('opacity', $$4(this).val() / 100);
    });
  }

  function statusCheckbox($parent) {
    // Overall control container
    var $container = $$4('<div>').appendTo($parent);
    $container.addClass('atlas-status-checkbox-control'); // Status on/off toggle

    var $checDiv = $$4('<div class="checkbox">').appendTo($container); //$checDiv.css('margin-top', '4.3em')

    $$4('<label><input type="checkbox" class="atlas-status-checkbox"/><span>Show status</span></label>').appendTo($checDiv);
    $$4('.atlas-status-checkbox').change(function () {
      showStatus = $$4(this).is(':checked');
      bsbiDataAccess.showStatus = showStatus;
      changeMap();
    });
  }

  function statusControl($parent) {
    // Overall control container
    var $container = $$4('<div>').appendTo($parent);
    $container.addClass('atlas-period-slider-control');
    $container.hide(); // Period display
    // const $indicator = $('<div>').appendTo($container)
    // $indicator.css('font-size', '1.5em')
    // $indicator.css('margin-bottom', '0.2em')
    // $indicator.text(periods[periods.length - 1].caption)
    // Slider

    var $sliderContainer = $$4('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    var $slider = $$4('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', periods.length).attr('id', 'atlas-range-select');
    $slider.change(function () {
      atlasRangeIndex = $$4(this).val();
      changeMap();
    });
    var $scaleContainer = $$4('<div>').appendTo($sliderContainer);
    $scaleContainer.addClass('atlas-range-tick-container');
    $scaleContainer.css('margin-bottom', '4.3em');
    periods.forEach(function (p, i) {
      var $tick = $$4('<span>').appendTo($scaleContainer);
      $tick.addClass('atlas-range-tick');
      var percent = i / (periods.length - 1) * 100;
      $tick.css('left', percent.toString() + '%');
      $tick.text('|');
      $tick.append('<br>');
      var $tickText = $$4('<span>').appendTo($tick);
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
    var $container = $$4('<div>').appendTo($parent);

    function makeRadio(label, val, checked) {
      var $div = $$4('<div>').appendTo($container);
      $div.attr('class', 'radio');
      var $radio = $$4('<input>').appendTo($div);
      $radio.attr('type', 'radio');
      $radio.attr('name', 'bsbi-resolution-' + i);
      $radio.attr('class', 'bsbi-resolution-' + val);
      $radio.attr('value', val);
      $radio.css('margin-left', 0);
      if (checked) $radio.prop('checked', true);
      var $label = $$4('<label>').appendTo($div);
      $label.attr('for', 'bsbi-resolution-' + val);
      $label.text(label);
      $radio.change(function () {
        resolution = $$4(this).val(); // Update controls mirrored in other blocks

        $$4('.bsbi-resolution-' + resolution).prop("checked", true);
        setControlState();
        changeMap();
      });
    }

    makeRadio('Hectads', 'hectad', true);
    makeRadio('Tetrads', 'tetrad', false); //makeRadio('Monads', 'monad', false)
  }

  function trendControl($parent) {
    // Overall control container
    var $container = $$4('<div>').appendTo($parent);
    $container.addClass('atlas-trend-slider-control');
    $container.hide(); // Trend display
    // const $indicator = $('<div>').appendTo($container)
    // $indicator.css('font-size', '1.5em')
    // $indicator.css('margin-bottom', '0.2em')
    // $indicator.text(trends[trends.length - 1].caption)
    // Slider

    var $sliderContainer = $$4('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    $sliderContainer.addClass('atlas-trend-select-container');
    var $slider = $$4('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', trends.length).addClass('atlas-trend-select');
    $slider.change(function () {
      atlasTrendIndex = $$4(this).val();
      changeMap();
    });
    var $scaleContainer = $$4('<div>').appendTo($sliderContainer);
    $scaleContainer.addClass('atlas-trend-tick-container');
    trends.forEach(function (p, i) {
      var $tick = $$4('<span>').appendTo($scaleContainer);
      $tick.addClass('atlas-trend-tick');
      var percent = i / (trends.length - 1) * 100;
      $tick.css('left', percent.toString() + '%');
      $tick.text('|');
      $tick.append('<br>');
      var $tickText = $$4('<span>').appendTo($tick);
      $tickText.addClass('atlas-trend-tick-text');
      $tickText.addClass('atlas-trend-tick-text-' + i);
      $tickText.html(p.lower + '<br>v.<br>' + p.upper);
    });
    $container.css('margin-bottom', '5.3em');
  }

  function insetSelector($parent) {
    var inserts = [{
      caption: 'No insets',
      val: 'BI1'
    }, {
      caption: 'Channel Isles inset',
      val: 'BI2'
    }, {
      caption: 'Northern and Channel Isles inset',
      val: 'BI4'
    }]; // Main type selector

    var $sel = $$4('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-inset-control'); //$sel.addClass('atlas-backdrop-selector')

    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      insetType = $$4(this).val();
      staticMap.setTransform(insetType);
      setCookie('inset', insetType, 30);
      changeMap();
    });
    inserts.forEach(function (i) {
      var $opt = i.selected ? $$4('<option>') : $$4('<option>');
      $opt.attr('value', i.val);
      $opt.html(i.caption).appendTo($sel);
    });
    $sel.val(insetType); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function mapSetCurrentTaxon(taxon) {
    currentTaxon$1 = taxon;
  }
  function createMaps(selector) {
    // Modify standard UK opts to remove any without CI
    var transOptsSel = JSON.parse(JSON.stringify(brcatlas.namedTransOpts));
    delete transOptsSel.BI3; // Remove the options without CI
    // Modify insets to go further west in order
    // to give more room for legends.

    transOptsSel.BI4.bounds.xmin = -240000, //Northern Isles
    transOptsSel.BI1.bounds.xmin = -230000, //No insets
    transOptsSel.BI2.bounds.xmin = -230000, //CI inset
    // Init
    bsbiDataAccess.bsbiDataRoot = ds$2.bsbi_atlas.dataRoot + 'bsbi/20220606/';
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
      boundaryColour: '#7C7CD3',
      vcColour: '#7C7CD3',
      vcLineStyle: boundaryType === 'vc' ? '' : 'none',
      countryColour: '#7C7CD3',
      countryLineStyle: boundaryType === 'country' ? '' : 'none'
    });
    ds$2.bsbi_atlas.dataRoot + 'rasters/'; //staticMap.basemapImage('colour_elevation', true, rasterRoot + 'colour_elevation.png', rasterRoot + 'colour_elevation.pgw')
    // Callbacks for slippy maps

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
      showVcs: boundaryType === 'vc',
      showCountries: boundaryType === 'country'
    });
    $$4('#slippyAtlasMain').hide();
  }
  function changeMap(retPromise) {
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

    if (currentTaxon$1.identifier) {
      displayedMap.setIdentfier(currentTaxon$1.identifier);

      if (retPromise) {
        return displayedMap.redrawMap();
      } else {
        displayedMap.redrawMap()["catch"](function (e) {
          console.warn("Unable to generate map for ".concat(currentTaxon$1.shortName, " (").concat(currentTaxon$1.identifier, "). Error message:"), e);
          displayedMap.clearMap();
        });
      }
    } // Initialise dot caption


    $$4('#dotCaption').html(bsbiDataAccess.dotCaption);
  }
  function createMapControls(selector) {
    mapInterfaceToggle(mapControlRow(selector));
    mapTypeSelector(mapControlRow(selector));
    statusControl(mapControlRow(selector));
    statusCheckbox(mapControlRow(selector));
    trendControl(mapControlRow(selector));
    backdropSelector(mapControlRow(selector, 'atlas-backdrop-selector'));
    insetSelector(mapControlRow(selector));
    gridStyleSelector(mapControlRow(selector));
    boundarySelector(mapControlRow(selector));
    opacitySlider(mapControlRow(selector));
    $$4(selector).each(function (i) {
      // We loop through the selection so that we can use the
      // index value to differentiate the equivalent controls
      // from different blocks. This is vital for radio controls
      // otherwise value can only be selected in one block and
      // therefore initialisation may be wrong.
      var sel = 'bsbi-atlas-map-controls-' + i;
      var $div = $$4('<div>').appendTo($$4(this));
      $div.addClass(sel);
      sel = '.' + sel; // Potentially we can also use this to ensure that selection
      // in one block is mirrored in the other. This is only important
      // if user might switch between blocks during use - but this
      // is very unlikely. (But nevertheless has been implemented
      // for the radio buttons below.)
      //insetRadios(mapControlRow(sel,'atlas-inset-control'), i)
      //gridStyleRadios(mapControlRow(sel, 'atlas-grid-type-control'), i)

      resolutionControl(mapControlRow(sel, 'atlas-resolution-control'), i);
      mapImageButton(mapControlRow(sel, 'atlas-image-button'), i);
      mapDownloadButton(mapControlRow(sel, 'atlas-download-button'), i);
    });
  }
  function updateBsbiDataAccess(key, value) {
    bsbiDataAccess[key] = value;
  }
  function getStaticMap() {
    return staticMap;
  } // export function setMapType(type) {
  //   mapType = type
  // }

  var $$3 = jQuery; // eslint-disable-line no-undef
  function develMainMapStyles(selector, changeMap) {
    if ($$3(selector).length === 0) return;
    var labels = {
      '2000_19': '2000 - 2019',
      '1987_99': '1987 - 1999',
      '1970_86': '1970 - 1986',
      '1930_69': '1930 - 1969',
      'pre_1930': 'to 1929'
    };
    var pickers = {
      x: {
        '2000_19': null,
        '1987_99': null,
        '1970_86': null,
        '1930_69': null,
        'pre_1930': null
      },
      n: {
        '2000_19': null,
        '1987_99': null,
        '1970_86': null,
        '1930_69': null,
        'pre_1930': null
      },
      a: {
        '2000_19': null,
        '1987_99': null,
        '1970_86': null,
        '1930_69': null,
        'pre_1930': null
      }
    };
    var checkboxes = {
      x: {
        '2000_19': null,
        '1987_99': null,
        '1970_86': null,
        '1930_69': null,
        'pre_1930': null
      },
      n: {
        '2000_19': null,
        '1987_99': null,
        '1970_86': null,
        '1930_69': null,
        'pre_1930': null
      },
      a: {
        '2000_19': null,
        '1987_99': null,
        '1970_86': null,
        '1930_69': null,
        'pre_1930': null
      }
    };
    var colorbrewer = {
      'sequential single hue Greys': ['#f7f7f7', '#cccccc', '#969696', '#636363', '#252525'],
      'sequential single hue Greens': ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'],
      'sequential single hue Blues': ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'],
      'sequential single hue Oranges': ['#feedde', '#fdbe85', '#fd8d3c', '#e6550d', '#a63603'],
      'sequential single hue Purples': ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f'],
      'sequential single hue Reds': ['#fee5d9', '#fcae91', '#fb6a4a', '#de2d26', '#a50f15'],
      'sequential multi-hue BuGn': ['#edf8fb', '#b2e2e2', '#66c2a4', '#2ca25f', '#006d2c'],
      'sequential multi-hue BuPu': ['#edf8fb', '#b3cde3', '#8c96c6', '#8856a7', '#810f7c'],
      'sequential multi-hue GnBu': ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
      'sequential multi-hue OrRd': ['#fef0d9', '#fdcc8a', '#fc8d59', '#e34a33', '#b30000'],
      'sequential multi-hue PuBu': ['#f1eef6', '#bdc9e1', '#74a9cf', '#2b8cbe', '#045a8d'],
      'sequential multi-hue PuBuGn': ['#f6eff7', '#bdc9e1', '#67a9cf', '#1c9099', '#016c59'],
      'sequential multi-hue PuRd': ['#f1eef6', '#d7b5d8', '#df65b0', '#dd1c77', '#980043'],
      'sequential multi-hue RdPu': ['#feebe2', '#fbb4b9', '#f768a1', '#c51b8a', '#7a0177'],
      'sequential multi-hue YlGn': ['#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
      'sequential multi-hue YlGnBu': ['#ffffcc', '#a1dab4', '#41b6c4', '#2c7fb8', '#253494'],
      'sequential multi-hue YlOrBr': ['#ffffd4', '#fed98e', '#fe9929', '#d95f0e', '#993404'],
      'sequential multi-hue YlOrRd': ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'],
      'diverging BrBG': ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'],
      'diverging PiYG': ['#d01c8b', '#f1b6da', '#f7f7f7', '#b8e186', '#4dac26'],
      'diverging PRGn': ['#7b3294', '#c2a5cf', '#f7f7f7', '#a6dba0', '#008837'],
      'diverging PuOr': ['#e66101', '#fdb863', '#f7f7f7', '#b2abd2', '#5e3c99'],
      'diverging RdBu': ['#ca0020', '#f4a582', '#f7f7f7', '#92c5de', '#0571b0'],
      'diverging RdGy': ['#ca0020', '#f4a582', '#ffffff', '#bababa', '#404040'],
      'diverging RdYlBu': ['#d7191c', '#fdae61', '#ffffbf', '#abd9e9', '#2c7bb6'],
      'diverging RdYlGn': ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'],
      'diverging Spectral': ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba']
    };
    var colStroke; // Colours

    var $colours = $$3('<div style="margin-top: 1em">').appendTo($$3(selector));
    var $div0 = $$3('<div style="display: flex">').appendTo($colours);
    var $div1 = $$3('<div style="flex: 1">').appendTo($div0);
    var $div2 = $$3('<div style="flex: 1">').appendTo($div0);
    var $div3 = $$3('<div style="flex: 1">').appendTo($div0);
    $$3('<h4>').appendTo($div1).text('Without status');
    makeColourPicker('x', '2000_19', $div1);
    makeColourPicker('x', '1987_99', $div1);
    makeColourPicker('x', '1970_86', $div1);
    makeColourPicker('x', '1930_69', $div1);
    makeColourPicker('x', 'pre_1930', $div1);
    $$3('<h4>').appendTo($div2).text('Native status');
    makeColourPicker('n', '2000_19', $div2);
    makeColourPicker('n', '1987_99', $div2);
    makeColourPicker('n', '1970_86', $div2);
    makeColourPicker('n', '1930_69', $div2);
    makeColourPicker('n', 'pre_1930', $div2);
    $$3('<h4>').appendTo($div3).text('Alien status');
    makeColourPicker('a', '2000_19', $div3);
    makeColourPicker('a', '1987_99', $div3);
    makeColourPicker('a', '1970_86', $div3);
    makeColourPicker('a', '1930_69', $div3);
    makeColourPicker('a', 'pre_1930', $div3);
    $$3('<h4>').appendTo($colours).text('Borders');
    makeStrokeColourPicker($colours);
    $$3('<h4>').appendTo($colours).text('Init colours from Colourbrewer');
    var $sel = $$3('<select>').appendTo($colours);
    Object.keys(colorbrewer).forEach(function (cs) {
      $$3('<option>').text(cs).appendTo($sel);
    });
    var $cb = $$3("<input type=\"checkbox\" id=\"reverse-colours\" style=\"margin:0.5em\">").appendTo($colours);
    $$3("<label for=\"reverse-colours\">reverse</label>").appendTo($colours);
    var $butNoStatus = $$3('<button style="margin-left: 0.5em">').text('Without status').appendTo($colours);
    var $butNative = $$3('<button style="margin-left: 0.5em">').text('Native').appendTo($colours);
    var $butAlien = $$3('<button style="margin-left: 0.5em">').text('Alien').appendTo($colours);
    $butNoStatus.click(function () {
      initColours('x', $sel.find(":selected").text(), $cb.is(':checked'));
    });
    $butNative.click(function () {
      initColours('n', $sel.find(":selected").text(), $cb.is(':checked'));
    });
    $butAlien.click(function () {
      initColours('a', $sel.find(":selected").text(), $cb.is(':checked'));
    });

    function makeColourPicker(status, period, $container) {
      var $div = $$3('<div>').appendTo($container);
      $$3("<input type=\"text\" style=\"width: 120px\" id=\"colour".concat(period, "_").concat(status, "\">")).appendTo($div);
      var $cb = $$3("<input type=\"checkbox\" id=\"stroke".concat(period, "_").concat(status, "\" style=\"margin-left: 1em\">")).appendTo($div);
      $$3("<label for=\"colour".concat(period, "_").concat(status, "\" style=\"margin-left: 1em\">").concat(period.replace('_', '-'), "</label>")).appendTo($div);
      var col = new JSColor("#colour".concat(period, "_").concat(status));
      col.option({
        onChange: function onChange() {
          colourChange(col, $cb, status, period);
        }
      });
      $cb.change(function () {
        colourChange(col, $cb, status, period);
      });
      col.fromString(bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][status][labels[period]]);
      $cb.prop('checked', bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][status][labels[period]] !== '');
      pickers[status][labels[period]] = col;
      checkboxes[status][labels[period]] = $cb;
    }

    function makeStrokeColourPicker($container) {
      var $div = $$3('<div>').appendTo($container);
      $$3("<input type=\"text\" style=\"width: 120px\" id=\"colour_stroke\">").appendTo($div);
      $$3("<label for=\"colour_stroke\" style=\"margin-left: 1em\">Border colour</label>").appendTo($div);
      colStroke = new JSColor("#colour_stroke");
      colStroke.fromString('#000000');
      var status = ['x', 'n', 'a'];
      var period = ['2000_19', '1987_99', '1970_86', '1930_69', 'pre_1930'];
      colStroke.option({
        onChange: function onChange() {
          status.forEach(function (s) {
            period.forEach(function (p) {
              var $cb = checkboxes[s][labels[p]];
              bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][s][labels[p]] = $cb.is(':checked') ? colStroke.toHEXString() : null;
            });
          });
          changeMap();
        }
      });
    }

    function colourChange(col, $cb, status, period) {
      //console.log('checkbox', $cb.is(':checked'))
      //console.log('colour', col.toHEXString())
      //console.log('period', period)
      bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][status][labels[period]] = col.toHEXString();
      bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][status][labels[period]] = $cb.is(':checked') ? colStroke.toHEXString() : null; // The 'prior 1970' style always matches '1930 - 1969' style

      if (period === '1930_69') {
        bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][status]['prior 1970'] = col.toHEXString();
        bsbiDataAccess.periodStroke[bsbiDataAccess.periodClasses][status]['prior 1970'] = $cb.is(':checked') ? colStroke.toHEXString() : null;
      }

      changeMap();
    }

    function initColours(status, key, reverse) {
      console.log('init', status, key);
      var colours = colorbrewer[key];
      var periods = ['2000_19', '1987_99', '1970_86', '1930_69', 'pre_1930'].reverse();

      if (reverse) {
        periods.reverse();
      }

      periods[bsbiDataAccess.periodClasses].forEach(function (period, i) {
        bsbiDataAccess.periodColours[bsbiDataAccess.periodClasses][status][labels[period]] = colours[i];
        pickers[status][labels[period]].fromString(colours[i]);
      });
      changeMap();
    }
  }

  var $$2 = jQuery; // eslint-disable-line no-undef

  var ds$1 = drupalSettings; // eslint-disable-line no-undef

  var currentTaxon = {
    identifier: '',
    name: null,
    shortName: null,
    tetrad: null
  };
  var phen1, phen2, altlat;
  var browsedFileData;
  var bCancelled = false;
  var aNoStatus, aIsHybrid;
  function downloadPage() {
    $$2('#bsbi-atlas-download').css('display', 'flex');
    $$2('<div>').appendTo($$2('#bsbi-atlas-download')).attr('id', 'bsbi-atlas-download-left').css('flex', 1);
    $$2('<div>').appendTo($$2('#bsbi-atlas-download')).attr('id', 'bsbi-atlas-download-right').css('flex', 1).css('margin-left', '1em');
    taxonSelectors();
    downloadButton();
    $$2('<hr/>').appendTo($$2('#bsbi-atlas-download-left'));
    var $instructions = $$2('<p>').appendTo($$2('#bsbi-atlas-download-left'));
    $instructions.html("\n    For batch downloads, first select a CSV file from your computer\n    that has two columns: <i>taxonId</i> which has the ddbid for each \n    taxon and <i>taxon</i> which specifies a taxon name. \n    The taxon name is only used to name the file and\n    doesn't have to be exactly the same as \n    the name used elsewhere on the site. The ddbid will also be used \n    in the filename in case of any ambiguity.\n  ");
    fileUploadButton();
    downloadBatchButton();
    cancelDownloadBatchButton();
    $$2('<hr/>').appendTo($$2('#bsbi-atlas-download-left'));
    makeCheckbox('map', 'Map');
    makeCheckbox('apparency', 'Apparency');
    makeCheckbox('phenology', 'Phenology');
    makeCheckbox('altlat', 'Alt/Lat');
    mapping();
    apparencyChart();
    phenologyChart();
    altlatChart();
  }

  function taxonToFile(taxon, id) {
    var filename = "".concat(taxon, "_").concat(id, "_");
    filename = filename.replace(/ /g, '_');
    filename = filename.replace(/\s+/g, '');
    filename = filename.replace(/\./g, '_');
    filename = filename.replace(/_+/g, '_');
    return filename;
  }

  function downloadTaxa() {
    return _downloadTaxa.apply(this, arguments);
  }

  function _downloadTaxa() {
    _downloadTaxa = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var data, _loop, i, _ret;

      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return d3.csv(browsedFileData);

            case 2:
              data = _context2.sent;
              bCancelled = false;
              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
                var t, filename, eMapping, eApparency, ePhenology, eAltlat, isHybrid, noStatus, p1, p2, p3, p4;
                return regeneratorRuntime.wrap(function _loop$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (!bCancelled) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt("return", "break");

                      case 2:
                        // Taxon
                        t = data[i];
                        filename = taxonToFile(t.taxon, t.taxonId); // For reporting errors

                        eMapping = void 0, eApparency = void 0, ePhenology = void 0, eAltlat = void 0; // Ensure that status is set correctly for mapping

                        isHybrid = aIsHybrid.indexOf(t.taxonId) > -1;
                        noStatus = aNoStatus.indexOf(t.taxonId) > -1;
                        bsbiDataAccess.showStatus = !isHybrid && !noStatus; // Map

                        p1 = mappingUpdate(t.taxonId, filename)["catch"](function (e) {
                          return eMapping = e;
                        });
                        p2 = apparencyUpdate(t.taxonId, filename)["catch"](function (e) {
                          return eApparency = e;
                        });
                        p3 = phenologyUpdate(t.taxonId, filename)["catch"](function (e) {
                          return ePhenology = e;
                        });
                        p4 = altlatUpdate(t.taxonId, filename)["catch"](function (e) {
                          return eAltlat = e;
                        });
                        _context.next = 14;
                        return Promise.all([p1, p2, p3, p4]).then(function () {
                          if (eMapping || eApparency || ePhenology || eAltlat) {
                            var html = "<b>Problems for ".concat(t.taxon, " (").concat(t.taxonId, ")</b>");
                            html += '<ul>';

                            if (eMapping) {
                              html += '<li>Map failed</li>';
                            }

                            if (eApparency) {
                              html += '<li>Apparency chart failed</li>';
                            }

                            if (ePhenology) {
                              html += '<li>Phenology chart failed</li>';
                            }

                            if (eAltlat) {
                              html += '<li>Altlat chart failed</li>';
                            }

                            $$2('<div>').appendTo($$2('#bsbi-atlas-download-right')).html(html);
                          }
                        });

                      case 14:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _loop);
              });
              i = 0;

            case 6:
              if (!(i < data.length)) {
                _context2.next = 14;
                break;
              }

              return _context2.delegateYield(_loop(i), "t0", 8);

            case 8:
              _ret = _context2.t0;

              if (!(_ret === "break")) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("break", 14);

            case 11:
              i++;
              _context2.next = 6;
              break;

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));
    return _downloadTaxa.apply(this, arguments);
  }

  function fileUploadButton() {
    var $file = $$2('<input>').appendTo($$2('#bsbi-atlas-download-left'));
    $file.attr('type', 'file');
    $file.attr('accept', '.csv');
    $file.attr('id', 'bsbi-atlas-batch-file');
    $file.css('margin-bottom', '1em');
    $file.on('change', function () {
      fileOpened(event);
    });
  }

  function fileOpened(event) {
    var reader = new FileReader();
    reader.addEventListener('load', function (event) {
      browsedFileData = event.target.result; //console.log('browsedFileData', browsedFileData)
    });
    reader.readAsDataURL(event.target.files[0]);
  }

  function downloadBatchButton() {
    var $button = $$2('<button>').appendTo($$2('#bsbi-atlas-download-left'));
    $button.addClass('btn btn-default');
    $button.text('Download batch');
    $button.on('click', function () {
      clearCharts();
      downloadTaxa();
    });
  }

  function cancelDownloadBatchButton() {
    var $button = $$2('<button>').appendTo($$2('#bsbi-atlas-download-left'));
    $button.addClass('btn btn-default');
    $button.css('margin-left', '1em');
    $button.text('Cancel');
    $button.on('click', function () {
      bCancelled = true;
    });
  }

  function downloadButton() {
    var $button = $$2('<button>').appendTo($$2('#bsbi-atlas-download-left'));
    $button.addClass('btn btn-default');
    $button.text('Download selected');
    $button.on('click', function () {
      clearCharts();
      var filename = taxonToFile(currentTaxon.shortName, currentTaxon.identifier);
      var staticMap = getStaticMap();
      if ($$2('#download-map').is(':checked')) staticMap.saveMap(true, null, "".concat(filename, "map"));
      if ($$2('#download-apparency').is(':checked')) phen1.saveImage(true, "".concat(filename, "apparency"));
      if ($$2('#download-phenology').is(':checked')) phen2.saveImage(true, "".concat(filename, "phenology"));
      if ($$2('#download-altlat').is(':checked')) altlat.saveImage(true, "".concat(filename, "altlat"));
    });
  }

  function makeCheckbox(id, label) {
    $$2("<input type=\"checkbox\" id=\"download-".concat(id, "\" style=\"margin:0.5em\" checked>")).appendTo($$2('#bsbi-atlas-download-left'));
    $$2("<label for=\"download-".concat(id, "\">").concat(label, "</label>")).appendTo($$2('#bsbi-atlas-download-left'));
  }

  function mapping() {
    $$2('<div id="bsbiMapDownloadDiv" style="max-width: 500px">').appendTo($$2('#bsbi-atlas-download-left'));
    createMaps("#bsbiMapDownloadDiv");
    var staticMap = getStaticMap(); // Transorm, grid style and boundary style are all set when map is initialised, but
    // backdrop is not so do it here.

    var backdrop = getCookie('backdrop') ? getCookie('backdrop') : 'colour_elevation';
    var rasterRoot = ds$1.bsbi_atlas.dataRoot + 'rasters/';

    if (backdrop !== 'none') {
      staticMap.basemapImage(backdrop, true, rasterRoot + "".concat(backdrop, ".png"), rasterRoot + "".concat(backdrop, ".pgw"));
    } // Ensure right map is selected
    // allclass is the default, status is set on a per taxon basis
    // Indicated that 4 classes are to be used


    bsbiDataAccess.periodClasses = 'print';
  }

  function mappingUpdate(_x, _x2) {
    return _mappingUpdate.apply(this, arguments);
  }

  function _mappingUpdate() {
    _mappingUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(taxonId, taxon) {
      var staticMap;
      return regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              staticMap = getStaticMap();

              if (!$$2('#download-map').is(':checked')) {
                _context3.next = 9;
                break;
              }

              currentTaxon.identifier = taxonId;
              mapSetCurrentTaxon(currentTaxon);
              _context3.next = 6;
              return changeMap(true);

            case 6:
              if (!taxon) {
                _context3.next = 9;
                break;
              }

              _context3.next = 9;
              return staticMap.saveMap(true, null, "".concat(taxonToFile(taxon, taxonId), "map"));

            case 9:
              return _context3.abrupt("return", Promise.resolve());

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee2);
    }));
    return _mappingUpdate.apply(this, arguments);
  }

  function apparencyChart() {
    var $apparency = $$2('<div>').appendTo($$2('#bsbi-atlas-download-left'));
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
  }

  function apparencyUpdate(_x3, _x4) {
    return _apparencyUpdate.apply(this, arguments);
  }

  function _apparencyUpdate() {
    _apparencyUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(taxonId, taxon) {
      var apparencyRoot, file, data, fileDefault;
      return regeneratorRuntime.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!$$2('#download-apparency').is(':checked')) {
                _context4.next = 16;
                break;
              }

              apparencyRoot = "".concat(ds$1.bsbi_atlas.dataRoot, "bsbi/apparency/");
              file = apparencyRoot + 'all/' + taxonId.replace(/\./g, "_") + '.csv';
              _context4.next = 5;
              return d3.csv(file + "?prevent-cache=".concat(pcache))["catch"](function () {
                return null;
              });

            case 5:
              data = _context4.sent;

              if (data) {
                _context4.next = 11;
                break;
              }

              // TEMPORARY CODE FOR TESTING so that a file always returned 
              fileDefault = apparencyRoot + 'all/dummy.csv';
              _context4.next = 10;
              return d3.csv(fileDefault + '?prevent-cache=');

            case 10:
              data = _context4.sent;

            case 11:
              _context4.next = 13;
              return apparency(phen1, data);

            case 13:
              if (!taxon) {
                _context4.next = 16;
                break;
              }

              _context4.next = 16;
              return phen1.saveImage(true, "".concat(taxonToFile(taxon, taxonId), "apparency"));

            case 16:
              return _context4.abrupt("return", Promise.resolve());

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3);
    }));
    return _apparencyUpdate.apply(this, arguments);
  }

  function phenologyChart() {
    var $phenology = $$2('<div>').appendTo($$2('#bsbi-atlas-download-left'));
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
  }

  function phenologyUpdate(_x5, _x6) {
    return _phenologyUpdate.apply(this, arguments);
  }

  function _phenologyUpdate() {
    _phenologyUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(taxonId, taxon) {
      var captionRoot, file, data, fileDefault;
      return regeneratorRuntime.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!$$2('#download-phenology').is(':checked')) {
                _context5.next = 16;
                break;
              }

              captionRoot = ds$1.bsbi_atlas.dataRoot + 'bsbi/captions/';
              file = "".concat(captionRoot).concat(currentTaxon.identifier.replace(/\./g, "_"), ".csv");
              _context5.next = 5;
              return d3.csv(file + "?prevent-cache=".concat(pcache))["catch"](function () {
                return null;
              });

            case 5:
              data = _context5.sent;

              if (data) {
                _context5.next = 11;
                break;
              }

              // TEMPORARY CODE FOR TESTING so that a file always returned 
              fileDefault = phenologyRoot + 'dummy-phenology.csv';
              _context5.next = 10;
              return d3.csv(fileDefault + "?prevent-cache=".concat(pcache));

            case 10:
              data = _context5.sent;

            case 11:
              _context5.next = 13;
              return phenology(phen2, data, null);

            case 13:
              if (!taxon) {
                _context5.next = 16;
                break;
              }

              _context5.next = 16;
              return phen2.saveImage(true, "".concat(taxonToFile(taxon, taxonId), "phenology"));

            case 16:
              return _context5.abrupt("return", Promise.resolve());

            case 17:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4);
    }));
    return _phenologyUpdate.apply(this, arguments);
  }

  function altlatChart() {
    var $altlat = $$2('<div>').appendTo($$2('#bsbi-atlas-download-left'));
    $altlat.attr('id', 'bsbi-altlat-chart').css('max-width', '600px');
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
        radius: 11,
        legend: '1-10%'
      }, {
        min: 10.00001,
        max: 30,
        radius: 14,
        legend: '11-30%'
      }, {
        min: 30.00001,
        max: 40,
        radius: 16,
        legend: '31-40%'
      }, {
        min: 40.00001,
        max: 50,
        radius: 18,
        legend: '41-50%'
      }, {
        min: 50.00001,
        max: 100,
        radius: 20,
        legend: '51-100%'
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
    altlat = brccharts.altlat(opts);
  }

  function altlatUpdate(_x7, _x8) {
    return _altlatUpdate.apply(this, arguments);
  }

  function _altlatUpdate() {
    _altlatUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(taxonId, taxon) {
      var altlatRoot, altlatfile, altlatdata;
      return regeneratorRuntime.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!$$2('#download-altlat').is(':checked')) {
                _context6.next = 11;
                break;
              }

              altlatRoot = ds$1.bsbi_atlas.dataRoot + 'bsbi/20220606/altlat/';
              altlatfile = "".concat(altlatRoot).concat(taxonId.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              _context6.next = 5;
              return d3.csv(altlatfile);

            case 5:
              altlatdata = _context6.sent;
              _context6.next = 8;
              return altLat(altlat, altlatdata);

            case 8:
              if (!taxon) {
                _context6.next = 11;
                break;
              }

              _context6.next = 11;
              return altlat.saveImage(true, "".concat(taxonToFile(taxon, taxonId), "altlat"));

            case 11:
              return _context6.abrupt("return", Promise.resolve());

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee5);
    }));
    return _altlatUpdate.apply(this, arguments);
  }

  function clearCharts() {
    if (!$$2('#download-map').is(':checked')) {
      var staticMap = getStaticMap(); //console.log('clear map')

      staticMap.clearMap();
    }

    if (!$$2('#download-apparency').is(':checked')) phen1.setChartOpts({
      data: []
    });
    if (!$$2('#download-phenology').is(':checked')) phen2.setChartOpts({
      data: []
    });
    if (!$$2('#download-altlat').is(':checked')) altlat.setChartOpts({
      data: []
    });
  }

  function taxonSelectors() {
    // Overall control container
    var $container = $$2('<div>').appendTo($$2('.bsbi-atlas-taxon-selector'));
    $container.addClass('atlas-taxon-selector-div'); // Selector

    var $sel = $$2('<select>').appendTo($container);
    $sel.addClass('atlas-taxon-selector-sel');
    d3.csv(ds$1.bsbi_atlas.dataRoot + "bsbi/taxon_list.csv?prevent-cache=".concat(pcache)).then(function (data) {
      var taxaList = data;
      taxaList.forEach(function (d) {
        var name = '';

        if (d['vernacular']) {
          name = '<b>' + d['vernacular'] + '</b> ';
        }

        name = name + d['formattedName'];
        var $opt = $$2('<option>');
        $opt.attr('data-content', name);
        $opt.attr('value', d['ddbid']);
        $opt.attr('data-taxon-name', d['taxonName']); //$opt.attr('data-vernacular', d['vernacular'])

        $opt.attr('data-is-hybrid', d['hybrid']);
        $opt.html(name).appendTo($sel);
      });
      $sel.attr('data-size', '10');
      $sel.attr('data-live-search', 'true');
      $sel.attr('data-header', 'Start typing the name of a taxon');
      $sel.attr('title', 'Select a taxon');
      $sel.selectpicker();
      $sel.on('changed.bs.select', function () {
        console.log('Identifier:', $$2(this).val());
        clearCharts();
        currentTaxon.identifier = $$2(this).val();
        currentTaxon.name = $$2(this).find(":selected").attr("data-content");
        currentTaxon.shortName = $$2(this).find(":selected").attr("data-taxon-name");
        currentTaxon.isHybrid = $$2(this).find(":selected").attr("data-is-hybrid") === 't'; // Ensure that status is set correctly for mapping

        var isHybrid = $$2(this).find(":selected").attr("data-is-hybrid") === 't';
        var noStatus = aNoStatus.indexOf($$2(this).val()) > -1;
        bsbiDataAccess.showStatus = !isHybrid && !noStatus;
        mappingUpdate(currentTaxon.identifier);
        apparencyUpdate(currentTaxon.identifier);
        phenologyUpdate(currentTaxon.identifier);
        altlatUpdate(currentTaxon.identifier);
      }); // For batch mapping

      aIsHybrid = data.map(function (t) {
        return t.hybrid === 't';
      });
    })["catch"](function () {
      console.log('Error reading taxon CSV');
    }); // No status list for batch mapping

    d3.csv("".concat(ds$1.bsbi_atlas.dataRoot, "bsbi/no_status.csv?prevent-cache=").concat(pcache)).then(function (data) {
      aNoStatus = data.map(function (d) {
        return d['ddb id'];
      });
    });
  }

  var $$1 = jQuery; // eslint-disable-line no-undef

  function trendSummary(v1, v2, v3, v4, v5) {
    var $divParent = $$1('<div>'); // Graphic

    var maxWidth = '160px';
    var $tg = $$1('<div>').appendTo($divParent);
    $tg.css('display', 'flex');
    $tg.css('font-weight', 'bold');
    $tg.css('max-width', maxWidth);
    tgSwatch(0.8, '--', 'Strong decline');
    tgSwatch(0.5, '-', 'Moderate decline');
    tgSwatch(0.4, '0', 'Stable');
    tgSwatch(0.6, '+', 'Moderate decline');
    tgSwatch(0.7, '++', 'Strong decline');
    var $tgt = $$1('<div>').appendTo($divParent);
    $tgt.css('display', 'flex');
    $tgt.css('font-size', '0.8em');
    $tgt.css('margin-bottom', '1em');
    $tgt.css('max-width', maxWidth);
    var $tgt1 = $$1('<div>').appendTo($tgt);
    $tgt1.css('flex', '2');
    $tgt1.css('text-align', 'center');
    $tgt1.text('decrease <<');
    var $tgt2 = $$1('<div>').appendTo($tgt);
    $tgt2.css('flex', '1');
    var $tgt3 = $$1('<div>').appendTo($tgt);
    $tgt3.css('flex', '2');
    $tgt3.css('text-align', 'center');
    $tgt3.text(' >> increase');
    return $divParent;

    function tgSwatch(opacity, text, tip) {
      var $tgs = $$1('<div>').appendTo($tg);
      $tgs.css('flex', '1');
      $tgs.css('height', '30px'); //$tgs.css('background-color', `rgba(255,0,0,${opacity})`)

      $tgs.css('text-align', 'center');
      $tgs.css('line-height', '30px');
      $tgs.css('vertical-align', 'middle');
      $tgs.css('border-left', '1px solid silver');
      $tgs.css('border-top', '1px solid silver');
      $tgs.css('border-bottom', '1px solid silver');

      if (text === '++') {
        $tgs.css('border-right', '1px solid silver');
      }

      $tgs.text(text);
      $tgs.prop('title', tip);
    }
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
      isHybrid: false,
      hybridMapping: false
    };
    mapSetCurrentTaxon(currentTaxon);
    $(document).ready(function () {
      addEventListener('popstate', function (event) {
        //console.log('popstate', event)
        if (event.state && event.state.identifier) {
          $('.atlas-taxon-selector-sel').selectpicker('val', event.state.identifier);
        }
      });

      if (location.pathname === '/download') {
        // Download page
        downloadPage();
      } else {
        // Main atlas page
        // Set meta tags
        setBaseMetaTags(); // Initialise main content

        mainAtlasContent(); // Devel block
        //develChangeMapColours('#bsbi-atlas-development', changeMap)

        develMainMapStyles('#bsbi-atlas-development', changeMap);
      }
    });

    function mainAtlasContent() {
      bsbiDataAccess.periodClasses = 'standard';
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
      } // {
      //   group: 'BIBLIOGRAPHY',
      //   id: 'references',
      //   title: 'References',
      //   fn: sectionEmpty,
      // },
      ]; // Taxon selection controls

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
      d3__namespace.csv("".concat(ds.bsbi_atlas.dataRoot, "bsbi/taxon_list.csv?prevent-cache=").concat(pcache)).then(function (data) {
        taxaList = data;
        taxaList.forEach(function (d) {
          var name = '';

          if (d['vernacular']) {
            name = '<b>' + d['vernacular'] + '</b> ';
          }

          name = name + d['formattedName']; // name = name + '<i>' + d['taxonName'] + '</i>'
          // if (d['qualifier']) {
          //   name = name + ' <b><i>' + d['qualifier'] + '</i></b>'
          // }
          // if (d['authority']) {
          //   name = name + ' <span style="color: grey">' + d['authority'] + '</span>'
          // }

          var $opt = $('<option>');
          $opt.attr('data-content', name);
          $opt.attr('value', d['ddbid']); //$opt.attr('data-canonical', d['canonical'])

          $opt.attr('data-taxon-name', d['taxonName']); //$opt.attr('data-qualifier', d['qualifier'])

          $opt.attr('data-vernacular', d['vernacular']);
          $opt.attr('data-is-hybrid', d['hybrid']);
          var aParentids = d['hybridParentIds'].split(';');
          var aParents = d['hybridParents'].split(';');
          var hybridMapping = aParents.length === 2 && aParentids.length === 2;
          $opt.attr('data-hybrid-mapping', hybridMapping); //$opt.attr('data-tetrad', d['tetrad'])
          //$opt.attr('data-monad', d['monad'])

          $opt.html(name).appendTo($sel);
        });
        $sel.attr('data-size', '10');
        $sel.attr('data-live-search', 'true');
        $sel.attr('data-header', 'Start typing the name of a taxon');
        $sel.attr('title', 'Select a taxon');
        $sel.selectpicker();
        $sel.on('changed.bs.select', function (e, clickedIndex, newValue, oldValue) {
          //console.log(e, clickedIndex, newValue, oldValue)
          //console.log('Identifier:', $(this).val())
          // Because more than one selector can be present on page
          // (one for mobile and one for larger devices), if this rountine
          // is reached by $sel.selectpicker() then it will be invoked more
          // once for each picker, so the comparison below ensures that
          // the code here is only executed once.
          if (currentTaxon.identifier !== $(this).val()) {
            currentTaxon.identifier = $(this).val();
            currentTaxon.name = $(this).find(":selected").attr("data-content");
            currentTaxon.shortName = $(this).find(":selected").attr("data-taxon-name");
            currentTaxon.isHybrid = $(this).find(":selected").attr("data-is-hybrid") === 't';
            currentTaxon.hybridMapping = $(this).find(":selected").attr("data-hybrid-mapping") === 'true'; // If selection was made programatically (browser back or forward
            // button), don't add to history.

            if (clickedIndex) {
              window.history.pushState({
                identifier: currentTaxon.identifier
              }, "BSBI Atlas - ".concat(currentTaxon.shortName), "/atlas/".concat(currentTaxon.identifier));
            }

            mapSetCurrentTaxon(currentTaxon);
            setControlState();
            changeMap();
            changeCaption(); //Also changes taxon name display in sections

            changeEcologyTab();
            createGallery('bsbi-gallery', currentTaxon.identifier);
          }
        }); // If identifier passed in URL, set the value and add to history

        if (ds.bsbi_atlas.identifier) {
          $sel.selectpicker('val', ds.bsbi_atlas.identifier);
          window.history.pushState({
            identifier: ds.bsbi_atlas.identifier
          }, "BSBI Atlas - ".concat(ds.bsbi_atlas.identifier), "/atlas/".concat(currentTaxon.identifier));
        } // Get list of hybrid taxa which can be mapped with their parents


        var hybridTaxa = taxaList.filter(function (t) {
          return t['hybridParentIds'].split(';').length === 2;
        }).map(function (t) {
          var parentIds = t['hybridParentIds'].split(';');
          var parentNames = t['hybridParents'].split(';');
          return {
            taxon: t['ddbid'],
            parent1: parentIds[0],
            parent2: parentIds[1],
            //taxonName: t['canonical'],
            taxonName: t['taxonName'],
            parent1Name: parentNames[0],
            parent2Name: parentNames[1]
          };
        });
        updateBsbiDataAccess('taxaHybridList', hybridTaxa); // Get list of taxa for which no status exists
        // (for use elsewhere - might as well be done here)

        d3__namespace.csv("".concat(ds.bsbi_atlas.dataRoot, "bsbi/no_status.csv?prevent-cache=").concat(pcache)).then(function (data) {
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
      $left.append('<div id="bsbiMapDiv" width="100%"></div>'); //$left.append('<h4>Atlas map point</h4>')

      $left.append('<div id="dotCaption" width="100%" style="margin-top:1em"></div>');
      $left.append('<h4>Status etc for devel</h4>');
      $left.append('<div id="statusDevel" width="100%"></div>');
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
      ds.bsbi_atlas.dataBsbidb; //txtn  = txtn.replace(/href="\/object.php/g, 'target="_blank" href="' + bsbidburl + 'object.php')
      //txtn  = txtn.replace(/href='\/object.php/g, 'target=\'_blank\' href=\'' + bsbidburl + 'object.php')

      txtn = txtn.replace(/object.php\?entityid=/g, 'atlas/');
      txtn = txtn.replace(/&amp;class=TaxonInstance/g, '');
      return txtn;
    }

    function getFormattedTaxonName(vernacular, formatted) {
      // const vernacularHtml = vernacular ? '<span class="taxname"><b>' + vernacular + ' </b></span>' : ''
      // const scientificHtml = scientific ? '<span class="taxname"><i>' + scientific + ' </i></span>' : ''
      // const authorityHtml = authority ? '<span class="taxname"><span style="color: grey">' + authority + '</span></span>' : ''
      // return vernacularHtml+ scientificHtml + authorityHtml
      return "<b>".concat(vernacular, "</b> ").concat(formatted);
    }

    function changeEcologyTab() {
      changeEcology(ds.bsbi_atlas.dataRoot, currentTaxon.identifier);
    }

    function changeCaption() {
      var $p;
      var $caption = $('#bsbi-caption');
      $caption.html('');
      var captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions/';
      var captionFile = "".concat(captionRoot).concat(currentTaxon.identifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
      d3__namespace.csv(captionFile).then(function (d) {
        //console.log('caption file', d)
        // Set taxon name
        var tName = getFormattedTaxonName(d[0].vernacular, d[0].formattedName);
        $('.bsbi-selected-taxon-name').html("".concat(tName)); // For caption, set the various sections
        // Description

        if (d[0].atlasSpeciesDescription) {
          $caption.append('<h4>Description</h4>');
          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesDescription));
          $p = $('<p>').appendTo($caption);
          $p.append('TODO - overall status');
        } // Taxa covered


        if (d[0].captionedChildTaxonIds) {
          $caption.append('<h4>Taxa covered <span id="bsbi-taxa-covered-toggle">[show]</span></h4>'); //$p = $('<p id="bsbi-taxa-covered-toggle">').appendTo($caption)
          //$p.html('[show]')

          var $ul = $('<ul id="bsbi-taxa-covered-list">').appendTo($caption);
          var ddbids = d[0].captionedChildTaxonIds.split(';');
          ddbids.forEach(function (ddbid) {
            var $li = $('<li>').appendTo($ul);
            var taxon = taxaList.find(function (t) {
              return t['ddbid'] === ddbid;
            });
            console.log('taxon', taxon);

            if (taxon) {
              //$li.html(getFormattedTaxonName(taxon['vernacular'], taxon['formattedName']))
              var $i = $('<i>').appendTo($li);
              var $a = $('<a>').appendTo($i);
              $a.attr('href', "/atlas/".concat(ddbid));
              $a.attr('alt', "Link to ".concat(taxon.taxonName));
              $a.text(taxon.taxonName);
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
        } // Trends


        if (d[0].atlasSpeciesTrends) {
          $caption.append('<h4>Trends</h4>'); // Graphic

          var $graphic = trendSummary();
          $graphic.appendTo($caption); // Text

          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesTrends));
        } // Biogeography


        if (d[0].atlasSpeciesBiogeography) {
          $caption.append('<h4>Biogeography</h4>');
          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesBiogeography));
        } // Status etc


        $('#statusDevel').html('');
        var $ulStatus = $('<ul>').appendTo($('#statusDevel'));
        var vals = ['statusGB', 'statusIE', 'statusCI', 'csRedListEngland', 'csRedListWales', 'csNationalStatus', 'csRedListIreland', 'csRedDataList2005', 'csRedDataList2021'];
        vals.forEach(function (v) {
          var $li = $('<li>').appendTo($ulStatus);
          $li.html("".concat(v, ": ").concat(d[0][v]));
        }); // Parent taxa (for hybrids)

        if (d[0].hybridParents) {
          var captionExists = /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
              var captionRoot, captionFile, res;
              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions/';
                      captionFile = "".concat(captionRoot).concat(id.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
                      _context2.next = 4;
                      return fetch(captionFile, {
                        method: "HEAD"
                      });

                    case 4:
                      res = _context2.sent;
                      return _context2.abrupt("return", res.ok);

                    case 6:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2);
            }));

            return function captionExists(_x3) {
              return _ref2.apply(this, arguments);
            };
          }();

          $caption.append('<h4>Hybrid parents</h4>');

          var _$ul = $('<ul>').appendTo($caption);

          var parents = d[0].hybridParents.split(';');
          var parentIds = d[0].hybridParentIds.split(';'); // A parent id may not exist as a taxon in the altas
          // in which case do not link to it. Check if it exists
          // by checking whether the caption file exists.

          parents.forEach( /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(p, i) {
              var pid, inAtlas, $li, $i, $a;
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      pid = parentIds[i] ? parentIds[i] : '';
                      _context.next = 3;
                      return captionExists(pid);

                    case 3:
                      inAtlas = _context.sent;
                      $li = $('<li>').appendTo(_$ul);
                      $i = $('<i>').appendTo($li);

                      if (inAtlas) {
                        $a = $('<a>').appendTo($i);
                        $a.attr('href', "/atlas/".concat(pid));
                        $a.attr('alt', "Link to ".concat(p));
                        $a.text(p);
                      } else {
                        $i.text(p);
                      }

                    case 7:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));

            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }());
        } // Authors


        if (d[0].captionAuthors) {
          $caption.append('<h4>Authors</h4>');
          var $pAuthors = $('<p>').appendTo($caption);
          var aAuthors = d[0].captionAuthors.split(';');
          var tAuthors;

          for (var i = 0; i < aAuthors.length; i++) {
            if (i === 0) {
              tAuthors = aAuthors[i];
            } else if (i === aAuthors.length - 1) {
              tAuthors = "".concat(tAuthors, " and ").concat(aAuthors[i]);
            } else {
              tAuthors = "".concat(tAuthors, ", ").concat(aAuthors[i]);
            }
          }

          $pAuthors.text(tAuthors);
        } // References


        $caption.append('<h4>References <span id="bsbi-reference-toggle">[show]</span></h4>');
        var $divref = $('<div id="bsbi-reference-div">').appendTo($caption);
        $p = $('<p id="bsbi-reference-text">').appendTo($divref);
        $p.text('TODO - references');
        var taxaReferenceShown = false;
        $('#bsbi-reference-toggle').click(function () {
          taxaReferenceShown = !taxaReferenceShown;

          if (taxaReferenceShown) {
            $('#bsbi-reference-div').show();
            $('#bsbi-reference-toggle').html('[hide]');
          }

          if (!taxaReferenceShown) {
            $('#bsbi-reference-div').hide();
            $('#bsbi-reference-toggle').html('[show]');
          }
        }); // Citation

        $caption.append('<h4>Recommended citation <span id="bsbi-citation-toggle">[show]</span></h4>');
        var $div = $('<div id="bsbi-citation-div">').appendTo($caption);
        $p = $('<p id="bsbi-citation-text">').appendTo($div);
        $p.append(getCitation(currentTaxon)); // $p.append('<i>' + d[0].taxonName + ',</i> ')
        // $p.append('in <i>BSBI Online Plant Atlas 2020</i>, eds P.A. Stroh, T. A. Humphrey, R.J. Burkmar, O.L. Pescott, D.B. Roy, & K.J. Walker. ')
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

        addMetaTags('title', d[0].taxonName + ' in BSBI Online Plant Atlas 2020', true);
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
