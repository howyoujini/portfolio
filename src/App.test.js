import { render, screen } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  window.location.hash = "";
  window.localStorage.clear();
});

test("renders the home screen with search and featured film", () => {
  render(<App />);
  expect(screen.getAllByText(/filmhaus/i).length).toBeGreaterThan(0);
  expect(screen.getByPlaceholderText(/search films/i)).toBeInTheDocument();
  expect(screen.getByText(/watch now/i)).toBeInTheDocument();
});
