"use client";

import { store, persistor } from "@/redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess, updateUserSuccess } from "@/redux/user/userSlice";

function AuthBootstrap() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const hasSynced = useRef(false);

  useEffect(() => {
    if (hasSynced.current) return;
    hasSynced.current = true;

    const syncCurrentUser = async () => {
      try {
        const res = await fetch("/api/user/profile", { credentials: "include" });
        if (!res.ok) {
          if (res.status === 401 && currentUser) {
            dispatch(logoutSuccess());
          }
          return;
        }

        const data = await res.json();
        if (data?.user) {
          dispatch(updateUserSuccess(data.user));
        }
      } catch {
        // Non-blocking bootstrap; UI can still work with persisted auth state.
      }
    };

    syncCurrentUser();
  }, [currentUser, dispatch]);

  return null;
}

export default function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthBootstrap />
        {children}
      </PersistGate>
    </Provider>
  );
}

