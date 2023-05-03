import React, { useMemo } from "react"
import { styled } from "@linaria/react"
import { useCurrentPageComponent } from "../../hooks"
import { createHrefToPage } from "../../utils"
import { AccountMenuItem } from "../components/AccountMenuItem"
import { PAGES } from "../route"
import {
  ACCOUNT_DETAIL,
  ALL_PRODUCTS,
  DEFAULT_PAGE,
  HELP_CENTER,
  ORDER_HISTORY,
  SUBSCRIPTIONS,
} from "../route-const"

const LIST = [
  ALL_PRODUCTS,
  SUBSCRIPTIONS,
  ACCOUNT_DETAIL,
  ORDER_HISTORY,
  HELP_CENTER,
]

function AccountMenu() {
  const currentPageComponent = useCurrentPageComponent(
    PAGES,
    PAGES[DEFAULT_PAGE]
  )

  const menuItems = useMemo(
    () =>
      LIST.map((page) => ({
        ...PAGES[page],
        to: createHrefToPage(page),
        page,
        active: PAGES[page].component === currentPageComponent,
      })),
    [currentPageComponent]
  )

  return (
    <StyledAccountMenu>
      {menuItems.map(
        ({ to: url, title, mobileTitle, icon, active, page, subMenu }) => (
          <AccountMenuItem
            url={url}
            title={title}
            mobileTitle={mobileTitle}
            icon={icon}
            active={active}
            key={page}
            subMenu={subMenu}
          />
        )
      )}
    </StyledAccountMenu>
  )
}

const StyledAccountMenu = styled.ul`
  list-style: none;
  padding: 0;

  @media screen and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    background-color: #f7f9f9;
    border-top: 1px solid #d3d3d3;
    border-bottom: 1px solid #d3d3d3;
  }
`
export default AccountMenu
