import { GetServerSideProps } from "next";
import Head from "next/head";
import Appbar from "../components/Appbar";
import BottomNavigation from "../components/BottomNavigation";
import UserCard from "../components/UserCard";
import { getMyPage, getUsers } from "../services/userApi";

interface Props {
  users: Array<UserInfo>;
  myInfo: UserInfo;
}
const Home = ({ users, myInfo }: Props) => {
  const isFavorite = (userId: string) => {
    const match = myInfo.favorites?.filter(
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
        <Appbar />
        <div className="pt-20 pb-20 flex flex-col items-center gap-6">
          {users.map((user, index) => {
            if (user._id !== myInfo._id)
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
      <BottomNavigation />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const users = await getUsers(`bearer ${ctx.req.cookies["wemewe-token"]}`);
  const myInfo = await getMyPage(`bearer ${ctx.req.cookies["wemewe-token"]}`);
  if (users.response?.status === 403 || myInfo.response?.status === 403) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      users,
      myInfo,
    },
  };
};

export default Home;
