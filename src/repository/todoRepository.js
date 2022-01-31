import axios from "axios";

const baseURL = "http://localhost:3000";

export default class TodoRespository {
  async getTodos(queryType) {
    const response = await axios({
      baseURL,
      url: "/todo/all",
      method: "GET",
      params: { queryType },
    });
    return response.data;
  }

  async createTodo(message) {
    const response = await axios({
      baseURL,
      url: "todo/create",
      method: "POST",
      data: {
        message,
      },
    });
    return response.data;
  }

  async updateTodoMessage(id, message) {
    const response = await axios({
      baseURL,
      url: `todo/update/${id}`,
      method: "PUT",
      data: {
        message,
      },
    });
    return response.data;
  }

  async updateTodoStatus(id, status) {
    const response = await axios({
      baseURL,
      url: `todo/update/${id}`,
      method: "PUT",
      data: {
        status,
      },
    });
    return response.data;
  }

  async deleteTodo(id) {
    const response = await axios({
      baseURL,
      url: `todo/delete/${id}`,
      method: "DELETE",
    });
    return response.data;
  }
}
