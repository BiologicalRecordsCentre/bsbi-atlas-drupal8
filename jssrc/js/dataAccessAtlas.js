import * as d3 from 'd3'

// Only one export from this file - the data
// access structure. All the data access functions
// are members of this structure.
export const bsbiDataAccess = {}

bsbiDataAccess.bsbiDataRoot = ''
bsbiDataAccess.showStatus = true
bsbiDataAccess.resolution = 'hectad'
bsbiDataAccess.displayedMapType = 'static'
bsbiDataAccess.taxaHybridList = []
bsbiDataAccess.taxaNoStatusList = []
bsbiDataAccess.devel = {
  changeColours: ['#FAD0C8', '#DD5A2F', '#525252'],
  symboltype: 'circle'
}

// The periodMappsing code added 19/01/2020 to deal with mapping periods required in app
// that are different from those expressed in CSV files that I have available at that time.
// Was extended to meet the requirement of showing faded symbols for hectads where recorded
// in earlier time period.
const periodMappings = {
  "to 1929": {
      prior:[],
      csvperiods: ["to 1929"]
    },
  "1930 - 1969": {
      prior: ["to 1929"],
      csvperiods: ["1930 - 1969"]
    },
  "1970 - 1986": {
      prior: ["to 1929", "1930 - 1969"],
      csvperiods: ["1970 - 1986"],
    },
  "1987 - 1999": {
      prior: ["to 1929", "1930 - 1969", "1970 - 1986"],
      csvperiods: ["1987 - 1999"]
    },
  "2000 - 2019": {
      prior: ["to 1929", "1930 - 1969", "1970 - 1986", "1987 - 1999"],
      csvperiods: ["2000 - 2009", "2010 - 2019"]
  }
}

bsbiDataAccess.distAllClasses = function(identifier) {

  if (bsbiDataAccess.resolution === 'hectad') {
    return distAllClasses(identifier)
  } else if (bsbiDataAccess.resolution === 'tetrad') {
    return distAllClassesTetrad(identifier)
  } else {
    return distAllClassesMonad(identifier)
  }
}

bsbiDataAccess.status_29 = function(identifier) {
  return nativeSpeciesStatus(identifier, 'to 1929')
}

bsbiDataAccess.status_30_69 = function(identifier) {
  return nativeSpeciesStatus(identifier, '1930 - 1969')
}

bsbiDataAccess.status_70_86 = function(identifier) {
  return nativeSpeciesStatus(identifier, '1970 - 1986')
}

bsbiDataAccess.status_87_99 = function(identifier) {
  return nativeSpeciesStatus(identifier, '1987 - 1999')
}

bsbiDataAccess.status_00_19 = function(identifier) {
  return nativeSpeciesStatus(identifier, '2000 - 2019')
}

