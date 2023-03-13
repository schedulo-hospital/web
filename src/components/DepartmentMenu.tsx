import { Button, ButtonGroup } from '@mui/material'
import Link from 'next/link'
import React from 'react'

type DepartmentMenuProps = {
  departmentId: string
}

const DepartmentMenu = ({ departmentId }: DepartmentMenuProps) => {

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Link href={`/departments/${departmentId}`}>
      <Button>Uživatelé</Button>
      </Link>
      <Link href={`/departments/${departmentId}/schedules/`}>
        <Button>Rozpisy</Button>
      </Link>
    </ButtonGroup>
  )
}

export default DepartmentMenu