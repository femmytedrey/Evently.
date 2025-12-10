import { AuthType } from "@/types/auth.type";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const MOCK_USERS = [
  {
    id: "1",
    email: "demo@example.com",
    password: "password123",
    rememberMe: true,
  },
];

export const authService = {
  signIn: async ({ email, password }: AuthType) => {
    await delay(1000);
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    return {
      user: { id: user.id, email: user.email },
      token: `mock_token_${Date.now()}`,
    };
  },

  signUp: async ({ email, password, rememberMe }: AuthType) => {
    await delay(1000);

    if (MOCK_USERS.find((u) => u.email === email)) {
      throw new Error("Email already exist");
    }

    const newUser = {
      id: String(MOCK_USERS.length + 1),
      email: email,
      password: password,
      rememberMe: rememberMe,
    };

    MOCK_USERS.push(newUser);

    return {
      user: { id: newUser.id, email: newUser.email },
      requiresVerification: true,
    };
  },

  verifyOtp: async (otp: string, email: string) => {
    await delay(1000);
    if (otp !== "1234") {
      throw new Error("Invalid verification code");
    }

    const user = MOCK_USERS.find((u) => u.email === email);

    return {
      success: true,
      token: `mock_token_${Date.now()}`,
      user: { id: user?.id, email: user?.email },
    };
  },
};
