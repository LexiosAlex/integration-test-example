import { renderWithProviders } from "@/lib/test-utils";
import { TodoList } from "@/containers/TodoList/TodoList";
import { waitFor, within } from "@testing-library/dom";
import { TodoItem } from "@/types/todoItem.type";
import userEvent from "@testing-library/user-event";

import axios, { AxiosResponse } from "axios";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockTodos: TodoItem[] = [
  { id: "1", title: "Create component" },
  { id: "2", title: "Write UI test" },
  { id: "3", title: "Write integration test" },
];

const mockedGetResponse: AxiosResponse<{ todos: TodoItem[] }> = {
  data: { todos: mockTodos },
  status: 200,
  statusText: "OK",
  headers: {},
  // @ts-ignore
  config: {},
};

const mockAddResponse: AxiosResponse<{ todo: TodoItem }> = {
  data: { todo: { title: "newTodo", id: "4" } },
  status: 200,
  statusText: "OK",
  headers: {},
  // @ts-ignore
  config: {},
};

const mockRemoveResponse: AxiosResponse<void> = {
  status: 200,
  statusText: "OK",
  headers: {},
  // @ts-ignore
  config: {},
};

describe("<TodoList>", () => {
  const user = userEvent.setup();
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When API request success", () => {
    it("Should render Todo items", async () => {
      mockedAxios.get.mockResolvedValueOnce(mockedGetResponse);
      const { queryAllByTestId } = renderWithProviders(<TodoList />);

      await waitFor(() => {
        expect(queryAllByTestId(/^TodoItem-\d+$/).length).toBe(
          mockTodos.length,
        );
        expect(mockedAxios.get).toHaveBeenCalledWith(
          "http://localhost:4000/todos",
        );
      });
    });

    it("Should create mew todo item", async () => {
      mockedAxios.get.mockResolvedValueOnce(mockedGetResponse);
      mockedAxios.post.mockResolvedValueOnce(mockAddResponse);
      const { getByText, getByTestId, getByRole } = renderWithProviders(
        <TodoList />,
      );
      const input = getByRole("textbox");

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });
      await user.type(input, "newTodo");
      await user.click(getByText("Add"));

      await waitFor(() => {
        expect(getByTestId("TodoItem-4")).toBeVisible();
        expect(getByText("newTodo")).toBeVisible();
        expect(mockedAxios.post).toHaveBeenCalledWith(
          "http://localhost:4000/todos",
          { title: "newTodo" },
        );
        expect(input).toHaveValue("");
      });
    });

    it("Should remove todo item", async () => {
      mockedAxios.get.mockResolvedValueOnce(mockedGetResponse);
      mockedAxios.delete.mockResolvedValueOnce(mockRemoveResponse);
      const { getByTestId, queryByTestId } = renderWithProviders(<TodoList />);

      await waitFor(() => {
        expect(mockedAxios.get).toHaveBeenCalled();
      });
      await user.click(within(getByTestId("TodoItem-1")).getByRole("button"));

      await waitFor(() => {
        expect(mockedAxios.delete).toHaveBeenCalledWith(
          "http://localhost:4000/todos/1",
        );
        expect(queryByTestId("TodoItem-1")).not.toBeInTheDocument()
      });
    });
  });
});
