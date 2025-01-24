import AuthForm from "@/features/auth/components/AuthForm";
import { render, screen } from "@testing-library/react";

import { describe, expect, it } from "vitest";

describe("AuthForm", () => {
  describe("AuthForm", () => {
    describe("Rendering", () => {
      it("should render children", () => {
        render(<AuthForm>children</AuthForm>);
        const element = screen.getByText(/children/i);
        expect(element).toBeInTheDocument();
      });
    });
  });
  describe("FormHeaderWrapper", () => {
    describe("Rendering", () => {
      it("should render children", () => {
        render(<AuthForm.HeaderWrapper>children</AuthForm.HeaderWrapper>);
        const element = screen.getByText(/children/i);
        expect(element).toBeInTheDocument();
      });
    });
  });
  describe("MainHeader", () => {
    describe("Rendering", () => {
      it("should render children", () => {
        render(<AuthForm.MainHeader>children</AuthForm.MainHeader>);
        const element = screen.getByText(/children/i);
        expect(element).toBeInTheDocument();
      });
    });
  });
  describe("SubHeader", () => {
    describe("Rendering", () => {
      it("should render children", () => {
        render(<AuthForm.SubHeader>children</AuthForm.SubHeader>);
        const element = screen.getByText(/children/i);
        expect(element).toBeInTheDocument();
      });
    });
  });
  describe("FormSeparator", () => {
    describe("Rendering", () => {
      it("should render separator", () => {
        render(<AuthForm.Separator />);
        const element = screen.getByText(/or/i);
        expect(element).toBeInTheDocument();
      });
    });
  });
});
