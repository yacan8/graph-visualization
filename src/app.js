import React, { Component } from 'react';
import Graph from './components/graph';
import DialogWraper from './components/graph/dialogWraper';

class App extends Component {
  state = {
    graphComponent: null
  };
  render() {
    return (
      <div className="constainer">
        <Graph addRef={graphComponent => this.setState({graphComponent})}/>
        <DialogWraper graphComponent={this.state.graphComponent}/>
      </div>
    );
  }
}

export default App;
