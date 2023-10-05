// const page = ({ params: { operation } }) => {
//   return <div>This is {operation} operation</div>;
// };

// export default page;

"use client";
import { useRouter } from "next/navigation";

export const Page = () => {
  const router = useRouter();

  router.push("/");
  return <h1>you will be redirected, this is an easter egg !!</h1>;
};

export default Page;
