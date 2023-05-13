import React from 'react'
import ErrorPageComponent from '../../../components/Error'

function NotFoundPage() {
  return (
    <ErrorPageComponent text={'The page you are looking for cannot be found...'} code={'4'}/>
  )
}

export default NotFoundPage