# tfarms-frontend

## Admin analytics authorization

The local `/api/revenue-intelligence` and `/api/shock-scenarios` routes verify
admin access by forwarding the incoming cookie/authorization headers to the
backend's admin-only `/admin/stats` endpoint. Deployments must set
`TFARMS_BACKEND_URL` (or a direct absolute `NEXT_PUBLIC_API_URL`) so this
server-side check can return `200` for admins, `401` for unauthenticated
requests, and `403` for authenticated non-admin requests.
