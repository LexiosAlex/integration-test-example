import { rest, RequestHandler } from "msw";
import { TodoItem } from "@/types/todoItem.type";

export const mockTodos: TodoItem[] = [
  { id: "1", title: "Create component" },
  { id: "2", title: "Write UI test" },
  { id: "3", title: "Write integration test" },
];

export const idToRemove = "1";
export const addId = "4";

export const todoHandlers: RequestHandler[] = [
  rest.get("http://localhost:4000/todos", (req, res, ctx) => {
    return res(
      ctx.json({ todos: mockTodos }),
      ctx.status(200),
    );
  }),
  rest.delete(`http://localhost:4000/todos/*`, (req, res, ctx) => {
    return res(
      ctx.status(200),
    );
  }),
  rest.post(`http://localhost:4000/todos`, async (req, res, ctx) => {
    const body = (await req.json()) as TodoItem;

    return res(
      ctx.status(200),
      ctx.json({ todo: { title: body.title, id: addId } }),
    );
  }),
];
