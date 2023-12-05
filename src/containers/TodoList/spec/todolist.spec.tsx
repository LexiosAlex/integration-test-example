import { renderWithProviders } from "@/lib/test-utils.txs";
import { TodoList } from "@/containers/TodoList/TodoList";
import {waitFor} from "@testing-library/dom";

const mockTodos = {}
describe("<TodoList>", () => {
  it("Should render Todo items from API", async () => {
    const { getAllByTestId } = renderWithProviders(<TodoList />);

      await waitFor(() =>
          expect(getAllByTestId(/^TodoItem-\d+$/).length).toBe(mockTodos.length),
      )
  });

  it("Should create mew todo item", () => {});

  it("Should remove todo item", () => {});
});
