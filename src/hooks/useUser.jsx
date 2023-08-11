import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUser = () => useContext(UserContext);
