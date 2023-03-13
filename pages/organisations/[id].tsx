import { Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../src/hoc/withAdmin"
import { useDepartmentsQuery } from '../../src/gql/generatedTypes'
import { useRouter } from "next/router"

const Organisation: NextPage = () => {
  const { query: { id: orgId } } = useRouter()
  const [{data}] = useDepartmentsQuery({ variables: { orgId } })
  
  const departments = data?.departments?.edges
  return (
    <>
      <Typography variant="h4">Oddělení</Typography>
      {departments?.map(department => (
        <Typography key={department?.node?.id}>
          <a href={`/departments/${department?.node?.id}`}>{department?.node?.name}</a>
        </Typography>
      ))}
    </>
  )
}

export default withAdminLayout(Organisation)