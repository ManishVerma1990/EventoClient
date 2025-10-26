import type { TypedUseSelectorHook } from "react-redux"; // type-only import
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./index"; // adjust path if needed

// Typed versions of Redux hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
