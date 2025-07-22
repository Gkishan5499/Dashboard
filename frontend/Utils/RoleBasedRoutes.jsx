import React from 'react'
import { useAuth } from '../src/context/AppContext'
import { Navigate } from 'react-router-dom';

const RoleBasedRoutes = ({children, roleRequired}) => {
      const {user, loading} = useAuth();
      
      if (loading) return <div>Loading...</div>

      if(!roleRequired.includes(user.role)){
        <Navigate to="unauthorize"/>
      }


      return user ? children : <Navigate to = "/login" />
 
}

export default RoleBasedRoutes