import { setupServer } from "msw/node";
import { todoHandlers } from "@/lib/msw/todo-handlers";

beforeAll(() => mockServer.listen({ onUnhandledRequest: "warn" }));

afterAll(() => mockServer.close());

afterEach(() => {
  mockServer.resetHandlers();
});

export const mockServer = setupServer(...todoHandlers);
