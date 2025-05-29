export type CurrentUser = {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  profilePic: string;
  userPosts: Posts[];
  bio: string;
  followers: CurrentUser[];
  createdAt: string;
};

export type User = {
  id: number;
  userName: string;
  displayName: string;
  email: string;
  profilePic: string;
  bio: string;
};

export type Posts = {
  postId: number;
  title: string;
  content: string;
  userName: string;
  saves: number;
  comments: Comment;
  likes: number;
  profilePic: string;
  postImg: string;
  displayName: string;
  createdAt: string;
};

export type PostsPages = {
  content: Posts[];
  lastPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type UserPages = {
  content: User[];
  lastPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type Like = {
  id: number;
  postId: number | null;
  comment: number | null;
  userName: string;
  displayName: string;
};

export type Comments = {
  commentId: number;
  content: string;
  userName: string;
  displayName: string;
  profilePic: string;
  replies: Comment[];
  likes: number;
};

export enum NotificationType {
  LIKE = "LIKE",
  COMMENT = "COMMENT",
}

export type Notification = {
  notificationId: number;
  recipient: number;
  actor: string;
  read: boolean;
  type: NotificationType;
  resourceId: number;
  resourceString: string;
  createdAt: string;
};

export type ConversationType = {
  conversationId: number;
  author: User;
  recipient: User;
  messages: ConvoMessage[];
};

export type ConvoMessage = {
  messageId: number;
  sender: User;
  receiver: User;
  content: string;
  read: boolean;
  createdAt: string;
};

export type ConvoMessages = {
  messages: ConvoMessage[];
  user: User | null;
  conversationId: number;
};
