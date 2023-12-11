import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { TodoItem } from "@/types/todoItem.type";

const fetchTodos = createAsyncThunk("todos/getTodos", async () => {
  const response = await axios.get<{todos: TodoItem[]}>("http://localhost:4000/todos");

  return response.data.todos;
});

const removeTodoById = createAsyncThunk("todos/removeTodo", async (id: string) => {
  const response = await axios.delete<void>(`http://localhost:4000/todos/${id}`);

  return response.status
});

const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const response = await axios.post<{todo: TodoItem}>("http://localhost:4000/todos", {
      title,
    });

    return response.data.todo;
  }
);

type TodoState = {
  todos: TodoItem[];
  isTodoAddLoading: boolean;
};

const initialState: TodoState = {
  todos: [],
  isTodoAddLoading: false,
};

const todoSlice = createSlice<TodoState, any>({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
    builder.addCase(removeTodoById.fulfilled, (state, action) => {
      state.todos = state.todos.filter(({id}) => id !== action.meta.arg)
    });
    builder.addCase(addTodo.pending, (state, _) => {
      state.isTodoAddLoading = true;
    });
    builder.addCase(addTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
      state.isTodoAddLoading = false;
    })
  },
});

export const todoActions = {
  fetchTodos,
  removeTodoById,
  addTodo
}
export const todoReducer = todoSlice.reducer
