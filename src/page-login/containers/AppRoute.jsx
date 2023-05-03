import React from "react"
import { useRoutes } from "react-router-dom"
import { useCurrentPageComponent } from "../../hooks"
import { PAGES } from "../route"
import { DEFAULT_PAGE } from "../route-const"

function AppRoute() {
  const Component = useCurrentPageComponent(PAGES, PAGES[DEFAULT_PAGE])

  return useRoutes([
    {
      path: "/account/login",
      element: <Component />,
    },
  ])
}

export default AppRoute
