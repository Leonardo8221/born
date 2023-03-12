import { getSession } from "next-auth/react"
import { Configuration } from "client/command"

export const apiConfig = async () => {
  const session: any = await getSession();

  const config = new Configuration({
    basePath: process.env.NEXT_OPENAPI_BASE_PATH,
    accessToken: `${session?.token}`
  })

  return await config;
};
