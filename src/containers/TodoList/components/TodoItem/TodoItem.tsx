import styles from "./todoItem.module.css";
import { todoActions } from "@/lib/reducers/todoReducer";
import React from "react";
import { useAppDispatch } from "@/lib/hooks";
import Image from "next/image";

type TodoItemProps = {
  title: string;
  id: string;
};

export const TodoItem = ({ title, id }: TodoItemProps) => {
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    dispatch(todoActions.removeTodoById(id));
  };

  return (
    <li data-testid={`TodoItem-${id}`} className={styles.todoItemCard}>
      <span>{title}</span>
      <button className={styles.todoItemCross} onClick={handleRemove}>
        <Image src="./cross.svg" alt="cross icon" width={12} height={12} />
      </button>
    </li>
  );
};
