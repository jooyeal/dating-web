import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import UserCard from "../components/UserCard";
import { getNotifications } from "../services/notificationApi";
import { getMyPage } from "../services/userApi";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { isFavorite } from "../utils/common";

interface Props {}

interface NotificationListProps extends UserInfo {}

const NotificationList = ({
  _id,
  avatar,
  username,
  introduction,
  birthday,
  favorites,
  gender,
}: NotificationListProps) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const onClick = () => {
    setModalOpen(true);
  };
  return (
    <>
      <div
        className="flex w-full items-center border-b h-16 gap-4"
        onClick={onClick}
      >
        <div className="flex items-center p-2">
          <Image
            className="rounded-full"
            src={`${avatar ? avatar : "/hushimiinari.jpeg"}`}
            width={36}
            height={36}
          />
        </div>
        <div>
          <span className="text-lg font-bold">{username}</span>
          <span> sent to you a heart</span>
        </div>
      </div>
      {modalOpen && (
        <div className="absolute top-0 flex flex-col justify-center items-center w-full h-full z-50 p-6 bg-slate-600 bg-opacity-70">
          <div className="absolute top-10 right-5 flex justify-end text-3xl text-white">
            <AiOutlineClose onClick={() => setModalOpen(false)} />
          </div>
          <UserCard
            _id={_id}
            username={username}
            introduction={introduction}
            avatar={avatar}
            birthday={birthday}
            gender={gender}
            isFavorite={isFavorite(_id, favorites)}
          />
          <div>
            if you want to chat with
            <span className="text-lg font-bold">{username}</span> send a heart
          </div>
        </div>
      )}
    </>
  );
};

function Notification({}: Props) {
  const dispatch = useAppDispatch();
  const myInfoSelector = useAppSelector((state) => state.myInfo);
  const notificationInfo = useAppSelector((state) => state.notificationInfo);
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  return (
    <>
      <div>
        <Head>
          <title>WEMEWE</title>
          <meta name="description" content="Dating app WEMEWE's notification" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="pt-20 pb-20 flex justify-center p-4 md:text-sm mobile:text-sm">
          <div className="flex flex-col items-center w-full shadow-xl">
            {notificationInfo.senderInfo?.map((sender, index) => (
              <NotificationList
                key={index}
                _id={sender._id}
                avatar={sender.avatar}
                username={sender.username}
                introduction={sender.introduction}
                birthday={sender.birthday}
                gender={sender.gender}
                favorites={myInfoSelector.myInfo?.favorites}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const notification = await getNotifications(ctx.req.cookies["wemewe-token"]);
  // const myInfo = await getMyPage();

  return {
    props: {
      // sendersInfo: notification,
      // favorites: myInfo.favorites ?? [],
    },
  };
};

export default Notification;
