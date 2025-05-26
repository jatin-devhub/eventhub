export function isAdminAuthorized(req: Request | { headers: any }) {
  const secret = process.env.NEXT_PUBLIC_ADMIN_SECRET;
  const token = req.headers['x-admin-secret'];
  return token === secret;
}
