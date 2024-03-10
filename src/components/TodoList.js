import React, { useState } from "react";
import { STATUS_COMPLETED, STATUS_PENDING } from "../data/constants";
import { Card, Select, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import NewTodo from "./NewTodo";
import TodoTable from "./TodoTable";
import { useForm } from "antd/es/form/Form";
function TodoList() {
    const [addNewTodoForm] = useForm();
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", status: STATUS_PENDING },
        { id: 2, title: "Task 2", status: STATUS_COMPLETED }
    ]);
    // Add task
    function addTask({ title }) {
        const t = { id: tasks.length + 1, title: title, status: STATUS_PENDING }
        setTasks([...tasks, t]);
        addNewTodoForm.resetFields(undefined);
    }
    // Deleting task
    function deleteTask(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId));
        alert('task deleted successfully.');
    }
    // on task status update
    function onTaskUpdate(selectedRowKeys) {
        setTasks(tasks.map(task => {
            if (selectedRowKeys.includes(task.id)) return { ...task, status: STATUS_COMPLETED };
            else return task;
        }));
    }
    return <Card title={"To-do List"} styles={{ title: { textAlign: 'left' } }}
        extra={<NewTodo addNewTodoForm={addNewTodoForm} addTask={addTask} />}>
        <TodoTable tasks={tasks} deleteTask={deleteTask} onTaskUpdate={onTaskUpdate} />
    </Card>
}
export default TodoList;