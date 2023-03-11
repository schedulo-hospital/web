import { LoadingButton } from '@mui/lab'
import { Avatar, Box, Button, Container, CssBaseline, FormHelperText, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import router from 'next/router'
import React from 'react'
import { TOKEN_KEY } from '../src/gql/client'
import { useLoginMutation } from '../src/gql/generatedTypes'
import { loggedInContext } from './_app'
import Link from 'next/link'

const Login: NextPage = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const loggedIn = React.useContext(loggedInContext)
  const [isLoading, setIsLoading] = React.useState(false)

  const [, loginMutation] = useLoginMutation()

  const handleSubmit = async () => {
    setIsLoading(true)

    const response = await loginMutation({
        input: {
          email,
          password
        }
    })

    if (response.data?.login?.token) {
      await localStorage.setItem(TOKEN_KEY, response.data.login.token)
      loggedIn.setLoggedIn(true)
      router.push('/')
    }

    if (response.error) {
      alert('Chyba při přihlašování')
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
            Přihlášení
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Heslo"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            <LoadingButton
              onClick={handleSubmit}
              fullWidth
              loading={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Přihlásit
            </LoadingButton>
            <Link href="/register"><a>Registrace</a></Link>
          </Box>
        </Box>
      </Container>
  )
}

export default Login
