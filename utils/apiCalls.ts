export const loginAPI = async (email: string, password: string) => {
  try {
    const response = (await fetch(`../api/auth`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })) as Response;
    let result = await response.json();
    return {
      response: result,
      status: response.status,
    };
  } catch (e) {
    return e as Error;
  }
};
