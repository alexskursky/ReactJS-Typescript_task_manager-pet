import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./index";
import { useAppSelector } from "../hooks/redux-models";
import AppLayout from "../components/Layout/AppLayout";
import Loading from "../components/UI/Loading";

const AppRouter: React.FC = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {!isLogin ? (
          publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          ))
        ) : (
          <Route element={<AppLayout />}>
            {privateRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Route>
        )}
        <Route
          path="*"
          element={<Navigate replace to={!isLogin ? `/login` : `/tasks`} />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
