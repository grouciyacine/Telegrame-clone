import React, { useReducer } from 'react'
import { useContext } from 'react'
import { createContext } from 'react'
export const stateContext=createContext()
export const StateProvider = ({reducer,initialState,children}) => (
<stateContext.Provider value={useReducer(reducer,initialState)}> 
{children}
</stateContext.Provider> 
)
export const useStateValue=()=>useContext(stateContext)
