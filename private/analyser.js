'use strict';
const jimp = require('jimp');

module.exports = function () {
  const interval = 120000;
  const URL = 'http://haba.tko-aly.fi/kuvat/webcam2.jpg';
  var stats = [];

  this.getStats = () => {
    return JSON.stringify({result: stats});
  };

  analyse();
  setInterval(analyse, interval);
  function analyse() {
    var start = Date.now();
    var avg = calcAvg();
    try {
      jimp.read(URL, (err, img) => {
        if (err) throw err;
        var d = Date.now();
        var s = 0;
        img.scan(319, 401, 1069, 575, (x, y, idx) => {
          let r = img.bitmap.data[idx];
          let g = img.bitmap.data[idx + 1];
          let b = img.bitmap.data[idx + 2];
          let sum = (r + g + b) / 3;
          let delta = Math.abs(sum - avg);
          if (delta > 50 && delta < 125) {
            s += delta * 1.3;
          } else s += delta;
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