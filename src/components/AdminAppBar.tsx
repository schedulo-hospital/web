import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import Link from "next/link"
import router from "next/router"
import React from "react"
import { loggedInContext } from "../../pages/_app"
import { TOKEN_KEY } from "../gql/client"
import { useCurrentUserQuery } from "../gql/generatedTypes"

const AdminAppBar = () => {
  const [{ data: user, error }] = useCurrentUserQuery()
  const loggedIn = React.useContext(loggedInContext)

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const logout = async () => {
    await localStorage.setItem(TOKEN_KEY, '')
    loggedIn.setLoggedIn(false)
    router.push('/login')
  }

  if (error) {
    router.push({ pathname: '/login' })
    return <></>
  }

  const username = user?.currentUser?.name.trim()
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>          
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>

            <Link href="/"><Button sx={{ my: 2, color: 'white', display: 'block' }}>Přehled</Button></Link>
            <Link href="/organisations"><Button sx={{ my: 2, color: 'white', display: 'block' }}>Organizace</Button></Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Typography color="primary.contrastText" onClick={handleOpenUserMenu}>{username?.length === 0 ? user?.currentUser?.email : username }</Typography>
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Link href="profile">Profil</Link>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center" onClick={logout}>Odhlásit se</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default AdminAppBar