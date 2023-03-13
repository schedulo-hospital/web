import * as React from "react"
import { Button, TextField, Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../src/hoc/withAdmin"
import { useOrganisationsQuery, useCreateOrganisationMutation } from '../../src/gql/generatedTypes';
import FormDialog from "../../src/components/FormDialog"
import Link from "next/link";

const Organisations: NextPage = () => {
  const [addOrgOpen, setAddOrgOpen] = React.useState(false)
  const [orgName, setOrgName] = React.useState<string | null>(null)

  const [{data}, refetchOrgs] = useOrganisationsQuery()
  const [, addOrg] = useCreateOrganisationMutation()
  
  const orgs = data?.organisations?.edges
  return (
    <>
      <Typography variant="h4">Organizace</Typography>

      <Button onClick={() => setAddOrgOpen(true)}>
        Přidat organizaci
      </Button>

      <FormDialog
        title="Přidat organizaci"
        onClose={() => setAddOrgOpen(false)}
        onSave={async () => {
          if (orgName === null) {
            alert("Jméno organizace musí být vyplněno")
            return
          }

          await addOrg({ input: { name: orgName } })
          await refetchOrgs()
          setAddOrgOpen(false)
        }}
        open={addOrgOpen}
      >
        <TextField
          autoFocus
          label="Jméno organizace"
          fullWidth
          variant="standard"
          onChange={e => setOrgName(e.target.value)}
        />
      </FormDialog>

      {orgs?.map(org => (
        <Typography key={org?.node?.id}>
          <Link href={`/organisations/${org?.node?.id}`}>{org?.node?.name}</Link>
        </Typography>
      ))}
    </>
  )
}

export default withAdminLayout(Organisations)