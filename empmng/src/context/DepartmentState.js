import React from 'react'
import { createContext ,useState } from "react";

const departmentContext = createContext();


const DepartmentState = (props) => {
    const [department, setDepartment] = useState([
        {
          id: 1,
          name: 'Sales',
        },
        {
          id: 2,
          name: 'Data Entry',
        },
        {
          id: 3,
          name: 'Human Resource',
        },
        {
          id: 4,
          name: 'SoftWare Development',
        },
        {
          id: 5,
          name: 'Software Tester',
        },
      ]);
    return (
        <departmentContext.Provider value={{department , setDepartment}}>
         {props.children}
        </departmentContext.Provider>
      )
}

export {departmentContext}

export default DepartmentState