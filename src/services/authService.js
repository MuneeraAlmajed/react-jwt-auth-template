const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

const signUp = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-up`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      //first save the raw token in local storage
      localStorage.setItem("token", data.token);
      
      //then extract the payload
      const payload = data.token.split(".")[1];

      //convert the specialize dpayload into JSON
      const tokenJson = atob(payload);

      //take that josn and convert it back into json
      return JSON.parse(tokenJson);
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { signUp };
