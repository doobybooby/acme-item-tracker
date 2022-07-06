import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteThing, addRank, subtractRank })=> {
  things.sort((a,b)=> b.ranking - a.ranking )
  return (
    <div>
      <h1>Things</h1>
      <ol>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name }
                <p>RANKING: { thing.ranking }</p>
                <button onClick={()=> addRank(thing)}>+</button>
                <button onClick={()=> subtractRank(thing)}>-</button>
                <button onClick={()=> deleteThing(thing.id)}>DELETE</button>
              </li>
            );
          })
        }
      </ol>
      <ThingForm />
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    deleteThing: async(id)=> {
      await axios.delete(`/api/things/${id}`);
      dispatch({ type: 'DELETE_THING', id });
    },

    addRank: (thing)=> {
      dispatch({type: 'ADD_RANK', thing})
    },
    
    subtractRank: (thing)=> {
      dispatch({type: 'SUBTRACT_RANK', thing})
    }
  };
}

export default connect(
  (state)=> {
    return {
      things: state.things
    }
  },
  mapDispatchToProps
)(Things);
