import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorPageComponent from '../../../components/Error';



function ForbiddenPage() {

  return (
    <ErrorPageComponent text={'Oops! Seems like you do not have permission to access this page.'} code={'3'}/>
  )
}

export default ForbiddenPage