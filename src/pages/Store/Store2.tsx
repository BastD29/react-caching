// import { FC } from "react";
// import { useCustomCache } from "../../hooks/useCustomCache2";
// import LoaderLayout from "../../components/layouts/LoaderLayout/LoaderLayout";
// import style from "./Store.module.scss";

// const Store: FC = () => {
//   const url = "https://jsonplaceholder.typicode.com/users";

//   const data = useCustomCache(url, 60000);

//   if (!data) return <LoaderLayout />;

//   return (
//     <div className={style["store"]}>
//       <pre>{JSON.stringify(data, null, 2)}</pre>
//     </div>
//   );
// };

// export default Store;
