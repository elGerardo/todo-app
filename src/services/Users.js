const BASE_URL = "http://localhost:3001";
export class Users {
  async register(data) {
    return await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
