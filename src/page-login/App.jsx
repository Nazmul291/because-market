import React from "react"
import { BrowserRouter } from "react-router-dom"
import { styled } from "@linaria/react"
import AppRoute from "./containers/AppRoute"
import imgAccountLaptop from "./images/account-laptop.png"

function App() {
  return (
    <BrowserRouter>
      <Root>
        <RouteLayout>
          <AppRoute />
        </RouteLayout>
        <StyledImageContainer>
          <img src={imgAccountLaptop} alt="Account Laptop" />
        </StyledImageContainer>
      </Root>
    </BrowserRouter>
  )
}

const Root = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
`

const RouteLayout = styled.div`
  flex: 1;
`

const StyledImageContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40vw;
  height: auto;
  background-color: #f3eae4;
`

export default App
