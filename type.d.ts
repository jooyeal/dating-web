declare interface UserInfo {
  _id: string;
  username: string;
  introduction: string;
  avatar: string;
  birthday: string;
  gender: string;
}

declare interface RegistInfo {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  birthday: string;
  gender: string;
}

declare interface ChatInfo {
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

declare interface Favorites {
  favorites: Array<{
    userid: string;
  }>;
}

declare interface InfoProps {
  label: string;
  content?: string | ReactElement;
}
