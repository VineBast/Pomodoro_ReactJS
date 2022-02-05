import React from 'react';
import { render } from 'react-dom';
import './index.css';

const container = {
  textAlign: "center",
}

const button = {
  margin: "1em"
}

const fontPomodoro = {
  fontSize: "100px"
}

const fontTitle = {
  fontSize : "50px"
}

class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minutesWork: 0, secondsWork: 0, minutesPause: 0, secondsPause: 0,
      minutes: 0, seconds: 0, doing: 'Travail', timeToPause : true, turns: 0
    }
  }

  start = () => {
    this.interval = setInterval(this.counter, 1000);
  }

  pause = () => {
    clearInterval(this.interval);
  }

  stop = () => {
    this.pause();
    this.setState({
      minutes: 0,
      seconds: 0
    })
    document.getElementById('timer').className = 'grey';
    document.getElementById('title').className = 'grey';
  }

  setPomodoro = () => {
    this.setState({
      secondsWork: parseInt(document.getElementById('secondsWork').value),
      minutesWork: parseInt(document.getElementById('minutesWork').value),
      secondsPause: parseInt(document.getElementById('secondsPause').value),
      minutesPause: parseInt(document.getElementById('minutesPause').value),
      turns: parseInt(document.getElementById('turns').value),
      seconds: parseInt(document.getElementById('secondsWork').value),
      minutes: parseInt(document.getElementById('minutesWork').value),
      doing : 'Travail'
    })
  }

  counter = () => {
    if (this.state.seconds == 0 && this.state.minutes > 0) {
      this.setState({
        minutes: this.state.minutes - 1
      });
      this.setState({
        seconds: 59
      });
    }    
    if (this.state.seconds == 0 && this.state.minutes == 0 && this.state.turns == 0) {
      this.stop();
      alert('Vous avez terminé votre session de Pomodoro !');
    }
    if (this.state.seconds == 0 && this.state.minutes == 0 && this.state.turns > 0) {
      this.setState({
        turns : this.state.turns - 1
      })
      if (this.state.doing == 'Travail') {
        this.setState({
          doing : 'Pause',
          minutes : this.state.minutesPause,
          seconds : this.state.secondsPause
        })
      } else {
        this.setState({
          doing : 'Travail',
          minutes : this.state.minutesWork,
          seconds : this.state.secondsWork,
        })
      }
    }
    if (this.state.seconds < 21 && this.state.minutes == 0) {
      document.getElementById('timer').className = 'red';
      document.getElementById('title').className = 'red';

    }
    this.setState({
      seconds: this.state.seconds - 1
    }); 
  }

  render() {
    return (
      <div style={container}>
        <h1 id='title' style={fontTitle}>{this.state.doing}</h1>
        <h2>Tour n° {this.state.turns}</h2>
        <h2></h2>
        <h2 style={fontPomodoro} id='timer'>{this.state.minutes} : {this.state.seconds}</h2>
        <button className='button-30' style={button} onClick={this.start}>Start</button>
        <button className='button-30' style={button} onClick={this.pause}>Pause</button>
        <button className='button-30' style={button} onClick={this.stop}>Stop</button>
        <form action='#'>
          <h3>Temps de travail :</h3>

          <label>Minutes : </label>
          <input type='number' id='minutesWork' min='0' max='59' required></input>

          <label>Secondes : </label>
          <input type='number' id='secondsWork' min='0' max='59' required></input>

          <h3>Temps de pause :</h3>
          <label>Minutes : </label>
          <input type='number' id='minutesPause' min='0' max='59' required></input>

          <label>Secondes : </label>
          <input type='number' id='secondsPause' min='0' max='59' required></input>

          <h3><label>Nombre de tours : </label></h3>
          <input type='number' id='turns' min='1' required></input>

          <br></br>
          <button className='button-30' onClick={this.setPomodoro}>Pomodoro</button>
        </form>
      </div>
    )
  }
};

const rootElt = document.getElementById("root");
render(<Pomodoro />, rootElt);