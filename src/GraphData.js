import React, { Component } from 'react';

var self = null;

class GraphData extends Component {
  render() {
    console.log(this);
    if (this.state) {
      return <div>{this.state.data}</div>
    }

    return <div>Loading</div>
  }

  componentDidMount() {
    self = this;
    fetch('http://localhost:8080/summary')
      .then((response) => response.json())
      .then((responseJson) => {
        var res = '';
        for (var o of responseJson.result) {
          res += `${o.d} at ${new Date(o.time).toString()} \n`;
        }
        self.setState({
          data: res
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default GraphData;