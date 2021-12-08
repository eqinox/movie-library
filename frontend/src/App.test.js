import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./store/user/user-slice";
import notificationSlice from "./store/notification/notification-slice";
import movieSlice from "./store/movie/movie-slice";
import MainNavigation from "./shared/navbar/MainNavigation";

describe("The testing things", () => {
  const store = configureStore({
    reducer: {
      user: userSlice.reducer,
      notification: notificationSlice.reducer,
      movies: movieSlice.reducer,
    },
  });
  test("renders learn react link", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    );
    // Successfuly logged in eqinox@abv.bg
    const linkElement = screen.getByText(/opala/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("check color of button in the navigation", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <MainNavigation />
        </Provider>
      </BrowserRouter>
    );

    const something = screen.getByLabelText('Authenticate');
    console.log(something);
    expect(something).toHaveStyle({ backgroundColor: 'red'})
  });
});
