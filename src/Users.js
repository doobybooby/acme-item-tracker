import React from 'react';
import UserForm from './UserForm'
import { connect } from 'react-redux';
import axios from 'axios'

const Users = ({ users, deleteUser })=> {
  console.log(users)
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
                <button onClick={()=> deleteUser(user.id)}>DELETE</button>
              </li>
            );
          })
        }
      </ul>
      <UserForm />
    </div>
  );
}

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteUser: async(id)=> {
      await axios.delete(`/api/users/${id}`);
      dispatch({ type: 'DELETE_USER', id });
    }
  };
}

export default connect(
  (state)=> {
    return {
      users: state.users
    }
  },
  mapDispatchToProps
)(Users);
