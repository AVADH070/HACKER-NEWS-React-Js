import React from 'react'
import { GlobleContext } from './context'

const Button = () => {
  const { isLoading, page, nbPages, handlePage, handle_page } = GlobleContext()

  return (
    <div className='btn-container'>
      <button disabled={isLoading} onClick={() => handle_page('dec')}>
        prev
      </button>
      <p>
        {page + 1} of {nbPages}
      </p>
      <button disabled={isLoading} onClick={() => handle_page('inc')}>
        next
      </button>
    </div>
  )
}


export default Button