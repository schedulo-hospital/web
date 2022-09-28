import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>          
          <Box sx={{ flexGrow: 1, display: { md: 'flex' } }}>

            <Button sx={{ my: 2, color: 'white', display: 'block' }}>Menu 1</Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <Typography color="primary.contrastText" onClick={handleOpenUserMenu}>{user?.currentUser?.name}</Typography>
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