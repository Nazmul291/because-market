import React, { useState, useCallback } from "react"
import { styled } from "@linaria/react"
import AccountAccordion from "../AccountAccordion"

const list = [
  {
    title: "What’s so special about Because products?",
    content: () => (
      <StyledContent>
        We started Because to help our grandparents, but we soon realized that
        they weren’t the only ones that would benefit from getting affordable
        and good quality supplies delivered to their front door every month. We
        hope you love Because as much as they do! We’re proud to focus on:
        <StyledUl>
          <li>
            Great quality and price: Products crafted with quality materials,
            manufactured with feedback from tens of thousands of older adults.
          </li>
          <li>
            Make your life easier: Our discreetly packaged products are
            delivered straight to your doorstep. Tailored to your needs.
          </li>
          <li>
            Here to help: Our trained product specialists are here to help you
            find the best products for the weeks, months, and years ahead.
          </li>
        </StyledUl>
        From Bladder Protection to Skin Care, we carry a variety of thoughtfully
        developed products.
      </StyledContent>
    ),
  },
  {
    title: "Are your bladder protection products scented?",
    content: () => (
      <StyledContent>
        No - all of our underwear, pads, and guards are unscented.
      </StyledContent>
    ),
  },
  {
    title: "Are your bladder protection products latex free?",
    content: () => (
      <StyledContent>
        Yes - all of our underwear, pads, and guards are 100% latex-free.
      </StyledContent>
    ),
  },
  {
    title: "Are your bladder protection products form fitting?",
    content: () => (
      <StyledContent>
        We have a variety of sizes for all body types.
      </StyledContent>
    ),
  },
  {
    title: "Does this work if someone empties their bladder or only for leaks?",
    content: () => (
      <StyledContent>
        Our (moderate pads) are rated to absorb up to (850) ml of liquid.
        They're useful in a lot of situations - not just for minor leaks.
      </StyledContent>
    ),
  },
  {
    title: "Are your bladder protection products soft?",
    content: () => (
      <StyledContent>
        Yes- we've engineered them for maximum comfort, softness, and
        durability.
      </StyledContent>
    ),
  },
  {
    title: "Do they absorb quickly?",
    content: () => (
      <StyledContent>
        Yes, our pads absorb quickly but it's not just about rapid absorption -
        you also want products that also protect you from leaks. Our maximum and
        overnight underwear have double leak guards around the leg openings to
        provide an extra layer of protection. Our Because Premium Pads feature
        side leak guards to make sure that even a wet pad can still stop leaks.
        Finally, you want products that don’t make you feel wet when you’re
        asleep or before you can make a change. Our products are all designed to
        stay dry and draw the moisture away from your body quickly, and keep you
        dry until you can change.
      </StyledContent>
    ),
  },
  {
    title: "How do I put bladder protection underwear on?",
    content: () => (
      <StyledContent>
        <p>
          Your bladder protection underwear should fit snugly but should not rub
          or chafe. All our underwear comes folded to reduce shipping size
          (that’s a good thing for the environment!). Unfold the underwear. Once
          unfolded put your hand into the underwear top and loosen the front
          from the back. The easiest way to put the underwear on is to sit down
          and place both your right and left hand into the underwear, holding
          them open wide enough to slide your legs through the leg holes. Pull
          up until you reach your knees, then stand up and gently pull the
          underwear up. Make sure the elasticized top is fully extended.
        </p>
        <br />
        <p>
          You also want to make sure that the bladder protection pad in the
          underwear is centered between your legs. The front and back coverage
          of the protective pad should be equal - adjust the underwear until it
          feels comfortable. All our maximum and overnight underwear have double
          leak guards. Make sure these are not rubbing and are positioned
          comfortably. You may want to run your fingers between the underwear
          and your skin to make sure it's positioned comfortably and not doubled
          over. If the leak guard is rubbing, try going up a size.
        </p>
        <br />
        <p>
          Most of our underwear has the size marked on the back of the
          underwear, but if you need to make sure the back of the underwear
          should have a little bit of extra material to make sure the underwear
          covers you in the back.
        </p>
      </StyledContent>
    ),
  },
  {
    title:
      "How do I use bladder protection pads or guards in my existing underwear?",
    content: () => (
      <StyledContent>
        All our bladder protection pads and guards have a sticky side. To use,
        remove the cover from the sticky side and position the sticky side down
        in your underwear. Remove and replace as needed. If you are using
        bladder protection pads or guard within disposable bladder protection
        underwear to increase absorbency, the sticky back may damage the
        underwear. You can try applying a little body powder to the sticky
        backing to reduce the stickiness.
      </StyledContent>
    ),
  },
  {
    title:
      "I use your overnight underwear and I still need more protection, what can I do?",
    content: () => (
      <StyledContent>
        <p>
          Because has boosters! Boosters are designed to increase the absorbency
          of your bladder protection underwear. Boosters can significantly
          increase the total absorbency of the bladder protection underwear.
          Click on "Incontinence" in the navigation bar and look for "Because
          Boosters" or reach out to us and we can suggest the right option for
          your needs.
        </p>
        <br />
        <p>
          Customers often mention they use pads or guards to increase the
          absorbency of their disposable bladder protection underwear. This is a
          great option for many customers, especially during the day. Boosters
          work best for overnight uses as they are designed to offer an
          additional layer of full coverage within your bladder protection
          underwear.
        </p>
      </StyledContent>
    ),
  },
  {
    title: "How do I dispose of my bladder protection underwear?",
    content: () => (
      <StyledContent>
        Our Because bladder protection underwear can be disposed of in any
        regular trash receptacle. To remove the underwear, tear the sides and
        pull the underwear off between the front of your legs. Fold the
        underwear over so that the core is covered by the sides and place in the
        trash. Bladder control underwear is not flushable.
      </StyledContent>
    ),
  },
]

function AccountProductFAQ() {
  const [current, setCurrent] = useState(null)

  const onToggle = useCallback(
    (item) => {
      if (item === current) {
        return setCurrent(null)
      }

      setCurrent(item)
    },
    [current]
  )

  return (
    <StyledRoot>
      <StyledHeader>Frequently Asked Questions</StyledHeader>
      <div>
        {list.map((item) => (
          <AccountAccordion
            key={item.title}
            title={item.title}
            opened={current === item}
            onChange={() => onToggle(item)}
          >
            {item.content()}
          </AccountAccordion>
        ))}
      </div>
    </StyledRoot>
  )
}

const StyledRoot = styled.div`
  font-family: "Graphik Medium";
`

const StyledHeader = styled.div`
  font-family: "Cooper Md BT W05 Regular";
  font-weight: 500;
  letter-spacing: -0.1px;
  line-height: 42px;
  padding-bottom: 0;
  padding-left: 10px;
  margin-top: 27px;
  margin-bottom: 27px;
  font-size: 22px;
`

const StyledContent = styled.div`
  font-family: "Graphik Regular";
  font-size: 16px;
  line-height: 31px;
`

const StyledUl = styled.ul`
  padding-left: 2rem;
  list-style: circle;
`

export default AccountProductFAQ
