import { useState } from 'react';
import './Tasks.css'
import { getItemLocalStorage } from '../../../utils/persistinguser';

function Tasks({task, realList, setRealList, draggingg}){
    

  
    async function handleSubmit(e){
        // console.log(e.target.value);
        let token = getItemLocalStorage("authorization");
      let data = {
        task:e.target.value,
        list: task.tasklist
      }
      let response = await fetch("http://localhost:8000/task/deleteTask",{
        method:'POST',
        mode:'cors',
        headers:{
          "Content-type": "application/json; charset=UTF-8",
          "authorization":`Bearer ${token}`
        },
        body:JSON.stringify({task:e.target.value,
            list:task.tasklist})
      })
  
      let ans = await response.json();
      // console.log(ans);
      if(ans.message == 'success'){
        let newarr = [];
        realList.forEach((data)=>{
            let temp;
            if(data._id == task.tasklist){
                temp = data.tasklist.filter(info => info._id != e.target.value)
                data.tasklist = temp;
                newarr.push(data);
            }else{
                newarr.push(data);
            }
        })
      // console.log(newarr)
        
          
        setRealList((prev)=>{
          // console.log(prev);
          return newarr  
        })
    }
}

    
    return(
        <div draggable onDragStart={(e)=>draggingg(e,task._id)} className="small-task-container">
            <div className="checkbox-div">
                <input onClick={handleSubmit}  type="checkbox" value={task._id}/>
            </div>
            <div>{task.task}</div>
            
        </div>
    )
}

export default Tasks;