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
  	lightgallery: "^2.3.0",
  	"stats-lite": "^2.2.0"
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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
      "1930 - 1969": "1930–69",
      "1970 - 1986": "1970–86",
      "1987 - 1999": "1987–99",
      "2000 - 2019": "2000–19"
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
        console.log('Tetrad data', data);
        var legend;

        if (data.length) {
          legend = {
            lines: [{
              colour: 'black',
              opacity: 1,
              text: 'Present in tetrad',
              //shape: bsbiDataAccess.symboltype === 'square' ? 'square' : 'circle', //'circle' dev only
              shape: 'square'
            }]
          };
        } else {
          legend = {
            title: 'No data available',
            lines: []
          };
        }

        resolve({
          records: data,
          precision: 2000,
          size: 1,
          legend: legend
        });
      })["catch"](function (e) {
        //reject(e)
        resolve({
          records: [],
          precision: 2000,
          size: 1,
          legend: {
            title: 'No data available',
            lines: []
          }
        });
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
    return p === "to 1929" ? "pre-1930" : p.replace(" - ", "–");
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
    return change(identifier, ['1987 - 1999'], ['2000 - 2009', '2010 - 2019'], 'Change from 1987–1999 to 2000–2019');
  };

  bsbiDataAccess.change_1930_1969_vs_2000_2019 = function (identifier) {
    //return change(identifier, ['1930 - 1949', '1950 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930–1969 to 2000–2019')
    //return change(identifier, ['to 1929', '1930 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930–1969 to 2000–2019')
    return change(identifier, ['1930 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930–1969 to 2000–2019');
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
        var legend;

        if (data.length) {
          legend = {
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
          };
        } else {
          legend = {
            title: 'No data available',
            lines: []
          };
        }

        resolve({
          records: data,
          size: 1,
          precision: 10000,
          opacity: 1,
          legend: legend
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
        var legend;

        if (data.length) {
          legend = {
            title: 'Tetrad frequency',
            size: 1,
            shape: 'circle',
            colour: 'black',
            precision: 10000,
            opacity: 1,
            lines: [{
              text: '1–5',
              size: Math.sqrt(5) / 5 * legendSizeFact
            }, {
              text: '6–10',
              size: Math.sqrt(10) / 5 * legendSizeFact
            }, {
              text: '11–15',
              size: Math.sqrt(15) / 5 * legendSizeFact
            }, {
              text: '16–20',
              size: Math.sqrt(20) / 5 * legendSizeFact
            }, {
              text: '21–25',
              size: Math.sqrt(25) / 5 * legendSizeFact
            }]
          };
        } else {
          legend = {
            title: 'No data available',
            lines: []
          };
        }

        resolve({
          records: data,
          //size: 1,
          colour: 'black',
          //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
          shape: 'circle',
          precision: 10000,
          opacity: 1,
          legend: legend
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  };

  var $$8 = jQuery; // eslint-disable-line no-undef

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
        $$8('meta[name="' + name + '"').attr('content', content);
      } else {
        $$8('head').append('<meta name="' + name + '" content="' + content + '" />');
      }
    }; // http://div.div1.com.au/div-thoughts/div-commentaries/66-div-commentary-metadata


    switch (type) {
      case 'title':
        $$8('head title').html(value);
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

  var pcache = '20220922-1';

  var $$7 = jQuery; // eslint-disable-line no-undef

  var phen1$1, phen2$1, phen3, altlat$1;
  var apparencyByLatData;
  function createPhenology(sel) {
    //$('<h4>').appendTo($(sel)).text('Phenology')
    var $phenFlexParent = $$7('<div>').appendTo($$7(sel)); //const $phenSource = $('<div>').appendTo($phenFlexLeft)

    var $phenSource = $$7('<div>').appendTo($$7(sel));
    $phenSource.attr('id', 'bsbi-phenology-source');
    $phenSource.css('font-size', '0.8em'); //$phenSource.css('padding-left', '32px')
    //$phenSource.css('max-width', '400px')

    $phenSource.css('margin-bottom', '0.8em');
    var $p1 = $$7('<p>').appendTo($$7(sel));
    $p1.text("Explanation of apparency and phenology charts. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a.");
    $phenFlexParent.attr('class', 'phenRow');
    var $phenFlexLeft = $$7('<div>').appendTo($phenFlexParent);
    $phenFlexLeft.attr('class', 'phenColumn');
    var $phenFlexRight = $$7('<div>').appendTo($phenFlexParent);
    $phenFlexRight.attr('class', 'phenColumn');
    var $divp1 = $$7('<div>').appendTo($phenFlexLeft);
    $divp1.css('position', 'relative');
    var $apparency = $$7('<div>').appendTo($divp1);
    $apparency.attr('id', 'bsbi-apparency-chart').css('max-width', '400px');
    var $apparencyNoData = $$7('<div>').appendTo($divp1);
    $apparencyNoData.attr('id', 'bsbi-apparency-chart-no-data');
    $apparencyNoData.css('display', 'none');
    $apparencyNoData.css('position', 'absolute');
    $apparencyNoData.css('top', '50px');
    $apparencyNoData.css('width', '100%');
    $apparencyNoData.css('text-align', 'center');
    $apparencyNoData.text('No data available for chart');
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
      height: 303,
      headPad: 35,
      perRow: 1,
      expand: true,
      showTaxonLabel: false,
      axisLeft: 'off',
      showLegend: false,
      interactivity: 'none',
      font: 'Arial',
      monthFontSize: 11
    });
    var $phenology = $$7('<div>').appendTo($phenFlexLeft);
    $phenology.attr('id', 'bsbi-phenology-chart').css('max-width', '400px');
    phen2$1 = brccharts.phen2({
      selector: '#bsbi-phenology-chart',
      data: [],
      taxa: ['taxon'],
      metrics: [],
      width: 400,
      height: 25,
      split: true,
      headPad: 35,
      chartPad: 35,
      perRow: 1,
      expand: true,
      showTaxonLabel: false,
      interactivity: 'none',
      font: 'Arial',
      monthFontSize: 11
    });
    var $divp3 = $$7('<div>').appendTo($phenFlexRight);
    $divp3.css('position', 'relative');
    var $apparencyByLat = $$7('<div>').appendTo($divp3);
    $apparencyByLat.attr('id', 'bsbi-apparency-by-lat-chart').css('max-width', '400px');
    var $apparencyByLatNoData = $$7('<div>').appendTo($divp3);
    $apparencyByLatNoData.attr('id', 'bsbi-apparency-by-lat-chart-no-data');
    $apparencyByLatNoData.css('display', 'none');
    $apparencyByLatNoData.css('position', 'absolute');
    $apparencyByLatNoData.css('top', '50px');
    $apparencyByLatNoData.css('width', '100%');
    $apparencyByLatNoData.css('text-align', 'center');
    $apparencyByLatNoData.text('No data available for chart'); // $apparencyByLat = $('<div>').appendTo($phenFlexRight)
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
      axisLabelFontSize: 12,
      font: 'Arial',
      monthFontSize: 12
    }); //latPhenNormalizeCheckbox($phenFlexRight, phen3) 
    //latPhenDataTypeDropdown($phenFlexRight) 
    // Website style is overriding some charts style, so reset it

    $$7('.brc-chart-phen1').css('overflow', 'visible'); // Chart line width - not currently a chart option

    $$7('#bsbi-apparency-by-lat-chart .phen-path').css('stroke-width', 1);
  }
  function createEcology(sel) {
    //$('<h4>').appendTo($(sel)).text('Altitude vs Latitude')
    var $altlatp = $$7('<div>').appendTo($$7(sel));
    $altlatp.css('position', 'relative');
    var $altlatNoText = $$7('<div>').appendTo($altlatp);
    $altlatNoText.attr('id', 'bsbi-altlat-chart-no-data');
    $altlatNoText.css('display', 'none');
    $altlatNoText.css('position', 'absolute');
    $altlatNoText.css('top', '50px');
    $altlatNoText.css('width', '100%');
    $altlatNoText.css('max-width', '600px');
    $altlatNoText.css('text-align', 'center');
    $altlatNoText.text('No data available for chart');
    var $altlat = $$7('<div>').appendTo($altlatp);
    var $p2 = $$7('<p>').appendTo($$7(sel));
    $p2.text("Explanation of latitude/altitude chart. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque blandit dui vel mauris maximus interdum. Aliquam orci eros, venenatis vel purus nec, venenatis congue leo. Pellentesque rhoncus metus eros, tincidunt congue massa volutpat facilisis. Curabitur pellentesque turpis velit, quis ornare mauris ullamcorper a."); // Alt vs Lat visualisation

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
        legend: '1–10%'
      }, {
        min: 10.00001,
        max: 30,
        radius: 14,
        legend: '11–30%'
      }, {
        min: 30.00001,
        max: 40,
        radius: 16,
        legend: '31–40%'
      }, {
        min: 40.00001,
        max: 50,
        radius: 18,
        legend: '41–50%'
      }, {
        min: 50.00001,
        max: 100,
        radius: 20,
        legend: '51–100%'
      }],
      taxa: ['dummy'],
      width: 600,
      height: 300,
      perRow: 1,
      expand: true,
      margin: {
        left: 55,
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
    altlat$1 = brccharts.altlat(opts);
  }

  function createPhenologyControls(selector) {
    latPhenDataTypeDropdown($$7(selector));
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

    var $div = $$7('<div>').appendTo($parent); //$div.css('margin-left', '35px')

    var $sel = $$7('<select>').appendTo($div);
    $sel.attr('id', 'atlas-lat-phen-data-type');
    $sel.addClass('selectpicker');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      if (apparencyByLatData.length) {
        apparencyByLat(phen3, apparencyByLatData);
      }
    });
    dataTypes.forEach(function (t) {
      var $opt = t.selected ? $$7('<option>') : $$7('<option>');
      $opt.attr('value', t.val);
      $opt.html(t.caption).appendTo($sel);
    });
    $sel.val('count'); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function changePhenology(dataRoot, identifier) {
    if (!identifier) return;
    var apparencyRoot = dataRoot + 'bsbi/apparency/';
    var captionRoot = dataRoot + 'bsbi/captions/'; // Apparency all

    var fileAll = apparencyRoot + 'all/' + identifier.replace(/\./g, "_") + '.csv';
    d3__namespace.csv(fileAll + '?prevent-cache=').then(function (data) {
      apparency(phen1$1, data);
      $$7('#bsbi-apparency-chart').css('opacity', 1);
      $$7('#bsbi-apparency-chart-no-data').hide();
    })["catch"](function () {
      console.warn("Apparency chart failed for ".concat(fileAll, ". Error message:"), e);
      phen1$1.setChartOpts({
        data: []
      });
      $$7('#bsbi-apparency-chart').css('opacity', 0.5);
      $$7('#bsbi-apparency-chart-no-data').show();
    }); // Apparency by latitude

    var fileLat = apparencyRoot + 'byLat/' + identifier.replace(/\./g, "_") + '.csv';
    d3__namespace.csv(fileLat + '?prevent-cache=').then(function (data) {
      apparencyByLatData = data; // Saved so that apparencyByLat if 
      // data type dropdown used.

      apparencyByLat(phen3, apparencyByLatData);
      $$7('#bsbi-apparency-by-lat-chart').css('opacity', 1);
      $$7('#bsbi-apparency-by-lat-chart-no-data').hide();
    })["catch"](function () {
      console.warn("Apparency by latitude chart failed for ".concat(fileLat, ". Error message:"), e);
      phen3.setChartOpts({
        data: [],
        metrics: [],
        spread: false
      });
      $$7('#bsbi-apparency-by-lat-chart').css('opacity', 0.5);
      $$7('#bsbi-apparency-by-lat-chart-no-data').show();
    }); // Phenology

    var file = "".concat(captionRoot).concat(identifier.replace(/\./g, "_"), ".csv");
    d3__namespace.csv(file + "?prevent-cache=".concat(pcache)).then(function (data) {
      phenology(phen2$1, data, 'bsbi-phenology-source');
    });
  }
  function changeEcology(dataRoot, identifier) {
    if (!identifier) return;
    var mapRoot = dataRoot + 'bsbi/maps/'; // Alt/Lat
    // Using pre-processed altlat data

    var altlatdata = "".concat(mapRoot, "altlat/").concat(identifier.replace(/\./g, "_"), ".csv");
    d3__namespace.csv(altlatdata).then(function (data) {
      $$7('#bsbi-altlat-chart').css('opacity', 1);
      $$7('#bsbi-altlat-chart-no-data').hide();
      return altLat(altlat$1, data);
    })["catch"](function (e) {
      console.warn("altlat chart failed for ".concat(altlatdata, ". Error message:"), e);
      altlat$1.setChartOpts({
        data: []
      });
      $$7('#bsbi-altlat-chart').css('opacity', 0.25);
      $$7('#bsbi-altlat-chart-no-data').show();
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
    var leafEnd = m2d[Number(le)];

    if (leafEnd === leafStart) {
      leafStart = 1;
      leafEnd = 365;
    }

    if (flowerEnd === flowerStart) {
      flowerStart = 1;
      flowerEnd = 365;
    } //console.log('ls le', ls, le)
    // Work out area of overlap between flowering and leafing


    var flowerRange = [];
    var leafRange = [];

    if (flowerStart && flowerEnd) {
      if (flowerStart > flowerEnd) {
        flowerRange = [[flowerStart, 365], [1, flowerEnd]];
      } else {
        flowerRange = [[flowerStart, flowerEnd]];
      }
    }

    if (leafStart && leafEnd) {
      if (leafStart > leafEnd) {
        leafRange = [[leafStart, 365], [1, leafEnd]];
      } else {
        leafRange = [[leafStart, leafEnd]];
      }
    } // flowerRange.forEach(fr => {
    //   leafRange.forEach(lr => {
    //     const fs = fr[0]
    //     const fe = fr[1]
    //     const ls = lr[0]
    //     const le = lr[1]
    //     let os, oe
    //     if (fs > ls && fs < le) {
    //       os = fs
    //     }
    //     if (fe > ls && fe < le) {
    //       oe = fe
    //     }
    //     if (os && !oe) {
    //       oe = le
    //     }
    //     if (oe && !os) {
    //       os = ls
    //     }
    //     if (os) {
    //       overlapRange.push([os, oe])
    //     }
    //   })
    // })
    // console.log('flowerRange', flowerRange)
    // console.log('leafRange', leafRange)
    // console.log('overlapRange', overlapRange)


    var svgLeaf = "m12941 19084-175-112-108 54c-59 30-112 54-117 54s-97-112-203-250l-193-250h-150-151l-177-188c-97-104-186-197-197-207-19-17-23-16-139 49-66 36-124 66-128 65-6 0-219-276-359-464-10-14-30-7-149 53l-138 70-26-32c-15-17-103-124-195-238-92-115-171-208-175-208s-61 25-127 55l-119 55-90-92c-50-51-149-155-220-230l-130-138-112 100c-61 55-115 100-120 100-4 0-123-122-263-269-140-148-260-270-266-270-5-1-65 39-131 88l-122 90-233-207c-129-114-264-233-300-265l-66-58-138 80-139 80-139-147c-77-81-181-189-231-240l-91-94-161 80-160 81-169-201c-93-110-176-209-184-219-15-19-19-18-174 26-87 25-162 42-167 39s-79-90-164-194c-140-171-158-188-178-181-12 5-73 30-134 56-62 26-116 45-121 43-5-1-105-104-222-226-192-202-216-223-239-218-14 3-82 23-151 44l-126 38-249-262c-138-145-252-263-255-263s-45 55-95 124c-49 68-92 121-96 117s-98-138-209-299l-201-292-138 69-139 69-223-336c-123-184-227-339-230-344s-83-20-177-33c-95-12-174-25-176-27s-52-107-111-234c-59-126-111-233-114-237-4-4-62 8-130 27-69 19-125 34-127 32-1-1-57-139-125-307-67-168-124-307-125-309-2-2-69-14-150-27-80-12-147-24-149-26-3-2-30-125-60-273-31-149-58-272-60-274-3-2-68 2-146 8-77 7-144 10-147 6-3-3-16-132-28-286s-23-281-25-283-79-18-171-36l-168-34-2-380-3-381-193-79c-139-57-192-84-192-95 0-9 29-149 65-310s65-295 63-296c-2-2-86-43-188-91s-188-90-192-93 45-170 108-371l114-365-67-65c-38-36-110-104-162-152l-93-86 136-329c75-181 136-332 136-337 0-4-58-90-128-190-71-99-132-187-136-194-6-10 62-142 290-561 15-26 21-48 16-55-5-6-66-82-135-170-70-87-127-162-127-166 0-5 108-183 239-396l240-387-90-99c-49-54-89-102-89-107s111-164 246-353c136-188 253-353 261-365 13-20 10-32-43-149-55-124-56-128-38-143 11-9 182-159 381-334l361-317-5-43c-3-23-13-105-24-182-10-77-16-141-15-143 4-3 510-150 857-248 15-4 13-20-18-141-18-74-32-137-31-139 2-1 138-21 303-42 279-37 309-43 431-86 238-83 552-155 824-188 141-17 699-17 840 0 648 79 1266 287 1860 624 111 64 378 237 494 320 46 34 67 44 62 32-4-11-35-107-68-214-397-1294-750-2359-915-2764-72-178-107-247-165-332-72-104-110-172-148-269-56-142-97-325-73-325 29 0 420 94 429 104 6 6 46 128 89 271 42 143 142 478 222 745 79 267 202 679 273 915 71 237 185 621 255 855s151 506 181 604c30 99 54 185 54 193 0 27 18 12 35-30 31-80 204-397 305-558 282-454 581-807 1323-1564l245-250 114 113c62 61 116 112 120 112s118-122 253-270c136-149 250-270 254-270 3 0 40 68 81 151s78 152 82 155c3 2 122-66 263-152 180-110 259-153 264-145 5 7 18 57 30 112l22 99h515c283 0 514 1 514 3s-20 52-44 112l-44 110 479 3c310 1 479 6 479 12s-14 58-31 116-30 106-28 108c2 1 179 26 392 56 214 30 392 57 398 60 5 4-4 44-21 95-16 49-30 94-30 100 0 7 112 32 288 64 158 29 296 55 307 58 20 4 20 7 9 141-7 75-12 138-11 138 5 5 558 214 564 214 5 0 14 4 21 9 13 8 10 15-74 227-3 5 144 82 326 169 181 88 330 164 330 170s-30 84-66 174c-53 134-63 166-52 176 7 7 105 85 218 175s210 168 217 174c9 8-1 46-42 164-30 84-55 157-55 162s101 91 225 190 225 183 225 186-56 66-124 140l-125 135 194 217c107 119 195 219 194 222 0 3-45 41-100 85-54 44-111 90-125 101l-26 21 145 289c80 159 147 294 148 299 1 6-25 25-57 44-33 18-78 44-101 57l-41 24 124 226c69 124 124 229 122 234-2 4-42 42-90 84l-87 76 28 63c15 34 72 158 126 276l98 214-39 36c-21 20-68 61-103 93l-64 56 136 261c76 144 137 263 137 265 0 3-57 23-127 46-71 24-132 46-136 50-4 3 33 128 82 276s88 270 86 272-45-6-95-18c-51-11-95-19-98-16-5 6-4 13 77 405 28 135 49 246 47 248-1 2-36-11-76-27-39-17-74-30-76-27-2 2 1 111 6 243 5 131 10 284 10 339v100l-87-10c-49-6-89-8-90-5s29 140 66 305 67 301 66 303c-2 2-53-22-114-52-91-46-111-53-111-39 0 10 9 144 20 298s20 297 20 317v37l-72-20c-40-11-81-22-90-25-17-5-18 16-18 350 0 278-3 356-12 356-7 0-53-9-102-20s-91-19-92-17c-1 1-17 106-35 232-18 127-35 233-38 237-3 3-39-7-79-24s-74-29-76-27c-3 2-15 155-27 339s-23 336-25 338c-1 2-45-15-98-39-53-23-99-39-102-36s-17 167-30 364c-12 197-23 359-24 361 0 1-43-32-96-73s-99-75-103-75-26 141-50 313c-23 171-44 319-47 328-4 14-14 14-102-6-53-12-100-20-103-16-4 3-31 143-60 309-30 167-57 309-61 315-4 7-30 0-77-21-39-18-73-32-76-32s-5 149-5 330c0 182-3 330-6 330s-49-29-101-65c-53-36-97-64-98-63-2 2-8 154-15 338-6 184-13 337-15 338-2 2-40-24-85-57-44-34-84-61-89-61-4 0-7 10-5 23 2 12 11 139 19 282s18 291 21 329l6 69-126-5c-114-5-126-4-122 11 8 27 126 657 126 673 0 10-37 25-115 48-104 30-114 35-110 54 3 12 16 71 30 131 102 438 125 539 125 551 0 10-24 14-99 16l-98 3 112 248 113 248-27 10c-14 6-61 22-104 35l-77 25 52 97c28 53 75 142 105 196 29 55 52 100 51 101-2 1-42 17-90 35-49 18-88 38-88 45s11 86 25 175c14 90 24 166 23 170-2 4-81-43-177-106z";
    var svgFlower = "M1048.256,633.499c212.849-356.854,285.555-335.845-191.845-590.438C384.889,283.217,484.493,353.496,664.566,633.499 c-310.065-285.921-239.639-396.021-620.823,0c64.157,504.336,28.591,448.084,502.257,364.911 c-416.078,181.718-421.368,113.233-191.845,590.438c503.843,103.322,428.181,97.12,502.257-364.911 c69.825,407.236,10.978,486.041,502.257,364.911c233.666-457.592,211.268-427.46-191.845-590.438 c452.881,101.063,461.097,199.985,502.257-364.911C1305.872,228.612,1381.606,318.787,1048.256,633.499z M856.411,1100.523 c-114.579,0-207.463-92.884-207.463-207.463s92.884-207.463,207.463-207.463c114.578,0,207.463,92.884,207.463,207.463 S970.989,1100.523,856.411,1100.523z"; // const svgBoth="M 10482.56 6334.99 c 2128.49 -3568.54 2855.55 -3358.45 -1918.45 -5904.38 C 3848.89 2832.17 4844.93 3534.96 6645.66 6334.99 c -3100.65 -2859.21 -2396.39 -3960.21 -6208.23 0 c 641.57 5043.36 285.91 4480.84 5022.57 3649.11 c -4160.78 1817.18 -4213.68 1132.33 -1918.45 5904.38 c 5038.43 1033.22 4281.81 971.2 5022.57 -3649.11 c 698.25 4072.36 109.78 4860.41 5022.57 3649.11 c 2336.66 -4575.92 2112.68 -4274.6 -1918.45 -5904.38 c 4528.81 1010.63 4610.97 1999.85 5022.57 -3649.11 C 13058.72 2286.12 13816.06 3187.87 10482.56 6334.99 z M 8564.11 11005.23 c -1145.79 0 -2074.63 -928.84 -2074.63 -2074.63 s 928.84 -2074.63 2074.63 -2074.63 c 1145.78 0 2074.63 928.84 2074.63 2074.63 S 9709.89 11005.23 8564.11 11005.23 z m-2000 7000-175-112-108 54c-59 30-112 54-117 54s-97-112-203-250l-193-250h-150-151l-177-188c-97-104-186-197-197-207-19-17-23-16-139 49-66 36-124 66-128 65-6 0-219-276-359-464-10-14-30-7-149 53l-138 70-26-32c-15-17-103-124-195-238-92-115-171-208-175-208s-61 25-127 55l-119 55-90-92c-50-51-149-155-220-230l-130-138-112 100c-61 55-115 100-120 100-4 0-123-122-263-269-140-148-260-270-266-270-5-1-65 39-131 88l-122 90-233-207c-129-114-264-233-300-265l-66-58-138 80-139 80-139-147c-77-81-181-189-231-240l-91-94-161 80-160 81-169-201c-93-110-176-209-184-219-15-19-19-18-174 26-87 25-162 42-167 39s-79-90-164-194c-140-171-158-188-178-181-12 5-73 30-134 56-62 26-116 45-121 43-5-1-105-104-222-226-192-202-216-223-239-218-14 3-82 23-151 44l-126 38-249-262c-138-145-252-263-255-263s-45 55-95 124c-49 68-92 121-96 117s-98-138-209-299l-201-292-138 69-139 69-223-336c-123-184-227-339-230-344s-83-20-177-33c-95-12-174-25-176-27s-52-107-111-234c-59-126-111-233-114-237-4-4-62 8-130 27-69 19-125 34-127 32-1-1-57-139-125-307-67-168-124-307-125-309-2-2-69-14-150-27-80-12-147-24-149-26-3-2-30-125-60-273-31-149-58-272-60-274-3-2-68 2-146 8-77 7-144 10-147 6-3-3-16-132-28-286s-23-281-25-283-79-18-171-36l-168-34-2-380-3-381-193-79c-139-57-192-84-192-95 0-9 29-149 65-310s65-295 63-296c-2-2-86-43-188-91s-188-90-192-93 45-170 108-371l114-365-67-65c-38-36-110-104-162-152l-93-86 136-329c75-181 136-332 136-337 0-4-58-90-128-190-71-99-132-187-136-194-6-10 62-142 290-561 15-26 21-48 16-55-5-6-66-82-135-170-70-87-127-162-127-166 0-5 108-183 239-396l240-387-90-99c-49-54-89-102-89-107s111-164 246-353c136-188 253-353 261-365 13-20 10-32-43-149-55-124-56-128-38-143 11-9 182-159 381-334l361-317-5-43c-3-23-13-105-24-182-10-77-16-141-15-143 4-3 510-150 857-248 15-4 13-20-18-141-18-74-32-137-31-139 2-1 138-21 303-42 279-37 309-43 431-86 238-83 552-155 824-188 141-17 699-17 840 0 648 79 1266 287 1860 624 111 64 378 237 494 320 46 34 67 44 62 32-4-11-35-107-68-214-397-1294-750-2359-915-2764-72-178-107-247-165-332-72-104-110-172-148-269-56-142-97-325-73-325 29 0 420 94 429 104 6 6 46 128 89 271 42 143 142 478 222 745 79 267 202 679 273 915 71 237 185 621 255 855s151 506 181 604c30 99 54 185 54 193 0 27 18 12 35-30 31-80 204-397 305-558 282-454 581-807 1323-1564l245-250 114 113c62 61 116 112 120 112s118-122 253-270c136-149 250-270 254-270 3 0 40 68 81 151s78 152 82 155c3 2 122-66 263-152 180-110 259-153 264-145 5 7 18 57 30 112l22 99h515c283 0 514 1 514 3s-20 52-44 112l-44 110 479 3c310 1 479 6 479 12s-14 58-31 116-30 106-28 108c2 1 179 26 392 56 214 30 392 57 398 60 5 4-4 44-21 95-16 49-30 94-30 100 0 7 112 32 288 64 158 29 296 55 307 58 20 4 20 7 9 141-7 75-12 138-11 138 5 5 558 214 564 214 5 0 14 4 21 9 13 8 10 15-74 227-3 5 144 82 326 169 181 88 330 164 330 170s-30 84-66 174c-53 134-63 166-52 176 7 7 105 85 218 175s210 168 217 174c9 8-1 46-42 164-30 84-55 157-55 162s101 91 225 190 225 183 225 186-56 66-124 140l-125 135 194 217c107 119 195 219 194 222 0 3-45 41-100 85-54 44-111 90-125 101l-26 21 145 289c80 159 147 294 148 299 1 6-25 25-57 44-33 18-78 44-101 57l-41 24 124 226c69 124 124 229 122 234-2 4-42 42-90 84l-87 76 28 63c15 34 72 158 126 276l98 214-39 36c-21 20-68 61-103 93l-64 56 136 261c76 144 137 263 137 265 0 3-57 23-127 46-71 24-132 46-136 50-4 3 33 128 82 276s88 270 86 272-45-6-95-18c-51-11-95-19-98-16-5 6-4 13 77 405 28 135 49 246 47 248-1 2-36-11-76-27-39-17-74-30-76-27-2 2 1 111 6 243 5 131 10 284 10 339v100l-87-10c-49-6-89-8-90-5s29 140 66 305 67 301 66 303c-2 2-53-22-114-52-91-46-111-53-111-39 0 10 9 144 20 298s20 297 20 317v37l-72-20c-40-11-81-22-90-25-17-5-18 16-18 350 0 278-3 356-12 356-7 0-53-9-102-20s-91-19-92-17c-1 1-17 106-35 232-18 127-35 233-38 237-3 3-39-7-79-24s-74-29-76-27c-3 2-15 155-27 339s-23 336-25 338c-1 2-45-15-98-39-53-23-99-39-102-36s-17 167-30 364c-12 197-23 359-24 361 0 1-43-32-96-73s-99-75-103-75-26 141-50 313c-23 171-44 319-47 328-4 14-14 14-102-6-53-12-100-20-103-16-4 3-31 143-60 309-30 167-57 309-61 315-4 7-30 0-77-21-39-18-73-32-76-32s-5 149-5 330c0 182-3 330-6 330s-49-29-101-65c-53-36-97-64-98-63-2 2-8 154-15 338-6 184-13 337-15 338-2 2-40-24-85-57-44-34-84-61-89-61-4 0-7 10-5 23 2 12 11 139 19 282s18 291 21 329l6 69-126-5c-114-5-126-4-122 11 8 27 126 657 126 673 0 10-37 25-115 48-104 30-114 35-110 54 3 12 16 71 30 131 102 438 125 539 125 551 0 10-24 14-99 16l-98 3 112 248 113 248-27 10c-14 6-61 22-104 35l-77 25 52 97c28 53 75 142 105 196 29 55 52 100 51 101-2 1-42 17-90 35-49 18-88 38-88 45s11 86 25 175c14 90 24 166 23 170-2 4-81-43-177-106z"
    // Source

    if (textId) {
      var flowerText = tweakRef(data[0].phenFlowerRef);
      var leafText = tweakRef(data[0].phenLeafRef);
      var source = '';

      if (flowerRange.length) {
        if (flowerText) {
          source = "Data for flower phenology from ".concat(flowerText, ".");
        } else {
          source = "Data for flower phenology predicted.";
        }
      }

      if (flowerRange.length && leafRange.length) {
        //source = `${source}</br>`
        source = "".concat(source, "  ");
      }

      if (leafRange.length) {
        if (leafText) {
          source = "".concat(source, "Data for leafing phenology from ").concat(leafText, ".");
        } else {
          source = "".concat(source, "Data for leafing phenology predicted.");
        }
      }

      $$7("#".concat(textId)).html(source);
    } // '#009900' '#ff9900'


    var metrics = [];
    var iMetric = 0;

    if (flowerRange.length) {
      metrics.push({
        prop: 'flower',
        label: 'Flowering',
        colour: '#fc8d62',
        svg: svgFlower,
        legendOrder: ++iMetric
      });
    }

    if (leafRange.length) {
      metrics.push({
        prop: 'leaf',
        label: 'In leaf',
        colour: '#66c2a5',
        svg: svgLeaf,
        legendOrder: ++iMetric
      });
    } // if (overlapRange.length) {
    //   metrics.push({ prop: 'both', label: 'In leaf & flowering', colour: '#8da0cb', svg: svgBoth , svgScale: 1.4, legendOrder: 3})
    // }


    return chart.setChartOpts({
      data: [{
        taxon: 'taxon',
        leaf: leafRange.map(function (r) {
          return {
            start: r[0],
            end: r[1]
          };
        }),
        flower: flowerRange.map(function (r) {
          return {
            start: r[0],
            end: r[1]
          };
        }) //both: overlapRange.map(r => {return {start: r[0], end: r[1]}}),

      }],
      metrics: metrics
    });

    function tweakRef(ref) {
      var $tmp = $$7('<div>');
      $tmp.html(ref); // Replace 'Poland, J. personal observation' with 'John Poland, personal observation'

      var $span1 = $tmp.children('span').eq(0);
      var $span2 = $tmp.children('span').eq(1);

      if ($span1 && $span2 && $span1.text() === 'Poland, J.' && $span2.text() === 'personal observation') {
        $span1.text('John Poland,');
      }

      return $tmp.html();
    }
  }
  function apparencyByLat(chart, data) {
    // Map text to numeric values and add taxon
    var dataType = $$7('#atlas-lat-phen-data-type').val(); //console.log('dataType', dataType)

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

  var isnumber = isNumber;
  /**
   * Determine if something is a non-infinite javascript number.
   * @param  {Number}  n A (potential) number to see if it is a number.
   * @return {Boolean}   True for non-infinite numbers, false for all else.
   */

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  var percentile_1 = percentile;

  function numbers(vals) {
    var nums = [];
    if (vals == null) return nums;

    for (var i = 0; i < vals.length; i++) {
      if (isnumber(vals[i])) nums.push(+vals[i]);
    }

    return nums;
  }

  function nsort(vals) {
    return vals.sort(function numericSort(a, b) {
      return a - b;
    });
  }

  function percentile(vals, ptile) {
    vals = numbers(vals);
    if (vals.length === 0 || ptile == null || ptile < 0) return NaN; // Fudge anything over 100 to 1.0

    if (ptile > 1) ptile = 1;
    vals = nsort(vals);
    var i = vals.length * ptile - 0.5;
    if ((i | 0) === i) return vals[i]; // interpolated percentile -- using Estimation method

    var int_part = i | 0;
    var fract = i - int_part;
    return (1 - fract) * vals[int_part] + fract * vals[Math.min(int_part + 1, vals.length - 1)];
  }

  var $$6 = jQuery; // eslint-disable-line no-undef

  var ds$4 = drupalSettings; // eslint-disable-line no-undef

  var gam, linmod, bar, density;
  var $gamNoData, $linmodNoData, $barNoData, $densityNoData;
  var regionType = getCookie('trend-region') ? getCookie('trend-region') : 'Britain';
  var termType = getCookie('trend-term') ? getCookie('trend-term') : 'long';
  var scaleType = getCookie('trend-scale') ? getCookie('trend-scale') : 'within';
  var scaleTypeDensity = getCookie('trend-scale-density') ? getCookie('trend-scale-density') : 'max';
  var currentTaxon$2;
  function createTrends(sel) {
    $$6('<h4 id="bsbiTrendsTitle">').appendTo($$6(sel)).text('');
    $$6('<p id="bsbiTrendsAggNote">').appendTo($$6(sel)).text('');
    var $trends1 = $$6('<div>').appendTo($$6(sel));
    $trends1.attr('class', 'phenRow');
    var $trends2 = $$6('<div>').appendTo($$6(sel));
    $trends2.attr('class', 'phenRow');
    var $p1 = $$6('<p>').appendTo($$6(sel));
    $p1.html("\n  The trends above rely on the frequency scaling using local occupancy (\u201CFrescalo\u201D) approach of Hill (2012). \n  The method was designed to adjust for locally variable recording effort across time periods, \n  and has been used on many distribution datasets (Pescott et al., 2019). Here, we apply \n  Frescalo to vascular plant data gridded at the 10 km scale within the following time \n  periods: 1930\u201369; 1987\u201399; 2000\u201309; 2010\u201319. These are a subset of the \u201Cdate-classes\u201D used \n  by the BSBI to organise their data, and roughly designate multi-year periods within which \n  specific national recording projects occurred (Preston et al., 2002).\n  ");
    var $p2 = $$6('<p>').appendTo($$6(sel));
    $p2.html("\n  Outputs from the Frescalo model include per taxon/time period estimates of mean relative occupancy and \n  their standard deviations. Below, we plot these estimates (filled white circles with black lines) \n  in Figures 1 and 2, along with a GAM smoother (Fig. 1) and a Monte Carlo-based 100-member set of \n  linear regressions compatible with these (Fig. 2). The trend magnitude frequency chart in Figure \n  3 is based on discretising the compatible linear trend set displayed in Figure 2, in order to \n  more clearly display the model-based uncertainty associated with the Frescalo outputs. \n  Pescott et al. (2022) describe the rationale for this in more detail. Finally, Figure 4 \u2026 [TO BE COMPLETED].\n  ");
    var $p3 = $$6('<p>').appendTo($$6(sel));
    $p3.html("\n  [NEW PARAGRAPH: OTHER TEXT ABOUT DECISIONS WITH REGARDS TO INCLUDING AND EXCLUDING SPECIES IN MODELLING AND/OR DISPLAY]\n  ");
    $$6('<h4>').appendTo($$6(sel)).text('References');
    var $ref;
    $ref = $$6('<p>').appendTo($$6(sel));
    $ref.html("\n  Hill, M.O. 2012. Local frequency as a key to interpreting species occurrence data when recording effort is not known. \n  <i>Methods in Ecology and Evolution</i> 3, 195\u2013205.\n  ");
    $ref = $$6('<p>').appendTo($$6(sel));
    $ref.html("\n  Pescott, O.L., Humphrey, T.A., Stroh, P.A., Walker, K.J. 2019. Temporal changes in distributions and the species \n  atlas: How can British and Irish plant data shoulder the inferential burden? <i>British & Irish Botany</i> 1, 250\u2013282. \n  <a href=\"https://doi.org/10.33928/bib.2019.01.250\" target=\"_blank\">https://doi.org/10.33928/bib.2019.01.250</a>\n  ");
    $ref = $$6('<p>').appendTo($$6(sel));
    $ref.html("\n  Pescott, O.L., Stroh, P.A., Humphrey, T.A. and Walker, K.J. 2022. Simple methods for improving the communication \n  of uncertainty in species\u2019 temporal trends. <i>Ecological Indicators</i>, 141, 109117. \n  <a href=\"https://doi.org/10.1016/j.ecolind.2022.109117\" target=\"_blank\">https://doi.org/10.1016/j.ecolind.2022.109117</a>\n  ");
    $ref = $$6('<p>').appendTo($$6(sel));
    $ref.html("\n  Preston, C.D., Pearman, D.A., Dines, T.D. (Eds.) 2002. <i>New Atlas of the British and Irish Flora</i>. Oxford University \n  Press, Oxford, England.\n  ");
    var $gam = $$6('<div>').appendTo($trends1);
    $gam.attr('id', 'bsbi-gam-chart').attr('class', 'phenColumn').css('max-width', '400px').css('position', 'relative').text('Figure 1');
    gam = brccharts.trend2({
      selector: '#bsbi-gam-chart',
      data: [],
      means: [],
      // yearMin: 1947,
      // yearMax: 2022,
      width: 350,
      height: 250,
      margin: {
        left: 50,
        right: 10,
        top: 10,
        bottom: 55
      },
      expand: true,
      axisLeft: 'tick',
      axisBottom: 'tick',
      axisRight: 'on',
      axisTop: 'on',
      axisLeftLabel: 'Relative frequency',
      axisLabelFontSize: 12,
      style: {
        vStroke: 'blue',
        vStrokeWidth: 2,
        cStroke: 'grey',
        cStrokeWidth: 0.5,
        cFill: 'rgb(230,230,230)',
        mRad: 3,
        mFill: 'white',
        mStroke: 'black',
        sdStroke: 'black'
      }
    });
    $gamNoData = $$6('<div>').appendTo($gam);
    $gamNoData.text('No trend available for this combination').css('position', 'absolute').css('margin', '3em').css('top', '0px').css('left', '50px').css('display', 'none');
    var $linmod = $$6('<div>').appendTo($trends1);
    $linmod.attr('id', 'bsbi-linmod-chart').attr('class', 'phenColumn').css('max-width', '400px').css('position', 'relative').text('Figure 2');
    linmod = brccharts.trend3({
      selector: '#bsbi-linmod-chart',
      data: [],
      means: [],
      // yearMin: 1947,
      // yearMax: 2022,
      width: 350,
      height: 250,
      margin: {
        left: 50,
        right: 10,
        top: 10,
        bottom: 55
      },
      expand: true,
      axisLeft: 'tick',
      axisBottom: 'tick',
      axisRight: 'on',
      axisTop: 'on',
      axisLeftLabel: 'Relative frequency',
      axisLabelFontSize: 12,
      style: {
        vStroke: 'blue',
        vStrokeWidth: 2,
        vOpacity: 0.05,
        mRad: 3,
        mFill: 'white',
        mStroke: 'black',
        sdStroke: 'black'
      }
    });
    $linmodNoData = $$6('<div>').appendTo($linmod);
    $linmodNoData.text('No trend available for this combination').css('position', 'absolute').css('margin', '3em').css('top', '0px').css('left', '50px').css('display', 'none'); // Trend density plot

    var $density = $$6('<div>').appendTo($trends2);
    $density.attr('id', 'bsbi-density-chart').attr('class', 'phenColumn').css('max-width', '400px').css('position', 'relative').text('Figure 3');
    density = brccharts.density({
      selector: '#bsbi-density-chart',
      data: [],
      ylines: [],
      xlines: [],
      width: 350,
      height: 250,
      padding: 0.1,
      margin: {
        left: 50,
        right: 10,
        top: 10,
        bottom: 45
      },
      expand: true,
      axisLeft: 'on',
      axisBottom: 'tick',
      axisRight: 'on',
      axisTop: 'on',
      axisLeftLabel: 'Density',
      axisBottomLabel: 'Slope',
      axisLabelFontSize: 12,
      styles: [{
        stroke: 'blue',
        strokeWidth: 1
      }, {
        stroke: 'grey',
        strokeWidth: 1
      }]
    });
    $densityNoData = $$6('<div>').appendTo($density);
    $densityNoData.text('No trend available for this combination').css('position', 'absolute').css('margin', '3em').css('top', '0px').css('left', '50px').css('display', 'none'); // Trend overview

    var $bar = $$6('<div>').appendTo($trends2);
    $bar.attr('id', 'bsbi-bar-chart').attr('class', 'phenColumn').css('max-width', '400px').css('position', 'relative').text('Figure 4');
    bar = brccharts.bar({
      selector: '#bsbi-bar-chart',
      data: [],
      width: 350,
      height: 250,
      padding: 0.1,
      margin: {
        left: 50,
        right: 10,
        top: 10,
        bottom: 85
      },
      expand: true,
      axisLeft: 'tick',
      axisBottom: 'tick',
      axisRight: 'none',
      axisTop: 'none',
      axisLeftLabel: 'Frequency',
      axisLabelFontSize: 12,
      labelPosition: {
        'text-anchor': 'end',
        dx: '-1em',
        dy: '0.2em',
        transform: 'rotate(-55)'
      }
    });
    $barNoData = $$6('<div>').appendTo($bar);
    $barNoData.text('No trend available for this combination').css('position', 'absolute').css('margin', '3em').css('top', '0px').css('left', '50px').css('display', 'none');
  }
  function changeTrends(taxon) {
    if (taxon) {
      currentTaxon$2 = taxon;
    }

    if (!currentTaxon$2.identifier) return; // Set title to reflect user selection

    var termTypeText = termType === 'short' ? 'Post-1987' : 'Post-1930';
    var regionTypeText;

    if (regionType === 'Northern') {
      regionTypeText = 'Northern Ireland';
    } else if (regionType === 'Republic') {
      regionTypeText = 'Republic of Ireland';
    } else {
      regionTypeText = regionType;
    }

    $$6('#bsbiTrendsTitle').html("<b>".concat(termTypeText, "</b> effort-adjusted 10 km distribution trends for <b>").concat(regionTypeText, "</b>"));

    if (currentTaxon$2["".concat(termType, "TrendAgg")]) {
      setTrendsAggHtml(currentTaxon$2, termType, $$6('#bsbiTrendsAggNote'));
    } else {
      $$6('#bsbiTrendsAggNote').html('');
    }

    loadData().then(function (d) {
      // Set flag to exclude if data deficient
      var dTrendCounts = d[6];
      var dataDeficient = true;

      if (dTrendCounts.status === 'fulfilled') {
        //console.log('Trend counts', dTrendCounts.value[0])
        if (regionType === 'Britain' || regionType === 'England' || regionType === 'Scotland' || regionType === 'Wales') {
          if (termType === 'long') {
            dataDeficient = dTrendCounts.value[0].GbLong <= 15;
          } else {
            dataDeficient = dTrendCounts.value[0].GbShort <= 15;
          }
        } else {
          if (termType === 'long') {
            dataDeficient = dTrendCounts.value[0].IrLong <= 6;
          } else {
            dataDeficient = dTrendCounts.value[0].IrShort <= 6;
          }
        }
      }

      var gamData, linmodData, barData, densityData;

      if (d[0].status === 'fulfilled' && !dataDeficient) {
        $gamNoData.hide(); // If termType is short, add extra points to start of array to make 
        // for smooth transitions between long and short term trends

        if (termType === 'short') {
          gamData = [];

          for (var i = 0; i < 44; i++) {
            gamData.push(d[0].value[0]);
          }

          gamData = [].concat(_toConsumableArray(gamData), _toConsumableArray(d[0].value));
        } else {
          gamData = d[0].value;
        }
      } else {
        gamData = [];
        $gamNoData.show();
      }

      if (d[1].status === 'fulfilled' && !dataDeficient) {
        linmodData = d[1].value;
        densityData = [linmodData.map(function (d) {
          return {
            slope: Number(d.gradient)
          };
        })];
        $linmodNoData.hide();
        $densityNoData.hide();
      } else {
        linmodData = [];
        densityData = [];
        $linmodNoData.show();
        $densityNoData.show();
      }

      var meanLinmodData = d[4].status === 'fulfilled' && !dataDeficient ? d[4].value : [];

      if (densityData.length) {
        densityData.push(meanLinmodData);
      }

      var linmodCentiles = d[5].status === 'fulfilled' && !dataDeficient ? d[5].value : [];
      var means = d[2].status === 'fulfilled' && !dataDeficient ? d[2].value : []; // Reverse the order of means to make for smooth transitions between
      // short and long term trends

      means.reverse();

      if (d[3].status === 'fulfilled' && !dataDeficient) {
        barData = d[3].value[0];
        $barNoData.hide();
      } else {
        barData = [];
        $barNoData.show();
      }

      var yMin, yMax;

      if (scaleType === 'across') {
        yMin = -0.2;
        yMax = 1;
      }

      gam.updateChart(gamData, means, termType === 'long' ? 1947 : 1990, 2022, yMin, yMax, true, [{
        y: 0,
        stroke: 'rgb(210,210,210)',
        strokeWidth: 1
      }]);
      linmod.updateChart(linmodData, means, termType === 'long' ? 1947 : 1990, 2022, yMin, yMax, true, [{
        y: 0,
        stroke: 'rgb(210,210,210)',
        strokeWidth: 1
      }]);
      bar.updateChart(barData);
      var xlines = [{
        x: -0.004,
        stroke: 'silver',
        strokeWidth: 1,
        strokeDasharray: '3 3'
      }, {
        x: -0.001,
        stroke: 'silver',
        strokeWidth: 1,
        strokeDasharray: '3 3'
      }, {
        x: 0,
        stroke: 'silver',
        strokeWidth: 1
      }, {
        x: 0.001,
        stroke: 'silver',
        strokeWidth: 1,
        strokeDasharray: '3 3'
      }, {
        x: 0.004,
        stroke: 'silver',
        strokeWidth: 1,
        strokeDasharray: '3 3'
      }];
      var limmodCentile = linmodCentiles.find(function (l) {
        return l.region === regionType;
      });

      if (densityData.length) {
        // In general, density slopes of individual taxon will be within the overall
        // density slope. But for outliers, we adjust the x axis limits based on
        // the density slope for the taxon.
        var dd = densityData[0].map(function (d) {
          return d.slope;
        });
        var dp95 = percentile_1(dd, 0.95);
        var dp5 = percentile_1(dd, 0.05);
        var xmax = limmodCentile.c95 > dp95 ? limmodCentile.c95 : dp95;
        var xmin = limmodCentile.c5 < dp5 ? limmodCentile.c5 : dp5;
        density.updateChart(densityData, xmin, xmax, xlines, null, scaleTypeDensity === 'max');
      } else {
        density.updateChart([]);
      }
    });
  }

  function loadData() {
    var tIdentifier = currentTaxon$2["".concat(termType, "TrendAgg")] ? currentTaxon$2["".concat(termType, "TrendAgg")] : currentTaxon$2.identifier;
    var trendsRoot = ds$4.bsbi_atlas.dataRoot + 'bsbi/trends/';
    var trendCountRoot = ds$4.bsbi_atlas.dataRoot + 'bsbi/trends/hectad-counts';
    var pTrendCounts = d3__namespace.csv("".concat(trendCountRoot, "/").concat(tIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache));
    var pGam = d3__namespace.csv("".concat(trendsRoot).concat(termType, "/trends-gam/").concat(regionType, "/").concat(tIdentifier.replace(/\./g, "_"), ".csv?").concat(pcache), function (d) {
      return {
        year: Number(d.year),
        value: Number(d.x50),
        upper: Number(d.x95),
        lower: Number(d.x5)
      };
    });
    var pLinmod = d3__namespace.csv("".concat(trendsRoot).concat(termType, "/trends-linmod/").concat(regionType, "/").concat(tIdentifier.replace(/\./g, "_"), ".csv?").concat(pcache), function (d) {
      return {
        gradient: Number(d.gradient),
        intercept: Number(d.intercept)
      };
    });
    var pMeans = d3__namespace.csv("".concat(trendsRoot).concat(termType, "/trends-lt-mean-sd/").concat(regionType, "/").concat(tIdentifier.replace(/\./g, "_"), ".csv?").concat(pcache), function (d) {
      return {
        year: Number(d.year),
        mean: Number(d.mean),
        sd: Number(d.std)
      };
    });
    var pSummaries = d3__namespace.csv("".concat(trendsRoot).concat(termType, "/trends-summaries/").concat(regionType, "/").concat(tIdentifier.replace(/\./g, "_"), ".csv?").concat(pcache), function (d) {
      return [{
        value: Number(d.declineStrong),
        label: 'Strong decline',
        stroke: 'grey',
        strokeWidth: 1,
        fill: 'rgb(230,230,230)'
      }, {
        value: Number(d.declineMod),
        label: 'Moderate decline',
        stroke: 'grey',
        strokeWidth: 1,
        fill: 'rgb(230,230,230)'
      }, {
        value: Number(d.stable),
        label: 'Stable',
        stroke: 'grey',
        strokeWidth: 1,
        fill: 'rgb(230,230,230)'
      }, {
        value: Number(d.increaseMod),
        label: 'Moderate increase',
        stroke: 'grey',
        strokeWidth: 1,
        fill: 'rgb(230,230,230)'
      }, {
        value: Number(d.increaseStrong),
        label: 'Strong increase',
        stroke: 'grey',
        strokeWidth: 1,
        fill: 'rgb(230,230,230)'
      }];
    });
    var pLinmodMeans = d3__namespace.csv("".concat(trendsRoot).concat(termType, "/trends-linmod/").concat(regionType, "/mean-gradients.csv?").concat(pcache), function (d) {
      return {
        slope: Number(d.gradient)
      };
    });
    var pLinmodCentiles = d3__namespace.csv("".concat(trendsRoot).concat(termType, "/trends-linmod/centiles.csv?").concat(pcache), function (d) {
      return {
        region: d.region,
        c5: Number(d.c5),
        c95: Number(d.c95)
      };
    });
    return Promise.allSettled([pGam, pLinmod, pMeans, pSummaries, pLinmodMeans, pLinmodCentiles, pTrendCounts]);
  }

  function createTrendControls(selector) {
    regionSelector(trendControlRow(selector));
    termSelector(trendControlRow(selector));
    scalingSelector(trendControlRow(selector));
    scalingSelector2(trendControlRow(selector));
  }
  function setTrendsAggHtml(currentTaxon, termType, $ctl) {
    //const captionRoot = ds.bsbi_atlas.dataRoot + 'bsbi/captions/'
    // const pCaptions = []
    // currentTaxon.trendAggTaxa.split(',').forEach(ddbid => {
    //   const captionFile = `${captionRoot}${ddbid.replace(/\./g, "_")}.csv?prevent-cache=${pcache}`
    //   pCaptions.push(d3.csv(captionFile))
    // })
    // Promise.allSettled(pCaptions).then(captions => {
    //   console.log(captions)
    //   const aggTaxa = captions.map(c => c.value[0].formattedName).join(', ')
    //   const html = `(Trend for aggregate taxon <i>${currentTaxon[termType + 'TrendAggName'].replace('agg.', '</i>agg.<i>' )}</i>) ${aggTaxa}`
    //   $ctl.html(html)
    // })
    $ctl.html('');
    var $span1 = $$6('<span>').appendTo($ctl);
    $span1.html("(Trend for aggregate taxon ".concat(enrichName(currentTaxon[termType + 'TrendAggName'])));
    console.log(currentTaxon.trendAggTaxaNames, currentTaxon.trendAggTaxa);
    var aggTaxa = currentTaxon.trendAggTaxaNames.split(',').map(function (t, i) {
      return enrichName(t, currentTaxon.trendAggTaxa.split(',')[i]);
    }).join(', '); // Replace last comma with 'and'

    var lastIndex = aggTaxa.lastIndexOf(', ');
    aggTaxa = "".concat(aggTaxa.substring(0, lastIndex), " and ").concat(aggTaxa.substring(lastIndex + 1));
    var $span2 = $$6('<span>').appendTo($ctl);
    $span2.css('display', 'none');
    $span2.html(" - comprises ".concat(aggTaxa));
    var $span3 = $$6('<span>').appendTo($ctl);
    $span3.css('cursor', 'pointer');
    $span3.data('data-val', 'hide');
    $span3.html(' - <b>[show more]</b>)');
    $span3.on('click', function () {
      if ($$6(this).data('data-val') === 'hide') {
        $$6(this).data('data-val', 'show');
        $$6(this).html(' - <b>[show less]</b>)');
        $span2.show();
      } else {
        $$6(this).data('data-val', 'hide');
        $$6(this).html(' - <b>[show more]</b>)');
        $span2.hide();
      }
    });

    function enrichName(name, ddbid) {
      // Remove italics (use reversed italics tab) from some strinbs
      var ret = "<i>".concat(name, "</i>");
      var noItalics = ['agg.', 's.s.', 's.l.', 'subsp.', '='];
      noItalics.forEach(function (ni) {
        ret = ret.replace(ni, "</i>".concat(ni, "<i>"));
      }); // Replace x with ×

      ret = ret.replace(/ x /g, ' × ');

      if (ddbid) {
        ret = "<a href=\"/atlas/".concat(ddbid, "\">").concat(ret, "</a>");
      }

      return ret;
    }
  }

  function trendControlRow(selector, classname) {
    var $div = $$6('<div>').appendTo($$6(selector));
    $div.addClass('atlas-trend-control-row');

    if (classname) {
      $div.addClass(classname);
    }

    return $div;
  }

  function regionSelector($parent) {
    var regions = [{
      caption: 'Britain',
      val: 'Britain'
    }, {
      caption: 'Ireland',
      val: 'Ireland'
    }, {
      caption: 'England',
      val: 'England'
    }, {
      caption: 'Scotland',
      val: 'Scotland'
    }, {
      caption: 'Wales',
      val: 'Wales'
    }, {
      caption: 'Northern Ireland',
      val: 'Northern'
    }, {
      caption: 'Republic of Ireland',
      val: 'Republic'
    }]; // Region selector

    var $sel = $$6('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-trends-regions-control');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      regionType = $$6(this).val();
      setCookie('trend-region', regionType, 30);
      changeTrends();
    });
    regions.forEach(function (b) {
      var $opt = b.selected ? $$6('<option>') : $$6('<option>');
      $opt.attr('value', b.val);
      $opt.html(b.caption).appendTo($sel);
    });
    $sel.val(regionType); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function termSelector($parent) {
    var terms = [{
      caption: 'Long-term trend (post-1930)',
      val: 'long'
    }, {
      caption: 'Short-term trend (post-1987)',
      val: 'short'
    }]; // Term type selector

    var $sel = $$6('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-trends-term-control');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      termType = $$6(this).val();
      setCookie('trend-term', termType, 30);
      changeTrends();
    });
    terms.forEach(function (b) {
      var $opt = b.selected ? $$6('<option>') : $$6('<option>');
      $opt.attr('value', b.val);
      $opt.html(b.caption).appendTo($sel);
    });
    $sel.val(termType); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function scalingSelector($parent) {
    var scales = [{
      caption: 'Scale trends to species',
      val: 'within'
    }, {
      caption: 'Scale trends across species',
      val: 'across'
    }]; // Scale (y axis) selector

    var $sel = $$6('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-trends-scale-control');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      scaleType = $$6(this).val();
      setCookie('trend-scale', scaleType, 30);
      changeTrends();
    });
    scales.forEach(function (b) {
      var $opt = b.selected ? $$6('<option>') : $$6('<option>');
      $opt.attr('value', b.val);
      $opt.html(b.caption).appendTo($sel);
    });
    $sel.val(scaleType); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function scalingSelector2($parent) {
    var scales = [{
      caption: 'Scale density plot to max',
      val: 'max'
    }, {
      caption: 'Scale density plot to area',
      val: 'area'
    }]; // Scale (y axis) selector

    var $sel = $$6('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-trends-density-scale-control');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      scaleTypeDensity = $$6(this).val();
      setCookie('trend-scale-density', scaleTypeDensity, 30);
      changeTrends();
    });
    scales.forEach(function (b) {
      var $opt = b.selected ? $$6('<option>') : $$6('<option>');
      $opt.attr('value', b.val);
      $opt.html(b.caption).appendTo($sel);
    });
    $sel.val(scaleTypeDensity); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  var $$5 = jQuery; // eslint-disable-line no-undef

  drupalSettings; // eslint-disable-line no-undef

  function createConservation(sel) {
    console.log('Creating');
    var $sect = $$5(sel);
    var $tr;
    var $table = $$5('<table id="bsbi-conservation-table">').appendTo($sect);
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td style="font-weight: bold">').text('Rarity').appendTo($tr);
    $$5('<td style="font-weight: bold">').text('Categories').appendTo($tr);
    $$5('<td style="font-weight: bold">').text('Links').appendTo($tr);
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').html('Rare or scarce Great Britain (revised 2022)<span class="ss">1</span>').appendTo($tr);
    $$5('<td id="bsbi-conservation-rarity-gb">').appendTo($tr);
    $$5('<td>').appendTo($tr);
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').html('Rare or scarce Ireland (revised 2022)<span class="ss">2</span>').appendTo($tr);
    $$5('<td id="bsbi-conservation-rarity-ir">').appendTo($tr);
    $$5('<td>').appendTo($tr);
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td colspan="3">').appendTo($tr);
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td style="font-weight: bold">').html('Threat<span class="ss">3</span>').appendTo($tr);
    $$5('<td>').appendTo($tr);
    $$5('<td>').appendTo($tr);
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('Great Britain Red List (revised Feb 2021)').appendTo($tr);
    $$5('<td id="bsbi-conservation-threat-gb">').appendTo($tr);
    var $l1 = genLink('https://hub.jncc.gov.uk/assets/cc1e96f8-b105-4dd0-bd87-4a4f60449907');
    var $l2 = genLink('https://bsbi.org/taxon-lists');
    $$5('<td>').appendTo($tr).html("".concat($l1[0].outerHTML, " (revised Feb 2021 ").concat($l2[0].outerHTML, ")"));
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('England Red List (2014)').appendTo($tr);
    $$5('<td id="bsbi-conservation-threat-en">').appendTo($tr);
    $$5('<td>').appendTo($tr).append(genLink('https://bsbi.org/england'));
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('Wales Red List (2008)').appendTo($tr);
    $$5('<td id="bsbi-conservation-threat-wa">').appendTo($tr);
    $$5('<td>').appendTo($tr).append(genLink('https://www.plantlife.org.uk/uk/our-work/publications/vascular-plant-red-data-list-wales'));
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('Ireland Red List (2015)').appendTo($tr);
    $$5('<td id="bsbi-conservation-threat-ir">').appendTo($tr);
    $$5('<td>').appendTo($tr).append(genLink('https://www.npws.ie/publications/red-lists'));
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td colspan="3">').appendTo($tr);
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td style="font-weight: bold">').text('Conservation designation').appendTo($tr);
    $$5('<td>').appendTo($tr);
    $$5('<td>').appendTo($tr);
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('Schedule 8 (Great Britain)').appendTo($tr);
    $$5('<td id="bsbi-conservation-designation-gb-sched8">').appendTo($tr);
    $$5('<td>').appendTo($tr).append(genLink('https://www.legislation.gov.uk/ukpga/1981/69/schedule/8'));
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('Schedule 8 (Northern Ireland)').appendTo($tr);
    $$5('<td id="bsbi-conservation-designation-ni-sched8">').appendTo($tr);
    $$5('<td>').appendTo($tr).append(genLink('https://www.legislation.gov.uk/nisi/1985/171/contents'));
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('Irish Flora (Protection) Order (revised 2022)').appendTo($tr);
    $$5('<td id="bsbi-conservation-designation-ifpo">').appendTo($tr);
    $$5('<td>').appendTo($tr).append(genLink('https://cedrec.com/legislation/56058/56059/fulltext'));
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('England NERC list (Section 41)').appendTo($tr);
    $$5('<td id="bsbi-conservation-designation-en-s41">').appendTo($tr);
    $$5('<td>').appendTo($tr).append(genLink('http://publications.naturalengland.org.uk/publication/4958719460769792'));
    $tr = $$5('<tr>').appendTo($table);
    $$5('<td>').text('Wales NERC list (Section 7)').appendTo($tr);
    $$5('<td id="bsbi-conservation-designation-wa-s41">').appendTo($tr);
    $$5('<td>').appendTo($tr).append(genLink('https://www.biodiversitywales.org.uk/Section-7'));
    var $refs = $$5('<div style="font-size: 0.8em; margin: 0.5em 0 1em 0">').appendTo($sect);
    $$5('<span style="vertical-align: super">').text('1').appendTo($refs);
    $$5('<span>').text(' Rare - species recorded in 15 or fewer hectads in GB 2000-2019; scarce - species recorded in 16-100 hectads in GB 2000-2019; not rare or scarce - species recorded in more than 100 hectads in GB 2000-2019.').appendTo($refs);
    $refs.append($$5('<br/>'));
    $$5('<span style="vertical-align: super">').text('2').appendTo($refs);
    $$5('<span>').text(' Rare - species recorded in 10 or fewer hectads in Ireland 2000-2019; scarce - species recorded in 11-25 hectads in Ireland 2000-2019; not rare or scarce - species recorded in more than 25 hectads in Ireland 2000-2019.').appendTo($refs);
    $refs.append($$5('<br/>'));
    $$5('<span style="vertical-align: super">').text('3').appendTo($refs);
    $$5('<span>').text(' EX – extinct; EW – extinct in the wild; RE – regionally extinct; CR – critically endangered; EN – endangered; VU – vulnerable; NT – near threatened; LC – least concern; WL – waiting list; PL – parking list.').appendTo($refs);
    var $p1 = $$5('<p>').appendTo($sect);
    $p1.text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');

    function genLink(url) {
      var $a = $$5('<a>');
      $a.attr('href', url);
      $a.attr('target', '_blank');
      $a.text(url);
      return $a;
    }
  }
  function changeConservation(taxon) {
    // 'statusGB','statusIE','statusCI','csRedListEngland','csRedListWales','csRedListIreland','csRedDataList2005','csRedDataList2021', 'csRareScarceIr2020', 'csRareScarceGb2020'
    console.log('update conservation table ', taxon);
    $$5('#bsbi-conservation-rarity-gb').text(taxon['csRareScarceGb2020'] ? taxon['csRareScarceGb2020'] : 'not rare or scarce');
    $$5('#bsbi-conservation-rarity-ir').text(taxon['csRareScarceIr2020'] ? taxon['csRareScarceIr2020'] : 'not rare or scarce');
    $$5('#bsbi-conservation-threat-gb').text(taxon['csRedDataList2021']);
    $$5('#bsbi-conservation-threat-en').text(taxon['csRedListEngland']);
    $$5('#bsbi-conservation-threat-wa').text(taxon['csRedListWales']);
    $$5('#bsbi-conservation-threat-ir').text(taxon['csRedListIreland']);
    $$5('#bsbi-conservation-designation-gb-sched8').text('');
    $$5('#bsbi-conservation-designation-ni-sched8').text('');
    $$5('#bsbi-conservation-designation-ifpo').text('');
    $$5('#bsbi-conservation-designation-en-s41').text('');
    $$5('#bsbi-conservation-designation-wa-s41').text('');
  }

  var $$4 = jQuery; // eslint-disable-line no-undef

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
          //console.log(img.replace('{PIXELSIZE}', '192'))
          return {
            src: img.replace('{PIXELSIZE}', '1920'),
            thumb: img.replace('{PIXELSIZE}', '192'),
            subHtml: "\n              <div class=\"lightGallery-captions\">\n                <div style=\"background-color: black; opacity: 0.7\">\n                <p style=\"margin: 0.3em\">Copyright Rob Still/Chris Gibson</p>\n                <div>\n              </div>"
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
            $$4('#bsbi-gallery-copyright').show();
          }, 200);
        } else {
          lgContainer.innerHTML = "No images are available for this taxon";
          $$4('#bsbi-gallery-copyright').hide();
        }
      });
    }
  }

  var $$3 = jQuery; // eslint-disable-line no-undef

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
    caption: '1930–1969'
  }, {
    min: 1970,
    max: 1986,
    access: 'status_70_86',
    caption: '1970–1986'
  }, {
    min: 1987,
    max: 1999,
    access: 'status_87_99',
    caption: '1987–1999'
  }, {
    min: 2000,
    max: 2019,
    access: 'status_00_19',
    caption: '2000–2019'
  }];
  var trends = [{
    lower: '1930–69',
    upper: '2000–19',
    access: 'change_1930_1969_vs_2000_2019',
    caption: '1930–69 vs 2000–19'
  }, {
    lower: '1987–99',
    upper: '2000–19',
    access: 'change_1987_1999_vs_2000_2019',
    caption: '1987–99 vs 2000–19'
  }];

  function mapControlRow(selector, classname) {
    var $div = $$3('<div>').appendTo($$3(selector));
    $div.addClass('atlas-map-control-row');

    if (classname) {
      $div.addClass(classname);
    }

    return $div;
  }

  function setControlState() {
    // map display
    if (displayedMapType === "static") {
      $$3('#slippyAtlasMain').hide();
      $$3('#staticAtlasMain').show();
    } else {
      $$3('#staticAtlasMain').hide();
      $$3('#slippyAtlasMain').show();
    } // save map image button


    if (displayedMapType === 'static') {
      $$3('.atlas-save-map-image').show();
    } else {
      $$3('.atlas-save-map-image').hide();
    } // download map data button


    $$3('.atlas-download-map-data').show();

    if (mapType === 'allclass' && resolution === 'hectad') {
      $$3('.atlas-download-map-data input, .atlas-download-map-data button').attr('disabled', false);
    } else {
      $$3('.atlas-download-map-data input, .atlas-download-map-data button').attr('disabled', true);
    } // backdrop selector


    if (displayedMapType === "static") {
      $$3('.atlas-backdrop-selector').show();
    } else {
      $$3('.atlas-backdrop-selector').hide();
    } // inset control


    if (displayedMapType === "static") {
      $$3('.atlas-inset-control').show();
    } else {
      $$3('.atlas-inset-control').hide();
    } // grid type control


    if (displayedMapType === "static") {
      $$3('.atlas-grid-type-control').show();
    } else {
      $$3('.atlas-grid-type-control').hide();
    } // boundary type control
    // if (displayedMapType === "static") {
    //   $('.atlas-boundaries-control').show()
    // } else {
    //   $('.atlas-boundaries-control').hide()
    // }
    // period slider visibility


    if (mapType === 'status') {
      $$3('.atlas-period-slider-control').show();
    } else {
      $$3('.atlas-period-slider-control').hide();
    } // trend slider control


    if (mapType === 'trends') {
      $$3('.atlas-trend-slider-control').show();
    } else {
      $$3('.atlas-trend-slider-control').hide();
    } // show status checkbox


    if (mapType === 'allclass' || mapType === 'slippy') {
      $$3('.atlas-status-checkbox-control').show();
    } else {
      $$3('.atlas-status-checkbox-control').hide();
    } // show opacity slider


    if (displayedMapType === 'slippy') {
      $$3('.atlas-opacity-slider-control').show();
    } else {
      $$3('.atlas-opacity-slider-control').hide();
    } // status checkbox enabled and checked value


    var disableStatus = currentTaxon$1.noStatus || currentTaxon$1.isHybrid;
    var isHybrid = currentTaxon$1.hybridMapping;

    if (disableStatus || isHybrid) {
      showStatus = false;
      bsbiDataAccess.showStatus = false;
      $$3('.atlas-status-checkbox-control span').text('No status info for this taxon');
      $$3('.atlas-status-checkbox-control span').css('color', 'silver');
    } else {
      $$3('.atlas-status-checkbox-control span').text('Show status');
      $$3('.atlas-status-checkbox-control span').css('color', 'black');
    }

    if (disableStatus || isHybrid || displayedMapType === 'slippy' && mapType === 'allclass' && resolution !== 'hectad') {
      // Uncheck and disable status checkbutton if not hectad resolution or no status info
      $$3('.atlas-status-checkbox').prop('checked', false);
      $$3('.atlas-status-checkbox').attr('disabled', true);
    } else {
      // Display and set checked status to current value of showStatus global
      $$3('.atlas-status-checkbox').attr('disabled', false);
      $$3('.atlas-status-checkbox').prop('checked', showStatus);
    } // atlas resolution control visibility


    if (displayedMapType === "slippy" && mapType === 'allclass') {
      $$3('.atlas-resolution-control').show();
    } else {
      $$3('.atlas-resolution-control').hide();
    } // atlas resolution control value and global variables


    if (displayedMapType === "slippy" && mapType === 'allclass') {
      // Reset resolution if currently set to a value that is not
      // appropriate for the taxon
      // if (resolution === 'tetrad' && !currentTaxon.tetrad) {
      //   resolution = 'hectad'
      // }
      bsbiDataAccess.resolution = resolution; // Ensure right option is selected

      $$3('.bsbi-resolution-' + resolution).prop('checked', true); // Enable/disable tetrad option as appropriate
      // if (currentTaxon.tetrad) {
      //   $('.bsbi-resolution-tetrad').attr('disabled', false)
      // } else {
      //   $('.bsbi-resolution-tetrad').attr('disabled', true)
      // }
    } else {
      bsbiDataAccess.resolution = 'hectad';
    } // Enable/disable the hybrid map type option as appropriate


    var $hybridopts = $$3('.atlas-map-type-selector option[value="hybrid"]');

    if (isHybrid) {
      $hybridopts.show();
    } else {
      $hybridopts.hide(); // Select another option if currently selected

      if (mapType === 'hybrid') {
        $hybridopts.prop('selected', false);
        $$3('.atlas-map-type-selector option[value="allclass"]').prop('selected', true);
        mapType = 'allclass';
      }
    }

    $$3('.atlas-map-type-selector').selectpicker('refresh');
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

    var $sel = $$3('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-grid-type-control');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      gridStyle = $$3(this).val();
      setCookie('gridstyle', gridStyle, 30);
      staticMap.setGridLineStyle(gridStyle);
    });
    gridStyles.forEach(function (s) {
      var $opt = s.selected ? $$3('<option>') : $$3('<option>');
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
      caption: 'Vice-county boundaries',
      val: 'vc'
    }, {
      caption: 'No boundaries',
      val: 'none'
    }]; // Main type selector

    var $sel = $$3('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-boundaries-control');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      boundaryType = $$3(this).val();
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
      var $opt = b.selected ? $$3('<option>') : $$3('<option>');
      $opt.attr('value', b.val);
      $opt.html(b.caption).appendTo($sel);
    });
    $sel.val(boundaryType); // This seems to be necessary if interface regenerated,
    // e.g. changing from tabbed to non-tabbed display.

    $sel.selectpicker();
  }

  function mapInterfaceToggle($parent) {
    var $container = $$3('<div style="display: flex">').appendTo($parent); // Buttons

    var $bgrp = $$3('<div class="btn-group" data-toggle="buttons">').appendTo($container);
    var $staticLabel = $$3('<label class="btn btn-primary active">').appendTo($bgrp);
    $$3('<input type="radio" name="mapType" value="static" checked>').appendTo($staticLabel);
    $staticLabel.append("Overview");
    var $slippyLabel = $$3('<label class="btn btn-primary">').appendTo($bgrp);
    $$3('<input type="radio" name="mapType" value="slippy">').appendTo($slippyLabel);
    $slippyLabel.append("Zoomable"); // Busy indicator

    var $loader = $$3('<div id="atlas-loader" style="display: none">').appendTo($container);
    $$3('<div class="atlas-loader">').appendTo($loader);
    $$3('input[type=radio][name="mapType"]').change(function () {
      displayedMapType = $$3(this).val();
      bsbiDataAccess.displayedMapType = displayedMapType;

      if (displayedMapType === "slippy") {
        // Get current width of map div
        var $div = $$3('#bsbiMapDiv');
        var w = $div.width();
        var h = $div.height();
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
    var $sel = $$3('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-map-type-selector');
    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      mapType = $$3(this).val();
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
      var $opt = $$3('<option>');
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

    var $sel = $$3('<select>').appendTo($parent);
    $sel.addClass('selectpicker'); //$sel.addClass('atlas-backdrop-selector')

    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      // Remove all backdrops
      backdrops.forEach(function (b) {
        if (b.val !== 'none') {
          staticMap.basemapImage(b.val, false, rasterRoot + b.val + '.png', rasterRoot + b.val + '.pgw');
        }
      }); // Display selected backdrop

      backdrop = $$3(this).val();
      setCookie('backdrop', backdrop, 30);

      if (backdrop !== 'none') {
        staticMap.basemapImage(backdrop, true, rasterRoot + backdrop + '.png', rasterRoot + backdrop + '.pgw');
      }
    });
    backdrops.forEach(function (b) {
      var $opt = $$3('<option>');
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

    var $container = $$3('<div>').appendTo($parent);
    $container.addClass('atlas-save-map-image');
    $container.hide();
    var $svg = $$3('<svg>').appendTo($container);
    var $t = $$3('<text>').appendTo($svg);
    $t.attr('x', '10');
    $t.attr('y', '20');
    $$3('<br>').appendTo($container);
    var $button = $$3('<button>').appendTo($container);
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
      var $div = $$3('<div>').appendTo($container);
      $div.css('display', 'inline-block');
      $div.css('margin-left', '0.5em');
      $div.attr('class', 'radio');
      var $label = $$3('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$3('<input>').appendTo($label);
      var $span = $$3('<span>').appendTo($label);
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
        $$3('.img-download-type-' + val).prop("checked", true);
        imageType = val;
      });
    }
  }

  function mapDownloadButton($parent, i) {
    var downloadType = 'csv'; // Overall control container

    var $container = $$3('<div>').appendTo($parent);
    $container.addClass('atlas-download-map-data');
    $container.hide();
    var $button = $$3('<button>').appendTo($container);
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
    makeRadio('GJSON', 'geojson', false);

    function makeRadio(label, val, checked) {
      var $div = $$3('<div>').appendTo($container);
      $div.css('display', 'inline-block');
      $div.css('margin-left', '0.5em');
      $div.attr('class', 'radio');
      var $label = $$3('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$3('<input>').appendTo($label);
      var $span = $$3('<span>').appendTo($label);
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
        $$3('.download-type-' + val).prop("checked", true);
        downloadType = val;
      });
    }
  }

  function opacitySlider($parent) {
    var initOpacity = 70;
    $$3('#atlas-leaflet-svg').css('opacity', initOpacity / 100); // Overall control container

    var $container = $$3('<div>').appendTo($parent);
    $container.addClass('atlas-opacity-slider-control');
    $container.hide(); // Label

    var $sliderLabel = $$3('<div>').appendTo($container);
    $sliderLabel.addClass('atlas-opacity-slider-label');
    $sliderLabel.text('Opacity:'); // Slider

    var $sliderContainer = $$3('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    $sliderContainer.addClass('atlas-opacity-slider-slider');
    var $slider = $$3('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', '100').attr('value', initOpacity).attr('id', 'atlas-opacity-slider');
    $slider.change(function () {
      $$3('#atlas-leaflet-svg').css('opacity', $$3(this).val() / 100);
    });
  }

  function statusCheckbox($parent) {
    // Overall control container
    var $container = $$3('<div>').appendTo($parent);
    $container.addClass('atlas-status-checkbox-control'); // Status on/off toggle

    var $checDiv = $$3('<div class="checkbox">').appendTo($container); //$checDiv.css('margin-top', '4.3em')

    $$3('<label><input type="checkbox" class="atlas-status-checkbox"/><span>Show status</span></label>').appendTo($checDiv);
    $$3('.atlas-status-checkbox').change(function () {
      showStatus = $$3(this).is(':checked');
      bsbiDataAccess.showStatus = showStatus;
      changeMap();
    });
  }

  function statusControl($parent) {
    // Overall control container
    var $container = $$3('<div>').appendTo($parent);
    $container.addClass('atlas-period-slider-control');
    $container.hide(); // Period display
    // const $indicator = $('<div>').appendTo($container)
    // $indicator.css('font-size', '1.5em')
    // $indicator.css('margin-bottom', '0.2em')
    // $indicator.text(periods[periods.length - 1].caption)
    // Slider

    var $sliderContainer = $$3('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    var $slider = $$3('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', periods.length).attr('id', 'atlas-range-select');
    $slider.change(function () {
      atlasRangeIndex = $$3(this).val();
      changeMap();
    });
    var $scaleContainer = $$3('<div>').appendTo($sliderContainer);
    $scaleContainer.addClass('atlas-range-tick-container');
    $scaleContainer.css('margin-bottom', '4.3em');
    periods.forEach(function (p, i) {
      var $tick = $$3('<span>').appendTo($scaleContainer);
      $tick.addClass('atlas-range-tick');
      var percent = i / (periods.length - 1) * 100;
      $tick.css('left', percent.toString() + '%');
      $tick.text('|');
      $tick.append('<br>');
      var $tickText = $$3('<span>').appendTo($tick);
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
    var $container = $$3('<div>').appendTo($parent);

    function makeRadio(label, val, checked, infoId) {
      var $div = $$3('<div>').appendTo($container);
      $div.attr('class', 'radio');
      var $label = $$3('<label>').appendTo($div);
      $label.css('padding-left', '0');
      var $radio = $$3('<input>').appendTo($label);
      var $span = $$3('<span>').appendTo($label);
      $span.text(label);
      $span.css('padding-left', '20px');

      if (infoId) {
        var $spanInfo = $$3('<span>').appendTo($label);
        $spanInfo.attr('id', infoId);
        $spanInfo.css('padding-left', '10px');
        $spanInfo.css('font-weight', 'bold');
      }

      $radio.attr('type', 'radio');
      $radio.attr('name', 'bsbi-resolution-' + i);
      $radio.attr('class', 'bsbi-resolution-' + val);
      $radio.attr('value', val);
      $radio.css('margin-left', 0);
      if (checked) $radio.prop('checked', true);
      $radio.change(function () {
        resolution = $$3(this).val(); // Update controls mirrored in other blocks

        $$3('.bsbi-resolution-' + resolution).prop("checked", true);
        setControlState();
        changeMap();
      });
    }

    makeRadio('Hectads', 'hectad', true); //makeRadio('Tetrads', 'tetrad', false, 'tetrad-info')

    makeRadio('Tetrads', 'tetrad', false);
  }

  function trendControl($parent) {
    // Overall control container
    var $container = $$3('<div>').appendTo($parent);
    $container.addClass('atlas-trend-slider-control');
    $container.hide(); // Trend display
    // const $indicator = $('<div>').appendTo($container)
    // $indicator.css('font-size', '1.5em')
    // $indicator.css('margin-bottom', '0.2em')
    // $indicator.text(trends[trends.length - 1].caption)
    // Slider

    var $sliderContainer = $$3('<div>').appendTo($container);
    $sliderContainer.addClass('slidecontainer');
    $sliderContainer.addClass('atlas-trend-select-container');
    var $slider = $$3('<input>').appendTo($sliderContainer);
    $slider.addClass('slider');
    $slider.attr('type', 'range').attr('min', '1').attr('max', trends.length).addClass('atlas-trend-select');
    $slider.change(function () {
      atlasTrendIndex = $$3(this).val();
      changeMap();
    });
    var $scaleContainer = $$3('<div>').appendTo($sliderContainer);
    $scaleContainer.addClass('atlas-trend-tick-container');
    trends.forEach(function (p, i) {
      var $tick = $$3('<span>').appendTo($scaleContainer);
      $tick.addClass('atlas-trend-tick');
      var percent = i / (trends.length - 1) * 100;
      $tick.css('left', percent.toString() + '%');
      $tick.text('|');
      $tick.append('<br>');
      var $tickText = $$3('<span>').appendTo($tick);
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

    var $sel = $$3('<select>').appendTo($parent);
    $sel.addClass('selectpicker');
    $sel.addClass('atlas-inset-control'); //$sel.addClass('atlas-backdrop-selector')

    $sel.attr('data-width', '100%');
    $sel.on('changed.bs.select', function () {
      insetType = $$3(this).val();
      staticMap.setTransform(insetType);
      setCookie('inset', insetType, 30);
      changeMap();
    });
    inserts.forEach(function (i) {
      var $opt = i.selected ? $$3('<option>') : $$3('<option>');
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
    // Download flag
    var download = selector === '#bsbiMapDownloadDiv'; // Modify standard UK opts to remove any without CI

    var transOptsSel = JSON.parse(JSON.stringify(brcatlas.namedTransOpts));
    delete transOptsSel.BI3; // Remove the options without CI
    // Modify insets to go further west in order
    // to give more room for legends.

    transOptsSel.BI4.bounds.xmin = download ? -265000 : -240000; //Northern Isles

    if (download) {
      transOptsSel.BI4.insets[0].imageX = 20;
      transOptsSel.BI4.insets[0].imageY = 19;
      transOptsSel.BI4.insets[1].imageX = -39;
      transOptsSel.BI4.insets[1].imageY = -30;
    } //console.log('bounds', transOptsSel.BI4)
    //{xmin: 337373, ymin: -92599, xmax: 427671, ymax: -6678}


    transOptsSel.BI1.bounds.xmin = -230000, //No insets
    transOptsSel.BI2.bounds.xmin = -230000, //CI inset
    // Init
    bsbiDataAccess.bsbiDataRoot = ds$2.bsbi_atlas.dataRoot + 'bsbi/maps/';
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
      legendFontSize: download ? '13pt' : '14px',
      legendFont: download ? 'Minion Pro' : 'sans-serif',
      transOptsKey: getCookie('inset') ? getCookie('inset') : insetType,
      transOptsSel: transOptsSel,
      mapTypesKey: 'status_10_19',
      mapTypesSel: mapTypesSel,
      mapTypesControl: false,
      transOptsControl: false,
      seaFill: 'white',
      gridLineColour: '#7C7CD3',
      gridLineStyle: gridStyle,
      gridLineWidth: download ? '1.09pt' : 1,
      boundaryColour: '#7C7CD3',
      boundaryLineWidth: download ? '1.09pt' : 1,
      vcColour: '#7C7CD3',
      vcLineStyle: boundaryType === 'vc' ? '' : 'none',
      vcLineWidth: download ? '1.09pt' : 1,
      countryColour: '#7C7CD3',
      countryLineStyle: boundaryType === 'country' ? '' : 'none',
      countryLineWidth: download ? '1.09pt' : 1,
      insetLineWidth: download ? '1.09pt' : 1
    });
    ds$2.bsbi_atlas.dataRoot + 'rasters/'; //staticMap.basemapImage('colour_elevation', true, rasterRoot + 'colour_elevation.png', rasterRoot + 'colour_elevation.pgw')
    // Create the slippy map

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
    $$3('#slippyAtlasMain').hide();
    $$3(window).resize(function () {
      // Get current width of map div
      var $div = $$3('#bsbiMapDiv');
      var w = $div.width();
      var h = $div.height();
      console.log('size', w, h);
      slippyMap.setSize(w, h);
    });
  } // Callbacks for slippy maps

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
        displayedMap.redrawMap().then(function () {//$('#tetrad-info').text('')
        })["catch"](function (e) {
          console.warn("Unable to generate map for ".concat(currentTaxon$1.shortName, " (").concat(currentTaxon$1.identifier, "). Error message:"), e);
          displayedMap.clearMap();
          endLoad(); //$('#tetrad-info').text('no data available')
        });
      }
    } // Initialise dot caption


    $$3('#dotCaption').html(bsbiDataAccess.dotCaption);
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
    $$3(selector).each(function (i) {
      // We loop through the selection so that we can use the
      // index value to differentiate the equivalent controls
      // from different blocks. This is vital for radio controls
      // otherwise value can only be selected in one block and
      // therefore initialisation may be wrong.
      var sel = 'bsbi-atlas-map-controls-' + i;
      var $div = $$3('<div>').appendTo($$3(this));
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

  var $$2 = jQuery; // eslint-disable-line no-undef
  function updateTrendSummary2(id, d) {
    if (d) {
      $$2("#".concat(id, "-swatches")).css('display', ''); //.show()

      $$2("#".concat(id, "-no-trend")).css('display', 'none'); //.hide()

      setColour("".concat(id, "_decline_strong"), d.declineStrong);
      setColour("".concat(id, "_decline_mod"), d.declineMod);
      setColour("".concat(id, "_stable"), d.stable);
      setColour("".concat(id, "_increase_mod"), d.increaseMod);
      setColour("".concat(id, "_increase_strong"), d.increaseStrong);
    } else {
      $$2("#".concat(id, "-swatches")).css('display', 'none'); //.hide()

      $$2("#".concat(id, "-no-trend")).css('display', ''); //.show()
    }

    function setColour(id, val) {
      d3.select("#".concat(id)).attr('fill', "rgb(".concat(255 - 255 * Number(val) / 100, ",255,255)"));
      var grey = 220 - Math.floor(val / 100 * 220);
      d3.select("#".concat(id, "-path")).attr('fill', "rgb(".concat(grey, ",").concat(grey, ",").concat(grey, ")"));
      var title = d3.select("#".concat(id)).select('title').attr('data-title');
      d3.select("#".concat(id)).select('title').text("".concat(title, ": ").concat(val, "%"));
      d3.select("#".concat(id, "-path")).select('title').text("".concat(title, ": ").concat(val, "%"));
    }
  }
  function trendSummary2(id, font, fontSize) {
    var svgArrow = "M 2250 7256 l 0 -2813 l -61 -7 c -34 -3 -526 -6 -1093 -6 l -1031 -1 l 66 -62 c 36 -34 756 -714 1600 -1512 c 844 -797 1820 -1719 2169 -2049 c 349 -329 667 -630 705 -668 l 70 -68 l 230 217 c 1454 1373 3719 3512 4012 3790 l 373 353 l -1090 0 l -1090 0 l 0 2820 l 0 2820 l -2430 0 l -2430 0 l 0 -2814 z";
    var svgSquare = "M 5 3968 c -3 -7 -4 -897 -3 -1978 l 3 -1965 l 2080 0 l 2080 0 l 0 1975 l 0 1975 l -2078 3 c -1657 2 -2079 0 -2082 -10 z";
    var ss = 25;
    var swatches = [{
      svg: svgArrow,
      scale: 0.6,
      rot: 180,
      text: "Strong decline",
      id: "".concat(id, "_decline_strong"),
      da: [ss * 4]
    }, {
      svg: svgArrow,
      scale: 0.4,
      rot: 180,
      text: "Moderate decline",
      id: "".concat(id, "_decline_mod"),
      da: [ss * 3, ss]
    }, {
      svg: svgSquare,
      scale: 0.2,
      rot: 45,
      text: 'Stable',
      id: "".concat(id, "_stable"),
      da: [ss * 3, ss]
    }, {
      svg: svgArrow,
      scale: 0.4,
      rot: 0,
      text: "Moderate increase",
      id: "".concat(id, "_increase_mod"),
      da: [ss * 3, ss]
    }, {
      svg: svgArrow,
      scale: 0.6,
      rot: 0,
      text: "Strong increase",
      id: "".concat(id, "_increase_strong"),
      da: [ss * 3, ss]
    }]; // Graphic

    var divParent = d3.select("#".concat(id));
    var svg = divParent.append('svg').attr('width', ss * 5 + 2).attr('height', ss + 2).style('overflow', 'visible').style('vertical-align', 'bottom');
    var gMain = svg.append('g');
    gMain.attr('transform', 'translate(1 1)'); // Don't set display of gSwatches to 'none' here otherwise Firefox doesn't calculate bbox

    var gSwatches = gMain.append('g').attr('id', "".concat(id, "-swatches")); //.style('display', 'none')

    var tNoTrend = gMain.append('text').attr('id', "".concat(id, "-no-trend")).text('No trend').style('display', 'none').style('display', 'none').attr('text-anchor', 'middle').attr('x', ss * 5 / 2).attr('y', ss / 2).attr('dominant-baseline', 'mathematical');

    if (font) {
      tNoTrend.style('font-family', font);
      tNoTrend.style('font-size', fontSize);
    }

    gMain.append('rect').attr('width', ss * 5).attr('height', ss).attr('stroke', 'grey').attr('fill', 'none').style('vertical-align', 'bottom'); // Swatches

    swatches.forEach(function (s, i) {
      var indicator = gSwatches.append('rect').attr('id', s.id).attr('width', ss).attr('height', ss).attr('x', i * ss).attr('fill', 'white');
      indicator.append('title').attr('data-title', s.text).text(s.text);

      if (s.svg) {
        var path = gSwatches.append('path').attr('d', s.svg).style('visibility', 'hidden');
        var svgbbox = path.node().getBBox();
        path.remove(); // Note the order of the transformations is right to left
        // in the translate clause

        var iScale = ss / svgbbox.width * s.scale;
        var xAdj = i * ss + (ss - svgbbox.width * iScale) / 2;
        var yAdj = (ss - svgbbox.height * iScale) / 2;
        var xRot = ss / 2 + i * ss;
        var yRot = ss / 2;
        var symbol = gSwatches.append('path').attr('id', "".concat(s.id, "-path")).attr('d', s.svg).attr('transform', "\n          rotate(".concat(s.rot, ", ").concat(xRot, ", ").concat(yRot, ")\n          translate(").concat(xAdj, " ").concat(yAdj, ") \n          scale(").concat(iScale, ")\n        "));
        symbol.append('title').text(s.text);
      }
    });
    gSwatches.style('display', 'none');
  }
  function trendSave(_x, _x2) {
    return _trendSave.apply(this, arguments);
  }

  function _trendSave() {
    _trendSave = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, filename) {
      var svg, download, serialize, downloadLink;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              downloadLink = function _downloadLink(dataUrl, file) {
                // Create a link element
                var link = document.createElement("a"); // Set link's href to point to the data URL

                link.href = dataUrl;
                link.download = file; // Append link to the body

                document.body.appendChild(link); // Dispatch click event on the link
                // This is necessary as link.click() does not work on the latest firefox

                link.dispatchEvent(new MouseEvent('click', {
                  bubbles: true,
                  cancelable: true,
                  view: window
                })); // Remove link from body

                document.body.removeChild(link);
              };

              serialize = function _serialize(svg) {
                var xmlns = "http://www.w3.org/2000/xmlns/";
                var xlinkns = "http://www.w3.org/1999/xlink";
                var svgns = "http://www.w3.org/2000/svg";
                var domSvg = svg.node();
                var cloneSvg = domSvg.cloneNode(true);
                var d3Clone = d3.select(cloneSvg); // Explicitly change text in clone to required font

                d3Clone.selectAll('text').style('Minion Pro');
                cloneSvg.setAttributeNS(xmlns, "xmlns", svgns);
                cloneSvg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
                var serializer = new window.XMLSerializer();
                var string = serializer.serializeToString(cloneSvg);
                return new Blob([string], {
                  type: "image/svg+xml"
                });
              };

              download = function _download(data, filename) {
                var dataUrl = URL.createObjectURL(data);
                var file = "".concat(filename, ".svg");
                downloadLink(dataUrl, file);
              };

              svg = d3.select("#".concat(id, " svg"));
              return _context.abrupt("return", new Promise(function (resolve) {
                var blob1 = serialize(svg);

                if (filename) {
                  download(blob1, filename);
                }

                resolve(blob1);
              }));

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _trendSave.apply(this, arguments);
  }

  var $$1 = jQuery; // eslint-disable-line no-undef

  var ds$1 = drupalSettings; // eslint-disable-line no-undef

  var currentTaxon = {
    identifier: '',
    name: null,
    shortName: null
  };
  var trendAggs;
  var phen1, phen2, altlat;
  var browsedFileData;
  var bCancelled = false;
  var logText = '';
  var aNoStatus, aIsHybrid;
  function downloadPage() {
    $$1('#bsbi-atlas-download').css('display', 'flex');
    $$1('<div>').appendTo($$1('#bsbi-atlas-download')).attr('id', 'bsbi-atlas-download-left').css('flex', 1);
    $$1('<div>').appendTo($$1('#bsbi-atlas-download')).attr('id', 'bsbi-atlas-download-right').css('flex', 1).css('margin-left', '1em');
    taxonSelectors();
    downloadButton();
    $$1('<hr/>').appendTo($$1('#bsbi-atlas-download-left'));
    var $instructions = $$1('<p>').appendTo($$1('#bsbi-atlas-download-left'));
    $instructions.html("\n    For batch downloads, first select a CSV file from your computer\n    that has two (or three) columns: <i>taxonId</i> which has the ddbid for each \n    taxon and <i>taxon</i> which specifies a taxon name. \n    The taxon name is only used to name the file and\n    doesn't have to be exactly the same as \n    the name used elsewhere on the site. The ddbid will also be used \n    in the filename in case of any ambiguity. \n    If a third column - <i>staceOrder</i> - is specified, it is used at the\n    start of the filename.\n  ");
    fileUploadButton();
    downloadBatchButton();
    cancelDownloadBatchButton();
    downloadLogButton();
    downloadLimits();
    $$1('<hr/>').appendTo($$1('#bsbi-atlas-download-left'));
    makeCheckbox('map', 'Map');
    makeCheckbox('apparency', 'Apparency');
    makeCheckbox('phenology', 'Phenology');
    makeCheckbox('altlat', 'Alt/Lat');
    makeCheckbox('trend', 'Trends');
    mapping();
    apparencyChart();
    phenologyChart();
    altlatChart();
    trendIndicators();
  }

  function taxonToFile(taxon, id, staceOrder) {
    var ordering;

    if (staceOrder) {
      ordering = "".concat(staceOrder, "_");
    } else {
      ordering = '';
    }

    var filename = "".concat(ordering).concat(taxon.replace(/[^a-z0-9]/gi, '_').toLowerCase(), "_").concat(id.replace(/[^a-z0-9]/gi, '_'), "_");
    return filename;
  }

  function downloadTaxa() {
    return _downloadTaxa.apply(this, arguments);
  }

  function _downloadTaxa() {
    _downloadTaxa = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var data, iMin, iMax, _loop, i, _ret;

      return regeneratorRuntime.wrap(function _callee$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return d3.csv(browsedFileData);

            case 2:
              data = _context2.sent;
              bCancelled = false;
              logText = '';
              iMin = $$1('#taxon-index-min').val();
              iMax = $$1('#taxon-index-max').val();

              if (iMax > data.length) {
                iMax = data.length;
                $$1('#taxon-index-max').val(iMax);
              }

              _loop = /*#__PURE__*/regeneratorRuntime.mark(function _loop(i) {
                var t, filename, eMapping, eApparency, ePhenology, eAltlat, eTrends, isHybrid, noStatus, p1, p2, p3, p4, p5;
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
                        $$1('#bsbi-atlas-download-counter').text(i + 1); // Taxon

                        t = data[i];
                        filename = taxonToFile(t.taxon, t.taxonId, t.staceOrder); // For reporting errors

                        eMapping = void 0, eApparency = void 0, ePhenology = void 0, eAltlat = void 0, eTrends = void 0; // Ensure that status is set correctly for mapping

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
                        p5 = trendsUpdate(t.taxonId, t.taxon, t.staceOrder)["catch"](function (e) {
                          return eTrends = e;
                        });
                        _context.next = 16;
                        return Promise.all([p1, p2, p3, p4, p5]).then(function () {
                          if (eMapping || eApparency || ePhenology || eAltlat || eTrends) {
                            var html = "<b>".concat(i + 1, " ").concat(t.taxon, " (").concat(t.taxonId, ")</b>");
                            logText += "\r\n\r\n".concat(i + 1, " ").concat(t.taxon, " (").concat(t.taxonId, ")");
                            html += '<ul>';

                            if (eMapping) {
                              html += '<li>Map failed</li>';
                              logText += '\r\nMap failed';
                            }

                            if (eApparency) {
                              html += '<li>Apparency chart failed</li>';
                              logText += '\r\nApparency chart failed';
                            }

                            if (ePhenology) {
                              html += '<li>Phenology chart failed</li>';
                              logText += '\r\nPhenology chart failed';
                            }

                            if (eAltlat) {
                              html += '<li>Altlat chart failed</li>';
                              logText += '\r\nPhenology chart failed';
                            }

                            if (eTrends) {
                              html += '<li>Trends charts failed</li>';
                              logText += '\r\nPhenology chart failed';
                            }

                            $$1('<div>').appendTo($$1('#bsbi-atlas-download-right')).html(html);
                          }
                        });

                      case 16:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _loop);
              });
              i = iMin - 1;

            case 10:
              if (!(i < iMax)) {
                _context2.next = 18;
                break;
              }

              return _context2.delegateYield(_loop(i), "t0", 12);

            case 12:
              _ret = _context2.t0;

              if (!(_ret === "break")) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt("break", 18);

            case 15:
              i++;
              _context2.next = 10;
              break;

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee);
    }));
    return _downloadTaxa.apply(this, arguments);
  }

  function fileUploadButton() {
    var $file = $$1('<input>').appendTo($$1('#bsbi-atlas-download-left'));
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
    var $button = $$1('<button>').appendTo($$1('#bsbi-atlas-download-left'));
    $button.addClass('btn btn-default');
    $button.text('Download batch');
    $button.on('click', function () {
      clearCharts();
      downloadTaxa();
    });
  }

  function downloadLogButton() {
    var $button = $$1('<button>').appendTo($$1('#bsbi-atlas-download-left'));
    $button.addClass('btn btn-default');
    $button.css('margin-left', '1em');
    $button.text('Download problems');
    $button.on('click', function () {
      var a = document.createElement('a');
      var file = new Blob([logText], {
        type: 'text/plain'
      });
      a.href = URL.createObjectURL(file);
      a.download = 'bulk-svg-error-log.txt';
      a.click();
      URL.revokeObjectURL(a.href);
    });
  }

  function cancelDownloadBatchButton() {
    var $button = $$1('<button>').appendTo($$1('#bsbi-atlas-download-left'));
    $button.addClass('btn btn-default');
    $button.css('margin-left', '1em');
    $button.text('Cancel');
    $button.on('click', function () {
      bCancelled = true;
    });
  }

  function downloadLimits() {
    var $div = $$1('<div>').appendTo($$1('#bsbi-atlas-download-left'));
    $div.css('margin-top', '0.5em');
    var $minLabel = $$1('<label>').appendTo($div);
    $minLabel.attr('for', 'taxon-index-min');
    $minLabel.text('Start index');
    $minLabel.css('margin-right', '0.5em');
    var $min = $$1('<input>').appendTo($div);
    $min.attr('type', 'number');
    $min.attr('id', 'taxon-index-min');
    $min.attr('min', '1');
    $min.attr('value', 1);
    $min.css('width', 60);
    var $maxLabel = $$1('<label>').appendTo($div);
    $maxLabel.attr('for', 'taxon-index-max');
    $maxLabel.text('End index');
    $maxLabel.css('margin', '0 0.5em');
    var $max = $$1('<input>').appendTo($div);
    $max.attr('type', 'number');
    $max.attr('id', 'taxon-index-max');
    $max.attr('min', '1');
    $max.attr('value', 100);
    $max.css('width', 60);
    var $divCount = $$1('<div>').appendTo($div);
    $divCount.css('display', 'inline-block');
    $divCount.css('margin-left', '1em');
    $divCount.attr('id', 'bsbi-atlas-download-counter');
  }

  function downloadButton() {
    var $button = $$1('<button>').appendTo($$1('#bsbi-atlas-download-left'));
    $button.addClass('btn btn-default');
    $button.text('Download selected');
    $button.on('click', function () {
      clearCharts();
      var filename = taxonToFile(currentTaxon.shortName, currentTaxon.identifier);
      var staticMap = getStaticMap();
      if ($$1('#download-map').is(':checked')) staticMap.saveMap(true, null, "".concat(filename, "map"));
      if ($$1('#download-apparency').is(':checked')) phen1.saveImage(true, "".concat(filename, "apparency"));
      if ($$1('#download-phenology').is(':checked')) phen2.saveImage(true, "".concat(filename, "phenology"));
      if ($$1('#download-altlat').is(':checked')) altlat.saveImage(true, "".concat(filename, "altlat"));

      if ($$1('#download-trend').is(':checked')) {
        trendSave('bsbi-long-trend-summary-gb', "".concat(filename, "trend-long-gb"));
        trendSave('bsbi-long-trend-summary-ir', "".concat(filename, "trend-long-ir"));
        trendSave('bsbi-short-trend-summary-gb', "".concat(filename, "trend-short-gb"));
        trendSave('bsbi-short-trend-summary-ir', "".concat(filename, "trend-short-ir"));
      }
    });
  }

  function makeCheckbox(id, label) {
    $$1("<input type=\"checkbox\" id=\"download-".concat(id, "\" style=\"margin:0.5em\" checked>")).appendTo($$1('#bsbi-atlas-download-left'));
    $$1("<label for=\"download-".concat(id, "\">").concat(label, "</label>")).appendTo($$1('#bsbi-atlas-download-left'));
  }

  function mapping() {
    $$1('<div id="bsbiMapDownloadDiv" style="max-width: 500px">').appendTo($$1('#bsbi-atlas-download-left'));
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
    _mappingUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(taxonId, filename) {
      var staticMap;
      return regeneratorRuntime.wrap(function _callee2$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              staticMap = getStaticMap();

              if (!$$1('#download-map').is(':checked')) {
                _context3.next = 9;
                break;
              }

              currentTaxon.identifier = taxonId;
              mapSetCurrentTaxon(currentTaxon);
              _context3.next = 6;
              return changeMap(true);

            case 6:
              if (!filename) {
                _context3.next = 9;
                break;
              }

              _context3.next = 9;
              return staticMap.saveMap(true, null, "".concat(filename, "map"));

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
    var $apparency = $$1('<div>').appendTo($$1('#bsbi-atlas-download-left'));
    $apparency.attr('id', 'bsbi-apparency-chart').css('max-width', '400px');
    phen1 = brccharts.phen1({
      selector: '#bsbi-apparency-chart',
      data: [],
      taxa: ['taxon'],
      metrics: [{
        prop: 'n',
        label: 'Apparency',
        colour: 'green',
        fill: '#ddffdd',
        strokeWidth: '1.47pt'
      }],
      width: 400,
      height: 250,
      headPad: 35,
      perRow: 1,
      expand: true,
      showTaxonLabel: false,
      axisLeft: 'off',
      axisBottom: 'off',
      showLegend: false,
      interactivity: 'none'
    });
  }

  function apparencyUpdate(_x3, _x4) {
    return _apparencyUpdate.apply(this, arguments);
  }

  function _apparencyUpdate() {
    _apparencyUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(taxonId, filename) {
      var apparencyRoot, file, data;
      return regeneratorRuntime.wrap(function _callee3$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (!$$1('#download-apparency').is(':checked')) {
                _context4.next = 11;
                break;
              }

              apparencyRoot = "".concat(ds$1.bsbi_atlas.dataRoot, "bsbi/apparency/");
              file = apparencyRoot + 'all/' + taxonId.replace(/\./g, "_") + '.csv';
              _context4.next = 5;
              return d3.csv(file + "?prevent-cache=".concat(pcache));

            case 5:
              data = _context4.sent;
              _context4.next = 8;
              return apparency(phen1, data);

            case 8:
              if (!filename) {
                _context4.next = 11;
                break;
              }

              _context4.next = 11;
              return phen1.saveImage(true, "".concat(filename, "apparency"));

            case 11:
              return _context4.abrupt("return", Promise.resolve());

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee3);
    }));
    return _apparencyUpdate.apply(this, arguments);
  }

  function phenologyChart() {
    var $phenology = $$1('<div>').appendTo($$1('#bsbi-atlas-download-left'));
    $phenology.attr('id', 'bsbi-phenology-chart').css('max-width', '400px');
    phen2 = brccharts.phen2({
      selector: '#bsbi-phenology-chart',
      data: [],
      taxa: ['taxon'],
      metrics: [],
      width: 400,
      height: 25,
      split: true,
      headPad: 35,
      chartPad: 35,
      perRow: 1,
      expand: true,
      showTaxonLabel: false,
      interactivity: 'none',
      monthFontSize: '17.6pt',
      font: 'Minion Pro',
      lineWidth: '0.735pt',
      displayLegend: false
    });
  }

  function phenologyUpdate(_x5, _x6) {
    return _phenologyUpdate.apply(this, arguments);
  }

  function _phenologyUpdate() {
    _phenologyUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(taxonId, filename) {
      var captionRoot, file, data;
      return regeneratorRuntime.wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!$$1('#download-phenology').is(':checked')) {
                _context5.next = 13;
                break;
              }

              captionRoot = ds$1.bsbi_atlas.dataRoot + 'bsbi/captions/';
              file = "".concat(captionRoot).concat(taxonId.replace(/\./g, "_"), ".csv");
              _context5.next = 5;
              return d3.csv(file + "?prevent-cache=".concat(pcache));

            case 5:
              data = _context5.sent;
              _context5.next = 8;
              return phenology(phen2, data, null);

            case 8:
              if (!filename) {
                _context5.next = 13;
                break;
              }

              // Tweak the phenology bars and the ticks for book
              //d3.selectAll('#phen2-chart g.axis g.tick line').style('stroke', 'red')
              d3.selectAll('#phen2-chart g.axis g.tick line').style('transform', 'translate(0, 0.1pt)');
              d3.selectAll('#phen2-chart .phen-rect').style('transform', 'translate(0, 0.1pt)');
              _context5.next = 13;
              return phen2.saveImage(true, "".concat(filename, "phenology"));

            case 13:
              return _context5.abrupt("return", Promise.resolve());

            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4);
    }));
    return _phenologyUpdate.apply(this, arguments);
  }

  function altlatChart() {
    var _opts;

    var $altlat = $$1('<div>').appendTo($$1('#bsbi-atlas-download-left'));
    $altlat.attr('id', 'bsbi-altlat-chart').css('max-width', '600px');
    var opts = (_opts = {
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
        legend: '1–10%'
      }, {
        min: 10.00001,
        max: 30,
        radius: 14,
        legend: '11–30%'
      }, {
        min: 30.00001,
        max: 40,
        radius: 16,
        legend: '31–40%'
      }, {
        min: 40.00001,
        max: 50,
        radius: 18,
        legend: '41–50%'
      }, {
        min: 50.00001,
        max: 100,
        radius: 20,
        legend: '51–100%'
      }],
      taxa: ['dummy'],
      width: 600,
      height: 300,
      perRow: 1,
      expand: true,
      //margin: {left: 45, right: 10, top: 20, bottom: 35},
      margin: {
        left: 65,
        right: 20,
        top: 45,
        bottom: 57
      },
      showTaxonLabel: false,
      showLegend: true,
      interactivity: 'none',
      axisLabelFontSize: 12,
      legendFontSize: '22pt',
      legendSpacing: 25
    }, _defineProperty(_opts, "axisLabelFontSize", '22pt'), _defineProperty(_opts, "axisTickFontSize", '22pt'), _defineProperty(_opts, "font", 'Minion Pro'), _defineProperty(_opts, "lineWidth", '0.972pt'), _defineProperty(_opts, "yAxisLabelToTop", true), _defineProperty(_opts, "legendBaseline", 'mathematical'), _defineProperty(_opts, "legendXoffset", 1050), _defineProperty(_opts, "legendYoffset", 1180), _opts);
    altlat = brccharts.altlat(opts);
  }

  function altlatUpdate(_x7, _x8) {
    return _altlatUpdate.apply(this, arguments);
  }

  function _altlatUpdate() {
    _altlatUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(taxonId, filename) {
      var altlatRoot, altlatfile, altlatdata;
      return regeneratorRuntime.wrap(function _callee5$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!$$1('#download-altlat').is(':checked')) {
                _context6.next = 11;
                break;
              }

              altlatRoot = ds$1.bsbi_atlas.dataRoot + 'bsbi/maps/altlat/';
              altlatfile = "".concat(altlatRoot).concat(taxonId.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              _context6.next = 5;
              return d3.csv(altlatfile);

            case 5:
              altlatdata = _context6.sent;
              _context6.next = 8;
              return altLat(altlat, altlatdata);

            case 8:
              if (!filename) {
                _context6.next = 11;
                break;
              }

              _context6.next = 11;
              return altlat.saveImage(true, "".concat(filename, "altlat"));

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

  function trendIndicators() {
    trendIndicator('GB', 'long');
    trendIndicator('IR', 'long');
    trendIndicator('GB', 'short');
    trendIndicator('IR', 'short');

    function trendIndicator(country, term) {
      var $msg = $$1('<div>').appendTo($$1('#bsbi-atlas-download-left'));
      $msg.attr('id', "bsbi-".concat(term, "-msg-").concat(country.toLowerCase())).css('max-width', '600px');
      $msg.text("".concat(country, " ").concat(term));
      var $indicator = $$1('<div>').appendTo($$1('#bsbi-atlas-download-left'));
      $indicator.attr('id', "bsbi-".concat(term, "-trend-summary-").concat(country.toLowerCase())).css('max-width', '600px');
    }
  }

  function trendsUpdate(_x9, _x10, _x11) {
    return _trendsUpdate.apply(this, arguments);
  }

  function _trendsUpdate() {
    _trendsUpdate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(taxonId, taxon, staceOrder) {
      var updateTrend, delay, agg, ltIdentifier, stIdentifier, staceOrderWithAggLong, staceOrderWithAggShort, trendRootLong, trendRootShort, trendCountRoot, longTrendGb, longTrendIr, shortTrendGb, shortTrendIr, trendCountsLong, trendCountsShort, trendCountsOriginal, pTrendCountsLong, pTrendCountsShort, pTrendCountsOriginal, pGBlong, pIRlong, pGBshort, pIRshort, pSave1, pSave2, pSave3, pSave4;
      return regeneratorRuntime.wrap(function _callee7$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (!$$1('#download-trend').is(':checked')) {
                _context8.next = 52;
                break;
              }

              updateTrend = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(pTrendCountsOriginal, pTrendCount, pData, country, term) {
                  var threshold, column, d;
                  return regeneratorRuntime.wrap(function _callee6$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          threshold = country == 'GB' ? 16 : 7;
                          column = "".concat(country[0]).concat(country[1].toLowerCase()).concat(term[0].toUpperCase()).concat(term.substr(1));
                          _context7.next = 4;
                          return Promise.allSettled([pTrendCount, pData, pTrendCountsOriginal]);

                        case 4:
                          d = _context7.sent;

                          if (d[0].status === 'fulfilled' && d[2].status === 'fulfilled') {
                            if (d[1].status === 'fulfilled') {
                              //if (Number(d[0].value[0][column]) >= threshold && Number(d[2].value[0][column]) > 0) {
                              if (Number(d[0].value[0][column]) >= threshold) {
                                updateTrendSummary2("bsbi-".concat(term, "-trend-summary-").concat(country.toLowerCase()), d[1].value[0]);
                                $$1("#bsbi-".concat(term, "-msg-").concat(country.toLowerCase())).text("".concat(country, " ").concat(term)); // } else if (Number(d[0].value[0][column]) > 0 && Number(d[2].value[0][column]) === 0) {
                                //   updateTrendSummary2(`bsbi-${term}-trend-summary-${country.toLowerCase()}`, null)
                                //   $(`#bsbi-${term}-msg-${country.toLowerCase()}`).text(`${country} ${term} - agg taxa not present in country in this time period`)
                              } else {
                                updateTrendSummary2("bsbi-".concat(term, "-trend-summary-").concat(country.toLowerCase()), null);
                                $$1("#bsbi-".concat(term, "-msg-").concat(country.toLowerCase())).text("".concat(country, " ").concat(term, " - hectad threshold not met (").concat(d[0].value[0][column], ")"));
                              }
                            } else {
                              updateTrendSummary2("bsbi-".concat(term, "-trend-summary-").concat(country.toLowerCase()), null);
                              $$1("#bsbi-".concat(term, "-msg-").concat(country.toLowerCase())).text("".concat(country, " ").concat(term, " - no trend file"));
                            }
                          } else {
                            updateTrendSummary2("bsbi-".concat(term, "-trend-summary-").concat(country.toLowerCase()), null);
                            $$1("#bsbi-".concat(term, "-msg-").concat(country.toLowerCase())).text("".concat(country, " ").concat(term, " - trend count file absent"));
                          }

                        case 6:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee6);
                }));

                return function updateTrend(_x12, _x13, _x14, _x15, _x16) {
                  return _ref.apply(this, arguments);
                };
              }();

              // I can't figure out why, but if I don't put a delay in here, then batch generation of only
              // trend charts from same batch file produced variable number of download files.
              delay = function delay(milliseconds) {
                return new Promise(function (resolve) {
                  setTimeout(resolve, milliseconds);
                });
              };

              $$1('#bsbi-long-trend-summary-gb').html('');
              $$1('#bsbi-long-trend-summary-ir').html('');
              $$1('#bsbi-short-trend-summary-gb').html('');
              $$1('#bsbi-short-trend-summary-ir').html('');
              trendSummary2('bsbi-long-trend-summary-gb', 'Minion Pro', '14pt');
              trendSummary2('bsbi-long-trend-summary-ir', 'Minion Pro', '14pt');
              trendSummary2('bsbi-short-trend-summary-gb', 'Minion Pro', '14pt');
              trendSummary2('bsbi-short-trend-summary-ir', 'Minion Pro', '14pt');
              agg = trendAggs.find(function (a) {
                return a['mapped.ddb.id'] === taxonId;
              });
              ltIdentifier = taxonId;
              stIdentifier = taxonId;
              staceOrderWithAggLong = staceOrder;
              staceOrderWithAggShort = staceOrder;

              if (agg && agg['analysisType'] === 'long') {
                ltIdentifier = agg['agg.ddb.id'];
                staceOrderWithAggLong += '_trendagg';
              }

              if (agg && agg['analysisType'] === 'short') {
                stIdentifier = agg['agg.ddb.id'];
                staceOrderWithAggShort += '_trendagg';
              }

              trendRootLong = ds$1.bsbi_atlas.dataRoot + 'bsbi/trends/long/trends-summaries';
              trendRootShort = ds$1.bsbi_atlas.dataRoot + 'bsbi/trends/short/trends-summaries';
              trendCountRoot = ds$1.bsbi_atlas.dataRoot + 'bsbi/trends/hectad-counts';
              longTrendGb = "".concat(trendRootLong, "/Britain/").concat(ltIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              longTrendIr = "".concat(trendRootLong, "/Ireland/").concat(ltIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              shortTrendGb = "".concat(trendRootShort, "/Britain/").concat(stIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              shortTrendIr = "".concat(trendRootShort, "/Ireland/").concat(stIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              trendCountsLong = "".concat(trendCountRoot, "/").concat(ltIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              trendCountsShort = "".concat(trendCountRoot, "/").concat(stIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              trendCountsOriginal = "".concat(trendCountRoot, "/").concat(taxonId.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
              pTrendCountsLong = d3.csv(trendCountsLong);
              pTrendCountsShort = d3.csv(trendCountsShort);
              pTrendCountsOriginal = d3.csv(trendCountsOriginal);
              pGBlong = d3.csv(longTrendGb);
              pIRlong = d3.csv(longTrendIr);
              pGBshort = d3.csv(shortTrendGb);
              pIRshort = d3.csv(shortTrendIr);
              pSave1 = updateTrend(pTrendCountsOriginal, pTrendCountsLong, pGBlong, 'GB', 'long');
              pSave2 = updateTrend(pTrendCountsOriginal, pTrendCountsLong, pIRlong, 'IR', 'long');
              pSave3 = updateTrend(pTrendCountsOriginal, pTrendCountsShort, pGBshort, 'GB', 'short');
              pSave4 = updateTrend(pTrendCountsOriginal, pTrendCountsShort, pIRshort, 'IR', 'short');
              _context8.next = 41;
              return Promise.all([pSave1, pSave2, pSave3, pSave4]);

            case 41:
              _context8.next = 43;
              return delay(1000);

            case 43:
              if (!taxon) {
                _context8.next = 52;
                break;
              }

              _context8.next = 46;
              return trendSave('bsbi-long-trend-summary-gb', "".concat(taxonToFile(taxon, taxonId, staceOrderWithAggLong), "trend-long-gb"));

            case 46:
              _context8.next = 48;
              return trendSave('bsbi-long-trend-summary-ir', "".concat(taxonToFile(taxon, taxonId, staceOrderWithAggLong), "trend-long-ir"));

            case 48:
              _context8.next = 50;
              return trendSave('bsbi-short-trend-summary-gb', "".concat(taxonToFile(taxon, taxonId, staceOrderWithAggShort), "trend-short-gb"));

            case 50:
              _context8.next = 52;
              return trendSave('bsbi-short-trend-summary-ir', "".concat(taxonToFile(taxon, taxonId, staceOrderWithAggShort), "trend-short-ir"));

            case 52:
              return _context8.abrupt("return", Promise.resolve());

            case 53:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee7);
    }));
    return _trendsUpdate.apply(this, arguments);
  }

  function clearCharts() {
    if (!$$1('#download-map').is(':checked')) {
      var staticMap = getStaticMap(); //console.log('clear map')

      staticMap.clearMap();
    }

    if (!$$1('#download-apparency').is(':checked')) phen1.setChartOpts({
      data: []
    });
    if (!$$1('#download-phenology').is(':checked')) phen2.setChartOpts({
      data: []
    });
    if (!$$1('#download-altlat').is(':checked')) altlat.setChartOpts({
      data: []
    });

    if (!$$1('#download-trend').is(':checked')) {
      $$1('#bsbi-long-trend-summary-gb').html('');
      $$1('#bsbi-long-trend-summary-ir').html('');
      $$1('#bsbi-short-trend-summary-gb').html('');
      $$1('#bsbi-short-trend-summary-ir').html('');
    }
  }

  function taxonSelectors() {
    // Overall control container
    var $container = $$1('<div>').appendTo($$1('.bsbi-atlas-taxon-selector'));
    $container.addClass('atlas-taxon-selector-div'); // Selector

    var $sel = $$1('<select>').appendTo($container);
    $sel.addClass('atlas-taxon-selector-sel');
    var pTaxonList = d3.csv("".concat(ds$1.bsbi_atlas.dataRoot, "bsbi/taxon_list.csv?prevent-cache=").concat(pcache));
    var pTrendAggs = d3.csv("".concat(ds$1.bsbi_atlas.dataRoot, "bsbi/trends/aggregateMappings.csv?prevent-cache=").concat(pcache));
    Promise.all([pTaxonList, pTrendAggs]).then(function (data) {
      trendAggs = data[1];
      var taxaList = data[0];
      taxaList.forEach(function (d) {
        var name = '';

        if (d['vernacular']) {
          name = '<b>' + d['vernacular'] + '</b> ';
        }

        name = name + d['formattedName'];
        var $opt = $$1('<option>');
        $opt.attr('data-content', name);
        $opt.attr('value', d['ddbid']);
        $opt.attr('data-taxon-name', d['taxonName']); //$opt.attr('data-vernacular', d['vernacular'])

        $opt.attr('data-is-hybrid', d['hybrid']);
        $opt.attr('data-no-status', d['atlasNoStatus']);
        $opt.html(name).appendTo($sel);
      });
      $sel.attr('data-size', '10');
      $sel.attr('data-live-search', 'true');
      $sel.attr('data-header', 'Start typing the name of a taxon');
      $sel.attr('title', 'Select a taxon');
      $sel.selectpicker();
      $sel.on('changed.bs.select', function () {
        //console.log('Identifier:', $(this).val())
        clearCharts();
        currentTaxon.identifier = $$1(this).val();
        currentTaxon.name = $$1(this).find(":selected").attr("data-content");
        currentTaxon.shortName = $$1(this).find(":selected").attr("data-taxon-name");
        currentTaxon.isHybrid = $$1(this).find(":selected").attr("data-is-hybrid") === 't';
        currentTaxon.noStatus = $$1(this).find(":selected").attr("data-no-status") !== ''; // Ensure that status is set correctly for mapping

        var isHybrid = $$1(this).find(":selected").attr("data-is-hybrid") === 't';
        var noStatus = aNoStatus.indexOf($$1(this).val()) > -1;
        bsbiDataAccess.showStatus = !isHybrid && !noStatus;
        mappingUpdate(currentTaxon.identifier);
        apparencyUpdate(currentTaxon.identifier);
        phenologyUpdate(currentTaxon.identifier);
        altlatUpdate(currentTaxon.identifier);
        trendsUpdate(currentTaxon.identifier);
      }); // For batch mapping

      aIsHybrid = taxaList.filter(function (t) {
        return t.hybrid === 't';
      }).map(function (t) {
        return t.ddbid;
      });
      aNoStatus = taxaList.filter(function (t) {
        return t.atlasNoStatus !== '';
      }).map(function (t) {
        return t.ddbid;
      });
    });
  }

  var $ = jQuery; // eslint-disable-line no-undef

  var ds = drupalSettings; // eslint-disable-line no-undef
  //let develSummaryTrendColour = 'rgb(0,255,255)'

  function main() {
    var taxaList = [];
    var currentTaxon = {
      identifier: null,
      name: null,
      shortName: null,
      tetrad: null,
      noStatus: null,
      isHybrid: false,
      hybridMapping: false,
      longTrendAgg: null,
      shortTrendAgg: null,
      longTrendAggName: null,
      shortTrendAggName: null,
      trendAggTaxa: null,
      trendAggTaxaNames: null
    };
    var consKeys = ['statusGB', 'statusIE', 'statusCI', 'csRedListEngland', 'csRedListWales', 'csRedListIreland', 'csRedDataList2005', 'csRedDataList2021', 'csRareScarceIr2020', 'csRareScarceGb2020'];
    consKeys.forEach(function (k) {
      currentTaxon[k] = null;
    });
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
        //develMainMapStyles('#bsbi-atlas-development', changeMap)
        // develTrendSummary('#bsbi-atlas-development', (colour) => {
        //   console.log(colour)
        //   develSummaryTrendColour = colour
        //   changeCaption()
        // })
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
        title: 'Conservation',
        fn: sectionConservation
      }, {
        group: null,
        id: 'gallery',
        title: 'Gallery',
        fn: sectionGallery
      }, {
        group: null,
        id: 'trends',
        title: 'Trends',
        fn: sectionTrends
      }, {
        group: 'CHARACTERISTICS',
        id: 'phenology',
        title: 'Phenology',
        fn: sectionPhenology
      }, {
        group: 'CHARACTERISTICS',
        id: 'ecology',
        title: 'Altitude',
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
      $('#bsbi-atlas-gui').html(null); // Other inits

      $('.bsbi-atlas-trend-controls').hide();
      $('.bsbi-atlas-phenology-controls').hide(); // Make the section tabs

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

          changeMap(); // Regenerate summary trends because they will not be correctly displayed
          // if hidden when created

          updateSummaryTrends();
        } else {
          $('.bsbi-atlas-map-controls').hide();
        }

        if (target === '#bsbi-atlas-section-phenology') {
          $('.bsbi-atlas-phenology-controls').show(); // Regenerate graphics

          changePhenologyTab();
        } else {
          $('.bsbi-atlas-phenology-controls').hide();
        }

        if (target === '#bsbi-atlas-section-ecology') {
          // Regenerate graphics
          changeEcologyTab();
        }

        if (target === '#bsbi-atlas-section-conservation') {
          // Regenerate graphics
          changeConservationTab();
        }

        if (target === '#bsbi-atlas-section-trends') {
          $('.bsbi-atlas-trend-controls').show(); // Regenerate graphics

          changeTrendsTab();
        } else {
          $('.bsbi-atlas-trend-controls').hide();
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
      var pTaxonList = d3__namespace.csv("".concat(ds.bsbi_atlas.dataRoot, "bsbi/taxon_list.csv?prevent-cache=").concat(pcache));
      var pTrendAggs = d3__namespace.csv("".concat(ds.bsbi_atlas.dataRoot, "bsbi/trends/aggregateMappings.csv?prevent-cache=").concat(pcache));
      Promise.all([pTaxonList, pTrendAggs]).then(function (data) {
        var trendAggs = data[1];
        taxaList = data[0];
        taxaList.forEach(function (d) {
          var name = '';

          if (d['vernacular']) {
            name = '<b>' + d['vernacular'] + '</b> ';
          }

          name = name + d['formattedName'];
          var $opt = $('<option>');
          $opt.attr('data-content', name);
          $opt.attr('value', d['ddbid']); //$opt.attr('data-canonical', d['canonical'])

          $opt.attr('data-taxon-name', d['taxonName']); //$opt.attr('data-qualifier', d['qualifier'])

          $opt.attr('data-vernacular', d['vernacular']);
          $opt.attr('data-is-hybrid', d['hybrid']);
          $opt.attr('data-no-status', d['atlasNoStatus']);
          var aParentids = d['hybridParentIds'].split(';');
          var aParents = d['hybridParents'].split(';');
          var hybridMapping = aParents.length === 2 && aParentids.length === 2;
          $opt.attr('data-hybrid-mapping', hybridMapping);
          var agg = trendAggs.find(function (a) {
            return a['mapped.ddb.id'] === d['ddbid'];
          }); // if (agg && agg['analysisType'] === 'long') {
          //   $opt.attr('data-long-trend-agg', agg['agg.ddb.id'])
          //   $opt.attr('data-long-trend-agg-name', agg['agg.fullName'])
          // }
          // if (agg && agg['analysisType'] === 'short') {
          //   $opt.attr('data-short-trend-agg', agg['agg.ddb.id'])
          //   $opt.attr('data-short-trend-agg-name', agg['agg.fullName'])
          // }

          if (agg) {
            if (agg['analysisType'] === 'long') {
              $opt.attr('data-long-trend-agg', agg['agg.ddb.id']);
              $opt.attr('data-long-trend-agg-name', agg['agg.fullName']);
            }

            if (agg['analysisType'] === 'short') {
              $opt.attr('data-short-trend-agg', agg['agg.ddb.id']);
              $opt.attr('data-short-trend-agg-name', agg['agg.fullName']);
            }

            var aggTaxa = trendAggs.filter(function (a) {
              return a['agg.ddb.id'] === agg['agg.ddb.id'];
            }).map(function (a) {
              return a['mapped.ddb.id'];
            });
            var aggTaxaNames = trendAggs.filter(function (a) {
              return a['agg.ddb.id'] === agg['agg.ddb.id'];
            }).map(function (a) {
              return a['mapped.fullName'];
            });
            $opt.attr('data-trend-agg-taxa', aggTaxa.join(','));
            $opt.attr('data-trend-agg-taxa-names', aggTaxaNames.join(','));
          }

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
            currentTaxon.noStatus = $(this).find(":selected").attr("data-no-status") !== '';
            currentTaxon.hybridMapping = $(this).find(":selected").attr("data-hybrid-mapping") === 'true';
            currentTaxon.longTrendAgg = $(this).find(":selected").attr("data-long-trend-agg");
            currentTaxon.shortTrendAgg = $(this).find(":selected").attr("data-short-trend-agg");
            currentTaxon.longTrendAggName = $(this).find(":selected").attr("data-long-trend-agg-name");
            currentTaxon.shortTrendAggName = $(this).find(":selected").attr("data-short-trend-agg-name");
            currentTaxon.trendAggTaxa = $(this).find(":selected").attr("data-trend-agg-taxa");
            currentTaxon.trendAggTaxaNames = $(this).find(":selected").attr("data-trend-agg-taxa-names"); //console.log(currentTaxon)
            // If selection was made programatically (browser back or forward
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

            changePhenologyTab();
            changeEcologyTab();
            changeTrendsTab(); // Don't call changeConservationTab from here because it needs
            // to be done once caption file is read. Do from changeCaption 
            // instead
            //changeConservationTab()

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
        updateBsbiDataAccess('taxaHybridList', hybridTaxa);
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

    function sectionSummary(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      var $d = $('<div class=".container-fluid">').appendTo($sect);
      var $r = $('<div class="row">').appendTo($d);
      var $left = $('<div class="col-sm-8">').appendTo($r);
      var $right = $('<div class="col-sm-4">').appendTo($r);
      $left.append('<div id="bsbiMapDiv" width="100%"></div>'); //$left.append('<h4>Atlas map point</h4>')

      $left.append('<div id="dotCaption" width="100%" style="margin-top:1em"></div>'); // $left.append('<h4>Status etc for devel</h4>')
      // $left.append('<div id="statusDevel" width="100%"></div>')

      var $taxon = $('<div class="bsbi-selected-taxon-name bsbi-section-summary"></div>').appendTo($right);
      $taxon.css('font-size', '1.3em');
      $right.append('<hr/>');
      $right.append('<div id="bsbi-caption"></div>');
      createMaps("#bsbiMapDiv");
      createMapControls('.bsbi-atlas-map-controls');
      setControlState();
    }

    function sectionConservation(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      $sect.append('<div id="bsbi-conservation"></div>');
      createConservation("#bsbi-conservation");
    }

    function sectionTrends(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      $sect.append('<div id="bsbi-trends"></div>');
      createTrends("#bsbi-trends");
      createTrendControls('.bsbi-atlas-trend-controls');
    }

    function sectionPhenology(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      $sect.append('<div id="bsbi-phenology"></div>');
      createPhenology("#bsbi-phenology");
      createPhenologyControls('.bsbi-atlas-phenology-controls');
    }

    function sectionEcology(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      $sect.append('<div id="bsbi-altitude"></div>');
      createEcology("#bsbi-altitude");
    }

    function sectionGallery(id) {
      var $sect = $('#bsbi-atlas-section-' + id);
      $sect.append('<div id="bsbi-gallery" class="inline-gallery-container"></div>');
      var $copyright = $('<div id="bsbi-gallery-copyright"></div>').appendTo($sect);
      $copyright.text("Copyright Rob Still/Chris Gibson");
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

    function changePhenologyTab() {
      changePhenology(ds.bsbi_atlas.dataRoot, currentTaxon.identifier);
    }

    function changeEcologyTab() {
      changeEcology(ds.bsbi_atlas.dataRoot, currentTaxon.identifier);
    }

    function changeConservationTab() {
      changeConservation(currentTaxon);
    }

    function changeTrendsTab() {
      changeTrends(currentTaxon);
    }

    function updateSummaryTrends() {
      if (!currentTaxon.identifier) return;
      var trendRootLong = ds.bsbi_atlas.dataRoot + 'bsbi/trends/long/trends-summaries';
      var trendRootShort = ds.bsbi_atlas.dataRoot + 'bsbi/trends/short/trends-summaries';
      var trendCountRoot = ds.bsbi_atlas.dataRoot + 'bsbi/trends/hectad-counts';
      var ltIdentifier = currentTaxon.longTrendAgg ? currentTaxon.longTrendAgg : currentTaxon.identifier;
      var stIdentifier = currentTaxon.shortTrendAgg ? currentTaxon.shortTrendAgg : currentTaxon.identifier;
      var trendGbLong = "".concat(trendRootLong, "/Britain/").concat(ltIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
      var trendIrLong = "".concat(trendRootLong, "/Ireland/").concat(ltIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
      var trendGbShort = "".concat(trendRootShort, "/Britain/").concat(stIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
      var trendIrShort = "".concat(trendRootShort, "/Ireland/").concat(stIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
      var trendCountsLong = "".concat(trendCountRoot, "/").concat(ltIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
      var trendCountsShort = "".concat(trendCountRoot, "/").concat(stIdentifier.replace(/\./g, "_"), ".csv?prevent-cache=").concat(pcache);
      var $trends = $('#trend-summaries');
      $trends.html(''); //$trends.css('font-weight', 'bold')

      $trends.css('margin-bottom', '0.5em');
      var $trendHeaderLong = $('<div>').text('Post-1930 effort-adjusted 10 km trends').appendTo($trends);
      $trendHeaderLong.css('margin-bottom', '0.2em');
      var $tableLong = $('<table>').appendTo($trends);
      var $trBritainLong = $('<tr>').appendTo($tableLong);
      $('<td>').appendTo($trBritainLong).text('Britain:');
      $('<td>').attr('id', 'trend-sum-gb-long').css('padding', '0.1em 0 0.1em 0.1em').appendTo($trBritainLong);
      trendSummary2('trend-sum-gb-long');
      var $trIrelandLong = $('<tr>').appendTo($tableLong);
      $('<td>').appendTo($trIrelandLong).text('Ireland:');
      $('<td>').attr('id', 'trend-sum-ir-long').css('padding', '0.1em 0 0.1em 0.1em').appendTo($trIrelandLong);
      trendSummary2('trend-sum-ir-long');

      if (currentTaxon.longTrendAgg) {
        var $trLongNote = $('<div style="font-size: 0.8em">').appendTo($trends); //$trLongNote.html(`(Trend for aggregate taxon <i>${currentTaxon.longTrendAggName.replace('agg.', '</i>agg.<i>' )}</i>)`)

        setTrendsAggHtml(currentTaxon, 'long', $trLongNote);
      }

      var $trendHeaderShort = $('<div>').text('Post-1987 effort-adjusted 10 km trends').appendTo($trends);
      $trendHeaderShort.css('margin', '0.4em 0 0.2em 0');
      var $tableShort = $('<table>').appendTo($trends);
      var $trBritainShort = $('<tr>').appendTo($tableShort);
      $('<td>').appendTo($trBritainShort).text('Britain:');
      $('<td>').attr('id', 'trend-sum-gb-short').css('padding', '0.1em 0 0.1em 0.1em').appendTo($trBritainShort);
      trendSummary2('trend-sum-gb-short');
      var $trIrelandShort = $('<tr>').appendTo($tableShort);
      $('<td>').appendTo($trIrelandShort).text('Ireland:');
      $('<td>').attr('id', 'trend-sum-ir-short').css('padding', '0.1em 0 0.1em 0.1em').appendTo($trIrelandShort);
      trendSummary2('trend-sum-ir-short');

      if (currentTaxon.shortTrendAgg) {
        var $trShortNote = $('<div style="font-size: 0.8em">').appendTo($trends); //$trShortNote.html(`(Trend for aggregate taxon <i>${currentTaxon.shortTrendAggName.replace('agg.', '</i>agg.<i>' )}</i>)`)

        setTrendsAggHtml(currentTaxon, 'short', $trShortNote);
      }

      var pTrendGbLong = d3__namespace.csv(trendGbLong);
      var pTrendIrLong = d3__namespace.csv(trendIrLong);
      var pTrendGbShort = d3__namespace.csv(trendGbShort);
      var pTrendIrShort = d3__namespace.csv(trendIrShort);
      var pTrendCountsLong = d3__namespace.csv(trendCountsLong);
      var pTrendCountsShort = d3__namespace.csv(trendCountsShort);
      Promise.allSettled([pTrendGbLong, pTrendIrLong, pTrendGbShort, pTrendIrShort, pTrendCountsLong, pTrendCountsShort]).then(function (d) {
        var dTrendGbLong = d[0];
        var dTrendIrLong = d[1];
        var dTrendGbShort = d[2];
        var dTrendIrShort = d[3];
        var dTrendCountsLong = d[4];
        var dTrendCountsShort = d[5]; //console.log('dTrendCountsShort.value[0]', dTrendCountsShort.value[0])

        if (dTrendCountsLong.status === 'fulfilled' && Number(dTrendCountsLong.value[0].GbLong) >= 16 && dTrendGbLong.status === 'fulfilled') {
          updateTrendSummary2('trend-sum-gb-long', dTrendGbLong.value[0]);
        } else {
          updateTrendSummary2('trend-sum-gb-long', null);
        }

        if (dTrendCountsLong.status === 'fulfilled' && Number(dTrendCountsLong.value[0].IrLong) >= 7 && dTrendIrLong.status === 'fulfilled') {
          updateTrendSummary2('trend-sum-ir-long', dTrendIrLong.value[0]);
        } else {
          updateTrendSummary2('trend-sum-ir-long', null);
        }

        if (dTrendCountsShort.status === 'fulfilled' && Number(dTrendCountsShort.value[0].GbShort) >= 16 && dTrendGbShort.status === 'fulfilled') {
          updateTrendSummary2('trend-sum-gb-short', dTrendGbShort.value[0]);
        } else {
          updateTrendSummary2('trend-sum-gb-short', null);
        }

        if (dTrendCountsShort.status === 'fulfilled' && Number(dTrendCountsShort.value[0].IrShort) >= 7 && dTrendIrShort.status === 'fulfilled') {
          updateTrendSummary2('trend-sum-ir-short', dTrendIrShort.value[0]);
        } else {
          updateTrendSummary2('trend-sum-ir-short', null);
        }
      });
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
          //$caption.append('<h4>Description</h4>')
          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesDescription));
          $p = $('<p>').appendTo($caption); //let status = d[0].overallStatus
          //$p.append(`${status.charAt(0).toUpperCase()}${status.slice(1)}.`)
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
            }); //console.log('taxon', taxon)

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
          $caption.append('<h4>Trends</h4>');
          $('<div>').attr('id', 'trend-summaries').appendTo($caption);
          updateSummaryTrends(); // Text

          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesTrends));
        } // Biogeography


        if (d[0].atlasSpeciesBiogeography) {
          $caption.append('<h4>Biogeography</h4>');
          $p = $('<p>').appendTo($caption);
          $p.append(postProcessCaptionText(d[0].atlasSpeciesBiogeography));
        } // Conservation status etc


        consKeys.forEach(function (k) {
          currentTaxon[k] = d[0][k];
        });
        changeConservationTab(); // $('#statusDevel').html('')
        // const $ulStatus = $('<ul>').appendTo($('#statusDevel'))
        // consKeys.forEach(k => {
        //   const $li=$('<li>').appendTo($ulStatus)
        //   $li.html(`${k}: ${d[0][k]}`)
        // })
        // Parent taxa (for hybrids)

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
        $divref.html(d[0].captionRefs);
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
