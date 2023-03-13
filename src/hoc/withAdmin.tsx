import { LocalizationProvider } from "@mui/x-date-pickers"
import AdminAppBar from "../components/AdminAppBar"
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

export function withAdminLayout<T>(
  WrappedComponent: React.ComponentType
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component"

  const ComponentWithTheme = () => {
    return <>
      <AdminAppBar />
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <WrappedComponent />
      </LocalizationProvider>
    </>
  }

  ComponentWithTheme.displayName = `withTheme(${displayName})`

  return ComponentWithTheme
}