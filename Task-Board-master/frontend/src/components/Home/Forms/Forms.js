import './Forms.css'
import React, {useEffect, useState} from 'react';
import { getItemLocalStorage } from '../../../utils/persistinguser';

import {useNavigate} from 'react-router-dom'


function Forms({realList,setRealList,taskList,setTaskList}){
    const navigate = useNavigate();
   

    // form states
    let [listname, setListname] = useState('');
    let [taskk, setTaskk] = useState('');
    let [selectList, setSelectList] = useState('');

  
    async function handleListname(e){
      setListname(e.target.value);
    }
  
    async function addtolist(e){
      e.preventDefault();
      // console.log(taskList);
      let token = getItemLocalStorage("authorization");
      let data = {
        tasklistname:listname
      }
      // console.log(data);
      let response = await fetch("http://localhost:8000/tasklist/createtasklist",{
        method:'POST',
        mode:'cors',
        headers:{
          "Content-type": "application/json; charset=UTF-8",
          "authorization":`Bearer ${token}`
        },
        body:JSON.stringify({tasklistname:listname})
      })
  
      let ans = await response.json();
      if(ans.message == 'success'){
        setTaskList((prev)=>{
          return [...prev, ans.data.tasklistname];
        })

        setRealList((prev)=>{
          return [...prev, ans.data]
        })
      }

      setListname('');
    }
  
    // addidng the task to the list
    async function addingtask(e){
      e.preventDefault();
      let token = getItemLocalStorage("authorization");
      let data = {
        taskname:taskk,
        list:selectList
      }
      // console.log(data);
      let response = await fetch("http://localhost:8000/task/createTask",{
        method:'POST',
        mode:'cors',
        headers:{
          "Content-type": "application/json; charset=UTF-8",
          "authorization":`Bearer ${token}`
        },
        body:JSON.stringify({taskname:taskk,list:selectList})
      })
  
      let ans = await response.json();
      // console.log(ans);
      if(ans.message == 'success'){
        // console.log(realList)
        let newarr=[]
        realList.forEach((tasky) =>{
            if(tasky._id == ans.data.tasklist){
              tasky.tasklist.push(ans.data);
              newarr.push(tasky);
            }else{
              newarr.push(tasky)
            }
        });
      // console.log(newarr)
        
          
        setRealList((prev)=>{
          // console.log(prev);
          return newarr  
        })
        // console.log("added task")
        setSelectList('');
        setTaskk('')
    }
  }
  
    // creating task
    function creatingTask(e){
      // console.log(e.target.value);
      setTaskk(e.target.value);
    }
  
    // selecting List
    function selectingList(e){
      // console.log(e.target.value);
      setSelectList(e.target.value)
    }
  

  
    useEffect(()=>{
      document.title = "Task Board"
    },[])



  


    return(
        <div className='creating'>
        <h5>Create New List/Add new Task</h5>
        {/*creating new task list  */}
        <form onSubmit={addtolist} className='create-new-List'>
          <h3>Add new List</h3>
          <div>
            <label>List Name:</label>
            <input type='text' onChange={handleListname} value={listname} required/>
          </div>
          <button >Create List</button>
        </form>
        <hr></hr>
        
{/* task form */}
        <form onSubmit={addingtask} className='create-task-form'>
          <h3>Add new Task</h3>
          <div>
            <label>Add task:</label>
            <input onChange={creatingTask} type='text' value={taskk} required/>
          </div>

          <div>
            <label>Select List:</label>
            
            {taskList.length > 0 ? (
              <select onChange={selectingList} value={selectList}>
                <option key="" value=''></option>
              {realList.map((data)=>{
                // {console.log(data)}
                return <option key={data._id} value={data._id}>{data.tasklistname}</option>
            })}
              </select>
            ):
            (<small>PLease create a List first</small>)
            }

          </div>
          
          {taskList.length > 0 ? (<button >Create Task</button>):(<button disabled>Create Task</button>)}
        </form>
      </div>
    )

}


export default Forms;