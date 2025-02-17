import React, { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import TodoStore, { TodoType, Priority } from '../store/store';

const TodoApp = () => {
  const [newTodo, setNewTodo] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPriority, setNewPriority] = useState<Priority>('medium');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const { todos, addTodo, removeTodo, editTodo } = TodoStore();

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo({
        title: newTodo,
        isDone: false,
        priority: newPriority as Priority,
        category: newCategory || 'general',
      });
      setNewTodo('');
      setNewCategory('');
      setNewPriority('medium');
    }
  };

  const startEdit = (todo: TodoType) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const saveEdit = (id: number) => {
    if (editText.trim()) {
      editTodo(id, { title: editText });
    }
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Todo List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Add new todo..."
                className="flex-1"
              />
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category"
                className="w-32"
              />
              <Select
                value={newPriority}
                onValueChange={(value) => setNewPriority(value as Priority)}
              >
                <Select.Trigger className="w-32">
                  <Select.Value placeholder="Priority" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="low">Low</Select.Item>
                  <Select.Item value="medium">Medium</Select.Item>
                  <Select.Item value="high">High</Select.Item>
                </Select.Content>
              </Select>
              <Button onClick={handleAddTodo}>
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>

            <div className="space-y-2">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => editTodo(todo.id, { isDone: !todo.isDone })}
                    className="w-5 h-5"
                  />

                  {editingId === todo.id ? (
                    <div className="flex items-center gap-2 flex-1">
                      <Input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={() => saveEdit(todo.id)} variant="ghost" size="sm">
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button onClick={() => setEditingId(null)} variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <span className={`flex-1 ${todo.isDone ? 'line-through text-gray-400' : ''}`}>
                      {todo.title}
                    </span>
                  )}

                  <span
                    className={`px-2 py-1 rounded text-sm
                    ${todo.priority === 'high' ? 'bg-red-100 text-red-800' : ''}
                    ${todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${todo.priority === 'low' ? 'bg-green-100 text-green-800' : ''}
                  `}
                  >
                    {todo.priority}
                  </span>

                  <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                    {todo.category}
                  </span>

                  <Button onClick={() => startEdit(todo)} variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>

                  <Button onClick={() => removeTodo(todo.id)} variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TodoApp;
