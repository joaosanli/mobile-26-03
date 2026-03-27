import axios from 'axios';
import React from 'react';

const baseURL = 'https://todo-app-express-backend-rtbt.onrender.com';

export interface TaskItem {
  _id: string;
  text: string;
}

export const getAllTasks = async (
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>
) => {
  try {
    const { data } = await axios.get<TaskItem[]>(`${baseURL}`);
    setTasks(data);
  } catch (err) {
    console.log(err);
  }
};

export const addTask = async (
  text: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>
) => {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return;
  }

  try {
    await axios.post(`${baseURL}/save`, { text: trimmedText });
    setText('');
    await getAllTasks(setTasks);
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = async (
  taskId: string,
  text: string,
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const trimmedText = text.trim();

  if (!trimmedText) {
    return;
  }

  try {
    await axios.post(`${baseURL}/update`, { _id: taskId, text: trimmedText });
    setText('');
    setIsUpdating(false);
    await getAllTasks(setTasks);
  } catch (err) {
    console.log(err);
  }
};

export const deleteTask = async (
  _id: string,
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>
) => {
  try {
    await axios.post(`${baseURL}/delete`, { _id });
    await getAllTasks(setTasks);
  } catch (err) {
    console.log(err);
  }
};

export const clearAllTasks = async (
  tasks: TaskItem[],
  setTasks: React.Dispatch<React.SetStateAction<TaskItem[]>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  setIsUpdating: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (tasks.length === 0) {
    return;
  }

  try {
    await Promise.all(
      tasks.map((task) => axios.post(`${baseURL}/delete`, { _id: task._id }))
    );
    setText('');
    setIsUpdating(false);
    await getAllTasks(setTasks);
  } catch (err) {
    console.log(err);
  }
};
