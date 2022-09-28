import { Typography } from "@mui/material"
import { NextPage } from "next"
import { withAdminLayout } from "../../src/hoc/withAdmin"

const Organisations: NextPage = () => {
  return (
    <>
      <Typography variant="h4">Organizace</Typography>
    </>
  )
}

export default withAdminLayout(Organisations)