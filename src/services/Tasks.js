const BASE_URL = "http://localhost:3001";
export class Tasks {
  async create(data, user_id) {
    return await fetch(`${BASE_URL}/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_id: user_id,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json)
      .catch((error) => error);
  }
}