bsbiDataAccess.hybrid = function(identifier) {

  const hybridInfo = bsbiDataAccess.taxaHybridList.find(function(h){return h.taxon === identifier})

  //console.log("hybridInfo", hybridInfo)

  function markup(text) {
    // Look for ' x ' and replace either size with '</i> x <i>'
    const textOut = text.replace(/ x /g, '</i> x <i>')
    return '<i>' + textOut + '</i>'
  }

  const pHybrid =  new Promise(function (resolve, reject) {
    d3.csv(getCSV(identifier)).then(function (data) {
      resolve(data)
    })["catch"](function (e) {
      reject(e)
    })
  })
  const pParent1 =  new Promise(function (resolve, reject) {
    d3.csv(getCSV(hybridInfo.parent1)).then(function (data) {
      resolve(data)
    })["catch"](function (e) {
      reject(e)
    })
  })
  const pParent2 =  new Promise(function (resolve, reject) {
    d3.csv(getCSV(hybridInfo.parent2)).then(function (data) {
      resolve(data)
    })["catch"](function (e) {
      reject(e)
    })
  })

  return new Promise(function (resolve, reject) {
    Promise.all([pHybrid, pParent1, pParent2]).then(function (data) {
      //https://nbn.org.uk/wp-content/uploads/2020/01/Preston_et_al-2015-Biological_Journal_of_the_Linnean_Society.pdf

      const pink = '#E4C3AA'
      const blue = '#A8CBE2'
      const yellow = '#F7F619'

      const all = []
      data.filter(function(d,i){return i > 0}).forEach(function(taxonData, iTaxonData) {
        taxonData.forEach(function(r){
          const match = all.find(function(ar){return r.hectad === ar.gr})
          if (match){
            match.presence[iTaxonData] = true
          } else {
            const presence = [false, false]
            presence[iTaxonData] = true
            all.push({
              gr: r.hectad,
              presence: presence
            })
          }
        })
      })
      all.forEach(function(r) {
        r.colour = r.presence[0] && r.presence[1] ? yellow : r.presence[0] ? pink : blue
      }) 
      data[0].forEach(function(r){
        all.push({
          gr: r.hectad,
          shape: 'square',
          size: 0.6,
          colour: 'black'
        })
      })
      resolve({
        records: all,
        precision: 10000,
        shape: 'circle',
        size: 1,
        opacity: 1,
        legend: {
          lines:[
            {
              colour: 'black',
              text: 'Hybrid recorded',
              shape: 'square',
              size: 0.6
            },
            {
              colour: pink,
              text: markup(hybridInfo.parent1Name),
            },
            {
              colour: blue,
              text: markup(hybridInfo.parent2Name),
            },
            {
              colour: yellow,
              text: 'Both parents',
            }
          ]
        }
      })
    })["catch"](function (e) {
      reject(e)
    })
  })
}

function getCSV(identifier, type) {
  const folder = type ? type : 'hectads'
  const file = `${bsbiDataAccess.bsbiDataRoot}${folder}/${identifier.replace(".", "_")}.csv`
  return file
}

function distAllClasses(identifier) {

  const statusText = {
    n: 'Native', //inative
    a: 'Non-native (alien)', //non-native (alien),
    bullseye: 'Introduced',
    missing: 'missing' //no value yet
  }

  const statusColour = {
    n: 'blue',
    a: 'red',
    bullseye: 'black',
    missing: 'black'
  }

  const legendText = {
    "to 1929": "pre-1930",
    "1930 - 1969": "1930-69",
    "1970 - 1986": "1970-86",
    "1987 - 1999": "1987-99",
    "2000 - 2019": "2000-19"
  }

  const opacities = {
    "to 1929": 0.3,
    "1930 - 1969": 0.4,
    "1970 - 1986": 0.6,
    "1987 - 1999": 0.8,
    "2000 - 2019": 1
  }

  const periods = Object.keys(periodMappings).reverse()
  
  return new Promise(function (resolve, reject) {

    const counts = {}
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
      }
    })

    d3.csv(getCSV(identifier), function (r) {
      if (r.hectad ) {
        // GB or Irish?
        let country
        if (r.hectad.length === 3) {
          country='ire'
        } else {
          country='gb'
        }

        // Status (can be n for native, a for alien, or bullseye for reintroduced)
        const hectadstatus = r.hectadstatus ? r.hectadstatus : 'missing'

        // Count the occurrences in each date category
        // (not just the last one recorded in)
        let occurs = false
        let period, recent
        for (let iPeriod = 0; iPeriod < periods.length; iPeriod++) {
          period = periods[iPeriod]
          const csvperiods = periodMappings[period].csvperiods
          for (let iCsvperiod = 0; iCsvperiod < csvperiods.length; iCsvperiod++) {
            const csvperiod = csvperiods[iCsvperiod]
            if (r[csvperiod] === '1') {
              counts[period][country][hectadstatus]++
              counts[period][country]['total']++
              occurs = true
              recent = recent ? recent : period //Save the most recent period
              break
            }
          }
        }

        if (occurs) {
          if (bsbiDataAccess.showStatus) {
            const capText = statusText[hectadstatus]
            return {
              gr: r.hectad,
              //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
              shape: 'circle',
              colour: statusColour[hectadstatus],
              size: hectadstatus === 'missing' ? 0.5 : 1,
              opacity: opacities[recent],
              caption: "Hectad: <b>".concat(r.hectad, "</b></br>Status: <b>").concat(capText, "</b>")
            }
          } else {
            return {
              gr: r.hectad,
              //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
              shape: 'circle',
              colour: 'black',
              size: 1,
              opacity: opacities[recent],
              caption: "Hectad: <b>".concat(r.hectad, "</b>")
            }
          }
        }
      }
    }).then(function (data) {
      let legend
      const totalAlien = periods.reduce(function(t, p) {return t + counts[p].gb.a + counts[p].ire.a}, 0)
      const totalNative = periods.reduce(function(t, p) {return t + counts[p].gb.n + counts[p].ire.n}, 0)
      let lines = []
      if (bsbiDataAccess.showStatus) {
        if (totalNative) {
          lines.push({text: ['Native', '', 'GB', 'IR'], underline: true})
          periods.forEach(function(p) {
            lines.push ({
              colour: statusColour.n,
              opacity: opacities[p],
              text: [legendText[p], 'symbol', counts[p].gb.n, counts[p].ire.n],
              shape: 'circle'
            })
          })
        }
        if(totalNative && totalAlien){
          lines.push({text: []})
        }
        if (totalAlien) {
          lines.push({text: ['Alien', '', 'GB', 'IR'], underline: true})
          periods.forEach(function(p) {
            lines.push ({
              colour: statusColour.a,
              opacity: opacities[p],
              text: [legendText[p], 'symbol', counts[p].gb.a, counts[p].ire.a],
              shape: 'circle'
            })
          })
        }
      } else {
        lines = [{text: ['', '', 'GB', 'IR'], underline: true}]
        periods.forEach(function(p) {
          lines.push ({
            colour: 'black',
            opacity: opacities[p],
            text: [legendText[p], 'symbol', counts[p].gb.total, counts[p].ire.total],
            shape: 'circle'
          })
        })
      }
      legend = {
        size: 0.8,
        raligned: [false, false, true, true],
        padding: 5,
        lines: lines
      }

      console.log('legend', legend)

      resolve({
        records: data,
        precision: 10000,
        size: 1,
        legend: legend
      })
    })["catch"](function (e) {
      reject(e)
    })
  })
}

