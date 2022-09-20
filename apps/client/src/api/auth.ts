import Axios from "../lib/axios";

async function signin(email: string, password: string) {
  try {
    await Axios.instance.post("/auth/signin", {
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
    await Axios.instance.post("/auth/signup", {
      email,
      password,
    });
  } catch (error) {
    console.error("signup error:", error);
    throw error;
  }
}

export default { signin, signup } as const;
