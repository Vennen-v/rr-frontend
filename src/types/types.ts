export type CurrentUser = {
  id: string;
  userName: string;
  displayName: string;
  email: string;
  profilePic: string;
  userPosts: Posts[];
  bio: string;
  followers: CurrentUser[];
};

export type Posts = {
  id: number;
  title: string;
  content: string;
  userName: string;
  saves: number;
  comments: [];
  likes: [];
  profilePic: string;
  postImg: string;
  displayName: string;
};

export type PostsPages = {
  content: Posts[];
  lastPage: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};
