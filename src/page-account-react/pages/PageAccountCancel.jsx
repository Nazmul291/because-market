import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { makeDeleteRequest } from "../../utils"

/*
  Takes a pre defined url we pass into brightback to do the canceling from our side
  Member lands on page and redirected
*/
export function PageAccountCancel() {
  const navigate = useNavigate()

  useEffect(() => {
    const redirectToDetailPage = () =>
      navigate(`${location.pathname}?page=subscriptions`)
    const deleteSubs = async () => {
      try {
        await makeDeleteRequest(`${process.env.PERCHE_API_URL}/subscriptions`)
        redirectToDetailPage()
      } catch (e) {
        console.error(e)
        redirectToDetailPage()
      }
    }
    deleteSubs()
  })

  return null
}
