import { useSelector } from 'react-redux'

const Notification = () => {
  const { text, variant } = useSelector((state) => state.notification)
  if (!text) {
    return null
  }
  return <div className={variant}>{text}</div>
}

export default Notification
