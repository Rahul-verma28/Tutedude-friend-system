import { create } from "zustand";
import { createAuthSlice, AuthSlice } from "./slices/Auth-slice";

export const useAppStore = create<AuthSlice>()((...a) => ({
    ...createAuthSlice(...a),
}));