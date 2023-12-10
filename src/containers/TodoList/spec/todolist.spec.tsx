import { renderWithProviders } from "@/lib/test-utils";
import { TodoList } from "@/containers/TodoList/TodoList";
import { waitFor } from "@testing-library/dom";
import { TodoItem } from "@/types/todoItem.type";

import axios, { AxiosResponse } from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTodos: TodoItem[] = [
  { id: "1", title: "Create component" },
  { id: "2", title: "Write UI test" },
  { id: "3", title: "Write integration test" },
];
describe("<TodoList>", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When API request success", () => {
    it("Should render Todo items", async () => {
      const mockedResponse: AxiosResponse = {
        data: { todos: mockTodos },
        status: 200,
        statusText: "OK",
        headers: {},
        // @ts-ignore
        config: {},
      };
      mockedAxios.get.mockResolvedValueOnce(mockedResponse);
      const { queryAllByTestId } = renderWithProviders(<TodoList />);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalledWith(
          "http://localhost:4000/todos",
        );
      });

      await waitFor(() => {
        expect(queryAllByTestId(/^TodoItem-\d+$/).length).toBe(
          mockTodos.length,
        );
      });
    });

    it("Should create mew todo item", () => {});

    it("Should remove todo item", () => {});
  });
});
