import type { GetStaticProps } from "next";

interface Props {}
// pages/500.js
export default function Custom500(props: Props) {
  return <h1>500 - Server-side error occurred</h1>;
}
