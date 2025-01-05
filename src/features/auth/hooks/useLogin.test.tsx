import useLogin from "@/features/auth/hooks/useLogin";
import { act, renderHook } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    asPath: "/",
  })),
}));

const mockSignInWithPassword = jest.fn();
jest.mock("@/utils/supabase/client.ts", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    auth: {
      signInWithPassword: mockSignInWithPassword,
    },
  })),
}));

jest.mock("sonner");

describe("useLogin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should handle successful login", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({ error: null });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin({
        email: "test@example.com",
        password: "password123",
      });
    });

    expect(mockSignInWithPassword).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });

    // State updates should also be asserted inside act
    await act(async () => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  // it("should throw error on failed login", async () => {
  //   const errorMessage = { message: "Login failed" };
  //   mockSignInWithPassword.mockResolvedValueOnce({
  //     error: errorMessage,
  //   });

  //   const { result } = renderHook(() => useLogin());

  //   await act(async () => {
  //     expect(async () => {
  //       await result.current.login({
  //         email: "test@example.com",
  //         password: "password123",
  //       });
  //     }).toThrow(errorMessage.message);
  //   });
  // });

  it("should not throw error on successful login", async () => {
    mockSignInWithPassword.mockResolvedValueOnce({
      error: null,
    });

    const { result } = renderHook(() => useLogin());

    await act(async () => {
      expect(async () => {
        await result.current.login({
          email: "test@example.com",
          password: "password123",
        });
      }).not.toThrow();
    });
  });
});
