import React, { useState, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button'

const Togglable = React.forwardRef((props, refs) => {
  const [show, setShow] = useState(true)

  const showForm = { display: show ? '' : 'none' }
  const hideForm = { display: show ? 'none' : '' }

  const toggleFormVisibility = () => setShow(!show)

  useImperativeHandle(refs, () => {
    return { toggleFormVisibility }
  })
  return (
    <div className='small-table'>
      <div style={showForm}>
        <Button
          className='btn-wide'
          variant='primary'
          onClick={toggleFormVisibility}
          id='form-toggle'
        >
          {props.label}
        </Button>
      </div>
      <div style={hideForm}>
        {props.children}
        <Button
          className='small-table mt-3'
          variant='primary'
          onClick={toggleFormVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
