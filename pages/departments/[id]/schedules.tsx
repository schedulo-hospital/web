import { Button, TableCell, TableRow, TextField, Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../../src/hoc/withAdmin"
import { useRouter } from "next/router"
import { useSchedulesQuery, useCreateScheduleMutation } from '../../../src/gql/generatedTypes'
import DepartmentMenu from "../../../src/components/DepartmentMenu"
import Link from "next/link"
import AppTable from "../../../src/components/Table"
import FormDialog from "../../../src/components/FormDialog"
import React from "react"
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

const Users: NextPage = () => {
  const { query: { id: departmentId } } = useRouter()
  const [addScheduleOpen, setAddScheduleOpen] = React.useState(false)
  const [name, setName] = React.useState<string | null>(null)
  const [start, setStart] = React.useState<Date | null>(null)
  const [end, setEnd] = React.useState<Date | null>(null)
  const [{data}, refetchSchedules] = useSchedulesQuery({ variables: { departmentId: departmentId as string } })
  const [, createSchedule] = useCreateScheduleMutation()
  
  const schedules = data?.schedules?.edges
  return (
    <>
      <Typography variant="h4">Rozpisy služeb</Typography>

      <DepartmentMenu departmentId={departmentId as string} />

      <Button onClick={() => setAddScheduleOpen(true)}>
        Přidat rozpis
      </Button>

      <FormDialog
        title="Přidat rozpis"
        onClose={() => setAddScheduleOpen(false)}
        onSave={async () => {
          console.log(name, start, end)
          if (name === null || start === null || end === null) {
            alert('Jméno, start a konec rozpisu musí být vyplněny')
            return
          }

          await createSchedule({ name, start: start.toISOString().split('T')[0], end: end.toISOString().split('T')[0], departmentId: departmentId as string })
          await refetchSchedules()
          setAddScheduleOpen(false)
        }}
        open={addScheduleOpen}
      >
          <TextField
            label="Název"
            variant="standard"
            fullWidth
            margin="normal"
            onChange={e => setName(e.target.value)}
          />
          <DatePicker
            label="Začátek"
            onChange={(newValue: Date | null) => setStart(newValue)}
          />
          <DatePicker
            label="Konec"
            onChange={(newValue: Date | null) => setEnd(newValue)}
          />
      </FormDialog>

      <AppTable headerColumns={['Název', 'Začátek', 'Konec']}>
        {schedules?.map(schedule => (
          <TableRow
            key={schedule?.node?.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Link href={`/departments/${departmentId}/schedule/${schedule?.node?.id}`}>
                {schedule?.node?.name}
              </Link>
            </TableCell>
            <TableCell>{schedule?.node?.start}</TableCell>
            <TableCell>{schedule?.node?.end}</TableCell>
          </TableRow>
        ))}
      </AppTable>
    </>
  )
}

export default withAdminLayout(Users)