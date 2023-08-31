import { useDispatch, useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { toggleModal } from '../features/notification/notification'

const AppModal = ({ deleteHandler, blog }) => {
  const { modal } = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  return (
    <Modal
      show={modal.show}
      backdrop='static'
      onHide={() => dispatch(toggleModal({ text: null }))}
    >
      <Modal.Header closeButton>
        <Modal.Title>warning</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modal.text}</Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => dispatch(toggleModal({ text: null }))}
        >
          cancel
        </Button>
        <Button variant='primary' onClick={() => deleteHandler(blog.id)}>
          remove
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default AppModal
