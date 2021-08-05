import './App.css';
import {Component} from 'react';
import Background from "./Components/Background";
import data from './data';
import Table from "./Components/Table";

export default class App extends Component<{}, {}> {
  render() {
    return (
      <div className={"fullscreen"}>
        <Background />
        <Table data={data} />
      </div>
    );
  }
}