function distAllClassesTetrad(identifier) {

  //console.log('symboltype', bsbiDataAccess.devel.symboltype)

  return new Promise(function (resolve, reject) {

    d3.csv(getCSV(identifier, 'tetrads'), function (r) {
      if (r.tetrad ) {
        return {
          gr: r.tetrad,
          //shape: bsbiDataAccess.devel.symboltype, //'circle' dev only,
          shape: 'square',
          colour: 'black',
          size: 1,
          opacity: 1,
        }
      }
    }).then(function (data) {
      resolve({
        records: data,
        precision: 2000,
        size: 1,
        legend: {
          lines:[
            {
              colour: 'black',
              opacity: 1,
              text: 'Present in tetrad',
              //shape: bsbiDataAccess.devel.symboltype === 'square' ? 'square' : 'circle', //'circle' dev only
              shape: 'square'
            }
          ]
        }
      })
    })["catch"](function (e) {
      reject(e)
    })
  })
}

function distAllClassesMonad(identifier) {

  return new Promise(function (resolve, reject) {

    d3.csv(getCSV(identifier, 'monads'), function (r) {
      if (r.gr ) {
        return {
          gr: r.gr,
          shape: 'square',
          colour: 'black',
          size: 1,
          opacity: 1,
        }
      }
    }).then(function (data) {
      resolve({
        records: data,
        precision: 1000,
        size: 1,
        legend: {
          lines:[
            {
              colour: 'black',
              opacity: 1,
              text: 'Present in monad',
              shape: 'square'
            }
          ]
        }
      })
    })["catch"](function (e) {
      reject(e)
    })
  })
}

