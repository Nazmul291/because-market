import React, { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { styled } from "@linaria/react"
import { scroller } from "react-scroll"
import {
  createHrefToPage,
  isMobile,
  isTablet,
  isTouchScreenDevice,
} from "../../utils"
import { ArrowRightIcon } from "../../rUI/icons/ArrowRightIcon.jsx"
import { ArrowDownIcon } from "../../rUI/icons/ArrowDownIcon.jsx"
import { PAGE_ANCHOR_QUERY, SCROLL_TO_ANCHOR_OFFSET } from "../../const"
import { ALL_PRODUCTS } from "../route-const"

AccountMenuItem.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  mobileTitle: PropTypes.string,
  icon: PropTypes.any,
  active: PropTypes.bool,
  subMenu: PropTypes.array,
}

export function AccountMenuItem({
  url,
  title,
  mobileTitle,
  icon: Icon,
  active,
  subMenu,
}) {
  const [expanded, setExpanded] = useState(
    !isMobile() && !isTouchScreenDevice() && !isTablet()
  )

  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const anchor = searchParams.get(PAGE_ANCHOR_QUERY)

    if (anchor) {
      setTimeout(() => {
        scroller.scrollTo(anchor, {
          duration: 1000,
          smooth: "easeInOutQuart",
        })
      }, SCROLL_TO_ANCHOR_OFFSET)
    }
  }, [searchParams])

  const handleMenuClick = useCallback(
    (anchorId) => {
      navigate(
        createHrefToPage(ALL_PRODUCTS, { [PAGE_ANCHOR_QUERY]: anchorId })
      )
      if (isMobile() || isTablet()) {
        setExpanded(false)
      }
    },
    [navigate, setExpanded]
  )

  const handleSubmenuClick = useCallback(
    (anchorId) => {
      if (!isMobile() && !isTablet()) {
        scroller.scrollTo(anchorId, {
          duration: 800,
          delay: 100,
          smooth: "easeInOutQuart",
        })
      } else {
        setTimeout(() => handleMenuClick(anchorId), 250)
      }
    },
    [handleMenuClick]
  )

  return (
    <>
      <StyledAccountMenuItem className={active ? "active" : null}>
        {Boolean(Icon) && <Icon height="20" />}
        <StyledLinkContainer
          onClick={() => subMenu?.length && setExpanded(Boolean(!expanded))}
        >
          <Link to={url}>
            <span className="desktop">{title || mobileTitle}</span>
            <span className="mobile">{mobileTitle || title}</span>
          </Link>
          <StyledExpanderContainer
            onClick={() => subMenu?.length && setExpanded(Boolean(!expanded))}
          >
            {subMenu?.length && !expanded && <ArrowRightIcon height="20" />}
            {subMenu?.length && expanded && <ArrowDownIcon height="20" />}
          </StyledExpanderContainer>
        </StyledLinkContainer>
      </StyledAccountMenuItem>

      <StyledSubMenuContainer>
        {expanded &&
          subMenu?.map((menu) => (
            <StyledAccountMenuSUBItem key={`key-subItem-${menu.id}`}>
              <div onClick={() => handleMenuClick(menu.id)}>
                <span className="desktop">{menu.title}</span>
                <span className="mobile">{menu.title}</span>
              </div>
            </StyledAccountMenuSUBItem>
          ))}
      </StyledSubMenuContainer>

      <StyledSubMenuContainerMobile>
        {expanded &&
          subMenu?.map((menu) => (
            <StyledAccountMenuSUBItem key={`key-subItem-${menu.id}`}>
              <div onClick={() => handleSubmenuClick(menu.id)}>
                <span className="desktop">{menu.title}</span>
                <span className="mobile">{menu.title}</span>
              </div>
            </StyledAccountMenuSUBItem>
          ))}
      </StyledSubMenuContainerMobile>
    </>
  )
}

const StyledLinkContainer = styled.div`
  display: flex;
`

const StyledExpanderContainer = styled.div`
  cursor: pointer;
`

const StyledAccountMenuItem = styled.li`
  font-family: "Graphik Medium";
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.09px;
  line-height: 42px;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1;

  svg {
    height: 20px;
    margin-right: 25px;
  }

  svg,
  svg * {
    fill: #9699a3;
  }

  a {
    width: 100%;
    color: #9699a3;
  }

  &.active {
    svg,
    svg * {
      fill: #0be5da;
    }
    a {
      width: 100%;
      color: #65738e;
    }
  }

  a:hover {
    text-decoration: none;
  }

  .desktop {
    cursor: pointer;
  }

  .mobile {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 16px 0 0;
    font-size: 12px;

    svg {
      height: 18px;
      margin-right: 0;
      opacity: 0.5;
    }

    .mobile {
      display: block;
    }

    .desktop {
      display: none;
    }

    &.active {
      svg,
      svg * {
        fill: #65738e;
        opacity: 1;
      }
    }
  }
`

const StyledSubMenuContainer = styled.div`
  display: block;

  @media screen and (max-width: 1024px) {
    display: none;
    position: absolute;
    background-color: #eff1f5;
    border: 1px solid #9699a3;
    border-radius: 3px;
  }
`

const StyledSubMenuContainerMobile = styled.div`
  display: none;

  @media screen and (max-width: 1024px) {
    display: block;
    position: fixed;
    left: 10px;
    top: 152px;
    background-color: #eff1f5;
    border: 1px solid #9699a3;
    border-radius: 3px;
    z-index: 999;

    div {
      padding: 0 10px;
    }
  }
`

const StyledAccountMenuSUBItem = styled.div`
  font-family: "Graphik Medium";
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.09px;
  line-height: 42px;
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1 1;
  padding: 0;
  cursor: pointer;

  svg {
    height: 20px;
    margin-right: 25px;
  }

  svg,
  svg * {
    fill: #9699a3;
  }

  a {
    width: 100%;
    color: #9699a3;
  }

  &.active {
    svg,
    svg * {
      fill: #0be5da;
    }
    a {
      width: 100%;
      color: #65738e;
    }
  }

  a:hover {
    text-decoration: none;
  }

  .desktop {
    color: #637598;
    font-family: "Graphik Regular";
    font-size: 14px;
    line-height: 41px;
    white-space: nowrap;
    cursor: pointer;
  }

  .mobile {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    display: block;
    flex-direction: column;
    justify-content: left;
    align-items: left;
    margin: 0;
    padding: 16px 0 0;
    font-size: 14px;

    svg {
      height: 18px;
      margin-right: 0;
      opacity: 0.5;
    }

    .mobile {
      display: block;
    }

    .desktop {
      display: none;
    }

    &.active {
      svg,
      svg * {
        fill: #65738e;
        opacity: 1;
      }
    }
  }
`
