// import React, { useContext, useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { Context } from '../../components/globalContext/globalContext';

// import containers from '../../components/styles/containers';
// import fonts from '../../components/styles/fonts';
// import buttons from '../../components/styles/buttons';
// import margins from '../../components/styles/margins';

// function Landing({ navigation, route, props }) {
//     const globalContext = useContext(Context)
//     const {
//         isLoggedIn, setIsLoggedIn,
//         userObj, setUserObj,
//         setToken, getToken } = globalContext;

//     useEffect(() => {
//         getToken()
//             .then(data => {
//                 fetch('http://192.168.175.50:8000/api/check/', {
//                     method: 'GET',
//                     headers: {
//                         'Accept': 'application/json',
//                         'Content-Type': 'application/json',
//                         'Authorization': 'Token ' + data
//                     }
//                 })

//                     .then(res => {
//                         if (res.ok) {
//                             return res.json()
//                         } else {
//                             // setError("Invalid Credentials")
//                             throw res.json()
//                         }
//                     })
//                     .then(json => {
//                         console.log(json)
//                         // console.log('status ' + json.status)
//                         if (json.status === "success") {
//                             setUserObj(json)
//                             setIsLoggedIn(true)
//                             navigation.replace('Tab')
//                         }
//                         else{
//                             console.log('Invalid Credential')
//                             navigation.navigate('Login')
//                         }
//                     })
//             })
//             .catch(error => {
//                 console.log("ERROR " + error)
//             })
//     })
//     return (
//         <View>
//             {/* <Text style={fonts(appSettings).h1}>Hello User!</Text>
//             <Text style={fonts(appSettings).p}>You are {(isLoggedIn) ? '' : "Not "}logged in</Text>
//             <TouchableOpacity style={buttons(appSettings).login} onPress={() => navigation.navigate("Login")}>
//                 <Text>Login</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={[buttons(appSettings).login, margins.topTenPercent]} onPress={() => navigation.navigate("Register")}>
//                 <Text>Register</Text>
//             </TouchableOpacity> */}
//         </View>
//     )



// }

// export default Landing;