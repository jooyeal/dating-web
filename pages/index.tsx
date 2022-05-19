import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import UserCard from "../components/UserCard";
import { getMyPage, getUsers } from "../services/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface Props {
  favorites: Array<{
    userid: string;
  }>;
  currentUser: string;
}
const Home = ({ favorites, currentUser }: Props) => {
  const dispatch = useAppDispatch();
  const usersSelector = useAppSelector((state) => state.users);
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const isFavorite = (userId: string) => {
    const match = favorites.filter((favorite) => favorite.userid === userId);
    if (match.length !== 0) return true;
    return false;
  };

  return (
    <div>
      <Head>
        <title>WEMEWE</title>
        <meta name="description" content="Dating app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className="pt-20 pb-20 flex flex-col items-center gap-6">
          {usersSelector.users.map((user, index) => {
            if (user._id !== currentUser)
              return (
                <UserCard
                  key={index}
                  _id={user._id}
                  username={user.username}
                  avatar={user.avatar}
                  introduction={user.introduction}
                  birthday={user.birthday}
                  gender={user.gender}
                  isFavorite={isFavorite(user._id)}
                />
              );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getMyPage(ctx.req.cookies["wemewe-token"]);
  return {
    props: {
      favorites: res.favorites ?? [],
      currentUser: res._id,
    },
  };
};

export default Home;
