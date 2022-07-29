# _The Travel Enablers_ website source code

_The Travel Enablers © 2022, all rights reserved_

## Tools and Dependencies

- Next.js (React)
- Typescript
- Sass
- Eslint & Prettier
- Contentful
- Stripe, stripe-js, stripe-react-js

---

## Notes

- Backend functionality is done through Next.js api routing
- Stripe Payments is integrated using Stripe Elements
- Content injection is done using SSG and ISR, wth props and paths loaded from Contentful's api
- SVGs are served as components with their own style modules.
- Styling takes advantage of Next.js' sass compatibility and component-level styling. Styled-components but better!
