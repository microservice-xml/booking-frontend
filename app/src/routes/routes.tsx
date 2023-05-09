import LandingPage from "../pages/landing-page";
import RegistratedUsersPage from "../pages/registrated-users-page";
import { Route, Routes } from "react-router-dom";
import RegistrationPage from "../pages/registration-page";
import CreateAccommodation from "../pages/create-accommodation-page";

let unregisteredPages = {
  Landing: {
    path: "/",
    component: <LandingPage />,
  },
  RegistratedUsers: {
    path: "/registrated-users",
    component: <RegistratedUsersPage />,
  },
  RegistrationPage: {
    path: "/registration-page",
    component: <RegistrationPage />,
  },
  CreateAccommodationPage: {
    path: "/create-accommodation",
    component: <CreateAccommodation />,
  }
};

let ROUTES: any = {};

Object.assign(ROUTES, ROUTES, unregisteredPages);

export function getRoutes() {
  let result: any[] = [];

  for (const [key, value] of Object.entries(ROUTES)) {
    result.push(
      <Route
        key={"route-" + key}
        path={(value as any).path}
        element={(value as any).component}
      />
    );
  }

  return <Routes>{result}</Routes>;
}
