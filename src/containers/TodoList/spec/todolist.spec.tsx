import { renderWithProviders } from "@/lib/test-utils";
import { TodoList } from "@/containers/TodoList/TodoList";
import { waitFor, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { addId, idToRemove, mockTodos } from "@/lib/msw/todo-handlers";
import { mockServer } from "@/lib/msw/server-setup";

describe("<TodoList>", () => {
  const user = userEvent.setup();
  mockServer.use()
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("When API request success", () => {
    it("Should render Todo items", async () => {
      const { queryAllByTestId } = renderWithProviders(<TodoList />);

      await waitFor(() => {
        expect(queryAllByTestId(/^TodoItem-\d+$/).length).toBe(
          mockTodos.length,
        );
      });
    });

    it("Should create mew todo item", async () => {
      const { getByText, getByTestId, getByRole, queryAllByTestId } =
        renderWithProviders(<TodoList />);
      const input = getByRole("textbox");

      await waitFor(() => {
        expect(queryAllByTestId(/^TodoItem-\d+$/).length).toBe(
          mockTodos.length,
        );
      });
      await user.type(input, "newTodo");
      await user.click(getByText("Add"));

      await waitFor(() => {
        expect(getByTestId(`TodoItem-${addId}`)).toBeVisible();
        expect(getByText("newTodo")).toBeVisible();
        expect(input).toHaveValue("");
      });
    });

    it("Should remove todo item", async () => {
      const { getByTestId, queryByTestId, queryAllByTestId } =
        renderWithProviders(<TodoList />);

      await waitFor(() => {
        expect(queryAllByTestId(/^TodoItem-\d+$/).length).toBe(
          mockTodos.length,
        );
      });
      await user.click(
        within(getByTestId(`TodoItem-${idToRemove}`)).getByRole("button"),
      );

      await waitFor(() => {
        expect(queryByTestId(`TodoItem-${idToRemove}`)).not.toBeInTheDocument();
      });
    });
  });
});
