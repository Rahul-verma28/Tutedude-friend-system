export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/userinfo`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/updateProfile`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const GET_FRIEND_DETAILS = `${AUTH_ROUTES}/user`;



export const CONTACTS_ROUTES = "api/friends";
export const ALL_FRIEND_REQUEST = `${CONTACTS_ROUTES}/allFriendRequests`;
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`;
export const SEND_FRIEND_REQUEST = `${CONTACTS_ROUTES}/sendFriendRequest`;
export const ACCEPT_FRIEND_REQUEST = `${CONTACTS_ROUTES}/acceptFriendRequest`;
export const REJECT_FRIEND_REQUEST = `${CONTACTS_ROUTES}/declineFriendRequest`;
export const RECOMMENDATIONS = `${CONTACTS_ROUTES}/recommendations`;