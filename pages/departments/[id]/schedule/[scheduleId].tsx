import { Box, Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../../../src/hoc/withAdmin"
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import React from "react"
import { useScheduleQuery, useShiftsQuery } from '../../../../src/gql/generatedTypes';
import { useRouter } from "next/router"
// import csLocale from "moment/locale/cs"

moment.locale('cs')

const localizer = momentLocalizer(moment)

const Schedule: NextPage = () => {
  const { query: { scheduleId } } = useRouter()
  const [{data}] = useScheduleQuery({ variables: { id: scheduleId } })
  const [{data: scheduleData}] = useShiftsQuery({ variables: { scheduleId } })

  const schedule = data?.schedule
  const shifts = scheduleData?.shifts?.map(shift => ({
    id: shift.id,
    title: shift.user?.name + ' ' + shift.requiredSeniority,
    start: new Date(shift.start),
    end: new Date(shift.start),
  }))
  return (
    <>
      <Typography variant="h4">Rozpis - {schedule?.name} - {schedule?.score}</Typography>

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