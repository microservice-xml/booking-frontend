import LandingPage from "../pages/landing-page";
import RegistratedUsersPage from "../pages/registrated-users-page";
import { Navigate, Route, Routes } from "react-router-dom";
import RegistrationPage from "../pages/registration-page";
import CreateAccommodation from "../pages/create-accommodation-page";
import HostAccommodationsPage from "../pages/host-accommodations-page";
import AccommodationsPage from "../pages/accommodation-page";
import SearchAccommodations from "../components/SearchAccommodations";
import LoginPage from "../pages/login-page";
import ForbiddenPage from "../pages/error/403";
import NotFoundPage from "../pages/error/404";
import UnauthorizedPage from "../pages/error/401";
import ProfilePage from "../pages/profile-page";
import EditProfile from "../pages/edit-profile";
import PendingReservation from "../components/PendingReservation";
import RateHostPage from "../pages/rate-host-page";
import HostRatingsPage from "../pages/host-ratings-page";
import EditRateHostPage from "../pages/edit-rate-host-page";
import RateAccommodationPage from "../pages/rate-accommodation-page";
import AccommodationRatingsPage from "../pages/accommodation-ratings-page";
import EditRateAccommodationPage from "../pages/edit-rate-accommodation-page";
import NotificationListPage from "../pages/notification-list-page";
import NotificationPage from "../pages/notification-page";
import BookAirlinePage from "../pages/book-airline-page";
import ChooseFlight from "../pages/choose-flight";

let unregisteredPages = {
  Landing: {
    path: "/",
    component: <LandingPage />,
  },
  RegistratedUsers: {
    path: "/registered-users",
    component: <RegistratedUsersPage />,
  },
  RegistrationPage: {
    path: "/register",
    component: <RegistrationPage />,
  },
  CreateAccommodationPage: {
    path: "/create-accommodation",
    component: <CreateAccommodation />,
  },
  HostAccomodationPage: {
    path: "/host-accommodations",
    component: <HostAccommodationsPage />,
  },
  AccomodationPage: {
    path: "/accommodation/:id",
    component: <AccommodationsPage />,
  },
  PendingReservation: {
    path: "/pending-reservation",
    component: <PendingReservation />,
  },
  SearchAccommodations: {
    path: "/search-accommodations",
    component: <SearchAccommodations />,
  },
  NotificationListPage: {
    path: "/notifications",
    component: <NotificationListPage />,
  },
  NotificationPage: {
    path: "/notification/:id",
    component: <NotificationPage />,
  },
  LoginPage: {
    path: "/authenticate",
    component: <LoginPage />,
  },
  Forbidden: {
    path: "/403",
    component: <ForbiddenPage />,
  },
  NotFound: {
    path: "/404",
    component: <NotFoundPage />,
  },
  Unauthorized: {
    path: "/401",
    component: <UnauthorizedPage />,
  },
  Redirect: {
    path: "*",
    component: <Navigate to="/404" />,
  },
  MyProfile: {
    path: "/profile/:id",
    component: <ProfilePage />,
  },
  EditProfile: {
    path: "/edit-profile",
    component: <EditProfile />,
  },
  RateHostPage: {
    path: "/rate-host-page",
    component: <RateHostPage />,
  },
  HostRatingsPage: {
    path: "/host-ratings-page",
    component: <HostRatingsPage />,
  },
  EditHostRatingPage: {
    path: "/edit-host-rating-page",
    component: <EditRateHostPage />,
  },
  RateAccommodationPage: {
    path: "/rate-accommodation-page",
    component: <RateAccommodationPage />,
  },
  AccommodationRatingsPage: {
    path: "/accommodation-ratings-page",
    component: <AccommodationRatingsPage />,
  },
  EditAccommodationRatingPage: {
    path: "/edit-accommodation-rating-page",
    component: <EditRateAccommodationPage />,
  },
  BookAirlinePage: {
    path: "/book-airline",
    component: <BookAirlinePage />,
  },
  ChooseFlight: {
    path: "/choose-flight",
    component: <ChooseFlight />,
  },
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
