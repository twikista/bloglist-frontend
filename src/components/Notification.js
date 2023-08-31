import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const { text, variant } = useSelector((state) => state.notification)
  if (!text) {
    return null
  }
  return (
    <Alert className='small-table mb-3' variant={variant}>
      {text}
    </Alert>
  )
}

export default Notification
