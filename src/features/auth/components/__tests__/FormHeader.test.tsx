import FormHeader from "@/features/auth/components/FormHeader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

test("renders FormHeader with children", () => {
  render(
    <FormHeader>
      <div data-testid="child-element">Test Child</div>
    </FormHeader>,
  );

  // Check if the FormHeader component is in the document
  const formHeader = screen.getByTestId("child-element").parentElement;
  expect(formHeader).toBeInTheDocument();

  // Check if the child element is in the document
  const childElement = screen.getByTestId("child-element");
  expect(childElement).toBeInTheDocument();

  // Check if the child element contains the correct text
  expect(childElement).toHaveTextContent("Test Child");
});
