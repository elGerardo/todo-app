const token = JSON.parse(localStorage.getItem("login"));

export class Tasks {
  async get() {
    return await fetch(`${import.meta.env.VITE_API_URL}/tasks/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token.token,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async find(task_id) {
    return await fetch(`${import.meta.env.VITE_API_URL}/tasks/find?id=${task_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token.token,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async create(data) {
    return await fetch(`${import.meta.env.VITE_API_URL}/tasks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token.token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async deleteItem({ id, type }) {
    return await fetch(`${import.meta.env.VITE_API_URL}/tasks/delete?id=${id}&type=${type}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token.token,
      },
    })
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }

  async updateListItem(task_item_id, value) {
    return await fetch(
      `${import.meta.env.VITE_API_URL}/tasks/updateList?task_item_id=${task_item_id}&status=${value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token.token,
        },
      }
    )
      .then((response) => response.json())
      .catch((error) => console.log(error));
  }
}
