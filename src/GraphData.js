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
    fetch('http://localhost:8080/summary')
      .then((response) => response.json())
      .then((responseJson) => {
        var data = [];
        var dates = [];
        for (var o of responseJson.result) {
          data.push(o.d);
          var d = new Date(o.time);
          dates.push(d.getHours() + ':' + d.getMinutes());
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