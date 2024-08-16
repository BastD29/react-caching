import { FC } from "react";
// import { useCachedFetch } from "../../hooks/useCachedFetch";
import { User } from "../../types/user";
import LoaderLayout from "../../components/layouts/LoaderLayout/LoaderLayout";
import { useFetch } from "../../hooks/useFetch";
import style from "./Store.module.scss";

const Store: FC = () => {
  // const [data, loading, error] = useCachedFetch<User[]>(
  //   `https://jsonplaceholder.typicode.com/users`
  // );
  const [data, loading, error] = useFetch<User[]>(
    `https://jsonplaceholder.typicode.com/users`
  );

  console.log("data:", data);

  if (loading) return <LoaderLayout />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <div className={style["store"]}>
      {data.map((user) => (
        <li key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </li>
      ))}
    </div>
  );
};

export default Store;
