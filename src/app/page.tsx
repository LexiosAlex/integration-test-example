"use client";

import styles from "./page.module.css";
import React from "react";
import { TodoList } from "@/containers/TodoList";

export default function Home() {
  return (
    <main className={styles.main}>
      <TodoList />
    </main>
  );
}
