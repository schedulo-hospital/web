import AdminAppBar from "../components/AdminAppBar"

export function withAdminLayout<T>(
  WrappedComponent: React.ComponentType
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component"

  const ComponentWithTheme = () => {
    return <>
      <AdminAppBar />
      <WrappedComponent />
    </>
  }

  ComponentWithTheme.displayName = `withTheme(${displayName})`

  return ComponentWithTheme
}