function nativeSpeciesStatus(identifier, period) {

  //Native (n)
  //Alien (a)
  //Present (y) - I'm not sure if this should be labelled as 'present' or 'native or alien' (not intermediate) 
  //Reintroduced (w) - this will be very rarely used
  //There may also be Casual (c) or that might be treated as Present or Native - I'll check with Kevin
  // const colours = {
  //   missing: '#F2CC35',
  //   //no value yet
  //   n: 'blue',
  //   //native
  //   a: 'red',
  //   //non-native (alien),
  //   y: 'grey',
  //   w: 'blue',
  //   bullseye: 'red'
  // }

  const counts = {
    occurs: {
      missing: 0,
      n: 0,
      a: 0,
      y: 0,
      w: 0,
      bullseye:0
    },
    prior: {
      missing: 0,
      n: 0,
      a: 0,
      y: 0,
      w: 0,
      bullseye:0
    }
  }

  return new Promise(function (resolve, reject) {

    d3.csv(getCSV(identifier), function (r) {
      if (r.hectad ) {
        let occurs = false
        periodMappings[period].csvperiods.forEach(function(csvPeriod) {
          if (r[csvPeriod] === '1') {
            occurs = true
          }
        })
        let prior = false
        periodMappings[period].prior.forEach(function(csvPeriod) {
          if (r[csvPeriod] === '1') {
            prior = true
          }
        })
        if (occurs || prior) {
          // if (bsbiDataAccess.showStatus) {
          //   const hectadstatus = r.hectadstatus ? r.hectadstatus : 'missing'
          //   let capText
          //   switch (hectadstatus) {
          //     case 'missing':
          //       capText = 'missing'
          //       break

          //     case 'n':
          //       capText = 'native'
          //       break

          //     case 'a':
          //       capText = 'alien (non-native)'
          //       break

          //     case 'y':
          //       capText = 'present'
          //       break

          //     case 'bullseye':
          //       capText = 'reintroduced'
          //       break
          //   }
            
          //   if (occurs) {
          //     counts.occurs[hectadstatus] = counts.occurs[hectadstatus] + 1
          //   } else {
          //     counts.prior[hectadstatus] = counts.prior[hectadstatus] + 1
          //   }
            
          //   return {
          //     gr: r.hectad,
          //     shape: hectadstatus === "w" ? 'bullseye' : bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
          //     size: 1,
          //     colour: colours[hectadstatus],
          //     colour2: colours.bullseye,
          //     opacity: occurs ? 1 : 0.5,
          //     caption: "Hectad: <b>".concat(r.hectad, "</b></br>Status: <b>").concat(capText, "</b>")
          //   }
          // } else {
            return {
              gr: r.hectad,
              //shape: bsbiDataAccess.displayedMapType === 'static' ? 'circle' : 'circlerad',
              shape: 'circle',
              size: 1,
              colour: 'black',
              opacity: occurs ? 1 : 0.5,
              caption: "Hectad: <b>".concat(r.hectad, "</b>")
            }
          //}
        }
      }
    }).then(function (data) {
      let legend
      // if (bsbiDataAccess.showStatus) {
      //   legend = {
      //     title: 'Native status',
      //     precision: 10000,
      //     size: 1,
      //     lines: []
      //   }
      //   if (counts.occurs.n) {
      //     legend.lines.push({
      //       colour: 'blue',
      //       opacity: 1,
      //       text: 'Native (' + (period === "to 1929" ? "pre-1930" : period.replace(" - ", "-")) + ')',
      //       shape: 'circle'
      //     })
      //   }
      //   //if (period != 'to 1929') {
      //   if (counts.prior.n) {
      //     legend.lines.push({
      //       colour: 'blue',
      //       opacity: 0.5,
      //       text: 'Native (earlier)',
      //       shape: 'circle'
      //     })
      //   }
      //   if (counts.occurs.a) {
      //     legend.lines.push({
      //       colour: 'red',
      //       opacity: 1,
      //       text: 'Alien (' + (period === "to 1929" ? "pre-1930" : period.replace(" - ", "-")) + ')',
      //       shape: 'circle'
      //     })
      //   }
      //   //if (period != 'to 1929') {
      //   if (counts.prior.a) {
      //     legend.lines.push({
      //       colour: 'red',
      //       opacity: 0.5,
      //       text: 'Alien (earlier)',
      //       shape: 'circle'
      //     })
      //   }
      //   // If no reintroductions, remove legend item
      //   if (counts.occurs.bullseye) {
      //     legend.lines.push({
      //       colour: 'blue',
      //       colour2: 'red',
      //       opacity: 1,
      //       text: 'Reintroduced (' + (period === "to-1929" ? "pre 1930" : period.replace(" - ", "-")) + ')',
      //       shape: 'bullseye'
      //     })
      //   }
      //   if (counts.prior.bullseye) {
      //     legend.lines.push({
      //       colour: 'blue',
      //       colour2: 'red',
      //       opacity: 0.5,
      //       text: 'Reintroduced (earlier)',
      //       shape: 'bullseye'
      //     })
      //   }
      // } else {
        legend = {
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
        }
        // If period is 'to 1929' remove the 'earlier' line
        if (period == 'to 1929') {
          legend.lines.pop()
        }
      //}
      resolve({
        records: data,
        precision: 10000,
        opacity: 1,
        size: 1,
        legend: legend
      })
    })["catch"](function (e) {
      reject(e)
    })
  })
}

