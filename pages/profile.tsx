import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useCurrentUserQuery } from '../src/gql/generatedTypes'
import { withAdminLayout } from '../src/hoc/withAdmin'

const Profile: NextPage = () => {
  const [{ data }] = useCurrentUserQuery()

  return (
    <>
      <Typography variant="h4">Profil</Typography>

      <Typography>{data?.currentUser?.name}</Typography>
      <Typography>{data?.currentUser?.email}</Typography>
    </>
  )
}

export default withAdminLayout(Profile)
