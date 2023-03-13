import { Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../src/hoc/withAdmin"
import { useOrganisationsQuery } from '../../src/gql/generatedTypes';

const Organisations: NextPage = () => {
  const [{data}] = useOrganisationsQuery()
  
  const orgs = data?.organisations?.edges
  return (
    <>
      <Typography variant="h4">Organizace</Typography>
      {orgs?.map(org => (
        <Typography key={org?.node?.id}>
          <a href={`/organisations/${org?.node?.id}`}>{org?.node?.name}</a>
        </Typography>
      ))}
    </>
  )
}

export default withAdminLayout(Organisations)