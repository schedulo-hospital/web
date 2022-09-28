import React from 'react'

export function withClient(
  WrappedComponent: React.ComponentType
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component"

  const ComponentWithTheme = () => {
    return <>
      <WrappedComponent />
    </>
  }

  ComponentWithTheme.displayName = `withTheme(${displayName})`

  return ComponentWithTheme
}