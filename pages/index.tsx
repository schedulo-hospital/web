import type { NextPage } from 'next'
import router from 'next/router'
import { useCurrentUserQuery } from '../src/gql/generatedTypes'
import { withAdminLayout } from '../src/hoc/withAdmin'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [{ data, fetching, error }] = useCurrentUserQuery()

  if (error) {
    router.push({ pathname: '/login' })
  }

  if (fetching) return <div>loading...</div>

  return (
    <></>
  )
}

export default withAdminLayout(Home)
