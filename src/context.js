import  { createContext } from 'react';
// import { taskReducer } from './taskReducer';
export const TaskContext = createContext();



// export const TaskContextProvider = (props) => {
  
//   return (
//     <TaskContext.Provider value={{tasks, dispatch}}>
//       {props.children}
//     </TaskContext.Provider>
//   );
// }