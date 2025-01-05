import AuthForm from "@/features/auth/components/AuthForm";
import { render, screen, userEvent } from "@/utils/test";

describe("AuthForm", () => {
  describe("AuthForm", () => {
    it("should render children", () => {
      render(<AuthForm>children</AuthForm>);
      const children = screen.getByText("children");
      expect(children).toBeInTheDocument();
    });
  });
  describe("FormHeaderWrapper", () => {
    it("should render children", () => {
      render(<AuthForm.HeaderWrapper>children</AuthForm.HeaderWrapper>);
      const children = screen.getByText("children");
      expect(children).toBeInTheDocument();
    });
  });
  describe("MainHeader", () => {
    it("should render children", () => {
      render(<AuthForm.MainHeader>children</AuthForm.MainHeader>);
      const children = screen.getByText("children");
      expect(children).toBeInTheDocument();
    });
  });
  describe("SubHeader", () => {
    it("should render children", () => {
      render(<AuthForm.SubHeader>children</AuthForm.SubHeader>);
      const children = screen.getByText("children");
      expect(children).toBeInTheDocument();
    });
  });
  describe("Separator", () => {
    it("should render separator", () => {
      render(<AuthForm.Separator />);
      const separator = screen.getByTestId("separator");
      expect(separator).toBeInTheDocument();
    });
  });
  describe("SubmitButton", () => {
    describe("Rendering", () => {
      it("should render button", () => {
        render(<AuthForm.SubmitButton>children</AuthForm.SubmitButton>);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
      });

      it("should render children", () => {
        render(<AuthForm.SubmitButton>children</AuthForm.SubmitButton>);
        const children = screen.getByText("children");
        expect(children).toBeInTheDocument();
      });

      it("should be enabled if isLoading is false", () => {
        render(
          <AuthForm.SubmitButton isloading={false}>
            children
          </AuthForm.SubmitButton>,
        );
        const button = screen.getByRole("button");
        expect(button).toBeEnabled();
      });

      it("should be disabled if isLoading is true", () => {
        render(
          <AuthForm.SubmitButton isloading>children</AuthForm.SubmitButton>,
        );
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
      });
    });

    it("should render loader if isLoading is true", () => {
      render(<AuthForm.SubmitButton isloading>children</AuthForm.SubmitButton>);
      const loader = screen.getByTestId("loader");
      expect(loader).toBeInTheDocument();
    });

    it("should not render loader if isLoading is false", () => {
      render(
        <AuthForm.SubmitButton isloading={false}>
          children
        </AuthForm.SubmitButton>,
      );
      const loader = screen.queryByTestId("loader");
      expect(loader).not.toBeInTheDocument();
    });

    it("should render login icon when isLoading is false", () => {
      render(
        <AuthForm.SubmitButton isloading={false}>
          children
        </AuthForm.SubmitButton>,
      );
      const login = screen.getByTestId("login");
      expect(login).toBeInTheDocument();
    });

    it("should not render login icon when isLoading is true", () => {
      render(<AuthForm.SubmitButton isloading>children</AuthForm.SubmitButton>);
      const login = screen.queryByTestId("login");
      expect(login).not.toBeInTheDocument();
    });
  });
  describe("PasswordInput", () => {
    describe("Rendering", () => {
      it("should render input", () => {
        render(<AuthForm.PasswordInput placeholder="Password" />);
        const input = screen.getByPlaceholderText(/password/i);
        expect(input).toBeInTheDocument();
      });

      it("should render placeholder", () => {
        render(<AuthForm.PasswordInput placeholder="Password" />);
        const input = screen.getByPlaceholderText("Password");
        expect(input).toBeInTheDocument();
      });

      it("should render eye off icon", () => {
        render(<AuthForm.PasswordInput placeholder="Password" />);
        const icon = screen.getByTestId("eyeOff");
        expect(icon).toBeInTheDocument();
      });

      it("should not render eye icon", () => {
        render(<AuthForm.PasswordInput placeholder="Password" />);
        const icon = screen.queryByTestId("eye");
        expect(icon).not.toBeInTheDocument();
      });

      it("should have type password by default", () => {
        render(<AuthForm.PasswordInput placeholder="Password" />);
        const input = screen.getByPlaceholderText(/password/i);
        expect(input).toHaveAttribute("type", "password");
      });
    });
    describe("Behaviour", () => {
      it("should toggle text type on button click", async () => {
        const user = userEvent.setup();
        render(<AuthForm.PasswordInput placeholder="Password" />);
        const button = screen.getByRole("button");
        const input = screen.getByPlaceholderText(/password/i);

        await user.click(button);

        expect(input).toHaveAttribute("type", "text");
      });

      it("should show eye icon on button click", async () => {
        const user = userEvent.setup();
        render(<AuthForm.PasswordInput placeholder="Password" />);
        const button = screen.getByRole("button");

        await user.click(button);

        const eye = screen.getByTestId("eye");
        const eyeOff = screen.queryByTestId("eyeOff");
        expect(eye).toBeInTheDocument();
        expect(eyeOff).not.toBeInTheDocument();
      });
    });
  });
});
