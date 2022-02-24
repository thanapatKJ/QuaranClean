import React, { useState, useEffect, useRef, createContext } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Context = createContext()
const Provider = ({ children }) => {
    const [domain] = useState("http://192.168.90.50:8000/api/")
    // const [domainImage] = useState("http://192.168.90.50:8000/database/user_images/")
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [userObj, setUserObj] = useState()
    const [appSettings, setAppSettings] = useState({})
    const [name, _name] = useState()
    const [lat, _lat] = useState()
    const [long, _long] = useState()
    const [radius, _radius] = useState()
    const [status, _status] = useState()
    const [regName, _regName] = useState()
    const [regLastname, _regLastname] = useState()
    const [regIDcard, _regIDcard] = useState()
    const [regNumber, _regNumber] = useState()
    const [regPassword, _regPassword] = useState()
    const [regCpassword, _regCpassword] = useState()
    const [regEmail, _regEmail] = useState()
    const [regImg, _regImg] = useState(require('../../assets/images/portrait.png'))

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
    }
    

    const setStatus = async (status) => {
        try {
            await AsyncStorage.setItem('@status', String(status))
        } catch (error) {
            console.log(error)
        }
    }
    const getStatus = async () => {
        try {
            const value = await AsyncStorage.getItem('@status')
            // console.log('inside value '+value)
            if (value !== null && value!=='false') {
                // console.log('!====')
                return true
            }
            else{
                // console.log('=====')
                return false
            }
        } catch (error) {
            console.log('something happen')
            console.log(error)
        }
    }
    const removeStatus = async () => {
        try {
            await AsyncStorage.removeItem('@status')
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const setLocation = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@location', jsonValue)
        } catch (error) {
            console.log(error)
        }
    }
    const getLocation = async () => {
        try {
            const value = await AsyncStorage.getItem('@location')
            if (value !== null) {
                // console.log('get Token '+value)
                return JSON.parse(value)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const removeLocation = async () => {
        try {
            await AsyncStorage.removeItem('@location')
        } catch (error) {
            console.log(error)
        }
    }

    const globalContext = {
        domain,
        // domainImage,
        isLoggedIn, setIsLoggedIn,
        appSettings, setAppSettings,
        userObj, setUserObj,
        setToken,
        getToken,
        removeToken,
        status, _status,
        name, _name,
        lat, _lat,
        long, _long,
        radius, _radius,
        regName, _regName,
        regLastname, _regLastname,
        regIDcard, _regIDcard,
        regNumber, _regNumber,
        regPassword, _regPassword,
        regCpassword, _regCpassword,
        regEmail, _regEmail,
        regImg, _regImg,

        getStatus, setStatus, removeStatus,
        getLocation, setLocation, removeLocation,
    }
    return <Context.Provider value={globalContext}>{children}</Context.Provider>
}

export { Context, Provider }