import React, { Component, Suspense } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.connect = this.connect.bind(this);
  }
  componentDidMount() {
    this.interval = setInterval(this.connect, 1000);
  }
  componentWillUnmount() {
    if (this.ws) this.ws.close();
    if (this.interval) clearInterval(this.interval);
  }
  connect = () => {
    if (this.ws === undefined || (this.ws && this.ws.readyState === 3)) {
      this.ws = new WebSocket(`ws://127.0.0.1:8000/ws/message/`);
    }
    this.ws.onopen = () => {
      console.log("Websocket Client Connected");
      this.ws.send(
        JSON.stringify({
          type: "welcome_msg",
        })
      );
    };
    this.ws.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        console.log("got Reply!", dataFromServer);
      }
    };
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Suspense fallback={null}>
          <main></main>
        </Suspense>
      </React.Fragment>
    );
  }
}
export default App;
