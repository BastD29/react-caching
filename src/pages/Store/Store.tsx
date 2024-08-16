// import { FC } from "react";
// import useFetch from "../../hooks/useFetch";
// import LoaderLayout from "../../components/layouts/LoaderLayout/LoaderLayout";
// import style from "./Store.module.scss";

// const Store: FC = () => {
//   const { loading, error, data, refetch } = useFetch({
//     url: "https://randomuser.me/api",
//     method: "get",
//     key: ["app", "get", "user", { name: "nisab" }],
//     cache: {
//       enabled: true,
//       ttl: 10,
//     },
//   });

//   if (loading) {
//     return <LoaderLayout />;
//   }
//   if (error) {
//     return <p>Something went wrong</p>;
//   }
//   return (
//     <div className={style["store"]}>
//       {JSON.stringify(data, null, 4)}
//       <br />
//       <button onClick={() => refetch()}>get user</button>
//     </div>
//   );
// };

// export default Store;
