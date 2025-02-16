import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export type Priority = 'low' | 'medium' | 'high';

export type TodoType = {
  id: number;
  title: string;
  isDone: boolean;
  priority: Priority;
  description?: string;
};

type States = {
  todos: TodoType[];
};

type Actions = {
  addTodo: (todo: Omit<TodoType, 'id'>) => void;
  removeTodo: (id: number) => void;
  clearTodos: () => void;
  editTodo: (id: number, updates: Partial<TodoType>) => void;
};

const TodoStore = create(
  devtools(
    persist(
      immer<States & Actions>((set) => ({
        todos: [],
        addTodo: (todo) =>
          set((state) => {
            state.todos.push({ ...todo, id: Date.now() });
          }),

        removeTodo: (id) =>
          set((state) => {
            state.todos = state.todos.filter((t: { id: number }) => t.id !== id);
          }),
        editTodo: (id, updates) =>
          set((state) => {
            const todo: TodoType | undefined = state.todos.find((t: TodoType) => t.id === id);
            if (todo) {
              Object.assign(todo, updates);
            }
          }),

        clearTodos: () =>
          set((state) => {
            state.todos = [];
          }),
      })),
      {
        name: 'todo-storage',
      }
    ),
    {
      name: 'Todo Store',
      enabled: true,
    }
  )
);



export default TodoStore;
