import { useDispatch } from 'react-redux'
import useInterval from '../lib/useInterval'
import { useEffect } from 'react'
import Nav from './nav'
import Status from './status'

export default function Page() {
  
  const dispatch = useDispatch()

  // Tick every second
  useInterval(() => {

    // Check status with a GraphQL call
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: '{ status, error }' })
    }).then(response => response.json()).then(json => {
      dispatch({
        type: 'TICK',
        status: json.data.status + ' (' + new Date().toLocaleString('en-GB', { timeZone: 'UTC' }) + ')',
        error: json.data.error,
      })
    })

  }, 1000);

  return (
    <>
      <Nav />
      <Status />
    </>
  )
}
