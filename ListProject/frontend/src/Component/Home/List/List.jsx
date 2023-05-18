import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const ListContainer = styled.div`
  margin: 30px;
  padding: 0.5rem;
  background: gray;
  border: 1px solid black;
  width: 25%;
  text-align: center;
`;

const UList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  background: white;
`;

const CustomCheckbox = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  border: 1px solid rgb(204, 204, 204);
  width: 1.2rem;
  padding: 5%;
  height: 1.2rem;
  margin-right: 0.5rem;
  cursor: pointer;

  &:checked {
    background-color: #007bff;
    border-color: #007bff;
    background-image: url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"%3e%3cpath fill="none" stroke="%23fff" d="M2.5 5.5l1.5 1.5 3-3" /%3e%3c/svg%3e');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 50%;
  }
`;

const List = ({ name, items, fetchCall }) => {
  const [taskData, setTaskData] = useState([]);

  // useEffect for Calling FetchData of rendering div inside list
  useEffect(() => {
    if (items && items.length >= 0) {
      fetchData();
    }
  }, [items]);

  const fetchData = async () => {
    try {
      const promises = items.map((item) =>
        axios.post('http://localhost:8000/task/getAllTask', {
          taskID: item
        })
      );
      const responses = await Promise.all(promises);
      const tasks = responses.map((response) => response.data.task);
      setTaskData(tasks);
      console.log('Data fetched successfully', tasks);
    } catch (error) {
      console.error('Error retrieving task data', error);
    }
  };


  const completeTask = async (task, name) => {
    try {
      await axios.post('http://localhost:8000/task/changeStatus', {
        taskId: task._id,
        listname: name,
      });
      await fetchCall()
      console.log('Task Delete successfully');
    } catch (error) {
      console.error('Error updating task status', error);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, listName) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');

    try {
      // Find the task by taskId
      const response = await axios.post('http://localhost:8000/task/updateList', {
        taskId,
        listName
      });
      const updatedTask = response.data.task;
      await fetchCall()
      console.log('Response data:'); // Add this line to inspect the response data
      console.log('Task moved successfully', updatedTask);
    } catch (error) {
      console.error('Error moving task', error);
    }
  };

  return (
    <ListContainer
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, name)}
    >
      <p>{name}</p>
      <UList>
        {taskData.map((task) => (
          <ListItem
            key={task._id}
            draggable
            onDragStart={(e) => handleDragStart(e, task._id)}
          >
            <CustomCheckbox onClick={() => completeTask(task, name)} />

            <span>{task.task}</span>
          </ListItem>
        ))}
      </UList>
    </ListContainer>
  );
};

export default List;
