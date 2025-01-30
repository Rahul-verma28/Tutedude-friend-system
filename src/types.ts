export interface User {
    user: any;
    _id: string;
    username: string;
    email: string;
    password: string;
    friends: string[]; // Array of user IDs
    friendRequests: string[]; // Array of user IDs
    interests: string[];
    profilePicture?: string;
    isProfileSet: boolean;
    bio?: string;
  }