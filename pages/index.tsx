import type { NextPage } from 'next'
import { useCurrentUserQuery } from '../src/gql/generatedTypes'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [{ data, fetching, error }] = useCurrentUserQuery()

  if (error) return <div>Oh no... {error.message}</div>
  if (fetching) return <div>loading...</div>

  return (
    <div className={styles.container}>
      
      <div>{data?.currentUser?.name}</div>
      
    </div>
  )
}

export default Home
