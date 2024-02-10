import React from 'react'
import Spinner from 'react-bootstrap/Spinner';


function LoadingSpinner() {
  return (
    <div className='d-flex justify-content-center align-items-center m-5'>
        Loading....
          <Spinner animation="grow" variant="light" className='me-2' />

    </div>
  )
}

export default LoadingSpinner