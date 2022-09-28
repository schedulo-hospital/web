import React from 'react'
import { Provider } from 'urql'
import { createGQLClient } from '../src/gql/client'

const AuthClient = ({ isLoggedIn, children }: { isLoggedIn: boolean, children: React.ComponentElement<any, any> }) => {
  const client = React.useMemo(() => {
    return createGQLClient()
  }, [isLoggedIn])

  return (
    <Provider value={client}>
      {children}
    </Provider>
  )
}

export default AuthClient