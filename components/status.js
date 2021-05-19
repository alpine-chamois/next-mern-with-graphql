import { useSelector, shallowEqual } from 'react-redux'

const useStatus = () => {
  return useSelector(
    (state) => ({
      status: state.status,
      error: state.error,
    }),
    shallowEqual
  )
}

const Status = () => {
  const { status, error } = useStatus()
  return (
    <div>
      <h3 className={error ? 'error' : ''}>
        Status: <span>{status}</span>
        <style jsx>{`
        h3 {
          color: #000;
        }

        .error {
          color: #c00;
        }
      `}</style>
      </h3>
    </div>
  )
}

export default Status
