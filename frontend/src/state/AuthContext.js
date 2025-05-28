import React, { createContext, useReducer } from 'react';
import AuthReducer from './AuthReducer';

//最初のユーザー状態を定義
const initialState = {
    // user: null,
    user: {
        _id:"680ca50b2b763af9630443ee",
        username: "Kannazuki3410",
        email: "abcdef@gmail.com",
        password: "abcdef",
        profilePicture: "/person/1.jpeg",
        coverPicture: "",
        followers: [],
        followings: [],
        isAdmin: false,
    },
    isFetching: false,
    error: false,
};

//状態をグローバルに管理
export const AuthContext = createContext(initialState);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    return <AuthContext.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
    }}>
        {children}
    </AuthContext.Provider>
};