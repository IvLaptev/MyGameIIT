import {Component} from "react";

export default class Background extends Component<{}, {}> {
  render() {
    return (
      <div style={{position: 'absolute', width: '100%', height: '100%', zIndex: 1}}>
        <div style={{background: 'radial-gradient(circle, rgb(42 85 181) 0%, rgb(65 115 202) 36%, rgb(10 10 101) 100%)', width: '100%', height: '100%'}}></div>
      </div>
    )
  }
}