import React from 'react';
import './snackbar.css'
import { connect } from "react-redux";
import store from '../store'
import { clearAlerts } from 'Actions/alert-actions';

class ShowSnackbar extends React.Component {
  state = {
    open: false,
    message: null,
    openTime: null,
    stop: false,
    open1: false,
    message1: null,
    openTime1: null,
    stop1: false,
    toggle: true,
  };

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  stopTimer() {
    this.setState({
      openTime: 1,
      stop: true
    })
  }

  startTimer() {
    this.setState({
      openTime: 1,
      stop: false
    })
  }

  interval() {
    this.timer = setInterval(() =>
      this.setState({ openTime: (this.state.openTime && !this.state.stop) ? this.state.openTime + 1 : 1 }, () => {
        if (this.state.openTime >= 4) {
          this.handleClick()
          this.stopTimer()
        }
      }), 1000)
  }

  handleClick1 = () => {
    this.setState({ open1: !this.state.open1 });
  };

  stopTimer1() {
    this.setState({
      openTime1: 1,
      stop1: true
    })
  }

  startTimer1() {
    this.setState({
      openTime1: 1,
      stop1: false
    })
  }

  interval1() {
    this.timer1 = setInterval(() =>
      this.setState({ openTime1: (this.state.openTime1 && !this.state.stop1) ? this.state.openTime1 + 1 : 1 }, () => {
        if (this.state.openTime1 >= 4) {
          this.handleClick1()
          this.stopTimer1()
        }
      }), 2000)
  }

  resetMessage() {
    store.dispatch(clearAlerts())
  }

  componentDidMount() {
    this.setState({
      openTime1: 1,
      stop1: true,
      openTime: 1,
      stop: true
    }, () => {
      this.interval()
      this.interval1()
    })
  }

  componentWillReceiveProps(next) {
    let { alerts } = this.props;
    let color = ''
    if (alerts !== next.alerts) {
      if (next.alerts.message) {
        if (this.state.message && this.state.open && this.state.openTime < 5) {
          this.setState({
            open1: false
          })

          setTimeout(() => {
            this.setState({
              message1: this.state.message,
              open1: this.state.open,
              message: next.alerts.message,
              open: true,
            }, () => {
              this.startTimer1()
              this.startTimer()
              this.resetMessage()
            })
          }, 1)
        } else {
          this.setState({
            open: false,
            open1: false
          })
          setTimeout(() => {
            this.setState({
              message: next.alerts.message,
              open: true,
              color: color,
            }, () => {
              this.resetMessage()
              this.startTimer()
            })
          }, 1)
        }
      }
    }
  }

  render() {
    return (<div>
      {this.state.open && (
        <div className={`snackbar ${this.state.message.variant}`} onMouseEnter={() => this.stopTimer()} onMouseLeave={() => this.startTimer()}>
          <div className="d-flex align-items-center innerWrapper" >
            <div className="message">{this.state.message.message ? this.state.message.message.toString() : ""}</div>
            <div className={'closeIcon'}>
              <i className="ri-close-circle-fill snackbarClose" onClick={() => this.handleClick()}></i>
            </div>
          </div>

          {/*<span className='icon' style={{marginRight: "10px"}}>*/}
          {/*  {this.state.message.variant === 'success' ? 'check' : this.state.message.variant}*/}
          {/*</span>*/}



        </div>
      )
      }
      {(this.state.open1) &&
        (

          <div className={`snackbar1 ${this.state.message1.variant}`}
            onMouseEnter={() => this.stopTimer1()}
            onMouseLeave={() => this.startTimer1()}>
            <span className='icon' style={{ marginRight: "10px" }}>
              {this.state.message1.variant === 'success' ? 'check' : this.state.message1.variant}
            </span>
            <span className="message">{this.state.message1.message}</span>
            <i className="ri-close-circle-fill" onClick={() => this.handleClick1()}></i>

          </div>
        )
      }
    </div>)
  }

}


function mapStateToProps(state) {
  let { alerts } = state
  return {
    alerts
  }
}

export default connect(mapStateToProps)(ShowSnackbar)
