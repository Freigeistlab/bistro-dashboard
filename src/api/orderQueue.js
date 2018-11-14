import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000"
});

export async function getQueuedOrders() {
  const queue = await API.get("/orders");
  console.log("queue ", queue.data.orders);
  return queue.data.orders;
}

export async function getRecipes() {
  const response = await API.get("/recipes");
  return response.data;
}

export async function addOrderToPrepare() {
  const data = {

  };
  const queue = await API.post("/order");
  return queue.data;
}

export async function nextOrder() {
  const queue = await API.get("/next_order");
  return queue.data;
}

export async function nextIngredients() {
  const response = await API.get("/next_ingredient");
  console.log(response.data);
}

export async function clearQueue() {
  const response = await API.get("/clear_queue");
  console.log(response);
}

