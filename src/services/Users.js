const BASE_URL = "http://todo-app-production-9478.up.railway.app";
//const BASE_URL = "http://localhost:3001";

export class Users {
  async login(data) {
    return await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: data.username,
        password: data.password,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async register(data) {
    return await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
