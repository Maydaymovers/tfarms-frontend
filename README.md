# tfarms-frontend

TFarms is a responsive marketplace frontend built with Next.js 14, React 18,
TypeScript, and Tailwind CSS. The core pages use clearly labeled local sample
data; vendor applications and marketplace orders are not submitted to a backend.

## Routes

- `/` — TFarms homepage
- `/vendor-onboarding` — validated, three-step vendor application preview
- `/gmv-dashboard` — responsive GMV metrics and trend dashboard
- `/marketplace` — searchable and filterable sample product catalog
- `/products/[id]` — product details for catalog items
- `/marketplace/[id]` — existing backend-connected listing detail route

## Local development

```sh
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). To create a production
build, run `npm run build`, then `npm start` to serve it locally.

## Admin analytics authorization

The local `/api/revenue-intelligence` and `/api/shock-scenarios` routes verify
admin access by forwarding the incoming cookie/authorization headers to the
backend's admin-only `/admin/stats` endpoint. Deployments must set
`TFARMS_BACKEND_URL` (or a direct absolute `NEXT_PUBLIC_API_URL`) so this
server-side check can return `200` for admins, `401` for unauthenticated
requests, and `403` for authenticated non-admin requests.

Deployment trigger: 2026-09-29
