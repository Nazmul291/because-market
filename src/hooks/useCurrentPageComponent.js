import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import { PAGE_NAME_QUERY } from "../const"

const calcCurrentPage = (
  searchParams,
  pages,
  defaultPageRoute,
  notFoundPageRoute
) => {
  const page = searchParams.get(PAGE_NAME_QUERY)

  if (!page) {
    return defaultPageRoute
  }

  return pages[page] || notFoundPageRoute
}

/**
 * Return current page component
 * @param {Object} pages pages routers
 * @param {Object} defaultPageRoute default page
 * @param {Object} notFoundPageRoute not found page
 * @returns {Component} current page
 */
export function useCurrentPageComponent(
  pages = {},
  defaultPageRoute,
  notFoundPageRoute
) {
  const [searchParams] = useSearchParams()

  return useMemo(() => {
    const page = calcCurrentPage(
      searchParams,
      pages,
      defaultPageRoute,
      notFoundPageRoute
    )

    return page ? page.component : null
  }, [searchParams, pages, defaultPageRoute, notFoundPageRoute])
}
