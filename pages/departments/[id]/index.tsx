import { Button, FormControlLabel, Radio, RadioGroup, TableCell, TableRow, TextField, Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../../src/hoc/withAdmin"
import { useRouter } from "next/router"
import { Seniority, useDepartmentAddUserMutation, useDepartmentUsersQuery } from "../../../src/gql/generatedTypes"
import DepartmentMenu from "../../../src/components/DepartmentMenu"
import Link from "next/link"
import React from "react"
import FormDialog from "../../../src/components/FormDialog"
import AppTable from "../../../src/components/Table"

const Users: NextPage = () => {
  const { query: { id: departmentId } } = useRouter()

  const [username, setUsername] = React.useState<string | null>(null)
  const [addUserOpen, setAddUserOpen] = React.useState(false)
  const [email, setEmail] = React.useState<string | null>(null)
  const [seniority, setSeniority] = React.useState<Seniority>(Seniority.Junior)

  const [{data}, refetchUsers] = useDepartmentUsersQuery({ variables: { id: departmentId as string } })
  const [, createUser] = useDepartmentAddUserMutation()
  
  const users = data?.departmentUsers?.edges
  return (
    <>
      <Typography variant="h4">Uživatelé</Typography>

      <DepartmentMenu departmentId={departmentId as string} />

      <Button onClick={() => setAddUserOpen(true)}>
        Přidat uživatele
      </Button>

      <FormDialog
        title="Přidat uživatele"
        onClose={() => setAddUserOpen(false)}
        onSave={async () => {
          if (username === null || email === null) {
            alert("Jméno a email uživatele musí být vyplněno")
            return
          }

          await createUser({ name: username, seniority, email, departmentId: departmentId as string })
          await refetchUsers()
          setAddUserOpen(false)
        }}
        open={addUserOpen}
      >
          <TextField
            label="Jméno"
            variant="standard"
            fullWidth
            margin="normal"
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            label="Email"
            variant="standard"
            fullWidth
            margin="normal"
            onChange={e => setEmail(e.target.value)}
          />
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            onChange={e => {
              switch (e.target.value) {
                case Seniority.Junior:
                  setSeniority(Seniority.Junior)
                  break
                case Seniority.Middle:
                  setSeniority(Seniority.Middle)
                  break
                case Seniority.Senior:
                  setSeniority(Seniority.Senior)
                  break
            }
          }}
          >
            <FormControlLabel value={Seniority.Junior} control={<Radio />} label="Junior" />
            <FormControlLabel value={Seniority.Middle} control={<Radio />} label="Middle" />
            <FormControlLabel value={Seniority.Senior} control={<Radio />} label="Senior" />
          </RadioGroup>
      </FormDialog>

      <AppTable headerColumns={['Jméno', 'Seniorita']}>
        {users?.map(user => (
          <TableRow
            key={user?.node?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {user?.node?.name}
            </TableCell>
            <TableCell>{user?.node?.seniority}</TableCell>
          </TableRow>
        ))}
      </AppTable>
    </>
  )
}

export default withAdminLayout(Users)