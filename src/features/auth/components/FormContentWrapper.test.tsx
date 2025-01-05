import FormContentWrapper from "@/features/auth/components/FormContentWrapper";
import { render, screen } from "@testing-library/react";

describe("FormContentWrapper", () => {
  describe("Rendering", () => {
    it("should render image card", () => {
      render(<FormContentWrapper>children</FormContentWrapper>);
      const image = screen.getByText("hero");
      expect(image).toBeInTheDocument();
    });

    it("should render children", () => {
      render(<FormContentWrapper>children</FormContentWrapper>);
      const children = screen.getByText("children");
      expect(children).toBeInTheDocument();
    });
  });
});
