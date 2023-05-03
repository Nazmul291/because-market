import React from "react"
import { styled } from "@linaria/react"
import imgReview1 from "./img/review1.png"
import imgReview2 from "./img/review2.png"
import imgR5 from "./img/5.png"
import imgR45 from "./img/4.5.png"

function ModalTrialCheckoutUpgradeReviews(props) {
  return (
    <StyledRoot {...props}>
      <StyledReviewItem>
        <StyledReviewAuthor>
          <StyledAuthorImg src={imgReview1} alt="Kathryn Schultz" />
          <StyledAuthorName>Kathryn Schultz</StyledAuthorName> Verified Buyer
        </StyledReviewAuthor>

        <StyledReviewContent>
          <StyledContentP>
            “I have had an extremely positive experience with Because. These
            products are the best available and the company is very helpful.”
          </StyledContentP>
          <StyledContentRatingImg src={imgR5} alt="5" />
        </StyledReviewContent>
      </StyledReviewItem>

      <StyledReviewItem>
        <StyledReviewAuthor>
          <StyledAuthorImg src={imgReview2} alt="Sarah Taylor" />
          <StyledAuthorName>Sarah Taylor</StyledAuthorName> Verified Buyer
        </StyledReviewAuthor>

        <StyledReviewContent>
          <StyledContentP>
            “These have been amazing. No more standing in the aisle at the store
            trying to figure out what will work and what I need!”
          </StyledContentP>
          <StyledContentRatingImg src={imgR45} alt="4.5" />
        </StyledReviewContent>
      </StyledReviewItem>

      <StyledOther>And thousands more happy customers!</StyledOther>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  display: flex;

  @media only screen and (max-width: 1023px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`

const StyledReviewItem = styled.div`
  width: calc(((100% - 130px) / 2) - 30px);
  margin-right: 30px;
  border: solid 1px #dedede;
  box-shadow: 4px 4px 10px rgb(0 0 0 / 10%);
  border-radius: 10px;
  padding: 20px 30px;
  display: flex;
  align-items: center;

  @media only screen and (max-width: 1023px) {
    width: calc(50% - 10px);
    margin: 0;
    padding: 15px;
    flex-direction: column;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
    margin-bottom: 20px;
  }
`

const StyledReviewAuthor = styled.div`
  width: 110px;
  text-align: center;
  margin-right: 30px;
  color: rgb(134, 156, 209);
  font-weight: bold;
  font-size: 14px;
  line-height: 17px;

  @media only screen and (max-width: 1023px) {
    width: 100%;
    margin: 0 0 10px;
  }
`

const StyledAuthorImg = styled.img`
  display: block;
  margin: 0 auto 10px;
`

const StyledAuthorName = styled.strong`
  display: block;
  color: inherit;
  font-weight: inherit;
`

const StyledReviewContent = styled.div`
  flex: 1;
  text-align: center;
`

const StyledContentP = styled.p`
  margin-bottom: 4px;
  font-size: 13px;
  color: #777;
  margin: 0;
  line-height: 1.5em;
`

const StyledContentRatingImg = styled.img`
  vertical-align: top;
`

const StyledOther = styled.div`
  align-self: center;
  width: 130px;
  font-size: 16px;
  text-align: center;

  @media only screen and (max-width: 1023px) {
    margin: 30px auto 0;
    width: auto;
  }
`

export default ModalTrialCheckoutUpgradeReviews
