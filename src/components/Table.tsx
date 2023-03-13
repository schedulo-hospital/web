import Table from '@mui/material/Table';
import { Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

type TableProps = {
  headerColumns: string[]
  children: React.ReactNode
}

const AppTable = ({ headerColumns, children }: TableProps) => {
  return (
    <TableContainer style={{ width: '600px' }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headerColumns.map((column, index) => <TableCell key={index}>{column}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AppTable