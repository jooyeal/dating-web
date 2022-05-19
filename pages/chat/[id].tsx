import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import { BsArrowRightSquare } from "react-icons/bs";
import { getChat, sendChat } from "../../services/chatApi";

interface Props {
  currentUser: string;
  receiverId: string;
  conversationid: string;
  chats: Array<ChatInfo>;
  senderInfo: UserInfo;
  receiverInfo: UserInfo;
}

interface ChatProps {
  avatar: string;
  content: string;
  isMe: boolean;
}

const Chat = ({ avatar, content, isMe }: ChatProps) => {
  return (
    <div className="pt-1 mb-2">
      {isMe ? (
        <div className="flex justify-end">
          <div className="basis-8/12 flex justify-end items-center">
            <div className="bg-slate-300 text-slate-800 p-1 rounded">
              {content}
            </div>
          </div>
          <div className="basis-2/12 flex justify-center items-start pt-1">
            <Image
              className="rounded-full"
              src={`${process.env.HOST_URL}/${avatar}`}
              width={36}
              height={36}
            />
          </div>
        </div>
      ) : (
        <div className="flex">
          <div className="basis-2/12 flex justify-center items-start pt-1">
            <Image
              className="rounded-full"
              src={`${process.env.HOST_URL}/${avatar}`}
              width={36}
              height={36}
            />
          </div>
          <div className="basis-8/12 flex items-center ">
            <div className="w-auto bg-slate-300 text-slate-800 p-1 rounded">
              {content}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function ChatRoom({
  currentUser,
  receiverId,
  conversationid,
  chats,
  receiverInfo,
  senderInfo,
}: Props) {
  const [inputChat, setInputChat] = useState<string>("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputChat(e.target.value);
  };
  const onClick = () => {
    const data = {
      conversationid,
      senderId: currentUser,
      receiverId,
      content: inputChat,
    };
    sendChat(data);
    setInputChat("");
  };
  return (
    <div>
      <Head>
        <title>WEMEWE</title>
        <meta name="description" content="Dating app WEMEWE's chat room" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center md:text-sm mobile:text-sm">
        <div className="flex flex-col w-full h-screen pt-16 pb-16">
          <div className="basis-11/12 h-full overflow-auto">
            {chats.map((chat, index) => (
              <Chat
                key={index}
                avatar={
                  currentUser === chat.senderId
                    ? senderInfo.avatar
                    : receiverInfo.avatar
                }
                content={chat.content}
                isMe={currentUser === chat.senderId ? true : false}
              />
            ))}
          </div>
          <div className="flex basis-1/12 border-t-4">
            <div className="h-full w-5/6 p-2">
              <input
                className="outline-none w-full rounded-md p-2 text-lg bg-slate-300"
                type="text"
                onChange={onChange}
                value={inputChat}
              />
            </div>
            <div
              className="w-1/6 text-3xl flex justify-center items-center border-l-2"
              onClick={onClick}
            >
              <BsArrowRightSquare />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const res = await getChat(
    ctx.req.cookies["wemewe-token"],
    ctx.query?.id ?? ""
  );
  console.log(res);
  return {
    props: {
      currentUser: res.currentUser,
      receiverId: res.receiverId,
      conversationid: res.conversation._id,
      chats: res.chats,
      senderInfo: res.senderInfo,
      receiverInfo: res.receiverInfo,
    },
  };
};

export default ChatRoom;
