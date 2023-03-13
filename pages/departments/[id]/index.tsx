import { Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../../src/hoc/withAdmin"
import { useRouter } from "next/router"
import { useDepartmentUsersQuery } from "../../../src/gql/generatedTypes"

const Users: NextPage = () => {
  const { query: { id: departmentId } } = useRouter()
  const [{data}] = useDepartmentUsersQuery({ variables: { id: departmentId } })
  
  const departments = data?.departmentUsers?.edges
  return (
    <>
      <Typography variant="h4">Uživatelé</Typography>

      <Typography>
        <a href={`/departments/${departmentId}`}>Uživatelé</a>
      </Typography>
      <Typography>
        <a href={`/departments/${departmentId}/schedules/`}>Rozpisy</a>
      </Typography>

      {departments?.map(department => (
        <Typography key={department?.node?.id}>
          <a href={`/departments/${department?.node?.id}/schedules`}>{department?.node?.name}</a>
        </Typography>
      ))}
    </>
  )
}

export default withAdminLayout(Users)