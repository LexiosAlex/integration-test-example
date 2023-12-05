import React, { FormEvent } from "react";
import { todoActions } from "@/lib/reducers/todoReducer";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from './createTodoForm.module.css'

export const CreateTodoForm = () => {
  const dispatch = useAppDispatch();
  const { isTodoAddLoading } = useAppSelector((store) => store.todos);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(todoActions.addTodo(data.get("title") as string));
    event.currentTarget.reset();
  };

  return (
    <form data-testid="CreateTodoForm" className={styles.addFormItem} onSubmit={onSubmit}>
      <input className={styles.addFormInput} name="title" type="text" placeholder="Add your new todo" />
      <button className={styles.addFormButton} disabled={isTodoAddLoading} type="submit">
        Add
      </button>
    </form>
  );
};
