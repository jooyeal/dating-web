import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import UserCard from "../components/UserCard";
import { getMyPage, getUsers } from "../services/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";

interface Props {}
const Home = ({}: Props) => {
  const dispatch = useAppDispatch();
  const usersSelector = useAppSelector((state) => state.users);
  const myInfoSelector = useAppSelector((state) => state.myInfo);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMyPage());
  }, []);
  const isFavorite = (userId: string) => {
    const match = myInfoSelector.myInfo?.favorites?.filter(
      (favorite) => favorite.userid === userId
    );
    if (match?.length !== 0) {
      return true;
    } else {
      return false;
    }
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
            if (user._id !== myInfoSelector.myInfo?._id)
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
  return {
    props: {},
  };
};

export default Home;
