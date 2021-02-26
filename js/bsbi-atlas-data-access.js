var bsbiDataAccess = {};
bsbiDataAccess.showStatus = true;
bsbiDataAccess.devel = {
  changeColours: ['#FAD0C8', '#DD5A2F', '#525252']
};

(function() {

    // The periodMappsing code added 19/01/2020 to deal with mapping periods required in app
    // that are different from those expressed in CSV files that I have available at that time.
    // Was extended to meet the requirement of showing faded symbols for hectads where recorded
    // in earlier time period.
    var periodMappings = {
      "to 1929": {
          prior:[],
          csvperiods: ["to 1929"]
        },
      "1930 - 1969": {
          prior: ["to 1929"],
          csvperiods: ["1930 - 1949", "1950 - 1969"]
        },
      "1970 - 1986": {
          prior: ["to 1929", "1930 - 1949", "1950 - 1969"],
          csvperiods: ["1970 - 1986"],
        },
      "1987 - 1999": {
          prior: ["to 1929", "1930 - 1949", "1950 - 1969", "1970 - 1986"],
          csvperiods: ["1987 - 1999"]
        },
      "2000 - 2019": {
          prior: ["to 1929", "1930 - 1949", "1950 - 1969", "1970 - 1986", "1987 - 1999"],
          csvperiods: ["2000 - 2009", "2010 - 2019"]
      }
    }

  bsbiDataAccess.distAllClasses = function(identifier) {
    return distAllClasses(identifier)
  }

  bsbiDataAccess.status_29 = function(identifier) {
    return nativeSpeciesStatus(identifier, 'to 1929')
  }
  // bsbiDataAccess.status_30_49 = function(identifier) {
  //   return nativeSpeciesStatus(identifier, '1930 - 1949')
  // }
  // bsbiDataAccess.status_50_69 = function(identifier) {
  //   return nativeSpeciesStatus(identifier, '1950 - 1969')
  // }
  bsbiDataAccess.status_30_69 = function(identifier) {
    return nativeSpeciesStatus(identifier, '1930 - 1969')
  }
  bsbiDataAccess.status_70_86 = function(identifier) {
    return nativeSpeciesStatus(identifier, '1970 - 1986')
  }
  bsbiDataAccess.status_87_99 = function(identifier) {
    return nativeSpeciesStatus(identifier, '1987 - 1999')
  }
  // bsbiDataAccess.status_00_09 = function(identifier) {
  //   return nativeSpeciesStatus(identifier, '2000 - 2009')
  // }
  // bsbiDataAccess.status_10_19 = function(identifier) {
  //   return nativeSpeciesStatus(identifier, '2010 - 2019')
  // }
  bsbiDataAccess.status_00_19 = function(identifier) {
    return nativeSpeciesStatus(identifier, '2000 - 2019')
  }

  function getCSV(identifier) {
    var file = "".concat(bsbiDataRoot).concat(identifier.replace(".", "_"), ".csv");
    return file;
  }

  function distAllClasses(identifier) {

    var shapes = {
      n: 'circle', //native
      a: 'diamond', //non-native (alien),
      bullseye: 'square',
      missing: 'circle', //no value yet
    };

    var statusText = {
      n: 'Native', //inative
      a: 'Non-native (alien)', //non-native (alien),
      bullseye: 'Introduced',
      missing: 'missing', //no value yet
    };

    var opacities = {
      "to 1929": 0.3,
      "1930 - 1969": 0.4,
      "1970 - 1986": 0.5,
      "1987 - 1999": 0.6,
      "2000 - 2019": 0.8
    }

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
          uk: {
            n: 0,
            a: 0,
            reint: 0,
            missing: 0,
            total: 0
          }
        }
      });
      Object.keys(statusText).forEach(function (s) {
        counts[s] = 0
      });

      d3.csv(getCSV(identifier), function (r) {
        if (r.hectad ) {
          // UK or Irish?
          var country;
          if (r.hectad.length === 3) {
            country='ire';
          } else {
            country='uk';
          }

          // Status (can be n for native, a for alien, or bullseye for reintroduced)
          var atlasstatus = r.atlasstatus ? r.atlasstatus : 'missing';

          // See which period it was *last* recorded in and
          // count it in the relevant category
          var occurs = false
          var period
          for (iPeriod = 0; iPeriod < periods.length; iPeriod++) {
            period = periods[iPeriod];
            var csvperiods = periodMappings[period].csvperiods;
            for (iCsvperiod = 0; iCsvperiod < csvperiods.length; iCsvperiod++) {
              var csvperiod = csvperiods[iCsvperiod];
              if (r[csvperiod] === '1') {
                occurs = true
                counts[period][country][atlasstatus]++
                counts[period][country]['total']++
                counts[atlasstatus]++
                break
              }
            }
            if (occurs) break
          }

          if (occurs) {
            if (bsbiDataAccess.showStatus) {
              var capText = statusText[atlasstatus]
              return {
                gr: r.hectad,
                //period: period,
                shape: shapes[atlasstatus],
                colour: 'black',
                size: atlasstatus === 'missing' ? 0.5 : 1,
                opacity: opacities[period],
                caption: "Hectad: <b>".concat(r.hectad, "</b></br>Status: <b>").concat(capText, "</b>")
              };
            } else {
              return {
                gr: r.hectad,
                //period: period,
                shape: 'circle',
                colour: 'black',
                opacity: opacities[period],
                caption: "Hectad: <b>".concat(r.hectad, "</b>")
              };
            }
          }
        }
      }).then(function (data) {
        var legend
        var lines = periods.map(function(p) {
          return {
            colour: 'black',
            opacity: opacities[p],
            text: p.replace(" - ", "-") + ' (uk: ' + counts[p].uk.total + ', ire: ' + counts[p].ire.total + ')',
            shape: 'circle',
            size: 1
          }
        })
        if (bsbiDataAccess.showStatus) {
          Object.keys(shapes).forEach(function(s){
            if (counts[s]){
              lines.push({
                colour: 'black',
                opacity: 1,
                text: s === 'missing' ? 'No status info' : statusText[s],
                size: s === 'missing' ? 0.5 : 1,
                shape: shapes[s]
              })
            }
          })
          legend = {
            //title: 'Native status',
            precision: 10000,
            //size: 1,
            lines: lines
          }
        } else {
          legend = {
            //title: '',
            precision: 10000,
            size: 1.0,
            lines: lines
          }
        }
        resolve({
          records: data,
          //records: [],
          precision: 10000,
          opacity: 0.8,
          size: 1.0,
          legend: legend
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

  function nativeSpeciesStatus(identifier, period) {

    //Native (n)
    //Alien (a)
    //Present (y) - I'm not sure if this should be labelled as 'present' or 'native or alien' (not intermediate) 
    //Reintroduced (w) - this will be very rarely used
    //There may also be Casual (c) or that might be treated as Present or Native - I'll check with Kevin
    var colours = {
      missing: '#F2CC35',
      //no value yet
      n: 'blue',
      //native
      a: 'red',
      //non-native (alien),
      y: 'grey',
      w: 'blue',
      bullseye: 'red'
    };
    return new Promise(function (resolve, reject) {

      var nReint = 0

      d3.csv(getCSV(identifier), function (r) {
        if (r.hectad ) {
          var occurs = false
          periodMappings[period].csvperiods.forEach(function(csvPeriod) {
            if (r[csvPeriod] === '1') {
              occurs = true
            }
          })
          var prior = false
          periodMappings[period].prior.forEach(function(csvPeriod) {
            if (r[csvPeriod] === '1') {
              prior = true
            }
          })
          if (occurs || prior) {
            if (bsbiDataAccess.showStatus) {
              var atlasstatus = r.atlasstatus ? r.atlasstatus : 'missing';
              var capText;
              switch (atlasstatus) {
                case 'missing':
                  capText = 'missing';
                  break;

                case 'n':
                  capText = 'native';
                  break;

                case 'a':
                  capText = 'alien (non-native)';
                  break;

                case 'y':
                  capText = 'present';
                  break;

                case 'bullseye':
                  capText = 'reintroduced';
                  nReint = nReint + 1;
                  break;
              }
              return {
                gr: r.hectad,
                shape: atlasstatus === "w" ? 'bullseye' : 'circle',
                colour: colours[atlasstatus],
                colour2: colours.bullseye,
                opacity: occurs ? 0.8 : 0.4,
                caption: "Hectad: <b>".concat(r.hectad, "</b></br>Status: <b>").concat(capText, "</b>")
              };
            } else {
              return {
                gr: r.hectad,
                shape: 'circle',
                colour: 'black',
                opacity: occurs ? 0.8 : 0.4,
                caption: "Hectad: <b>".concat(r.hectad, "</b>")
              };
            }
          }
        }
      }).then(function (data) {
        var legend
        if (bsbiDataAccess.showStatus) {
          legend = {
            title: 'Native status',
            precision: 10000,
            size: 1,
            lines: [{
              colour: 'blue',
              opacity: 0.8,
              text: 'Native (' + period.replace(" - ", "-") + ')',
              shape: 'circle'
            },
            {
              colour: 'blue',
              opacity: 0.4,
              text: 'Native (earlier)',
              shape: 'circle'
            },
            {
              colour: 'red',
              opacity: 0.8,
              text: 'Alien (' + period.replace(" - ", "-") + ')',
              shape: 'circle'
            }, 
            {
              colour: 'red',
              opacity: 0.4,
              text: 'Alien (earlier)',
              shape: 'circle'
            }, 
            {
              colour: 'blue',
              colour2: 'red',
              opacity: 0.8,
              text: 'Reintroduced (' + period.replace(" - ", "-") + ')',
              shape: 'bullseye'
            },
            {
              colour: 'blue',
              colour2: 'red',
              opacity: 0.4,
              text: 'Reintroduced (earlier)',
              shape: 'bullseye'
            }]
          }
          // If no reintroductions, remove legend item
          if (!nReint) {
            legend.lines.pop()
            legend.lines.pop()
          }
        } else {
          //legend = {lines: []}
          legend = {
            //title: '',
            precision: 10000,
            size: 1,
            lines: [{
              colour: 'black',
              opacity: 0.8,
              text: period.replace(" - ", "-"),
              shape: 'circle'
            }, {
              colour: 'black',
              opacity: 0.4,
              text: 'Earlier',
              shape: 'circle'
            }]
          }
          // If period is 'to 1929' remove the 'earlier' line
          if (period == 'to 1929') {
            legend.lines.pop()
          }
        }
        resolve({
          records: data,
          precision: 10000,
          opacity: 0.8,
          size: 1,
          legend: legend
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

  bsbiDataAccess.change_1987_1999_vs_2000_2019 = function(identifier) {
    return change(identifier, ['1987 - 1999'], ['2000 - 2009', '2010 - 2019'], 'Change from 1987-1999 to 2000-2019');
  }
  bsbiDataAccess.change_1930_1969_vs_2000_2019 = function(identifier) {
    return change(identifier, ['1930 - 1949', '1950 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930-1969 to 2000-2019');
  }

  function change(identifier, early, late, legendTitle) {
    var shapes = ['square', 'triangle-up', 'triangle-down'];
    //var colours = ['#FAD0C8', '#DD5A2F', '#525252'];
    var colours = bsbiDataAccess.devel.changeColours;
    return new Promise(function (resolve, reject) {
      d3.csv(getCSV(identifier), function (r) {
        var presentEarly = early.some(function (f) {
          return r[f] === '1';
        });
        var presentLate = late.some(function (f) {
          return r[f] === '1';
        });
        var i, capText;

        if (presentEarly && presentLate) {
          i = 0; //present

          capText = 'present in both periods';
        } else if (!presentEarly && presentLate) {
          i = 1; //gain

          capText = 'gain';
        } else if (presentEarly && !presentLate) {
          i = 2; //loss

          capText = 'loss';
        } else {
          i = 100; //not present in either period
        }

        if (r.hectad && i < 100) {
          return {
            gr: r.hectad,
            colour: colours[i],
            shape: shapes[i],
            caption: "Hectad: <b>".concat(r.hectad, "</b></br>Change: <b>").concat(capText, "</b>")
          };
        }
      }).then(function (data) {
        resolve({
          records: data,
          size: 1,
          precision: 10000,
          opacity: 0.9,
          legend: {
            title: legendTitle,
            size: 1,
            precision: 10000,
            opacity: 0.9,
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

  bsbiDataAccess.bsbiHectadDateTetFreq = function(identifier) {
    var fields = ["to 1929", "1930 - 1949", "1950 - 1969", "1970 - 1986", "1987 - 1999", "2000 - 2009", "2010 - 2019"];
    var legendSizeFact = 0.5;
    //var colour = d3.scaleLinear().domain([1, 13, 25]).range(['#edf8b1', '#7fcdbb', '#2c7fb8']);
    return new Promise(function (resolve, reject) {
      d3.csv(getCSV(identifier), function (r) {
        var fake = fields.reduce(function (t, f) {
          return t + Number(r[f]);
        }, 1);
        fake = fake ? fake / 7 * 25 : 0;

        if (r.hectad) {
          return {
            gr: r.hectad,
            size: Math.sqrt(fake)/5,
            //colour: colour(fake),
            caption: "Hectad: <b>".concat(r.hectad, "</b></br>Tetrads where present: <b>").concat(Math.floor(fake), "</b>")
          };
        }
      }).then(function (data) {
        resolve({
          records: data,
          //size: 1,
          colour: 'black',
          shape: 'circle',
          precision: 10000,
          opacity: 0.9,
          legend: {
            title: 'Tetrad frequency',
            size: 1,
            shape: 'circle',
            colour: 'black',
            precision: 10000,
            opacity: 0.9,
            lines: [{
              text: '5 tetrad',
              size: Math.sqrt(5)/5 * legendSizeFact,
            }, {
              text: '10 tetrads',
              size: Math.sqrt(10)/5 * legendSizeFact,
            },{
              text: '15 tetrad',
              size: Math.sqrt(15)/5 * legendSizeFact,
            }, {
              text: '20 tetrads',
              size: Math.sqrt(20)/5 * legendSizeFact,
            }, {
              text: '25 tetrads',
              size: Math.sqrt(25)/5 * legendSizeFact,
            }]
          }
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

})()

