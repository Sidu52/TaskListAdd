import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import List from './List/List';
import axios from 'axios';
import Cookies from 'js-cookie';

const HomeContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ListsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 75%;
`;

const FormContainer = styled.div`
    width: 25%;
    margin-right: 20px;
    background: rgb(131, 140, 141);
}
`;
const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
`
const Button = styled.button`
    background: #787878;
    color: white;
    padding: 4px;
    margin: 5px;
    border-radius: 6px;
    cursor:pointer;
`

const Home = () => {
    const [name, setName] = useState('');
    const [allLists, setAllLists] = useState([]);
    const [selectedList, setSelectedList] = useState(null);
    const [task, setTask] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/list');
            setAllLists(response.data.lists);
            console.log('Data fetched successfully');
        } catch (error) {
            console.error('Error retrieving lists', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:8000/list', { name: name });
            if (response.status === 200) {
                const newList = { listname: name, tasks: [] };
                setAllLists((prevLists) => [...prevLists, newList]);
                console.log('New list created successfully');
            }
            console.log('List already created');
        } catch (error) {
            console.error('Error creating new list', error);
        }
    };

    const handleSubmitTask = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:8000/task', {
                name: task,
                listname: selectedList
            });
            fetchData();
            // setAllLists([...allLists]);
            console.log('New task created successfully');
        } catch (error) {
            console.error('Error creating new task', error);
        }
    };

    const handleListSelect = (listName) => {
        setSelectedList(listName);
    };
    const Singout = () => {
        Cookies.remove('token');
        window.location.href = '/';
        console.log('SingOut successfully');
    }

    return (
        <HomeContainer>
            <ListsContainer>
                {allLists.map((list, index) => (
                    <List key={index} name={list.listname} items={list.task} fetchCall={fetchData} />
                ))}
            </ListsContainer>
            <FormContainer>
                <Button
                    onClick={Singout}>
                    SignOut
                </Button>
                <Form onSubmit={handleSubmit}>
                    <label htmlFor="listName">List Name:</label>
                    <input
                        type="text"
                        id="listName"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Button type="submit">Create</Button>
                </Form>

                <Form onSubmit={handleSubmitTask}>
                    <label htmlFor="selectedList">List:</label>
                    <select
                        value={selectedList}
                        onChange={(e) => handleListSelect((e.target.value))}
                    >
                        <option value={null}>--Select a List--</option>
                        {allLists.map((list, index) => (
                            <option key={index} value={list.name}>
                                {list.listname}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="task">Task:</label>
                    <input
                        type="text"
                        id="task"
                        name="task"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                    />
                    <Button type="submit" disabled={selectedList === null}>
                        Add
                    </Button>
                </Form>
            </FormContainer>
        </HomeContainer>
    );
};

export default Home;
