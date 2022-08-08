import './App.css';

import { UseState } from './UseState.js'
// import { ClassState } from './ClassState.js'
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseState name='Use state'/>
      {/* <ClassState name='Class state'/> */}
      <UseReducer name='Use Reducer'/>
    </div>
  );
}

export default App;
