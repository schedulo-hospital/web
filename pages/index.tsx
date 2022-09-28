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
    <div className={styles.container}>
      
      <div>{data?.currentUser?.name} {data?.currentUser?.email}</div>
      
    </div>
  )
}

export default withAdminLayout(Home)
