import React, { Component } from 'react';
const LineChart = require("react-chartjs").Line;
var self = null;

class GraphData extends Component {
  render() {
    if (this.state) {
      return <LineChart data={this.state.data} width="1000" height="600"/>
    }

    return <div>Loading</div>
  }

  componentDidMount() {
    self = this;
    fetch('http://jallu.ml:1234/summary')
      .then((response) => response.json())
      .then((responseJson) => {
        var data = [];
        var dates = [];
        for (var i = 0; i < 24; i++) {
          var hour = (new Date(responseJson.result[0].time).getHours() + i) % 24;
          var s = 0;
          var iter = 0;
          for (var o of responseJson.result) {
            var h = new Date(o.time).getHours();
            if (h === i) {
              s += o.d;
              iter++;
            }
          }
          if (iter !== 0) {
            data.push(s / iter);
            dates.push(i);
            s = 0;
            iter = 0;
          }
        }
        self.setState({
          data: {
            labels: dates,
            datasets: [
              {
                fill: false,
                strokeColor: 'rgb(234, 152, 44)',
                fillColor: "rgb(234, 152, 44)",
                scaleStartValue: 0,
                data: data
              }
            ]
          },
          dates: dates
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default GraphData;