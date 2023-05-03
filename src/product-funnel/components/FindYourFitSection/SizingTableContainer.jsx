import React, { memo } from "react"
import { styled } from "@linaria/react"
import dotsCornerImg from "../../../../assets/dots-corner.png"

function SizingTableContainer(props) {
  return (
    <TableWrapper {...props}>
      <Corner>
        <img src={dotsCornerImg} alt="" />
      </Corner>
      <TableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Underwear Size</th>
              <th>Hip/Waist Measurements</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>S/M</td>
              <td>28-40"</td>
            </tr>
            <tr>
              <td>L</td>
              <td>38-50"</td>
            </tr>
            <tr>
              <td>XL</td>
              <td>48-64"</td>
            </tr>
            <tr>
              <td>XXL</td>
              <td>64-80"</td>
            </tr>
          </tbody>
        </StyledTable>
      </TableContainer>
    </TableWrapper>
  )
}

export default memo(SizingTableContainer)

const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 204px;

  @media (max-width: 768px) {
    margin-top: 16px;
  }
`

const Corner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
  height: 90px;
  width: 90px;
`

const TableContainer = styled.div`
  height: 100%;
  background-color: #fff;
  padding: 15px 25px;
  display: flex;
  align-items: center;
`

const StyledTable = styled.table`
  height: 160px;

  & th {
    border: none;
    padding: 0.25rem;
    font-family: "Roboto";
    font-weight: bold;
    font-size: 16px;
    line-height: 24px;
    color: #212529;
    vertical-align: bottom;
  }

  & td {
    border: none;
    padding: 0.25rem;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 16px;
    line-height: 24px;
    color: #212529;
    vertical-align: top;
  }
`
