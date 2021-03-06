'use strict';
const jimp = require('jimp');

module.exports = function () {
  const interval = 120000;
  const URL = 'http://haba.tko-aly.fi/kuvat/webcam2.jpg';
  var stats = [];
  var completeStats = [];

  this.getStats = () => {
    return completeStats.length === 0 ? JSON.stringify({ result: stats }) : JSON.stringify({ result: completeStats })
  };

  analyse();
  setInterval(analyse, interval);
  setInterval(() => {
    completeStats = stats;
    stats = [];
  }, 86400000);
  function analyse() {
    var start = Date.now();
    var avg = calcAvg();
    try {
      jimp.read(URL, (err, img) => {
        if (err) console.log(err);
        var d = Date.now();
        var s = 0;
        img.scan(319, 401, 1069, 575, (x, y, idx) => {
          let r = img.bitmap.data[idx];
          let g = img.bitmap.data[idx + 1];
          let b = img.bitmap.data[idx + 2];
          let sum = (r + g + b) / 3;
          let delta = Math.abs(sum - avg);
          if (delta > 50 && delta < 125) {
            s += sum * 1.3;
          } else s += sum;
        });
        stats.push({ d: Math.floor(s) / 130500, time: d })
        console.log(Date.now() - start);
      });
    } catch (e) {
      counsole.log(e);
    }
  }

  function calcAvg() {
    var i = 0;
    var s = 0;
    for (var stat of stats) {
      s += stat.d;
      i++;
    }

    return (s / i);
  }
};