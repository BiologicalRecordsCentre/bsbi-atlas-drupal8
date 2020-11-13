var bsbiDataAccess = {};
bsbiDataAccess.showStatus = true;

(function() {

  bsbiDataAccess.status_29 = function(identifier) {
    return nativeSpeciesStatus(identifier, 'to 1929')
  }
  bsbiDataAccess.status_30_49 = function(identifier) {
    return nativeSpeciesStatus(identifier, '1930 - 1949')
  }
  bsbiDataAccess.status_50_69 = function(identifier) {
    return nativeSpeciesStatus(identifier, '1950 - 1969')
  }
  bsbiDataAccess.status_70_86 = function(identifier) {
    return nativeSpeciesStatus(identifier, '1970 - 1986')
  }
  bsbiDataAccess.status_87_99 = function(identifier) {
    return nativeSpeciesStatus(identifier, '1987 - 1999')
  }
  bsbiDataAccess.status_00_09 = function(identifier) {
    return nativeSpeciesStatus(identifier, '2000 - 2009')
  }
  bsbiDataAccess.status_10_19 = function(identifier) {
    return nativeSpeciesStatus(identifier, '2010 - 2019')
  }

  function getCSV(identifier) {
    var file = "".concat(bsbiDataRoot).concat(identifier.replace(".", "_"), ".csv");
    return file;
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

      console.log("show status", bsbiDataAccess.showStatus)
      var nNativeGB = 0
      var nNativeIre = 0
      var nAlienGB = 0
      var nAlienIre = 0
      var nPresentGB = 0
      var nPresentIre = 0
      var nReintGB = 0
      var nReintIre = 0
      var nMissingGB = 0
      var nMissingIre = 0

      d3.csv(getCSV(identifier), function (r) {
        if (r.hectad && r[period] === '1') {
          if (bsbiDataAccess.showStatus) {
            var atlasstatus = r.atlasstatus ? r.atlasstatus : 'missing';
            var capText;
            switch (atlasstatus) {
              case 'missing':
                capText = 'missing';
                // if (r.hectad.length === 3) {
                //   nMissingIre++
                // } else {
                //   nMissingGB++
                // }
                break;

              case 'n':
                capText = 'native';
                // if (r.hectad.length === 3) {
                //   nNativeIre++
                // } else {
                //   nNativeGB++
                // }
                break;

              case 'a':
                capText = 'alien (non-native)';
                // if (r.hectad.length === 3) {
                //   nAlienIre++
                // } else {
                //   nAlienGB++
                // }
                break;

              case 'y':
                capText = 'present';
                // if (r.hectad.length === 3) {
                //   nPresentIre++
                // } else {
                //   nPresentGB++
                // }
                break;

              case 'bullseye':
                capText = 'reintroduced';
                // if (r.hectad.length === 3) {
                //   nReintIre++
                // } else {
                //   nReintGB++
                // }
                break;
            }
            return {
              gr: r.hectad,
              //status: atlasstatus,
              shape: atlasstatus === "w" ? 'bullseye' : 'circle',
              colour: colours[atlasstatus],
              colour2: colours.bullseye,
              caption: "Hectad: <b>".concat(r.hectad, "</b></br>Status: <b>").concat(capText, "</b>")
            };
          } else {
            return {
              gr: r.hectad,
              shape: 'circle',
              colour: 'green',
              caption: "Hectad: <b>".concat(r.hectad, "</b>")
            };
          }
        }
      }).then(function (data) {

        if (bsbiDataAccess.showStatus) {
          var legend = {
            title: 'Native status',
            precision: 10000,
            opacity: 0.8,
            size: 1,
            lines: [{
              colour: 'blue',
              //text: 'Native (GB: ' + nNativeGB + ', Ire: ' + nNativeIre + ')',
              text: 'Native',
              shape: 'circle'
            }, {
              colour: 'red',
              //text: 'Alien (GB: ' + nAlienGB + ', Ire: ' + nAlienIre + ')',
              text: 'Alien',
              shape: 'circle'
            }, {
              colour: 'grey',
              //text: 'Present (GB: ' + nPresentGB + ', Ire: ' + nPresentIre + ')',
              text: 'Present',
              shape: 'circle'
            }, {
              colour: 'blue',
              colour2: 'red',
              //text: 'Reintroduced (GB: ' + nReintGB + ', Ire: ' + nReintIre + ')',
              text: 'Reintroduced',
              shape: 'bullseye'
            }, {
              colour: '#F2CC35',
              //text: 'data missing (GB: ' + nMissingGB + ', Ire: ' + nMissingIre + ')',
              text: 'data missing',
              shape: 'circle'
            }]
          }
        } else {
          legend: {lines:[]}
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
    var colours = ['#FAD0C8', '#DD5A2F', '#525252'];
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
              colour: '#DD5A2F',
              text: 'Gain',
              shape: 'triangle-up'
            }, {
              colour: '#FAD0C8',
              text: 'No change',
              shape: 'square'
            }, {
              colour: '#525252',
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
    var colour = d3.scaleLinear().domain([1, 13, 25]).range(['#edf8b1', '#7fcdbb', '#2c7fb8']);
    return new Promise(function (resolve, reject) {
      d3.csv(getCSV(identifier), function (r) {
        var fake = fields.reduce(function (t, f) {
          return t + Number(r[f]);
        }, 1);
        fake = fake ? fake / 7 * 25 : 0;

        if (r.hectad) {
          return {
            gr: r.hectad,
            colour: colour(fake),
            caption: "Hectad: <b>".concat(r.hectad, "</b></br>Tetrads where present: <b>").concat(Math.floor(fake), "</b>")
          };
        }
      }).then(function (data) {
        resolve({
          records: data,
          size: 1,
          shape: 'circle',
          precision: 10000,
          opacity: 0.9,
          legend: {
            title: 'Tetrad frequency',
            size: 1,
            shape: 'circle',
            precision: 10000,
            opacity: 0.9,
            lines: [{
              colour: '#edf8b1',
              text: '1 tetrad'
            }, {
              colour: '#7fcdbb',
              text: '13 tetrads'
            }, {
              colour: '#2c7fb8',
              text: '25 tetrads'
            }]
          }
        });
      })["catch"](function (e) {
        reject(e);
      });
    });
  }

})()

