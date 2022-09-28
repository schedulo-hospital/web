import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import router from 'next/router'
import { useCurrentUserQuery } from '../src/gql/generatedTypes'
import { withAdminLayout } from '../src/hoc/withAdmin'

const Home: NextPage = () => {
  const [{ data, fetching, error }] = useCurrentUserQuery()

  if (error) {
    router.push({ pathname: '/login' })
  }

  if (fetching) return <div>loading...</div>

  return (
    <>
      <Typography variant="h4">Přehled</Typography>
    </>
  )
}

export default withAdminLayout(Home)
