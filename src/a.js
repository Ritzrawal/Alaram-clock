export default class AlarmClock extends Component {
    constructor() {
      super();
      this.state = {
        currentTime: '',
        alarmTime: '',
        play: false,
        timeleft:''
      };
      this.url = "http://streaming.tdiradio.com:8000/house.mp3";
      this.audio = new Audio(this.url);
      this.togglePlay = this.togglePlay.bind(this);
      this.setAlarmTime = this.setAlarmTime.bind(this);
    }
    togglePlay() {
      this.setState({ play: !this.state.play });
      console.log(this.audio);
      this.state.play ? this.audio.play() : this.audio.pause();
    }
   
    componentDidMount(){
      this.clock = setInterval(
        () => this.setCurrentTime(),
        1000
      )
      this.interval = setInterval(
        () => this.checkAlarmClock(),
      1000)
    }
   
    componentWillUnmount(){
      clearInterval(this.clock);
      clearInterval(this.interval);
    }
   
    setCurrentTime(){
      this.setState({
        currentTime: new Date().toLocaleTimeString('en-US', { hour12: false })
      });
    }
   
    setAlarmTime(event) {
      event.preventDefault();
      const inputAlarmTimeModified = event.target.value + ':00'
      this.setState({
        alarmTime: inputAlarmTimeModified
      })
    }
   
    checkAlarmClock(){
      if(this.state.alarmTime == 'undefined' || !this.state.alarmTime) {
        this.alarmMessage = "Please set your alarm.";
      } else {
        this.alarmMessage = "Your alarm is set for " + this.state.alarmTime + ".";
        this.timeleft="Time left for alarm"+this.state.alarmTime-this.state.currentTime+".";
        if(this.state.currentTime === this.state.alarmTime) {
          this.togglePlay();
          this.state.play ? 'Pause' : 'Play';
          this.setState({
            alarmTime:''
          })
        } else {
          console.log("not yet");
        }
      }  
    }
   
   
    render() {
      return (
        <div>
          <h1>React Alarm Clock</h1>
          <h2>It is {this.state.currentTime}.
          </h2>
          <h2>{this.alarmMessage}</h2>
          <h2>s</h2>
          <button onClick={this.togglePlay}>{this.state.play ? 'Pause' : 'Play'}</button>
          <form>
            <input type="time" onChange={this.setAlarmTime}></input>
          </form>
          <div></div>
        </div>
      );
    }
   }