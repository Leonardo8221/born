import { getSession } from 'next-auth/react';

export default async function logout(req: any, res: any) {
  const session: any = await getSession({ req });
  let path = `${
    process.env.NEXT_PUBLIC_CLIENT_ISSUER
  }/protocol/openid-connect/logout?post_logout_redirect_uri=${encodeURIComponent(
    process.env.NEXTAUTH_URL as any
  )}`;

  if (session?.id_token) {
    path = path + `&id_token_hint=${session.id_token}`;
  } else {
    path = path + `&client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}`;
  }

  res.status(200).json({ path });
}
