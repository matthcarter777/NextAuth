import { useContext, useEffect } from "react"
import { AuthContext } from "../hooks/AuthContext"
import { useCan } from "../hooks/useCan";
import { setupApiClient } from "../services/api";
import { api } from "../services/apiClient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const userCanSeeMetrics = useCan({
    permissions: ['metrics.list']
  })

  useEffect(() => {
    api.get('/me')
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <h1>Dashboard: {user?.email}</h1>
      { userCanSeeMetrics && <div>Metricas</div>}
    </>
  )
}

export const getServerSideProps = withSSRAuth(async(ctx) => {
  const apiClient = setupApiClient(ctx);
  const response = await apiClient.get('/me');

  return {
    props: {}
  }
})