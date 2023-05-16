import Tasks from '../Tasks/Tasks';
import './Lists.css';


function Lists({data, realList, setRealList, draggingg,draggingover, dropped }){
    return(
        <div onDragOver={(e)=>draggingover(e,data._id)} onDrop={(e)=>dropped(e, data._id)} key={data._id} className='list-container'>
            <h3>{data.tasklistname}</h3>
            <div className='main-task-container'>
                {data.tasklist.map((info)=>{
                    return<Tasks key={info._id} draggingg={draggingg} task={info} realList={realList} setRealList={setRealList}/>
                })}
            </div>
        </div>
    )
}


export default Lists;