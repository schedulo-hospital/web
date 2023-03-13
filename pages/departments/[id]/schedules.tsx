import { Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../../src/hoc/withAdmin"
import { useRouter } from "next/router"
import { useSchedulesQuery } from "../../../src/gql/generatedTypes"

const Users: NextPage = () => {
  const { query: { id: departmentId } } = useRouter()
  const [{data}] = useSchedulesQuery({ variables: { departmentId: departmentId as string } })
  
  const schedules = data?.schedules?.edges
  return (
    <>
      <Typography variant="h4">Rozpisy služeb</Typography>

      <Typography>
        <a href={`/departments/${departmentId}`}>Uživatelé</a>
      </Typography>
      <Typography>
        <a href={`/departments/${departmentId}/schedules`}>Rozpisy</a>
      </Typography>

      {schedules?.map(schedule => (
        <Typography key={schedule?.node?.id}>
          <a href={`/departments/${departmentId}/schedule/${schedule?.node?.id}`}>{schedule?.node?.name}</a>
        </Typography>
      ))}
    </>
  )
}

export default withAdminLayout(Users)