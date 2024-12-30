import useLogin from "@/features/auth/hooks/useLogin";
import { act, renderHook } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    asPath: "/", // Set a default value for asPath if needed
  })),
}));

describe("useLogin", () => {
  it("should return an object with handleSignUp and isLoading", () => {
    const { result } = renderHook(useLogin);
    expect(result.current.handleSignUp).toBeInstanceOf(Function);
    expect(result.current.isLoading).toBe(false);
  });
  it("should set isLoading to true when handleSignUp is called", () => {
    const { result } = renderHook(useLogin);
    act(() => {
      result.current.handleSignUp({ email: "test", password: "test" });
    });

    expect(result.current.isLoading).toBe(true);
  });
});
