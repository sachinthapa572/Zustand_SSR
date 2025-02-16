import { useState } from 'react';
import TodoStore, { TodoType } from '../store/store';
import { useShallow } from 'zustand/react/shallow';

const TodoApp = () => {
  const { todos, addTodo, removeTodo, editTodo, clearTodos } = TodoStore(
    useShallow((state) => state)
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleAddTodo = () => {
    if (title.trim()) {
      addTodo({ title, description, isDone: false, priority });
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Todo App</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={handleAddTodo} className="bg-blue-500 text-white p-2 rounded w-full">
          Add Todo
        </button>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Todos: </h2>
        {todos.length === 0 ? (
          <p>No todos available.</p>
        ) : (
          todos.map((todo: TodoType) => (
            <div key={todo.id} className="flex justify-between items-center border-b py-2">
              <div>
                <h3 className={`font-bold ${todo.isDone ? 'line-through text-gray-500' : ''}`}>
                  {todo.title}
                </h3>
                <p>{todo.description}</p>
                <span
                  className={`text-sm ${
                    todo.priority === 'high'
                      ? 'text-red-500'
                      : todo.priority === 'medium'
                      ? 'text-yellow-500'
                      : 'text-green-500'
                  }`}
                >
                  Priority: {todo.priority}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => editTodo(todo.id, { isDone: !todo.isDone })}
                  className={`p-1 rounded ${todo.isDone ? 'bg-green-400' : 'bg-gray-300'}`}
                >
                  {todo.isDone ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {todos.length > 0 && (
        <button onClick={clearTodos} className="bg-red-600 text-white p-2 rounded mt-4 w-full">
          Clear All Todos
        </button>
      )}
    </div>
  );
};

export default TodoApp;
