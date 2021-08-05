import {Component} from "react";
import './Table.css';

export default class Table extends Component<TableProps, TableState> {
  constructor(props: TableProps) {
    super(props);

    this.state = {
      data: props.data,
      locked: false
    };
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleKey)
  }

  handleKey = (e: any) => {
    if (!this.state.active) {
      this.setState((state) => ({
        data: state.data,
        active: { row: 0, col: 0}
      }));
    } else {
      if (!this.state.locked) {
        this.navigate(e);
      } else {
        this.answer(e);
      }
    }
  }

  navigate = (e: any) => {
    const active = this.state.active!;
    if (e.key === 'w') {
      active.row -= 1;
    }
    if (e.key === 's') {
      active.row += 1;
    }
    if (e.key === 'a') {
      active.col -= 1;
    }
    if (e.key === 'd') {
      active.col += 1;
    }

    if (active.row < 0) {
      active.row = 3;
    }
    if (active.row > 3) {
      active.row = 0;
    }
    if (active.col < 0) {
      active.col = 5;
    }
    if (active.col > 5) {
      active.col = 0;
    }

    let locked = this.state.locked;

    if (e.key === 'Enter') {
      locked = true;
    }

    this.setState(() => ({
      active: active,
      locked: locked
    }));
  }

  answer = (e: any) => {
    if (e.key === 'Enter') {
      const data = this.state.data;
      data[this.state.active!.row].questions[this.state.active!.col].asked = true;

      this.setState(() => ({
        data: data,
        locked: false
      }));
    }
  }

  isActiveCell(row: number, col: number) {
    console.log(this.state.active)
    if (!this.state.active) {
      return false
    } else {
      if (this.state.active.row === row && this.state.active.col === col) {
        return true;
      } else {
        return false;
      }
    }
  }

  render() {
    return (
      <div className={'table'}>
        {this.state.data.map((row, index) => (
          <div className={'row'} key={index}>
            <div className={'cell'} style={{width: `${100 / 3}%`}}>{row.name.toUpperCase()}</div>
            {row.questions.map((question, qIndex) => (
              <div
                className={`cell ${this.isActiveCell(index, qIndex) ? 'active' : ''}`}
                style={{width: `${100 / 9}%`}}
                key={qIndex}
              >{!question.asked ? question.cost : ''}</div>
            ))}
          </div>
        ))}
        <div style={{
          transform: this.state.locked ? 'scale(1)' : 'scale(0)',
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          transition: '.3s',
          fontSize: 'calc(100vh / 16)',
          background: '#0c195fda',
          textAlign: 'center',
          padding: '2%'
        }}>{this.state.active ? this.state.data[this.state.active.row].questions[this.state.active.col].text : ''}</div>
      </div>
    );
  }
}

type TableProps = {
  data: Section[]
}

type TableState = {
  data: Section[],
  locked: boolean,
  active?: {
    row: number,
    col: number
  }
}

export interface Section {
  name: string;
  questions: Question[];
}

interface Question {
  cost: number;
  text: string;
  asked: boolean;
}
