import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { getChatList } from "../../services/userApi";

interface Props {
  chatUserInfos: Array<{
    conversationid: string;
    targetUserInfo: UserInfo;
  }>;
}

interface ChatListProps {
  _id: string;
  avatar: string;
  username: string;
}

const ChatList = ({ _id, avatar, username }: ChatListProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/chat/${_id}`);
  };
  return (
    <div
      className="flex w-full items-center border-b h-16 gap-4"
      onClick={onClick}
    >
      <div className="flex items-center p-2">
        <Image
          className="rounded-full"
          src={`${process.env.HOST_URL}/${
            avatar ? avatar : "uploads/default-user-image.png"
          }`}
          width={36}
          height={36}
        />
      </div>
      <div>
        <span className="text-lg font-bold">{username}</span>
      </div>
    </div>
  );
};

function chat({ chatUserInfos }: Props) {
  return (
    <div>
      <Head>
        <title>WEMEWE</title>
        <meta name="description" content="Dating app WEMEWE's chat" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pt-20 pb-20 flex flex-col items-center p-4 md:text-sm mobile:text-sm">
        <div className="flex justify-center text-2xl font-bold">Chat</div>
        <div className="flex flex-col items-center w-full shadow-xl">
          {chatUserInfos.map((chat, index) => (
            <ChatList
              key={index}
              _id={chat.conversationid}
              avatar={chat.targetUserInfo.avatar}
              username={chat.targetUserInfo.username}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const chatUserInfos = await getChatList(ctx.req.cookies["wemewe-token"]);
  return {
    props: {
      chatUserInfos,
    },
  };
};

export default chat;
