// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {appointments: [], title: '', date: '', isFilterOn: false}

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateDate = event => {
    this.setState({date: event.target.value})
  }

  toggleFilter = () => {
    this.setState(prevState => ({isFilterOn: !prevState.isFilterOn}))
  }

  toggleStar = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isStarred: !eachApp.isStarred}
        }
        return eachApp
      }),
    }))
  }

  onAdding = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newApp = {id: uuidv4(), title, date: formattedDate, isStarred: false}

    this.setState(prevState => ({
      appointments: [...prevState.appointments, newApp],
      title: '',
      date: '',
    }))
  }

  render() {
    const {appointments, title, date, isFilterOn} = this.state
    const starredAppointments = appointments.filter(
      eachApp => eachApp.isStarred,
    )
    const displayAppointments = isFilterOn ? starredAppointments : appointments

    return (
      <div className="bg-container">
        <div className="card">
          <div className="cont-1">
            <form onSubmit={this.onAdding} className="form">
              <h1 className="head">Add Appointment</h1>
              <label htmlFor="title-el" className="label">
                TITLE
              </label>
              <input
                type="input"
                id="title-el"
                placeholder="Title"
                value={title}
                onChange={this.updateTitle}
                className="title-input"
              />
              <label htmlFor="date-el" className="label">
                DATE
              </label>
              <input
                type="date"
                id="date-el"
                placeholder="dd/mm/yyyy"
                value={date}
                onChange={this.updateDate}
                className="date-input"
              />
              <button type="submit" className="butt">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="app-image"
            />
          </div>
          <ul className="a-list">
            <li className="li-head">
              <h1 className="a-head">Appointments</h1>
              <button
                type="button"
                className="filter"
                onClick={this.toggleFilter}
              >
                Starred
              </button>
            </li>
            {displayAppointments.map(eachApp => (
              <AppointmentItem
                key={eachApp.id}
                appointmentDetails={eachApp}
                onClickStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
