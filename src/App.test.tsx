import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div data-testid="mock-outlet" />,
}));

describe("<App />", () => {
  it("renders the app header", () => {
    render(<App />);
    expect(screen.getByText("Tetris")).toBeInTheDocument();
  });

  it("renders the outlet", () => {
    render(<App />);
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});
