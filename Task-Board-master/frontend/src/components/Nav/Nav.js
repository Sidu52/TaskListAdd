import './Nav.css';
import { useContext } from 'react';
import { AuthContext } from '../../authContext/AuthContext';
import { useNavigate , Redirect, Link} from 'react-router-dom';

function Nav(){
    let navigate = useNavigate();
    let context = useContext(AuthContext);

  function handleClick(e){
    context.logout();
    navigate('/signin');
    return;
  }

    return (
        <nav>
            <h3>Task Board</h3>
            {context.user.length > 1 ?
        (<button onClick={(e)=>handleClick()}>Log Out</button>):(<div className='link-signin'><Link to='/signin'>Sign In</Link></div>)

        }
        </nav>
    )
}

export default Nav;