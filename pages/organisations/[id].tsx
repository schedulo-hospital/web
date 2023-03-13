import { Button, TextField, Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../src/hoc/withAdmin"
import { useCreateDepartmentMutation, useDepartmentsQuery } from '../../src/gql/generatedTypes'
import { useRouter } from "next/router"
import FormDialog from "../../src/components/FormDialog"
import React from "react"
import Link from "next/link"

const Organisation: NextPage = () => {
  const { query: { id: orgId } } = useRouter()
  const [departmentName, setDepartmentName] = React.useState<string | null>(null)
  const [addDepOpen, setAddDepOpen] = React.useState(false)
  const [{data}, refetchDepartments] = useDepartmentsQuery({ variables: { orgId: orgId as string } })
  const [, createDepartment] = useCreateDepartmentMutation()
  
  const departments = data?.departments?.edges
  return (
    <>
      <Typography variant="h4">Oddělení</Typography>

      <Button onClick={() => setAddDepOpen(true)}>
        Přidat oddělení
      </Button>

      <FormDialog
        title="Přidat oddělení"
        onClose={() => setAddDepOpen(false)}
        onSave={async () => {
          if (departmentName === null) {
            alert("Jméno oddělení musí být vyplněno")
            return
          }

          await createDepartment({ name: departmentName, organisationId: orgId as string })
          await refetchDepartments()
          setAddDepOpen(false)
        }}
        open={addDepOpen}
      >
          <TextField
            label="Název"
            variant="standard"
            fullWidth
            margin="normal"
            onChange={e => setDepartmentName(e.target.value)}
          />
      </FormDialog>

      {departments?.map(department => (
        <Typography key={department?.node?.id}>
          <Link href={`/departments/${department?.node?.id}`}>{department?.node?.name}</Link>
        </Typography>
      ))}
    </>
  )
}

export default withAdminLayout(Organisation)
