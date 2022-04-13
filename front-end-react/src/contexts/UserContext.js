import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const values = { user, setUser };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
}

export default UserContextProvider;
