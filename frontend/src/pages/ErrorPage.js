import React from 'react'
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation'
import PageContent from '../components/PageContent';

const ErrorPage = () => {
  const error = useRouteError();

  let title = 'An Error Occurred';
  let message = 'Something went wrong here.';

  if (error.status === 404) {
    title = 'Error 404';
    message = 'Page Not Found'
  }

  if (error.status === 500) {
    message = error.data.message;
  }

  return (
    <>
    <MainNavigation />
    <PageContent title={title}>
      <p>{message}</p>
    </PageContent>
    </>
  )
}

export default ErrorPage;