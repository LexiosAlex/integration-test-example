import express, { Express } from "express";
import { uid } from "uid";
import { Todo, TodoItem } from "./todoItem.type.js";
import cors from 'cors';

class TodoStorage {
  constructor(
    private todos: TodoItem[] = [
      { id: uid(16), title: "Create component" },
      { id: uid(16), title: "Write UI test" },
      { id: uid(16), title: "Write integration test" },
    ]
  ) {}

  public getTodos(): TodoItem[] {
    return this.todos;
  }

  public removeTodo(id: TodoItem["id"]) {
    this.todos = this.todos.filter((item) => item.id !== id);
  }

  public addTodo(title: Todo["title"]): TodoItem {
    const newTodo = { id: uid(16), title };

    this.todos.push(newTodo);

    return newTodo;
  }
}
const PORT = 4000;

const todoRouter = express.Router();

class RestApplication {
  private server: Express;
  private todoItemsStorage = new TodoStorage()

  constructor() {
    this.server = express();
  }

  private _initControllers() {
    console.log("init controllers");

    todoRouter.get("/", (_, res) => {
      console.log('return todos', this.todoItemsStorage.getTodos())
      return res.send({
        todos: this.todoItemsStorage.getTodos(),
      });
    });

    todoRouter.post("/", ({body}, res) => {
      if (!body.title) {
        return "Not valid todo";
      }

      const todo = this.todoItemsStorage.addTodo(body.title);

      console.log('New todo item added', todo)
      return res.send({ todo });
    });

    todoRouter.delete("/:todoId", (req, res) => {
      this.todoItemsStorage.removeTodo(req.params.todoId);

      console.log('Removed todo', req.params.todoId)

      return res.send({
        todos: this.todoItemsStorage.getTodos()
      })

    });

    this.server.use("/todos", todoRouter);
  }

  public initServer() {
    this.server.use(express.json());
    this.server.use(cors())
    this.server.listen(PORT, () => {
      console.log(`Server listen on port ${PORT}`);
    });
     this._initControllers();
  }
}

const bootstrap = async () => {
  const app = new RestApplication()
  app.initServer()
};

bootstrap();
