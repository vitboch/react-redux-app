import httpService from "./http.service";
import { nanoid } from "nanoid";

const todosEndpoint = "todos/";

const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: { _page: 1, _limit: 10 },
    });
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.post(todosEndpoint, payload);
    return { ...data, id: nanoid() };
  },
};

export default todosService;
