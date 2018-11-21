import API from "./instance";

export async function restartServer() {
  await API.get("/restart");
}

export async function ping(){
  return await API.get('');

}