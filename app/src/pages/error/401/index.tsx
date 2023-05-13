import React from 'react'
import ErrorPageComponent from '../../../components/Error'

function UnauthorizedPage() {
  return (
    <ErrorPageComponent text={'Unauthorized. Please log in and then try again.'} code={'1'}/>
  )
}

export default UnauthorizedPage