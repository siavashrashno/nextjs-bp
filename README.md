This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- [Typescript](https://www.typescriptlang.org/)
- [@reduxjs/toolkit](https://redux-toolkit.js.org/) for redux development
- [axios](https://axios-http.com/) as http client
- [next-intl](https://github.com/amannn/next-intl) for managing translations, date, time and number formatting
- [swr](https://swr.vercel.app/) for http cache invalidation strategy
- [tailwind](https://tailwindcss.com/) as utility-first CSS framework
- [prettier](https://prettier.io/) for code formatting
- [universal-cookie](https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie) for managing cookies in both server side and client side by
- VS Code debugging

## Getting Started

If you want to generate your types from OpenApi json file set your file address at package.json "api" script then run:

```bash
npm run api
# or
yarn api
```

To Format your code with Prettier run:

```bash
npm run format
# or
yarn format
```

To Format + Lint and type check your code just run:

```bash
npm run ci
# or
yarn ci
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.tsx`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
