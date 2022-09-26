import axios from "axios";

async function signin(email: string, password: string) {
  try {
    await axios.post("/auth/signin", {
      email,
      password,
    });
  } catch (error) {
    console.error("signin error:", error);
    throw error;
  }
}

async function signup(email: string, password: string) {
  try {
    const res = await axios.post("/auth/signup", {
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
}

export default { signin, signup } as const;