bsbiDataAccess.change_1987_1999_vs_2000_2019 = function(identifier) {
  return change(identifier, ['1987 - 1999'], ['2000 - 2009', '2010 - 2019'], 'Change from 1987-1999 to 2000-2019')
}

bsbiDataAccess.change_1930_1969_vs_2000_2019 = function(identifier) {
  return change(identifier, ['1930 - 1949', '1950 - 1969'], ['2000 - 2009', '2010 - 2019'], 'Change from 1930-1969 to 2000-2019')
}

function change(identifier, early, late, legendTitle) {
  const shapes = ['square', 'triangle-up', 'triangle-down']
  //const colours = ['#FAD0C8', '#DD5A2F', '#525252']
  const colours = bsbiDataAccess.devel.changeColours
  return new Promise(function (resolve, reject) {
    d3.csv(getCSV(identifier), function (r) {
      const presentEarly = early.some(function (f) {
        return r[f] === '1'
      })
      const presentLate = late.some(function (f) {
        return r[f] === '1'
      })
      let i, capText

      if (presentEarly && presentLate) {
        i = 0 //present
        capText = 'present in both periods'
      } else if (!presentEarly && presentLate) {
        i = 1 //gain
        capText = 'gain'
      } else if (presentEarly && !presentLate) {
        i = 2 //loss
        capText = 'loss'
      } else {
        i = 100 //not present in either period
      }

      if (r.hectad && i < 100) {
        return {
          gr: r.hectad,
          colour: colours[i],
          shape: shapes[i],
          caption: "Hectad: <b>".concat(r.hectad, "</b></br>Change: <b>").concat(capText, "</b>")
        }
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
      })
    })["catch"](function (e) {
      reject(e)
    })
  })
}

bsbiDataAccess.bsbiHectadDateTetFreq = function(identifier) {

  const fields = ["to 1929", "1930 - 1969", "1970 - 1986", "1987 - 1999", "2000 - 2009", "2010 - 2019"]
  const legendSizeFact = 0.5
  //const colour = d3.scaleLinear().domain([1, 13, 25]).range(['#edf8b1', '#7fcdbb', '#2c7fb8'])
  return new Promise(function (resolve, reject) {
    d3.csv(getCSV(identifier), function (r) {

      const tetrads = Number(r['distinct tetrads'])
      const tetround = Math.ceil(tetrads/5)*5

      if (r.hectad && tetrads) {
        return {
          gr: r.hectad,
          size: Math.sqrt(tetround)/5,
          caption: "Hectad: <b>".concat(r.hectad, "</b></br>Tetrads where present: <b>").concat(tetrads, "</b>")
        }
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
            size: Math.sqrt(5)/5 * legendSizeFact,
          }, {
            text: '6-10',
            size: Math.sqrt(10)/5 * legendSizeFact,
          },{
            text: '11-15',
            size: Math.sqrt(15)/5 * legendSizeFact,
          }, {
            text: '16-20',
            size: Math.sqrt(20)/5 * legendSizeFact,
          }, {
            text: '21-25',
            size: Math.sqrt(25)/5 * legendSizeFact,
          }]
        }
      })
    })["catch"](function (e) {
      reject(e)
    })
  })
}


