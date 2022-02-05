import React, { useState, useEffect, useRef, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext()
const Provider = ({ children }) => {
    const [domain] = useState("http://192.168.202.50:8000/api/")
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [userObj, setUserObj] = useState()
    const [appSettings, setAppSettings] = useState({})

    const setToken = async (token) => {
        try {
            await AsyncStorage.setItem('@token', token)
            // console.log('Set Token')
        } catch (error) {
            console.log(error)
        }
    }
    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@token')
            if (value !== null) {
                // console.log('get Token '+value)
                return value
            }
        } catch (error) {
            console.log(error)
        }
    }
    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('@token')
        } catch (error) {
            console.log(error)
        }
        // console.log('Remove Token from @token storage')
    }

    const globalContext = {
        domain,
        isLoggedIn,
        setIsLoggedIn,
        appSettings,
        setAppSettings,
        userObj,
        setUserObj,
        setToken,
        getToken,
        removeToken
    }
    return <Context.Provider value={globalContext}>{children}</Context.Provider>
}

export { Context, Provider }