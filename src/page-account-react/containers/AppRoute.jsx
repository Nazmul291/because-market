import React from "react"
import { useRoutes } from "react-router-dom"
import { useCurrentPageComponent } from "../../hooks"
import { PAGES } from "../route"
import { DEFAULT_PAGE, ERROR_NOT_FOUND } from "../route-const"

function AppRoute() {
  const Component = useCurrentPageComponent(
    PAGES,
    PAGES[DEFAULT_PAGE],
    PAGES[ERROR_NOT_FOUND]
  )

  return useRoutes([
    {
      path: "/account",
      element: <Component />,
    },
  ])
}

export default AppRoute
