import { User } from "@/types";
import { StateCreator } from "zustand";

export interface AuthSlice {
  userInfo: User | undefined;
  setUserInfo: (userInfo: User | undefined) => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});

// export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
//   userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
//   setUserInfo: (userInfo) => {
//     if (userInfo) {
//       localStorage.setItem("userInfo", JSON.stringify(userInfo));
//     } else {
//       localStorage.removeItem("userInfo");
//     }
//     set({ userInfo });
//   },
// });
