import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000"
});

export async function getQueuedOrders() {
  const queue = await API.get("/orders");
  console.log("queue ", queue.data.order_names);
  return queue.data.order_names;
}