import { useState } from 'react';
import { Button, Input, Checkbox } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import './Todo.scss';

interface Todo {
  task: string;
  completed: boolean;
}

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTask, setEditTask] = useState('');

  const addTodo = () => {
    if (task.trim() === '') return;
    setTodos([...todos, { task, completed: false }]);
    setTask('');
  };

  const deleteTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const toggleTodo = (index: number) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const startEdit = (index: number, currentTask: string) => {
    setEditIndex(index);
    setEditTask(currentTask);
  };

  const saveEdit = () => {
    if (editIndex === null) return;
    const updatedTodos = [...todos];
    updatedTodos[editIndex].task = editTask;
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditTask('');
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setEditTask('');
  };

  return (
    <div className="todo-wrapper">
      <div className="todo-container">
        <h2>To-Do List</h2>
        <div className="input-section">
          <Input
            type="text"
            placeholder="Add new task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <div className="todo-list">
          {todos.length === 0 && <p className="empty">You have no tasks yet</p>}

          {todos.map((todo, index) => (
            <div className="todo-item" key={index}>
              {editIndex === index ? (
                <div className="edit-mode">
                  <Input
                    type="text"
                    value={editTask}
                    onChange={(e) => setEditTask(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                    autoFocus
                  />
                  <Button
                    icon={<CheckOutlined />}
                    className="save"
                    onClick={saveEdit}
                  />
                  <Button
                    icon={<CloseOutlined />}
                    className="cancel"
                    onClick={cancelEdit}
                  />
                </div>
              ) : (
                <div className="view-mode">
                  <label>
                    <Checkbox
                      checked={todo.completed}
                      onChange={() => toggleTodo(index)}
                    />
                    <span className={todo.completed ? 'completed' : ''}>
                      {todo.task}
                    </span>
                  </label>
                  <div className="actions">
                    <Button
                      icon={
                        <EditOutlined
                          style={{ color: 'rgba(123, 192, 222, 1)' }}
                        />
                      }
                      className="edit"
                      onClick={() => startEdit(index, todo.task)}
                    />
                    <Button
                      icon={<DeleteOutlined />}
                      className="delete"
                      onClick={() => deleteTodo(index)}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
