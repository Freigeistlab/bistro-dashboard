import API from "./instance";

export async function getQueuedOrders() {
  const queue = await API.get("/orders");
  console.log("queue ", queue.data.orders);
  return queue.data.orders;
}

export async function getRecipes() {
  const response = await API.get("/recipes");
  return response.data;
}

//TODO: implement this function. currently we add orders via websocket request which isn't best practice
export async function addOrderToPrepare() {
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

