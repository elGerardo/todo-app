//const BASE_URL = "https://todo-app-production-9478.up.railway.app";
const BASE_URL = "http://localhost:3001";

export class Tasks {
  async find(task_id) {
    return await fetch(`${BASE_URL}/tasks/find?id=${task_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async get(user_id) {
    return await fetch(`${BASE_URL}/tasks/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        user_id: user_id,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async create(data, user_id) {
    return await fetch(`${BASE_URL}/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_id: user_id,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async deleteItem({ id, type }) {
    return await fetch(`${BASE_URL}/tasks/delete?id=${id}&type=${type}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async updateListItem(task_item_id, value) {
    return await fetch(
      `${BASE_URL}/tasks/updateList?task_item_id=${task_item_id}&status=${value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
