import { getDifferenceInDays } from "../utils"

// Send data about member's orders profile values to send to BB
// To segment from their dashboard
/* eslint-disable-next-line no-unused-vars */
const buildBrightbackSegment = (profile, subscriptions) => {
  const { createdAt } = profile

  try {
    const { item_count, has_incontinence, upcoming_order_value } =
      getUpcomingorderData(subscriptions)
    const total_lifetime_spend_in_cents = getMemberSpend(profile)
    const member_age_in_system = getDifferenceInDays(createdAt, Date.now())

    const segmentData = {
      upcoming_order: {
        item_count,
        has_incontinence,
        upcoming_order_value,
      },
      total_lifetime_spend_in_cents,
      member_age_in_system,
    }
    return segmentData
  } catch (e) {
    console.error(`error in build Brightback Event: ${e}`)
    return {}
  }
}

const getUpcomingorderData = (upcomingItems) => {
  return {
    item_count: upcomingItems.length,
    has_incontinence: upcomingItems.some((i) => !i.addon),
    upcoming_order_value: upcomingItems.reduce(
      (sum, { price }) => sum + price,
      0
    ),
  }
}

const getMemberSpend = (profile) => {
  const invoices = profile.billing?.invoices || []
  if (!invoices || !invoices.length) {
    return 0
  }
  return invoices.reduce((sum, { total_in_cents }) => sum + total_in_cents, 0)
}

// Brightback rn only works per sub basis
export const initBrightbackPrecancel = async (subId, profile) => {
  try {
    const res = await window.Brightback.handleDataPromise({
      app_id: "q9KrPplrAl",
      subscription_id: `${subId}`,
      email: `${profile.email}`,
      account: {
        internal_id: `${profile.id}`,
      },
      pause_all_subscriptions: true,
      extend_all_subscriptions: true,
      save_return_url: `${window.location.origin}/account?page=accountDetail`,
      cancel_confirmation_url: `${window.location.origin}/account?page=accountCancel`,
      offer_accept_url: `${window.location.href}`,
      offer_eligible: true,
      custom: {
        // offboard_discount_url: `${window.location.origin}/account/offboard?offboard-action=offboard-discount&promotion=d25`,
        // offboard_frequency_url: `${window.location.origin}/account/offboard?offboard-action=offboard-frequency&cadence=`,
        offboard_cancel_return_url: `${window.location.origin}/account?page=accountDetail`,
        // ...buildBrightbackSegment(profile, subscriptions),
      },
    })

    if (res.valid) {
      return res.url
    }
    // else
    throw new Error("Invalid response in Brightback precancel")
  } catch (e) {
    throw new Error(e)
  }
}
