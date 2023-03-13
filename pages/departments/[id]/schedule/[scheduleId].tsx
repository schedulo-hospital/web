import { Box, Button, ButtonGroup, Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../../../src/hoc/withAdmin"
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import React from "react"
import { useScheduleQuery, useShiftsQuery, useStartSolvingMutation, useStopSolvingMutation } from '../../../../src/gql/generatedTypes'
import { useRouter } from "next/router"
// import csLocale from "moment/locale/cs"

moment.locale('cs')

const localizer = momentLocalizer(moment)

let polling: NodeJS.Timer
const Schedule: NextPage = () => {
  const { query: { scheduleId } } = useRouter()
  const [{data}, refetchSchedule] = useScheduleQuery({ variables: { id: scheduleId as string } })
  const [{data: scheduleData}, refetchShifts] = useShiftsQuery({ variables: { scheduleId: scheduleId as string } })

  const [, startSolving] = useStartSolvingMutation()
  const [, stopSolving] = useStopSolvingMutation()

  const schedule = data?.schedule
  const shifts = scheduleData?.shifts?.map(shift => ({
    id: shift.id,
    title: shift.user?.name + ' ' + shift.requiredSeniority,
    start: new Date(shift.start),
    end: new Date(shift.start),
  }))
  return (
    <>
      <Typography variant="h4">Rozpis - {schedule?.name} - {schedule?.score} - {schedule?.status}</Typography>

      <ButtonGroup>
        {schedule?.status === 'NOT_SOLVING' && 
          <Button variant="outlined" onClick={() => {
            startSolving({ scheduleId: scheduleId as string })
            polling = setInterval(() => {
              refetchShifts()
              refetchSchedule()
            }, 5000)
          }}>
            Spustit generování rozpisu
          </Button>}
        {schedule?.status === 'SOLVING_ACTIVE' &&
          <Button variant="outlined" color="error" onClick={async () => {
            await stopSolving({ scheduleId: scheduleId as string })
            clearInterval(polling)

            refetchShifts()
            refetchSchedule()
          }}>
            Zastavit generování rozpisu
          </Button>}
      </ButtonGroup>

      <Box style={{ height: 600 }}>
        <Calendar
          events={shifts}
          localizer={localizer}
          toolbar={true}
          defaultView={Views.MONTH}
          views={['month']}
          selectable
          longPressThreshold={50}
        />
      </Box>
    </>
  )
}

export default withAdminLayout(Schedule)