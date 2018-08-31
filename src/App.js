import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { CirclePicker } from 'react-color';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ws: new WebSocket('ws://192.168.0.252:9395'),
      value: ''
    };

    this.state.ws.onopen = function () {
      console.log("Opening a connection...");
      this.send("subscribe: 0");
      this.send("ready");
    };
    this.state.ws.onclose = function (evt) {
        console.log("I'm sorry. Bye!");
    };
    this.state.ws.onmessage = function (evt) {
      console.log("Message: " + evt.data);
    };
    this.state.ws.onerror = function (evt) {
        console.log("ERR: " + evt.data);
    };
  


  }

  state = {
    background: '#fff',
  };

  handleChangeComplete = (color) => {
    this.setState({ background: color.hex });
    console.log(color.rgb);
    var message1 = "dock:0 data:s 1 "+color.rgb.r+","+color.rgb.g+","+color.rgb.b;
    var message2 = "dock:0 data:s 7 "+color.rgb.r+","+color.rgb.g+","+color.rgb.b;
    var message3 = "dock:0 data:s 8 "+color.rgb.r+","+color.rgb.g+","+color.rgb.b;
    // console.log(message)
    this.state.ws.send(message1);
    this.state.ws.send(message2);
    this.state.ws.send(message3);
  };


  render() {
/*     return <CirclePicker 
    // color={ this.state.background }
    onChangeComplete={ this.handleChangeComplete }
    />;  */
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Pick a color</h1>
        </header>

        <div class="container">
        <div class="col-centered">
          <CirclePicker 
          // color={ this.state.background }
          onChangeComplete={ this.handleChangeComplete }
          />
        </div>
        </div>
        
        
      </div>
    );
  }
  
}

export default App;
