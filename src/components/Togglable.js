import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, refs) => {
  //   const { show, setShow } = props;
  const [show, setShow] = useState(true)

  const showForm = { display: show ? '' : 'none' }
  const hideForm = { display: show ? 'none' : '' }

  const toggleFormVisibility = () => setShow(!show)

  useImperativeHandle(refs, () => {
    return { toggleFormVisibility }
  })
  return (
    <div>
      <div style={showForm}>
        <button onClick={toggleFormVisibility}>{props.label}</button>
      </div>
      <div style={hideForm}>
        {props.children}
        <button onClick={toggleFormVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
