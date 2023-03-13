import { Box, Button, ButtonGroup, LinearProgress, Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../src/hoc/withAdmin"
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css"
import React from "react"
import { AvailabilityType, useAvailabilitiesQuery, useSetAvailabilityMutation } from '../src/gql/generatedTypes'
// import csLocale from "moment/locale/cs"

moment.locale('cs')

const localizer = momentLocalizer(moment)

type Event = {
  id: string
  start: Date
  end: Date
  allDay: boolean
  type: AvailabilityType
}

const getEventColor = (event: Event) => {
  switch (event.type) {
    case AvailabilityType.Desired:
      return '#3c6ffd'
    case AvailabilityType.Undesired:
      return '#cf5809'
    case AvailabilityType.Unavailable:
      return '#f00'
    case AvailabilityType.None:
      return '#fff'
  }
}

const Availability: NextPage = () => {
  const [loading, setLoading] = React.useState(false)
  const [selectedType, setSelectedType] = React.useState<AvailabilityType>(AvailabilityType.None)
  const [{ data }, reexecuteQuery] = useAvailabilitiesQuery({ variables: { from: '2023-01-01', to: '2023-12-30' } })
  const [, setAvailability ] = useSetAvailabilityMutation()

  const handleSelectSlot = React.useCallback(
    async ({ start, end }: { start: Date, end: Date }) => {
      setLoading(true)
      try {
        await setAvailability({
          input: { date: start.toISOString().split('T')[0], type: selectedType }
        })
        await reexecuteQuery()
      } catch (err) {
        alert('Chyba')
      } finally {
        setLoading(false)
      }
    },
    [selectedType, reexecuteQuery, setAvailability]
  )

  const events = data?.availabilities.map(availability => ({
    id: availability.id,
    start: availability.date,
    end: availability.date,
    type: availability.type,
    allDay: true,
  }))

  const customDayPropGetter = React.useCallback((date: Date) => {
    const event = events?.find(event => event.start === date.toISOString().split('T')[0])
    if (event)
      return {
        style: {
          backgroundColor: getEventColor(event),
        },
      }
    else return {}
  }, [events])

  return (
    <>
      <Typography variant="h4">Dostupnost</Typography>

      <ButtonGroup aria-label="outlined primary button group">
        <Button onClick={() => setSelectedType(AvailabilityType.Desired)} variant={selectedType === AvailabilityType.Desired ? 'contained' : 'outlined'}>Chci</Button>
        <Button onClick={() => setSelectedType(AvailabilityType.Unavailable)} variant={selectedType === AvailabilityType.Unavailable ? 'contained' : 'outlined'}>Nemuzu</Button>
        <Button onClick={() => setSelectedType(AvailabilityType.Undesired)} variant={selectedType === AvailabilityType.Undesired ? 'contained' : 'outlined'}>Nechci</Button>
        <Button onClick={() => setSelectedType(AvailabilityType.None)} variant={selectedType === AvailabilityType.None ? 'contained' : 'outlined'}>Je to jedno</Button>
      </ButtonGroup>

      <Box style={{ height: 600 }}>
        {loading && <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>}
        <Calendar
          dayPropGetter={customDayPropGetter}
          localizer={localizer}
          toolbar={true}
          defaultView={Views.MONTH}
          views={['month']}
          selectable
          onSelectSlot={handleSelectSlot}
          longPressThreshold={50}
        />
      </Box>
    </>
  )
}

export default withAdminLayout(Availability)