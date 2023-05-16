import './Home.css'

import React, {useEffect, useState,useContext} from 'react';
import { getItemLocalStorage } from '../../utils/persistinguser';
import { useNavigate, redirect } from 'react-router-dom';
import { AuthContext } from '../../authContext/AuthContext';


import Forms from "./Forms/Forms";
import Lists from "./Lists/Lists";
import Nav from '../Nav/Nav';

function Home(){
  let navigate = useNavigate();
    let context = useContext(AuthContext);
    // console.log(context);
    
    let [realList, setRealList] = useState([]);
    let [taskList, setTaskList] = useState([]);
    

    function draggingg(e, cla){
      // console.log(cla);
      e.dataTransfer.setData("taskid", cla);
    }
  
    function draggingover(e, id){
      e.preventDefault()
      // console.log(id);
    }
  

    // caaling the API when item is dropped on a list
    async function dropped(e, id){
      let gotdata = e.dataTransfer.getData('taskid');
      let token = getItemLocalStorage("authorization");
      let data = {
        taskid:gotdata,
        list:id
      }
      // console.log(data);
      let response = await fetch("http://localhost:8000/task/dragging",{
        method:'POST',
        mode:'cors',
        headers:{
          "Content-type": "application/json; charset=UTF-8",
          "authorization":`Bearer ${token}`
        },
        body:JSON.stringify({taskid:gotdata,
          list:id})
      })
  
      let ans = await response.json();
      let newarr=[];
      if(ans.message == 'success'){
        realList.forEach((data)=>{
          // console.log(data);
          if(data._id == ans.from._id){
            data = ans.from;
            newarr.push(data);
          }else if(data._id == ans.to._id){
            data = ans.to;
            newarr.push(data);
          }else{
            newarr.push(data);
          }

        })

        setRealList(newarr);
      }
      

    }


    // getting the users list
    useEffect(()=>{
  
        async function getdata(){
          let token = getItemLocalStorage("authorization");
         //  console.log(token)
          if(!token){
           navigate('/signin');
           return;
          }
   
           let user =await fetch("http://localhost:8000",{
             method:"GET",
             mode:'cors',
             headers:{
               "Content-type": "application/json; charset=UTF-8",
               "authorization":`Bearer ${token}`
             }
           })
             let data = await user.json();
             // console.log(data.message);
             setTaskList(data.message.newlist);
             setRealList(data.message.list)
         }
         
           getdata();
         
       }, [])



    return(
      <>
      <Nav/>
      {context.user.length > 1?
        (<div className='mainnn'>
            <Forms realList={realList} setRealList={setRealList} taskList={taskList} setTaskList={setTaskList}/>

        <div className='main-container'>

            {realList.map((data)=>{
              // console.log(data);
              return <Lists key={data._id} draggingover={draggingover} dropped={dropped} draggingg={draggingg}  data={data} realList={realList} setRealList={setRealList}/>
            })}
          

        </div>
        </div>):(<>Please signin</>)
      }
        </>
    )
}



export default Home;