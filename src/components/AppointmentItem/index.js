// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onClickStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const onClickingStar = () => {
    onClickStar(id)
  }

  const starImg = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="app-item">
      <div>
        <p className="title-para">{title}</p>
        <p className="date-para">{date}</p>
      </div>
      <button
        type="button"
        className="star-butt"
        onClick={onClickingStar}
        data-testid="star"
      >
        <img src={starImg} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
