import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Link from 'next/link'
import router from 'next/router'
import React from 'react'
import { TOKEN_KEY } from '../src/gql/client'
import { useRegisterMutation } from '../src/gql/generatedTypes'
import { loggedInContext } from './_app'

const Login: NextPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')
  const loggedIn = React.useContext(loggedInContext)

  const [isLoading, setIsLoading] = React.useState(false)

  const [, registerMutation] = useRegisterMutation()

  const handleSubmit = async () => {
    setIsLoading(true)

    if (email.length === 0 || password.length === 9 || name.length === 0) {
      alert('Vyplňte všechny údaje')
      setIsLoading(false)
      return
    }

    const response = await registerMutation({
        input: {
          email,
          password,
          name
        }
    })

    if (response.data?.register?.token) {
      await localStorage.setItem(TOKEN_KEY, response.data.register.token)
      loggedIn.setLoggedIn(true)
      router.push('/')
    }

    if (response.error) {
      alert('Chyba')
    }

    setIsLoading(false)
  }

  return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} />
          <Typography component="h1" variant="h5">
            Registrace nového uživatele
          </Typography>
          <Box sx={{ mt: 1 }}>

            <TextField
              margin="normal"
              fullWidth
              label="Jméno"
              type="text"
              onChange={e => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Heslo"
              type="password"
              onChange={e => setPassword(e.target.value)}
            />

            <LoadingButton
              onClick={handleSubmit}
              fullWidth
              loading={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrovat
            </LoadingButton>
            <Link href="/login"><a>Přihlášení</a></Link>
          </Box>
        </Box>
      </Container>
  )
}

export default Login
