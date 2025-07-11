# CHANGELOG

---

# (0.1.0) - 2025-06-25
## Features
- First public release of the Formula 1 Fan Hub App
## Contributor
- Bright Dikko

---

## (0.2.0) - 2025-07-01
## Features
- Migrated form Preact to React
- Parse/Back4App integration
- Standings/teams/drivers fetched from cloud DB via model helpers
- New React component set (Home, DriversPage, TeamsPage, etc.)
- Modernised code style, comments, naming & file structure
- Removed local JSON datasources from being used as data source, and legacy Preact components
- All other feature 4 requirements implemented

## Contributor
- Bright Dikko
- Appo Nikiema
- 
---

## (0.3.0) - 2025-07-01
## Features
- Full user authentication flow with Back4App / Parse
- Auth service module (services/auth.js) isolates sign-up, log-in, log-out helpers
- Global AuthContext + useAuth hook for session state and actions
- ProtectedRoute guard blocks unauthenticated access to /drivers and /teams
- AuthOnlyRoute guard prevents logged-in users from visiting /auth/*
- Inline Login and Register pages styled to match site theme
- FormMessage component replaces browser alerts with inline banners
- Navbar swaps “Log in” ↔ “Log out” automatically; logout redirects home
- Direct-URL typing handled both ways by route guards

## Contributor
- Bright Dikko
- Appo Nikiema
