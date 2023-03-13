import * as React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import { Button, DialogActions, DialogContent, DialogContentText } from '@mui/material'

export interface SimpleDialogProps {
  open: boolean
  onClose: () => void
  onSave: () => void
  children: React.ReactNode

  title: string
}

export default function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open, children, title , onSave} = props

  const handleClose = () => {
    onClose()
  }

  const handleSave = () => {
    onSave()
  }
 
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Zrušit</Button>
          <Button onClick={handleSave}>Potvrdit</Button>
        </DialogActions>
    </Dialog>
  )
}