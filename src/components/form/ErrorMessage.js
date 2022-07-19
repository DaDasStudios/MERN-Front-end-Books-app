import React from 'react'
import { BiInfoCircle } from 'react-icons/bi'

const ErrorMessage = ({ content, touched, textSmall }) => {
  return (
    <div className={textSmall ? 'text-sm text-red-300' : 'text-base text-red-300'}>

      {touched && <><BiInfoCircle className='inline mr-1 mb-1' />{content}</>}

    </div>
  )
}

export default ErrorMessage