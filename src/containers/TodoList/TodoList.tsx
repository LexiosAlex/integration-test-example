import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useEffect } from "react";
import { todoActions } from "@/lib/reducers/todoReducer";
import { CreateTodoForm } from "./components/CreateTodoForm";
import styles from "./todoList.module.css";
import { TodoItem } from "./components/TodoItem";

export const TodoList = () => {
  const { todos } = useAppSelector((store) => store.todos);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(todoActions.fetchTodos());
  }, [dispatch]);

  return (
    <div className={styles.todoSection}>
      <h1 className={styles.todoSectionTitle}>Add your things to do here</h1>
      <div>
        <CreateTodoForm />
        <ul>
          {todos.map(({ title, id }) => (
            <TodoItem key={id} title={title} id={id} />
          ))}
        </ul>
      </div>
    </div>
  );
};
