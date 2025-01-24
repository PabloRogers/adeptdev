import FormContentWrapper from "@/features/auth/components/FormContentWrapper";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("FormContentWrapper", () => {
  describe("Rendering", () => {
    it("it should render children", () => {
      render(<FormContentWrapper>children</FormContentWrapper>);
      const element = screen.getByText("children");
      expect(element).toBeInTheDocument();
    });
  });
});
