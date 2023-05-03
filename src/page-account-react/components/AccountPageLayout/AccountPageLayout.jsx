import React from "react"
import PropTypes from "prop-types"
import { styled } from "@linaria/react"
import { RenderNode } from "../../../rUI"

AccountPageLayout.propTypes = {
  menu: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  children: PropTypes.node,
}

function AccountPageLayout({ menu, children, ...props }) {
  return (
    <Root {...props}>
      {menu && (
        <MenuLayout>
          <RenderNode node={menu} />
        </MenuLayout>
      )}
      <ContentLayout>{children}</ContentLayout>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  max-width: 1155px;
  margin: 10px auto;
  padding: 50px 0;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    margin: 0;
    padding: 0;
  }
`

const ContentLayout = styled.div`
  flex: 1;

  @media screen and (max-width: 1024px) {
    margin-left: 0;
  }
`

const MenuLayout = styled.div`
  width: 20%;
  height: 80vh;
  min-height: 200px;
  overflow: auto;
  position: sticky;
  top: 140px;
  z-index: 1;

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: auto;
    min-height: auto;
    top: 74px;
  }
`

export default AccountPageLayout
