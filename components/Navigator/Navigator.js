import React, { useContext } from 'react';
import { View } from 'react-native';

// Front Page
import Register from '../../Screens/frontpage/Register';
import Login from '../../Screens/frontpage/Login';
// import Login from '../../Screens/frontpage/Login_copy';
// import Landing from '../../Screens/frontpage/Landing';

// Tab
import Home from '../../Screens/tab/Home';
import QuarantinePlace from '../../Screens/tab/QuarantinePlace';
import Verify from '../../Screens/tab/Verify';
import Profile from '../../Screens/tab/Profile';
import ChangePassword from '../../Screens/tab/ChangePassword';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// icon
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// globalContext
import { Context, Provider } from '../globalContext/globalContext';

// task
import RootScreen from '../task/RootScreen';

const navOptionHandler = () => ({
    headerShown: false
})

const StackApp = createStackNavigator();

const ProfileStack = createStackNavigator();
function ProfileNavigator() {
    return (
        <ProfileStack.Navigator initialRouteName="Profile">
            <ProfileStack.Screen name="Profile" component={Profile} options={navOptionHandler} />
            <ProfileStack.Screen name="ChangePassword" component={ChangePassword} />
        </ProfileStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();
function AppTab() {
    return (
        <>
            <RootScreen />
            <Tab.Navigator
                initialRouteName="Home"
                backBehavior="none"
                tabBarOptions={{
                    keyboardHidesTabBar: true
                }}
            >
                <Tab.Screen name="Home" component={Home} options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="human-greeting" color={color} size={size} />),
                }} />
                <Tab.Screen name="Place" component={QuarantinePlace} options={{
                    tabBarLabel: 'Place',
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="hospital-building" color={color} size={size} />),
                }} />
                <Tab.Screen name="Verify" component={Verify} options={{
                    tabBarLabel: 'Verify',
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="alarm-check" color={color} size={size} />),
                }} />
                <Tab.Screen name="Profile" component={ProfileNavigator} options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (<MaterialCommunityIcons name="clipboard-text-multiple-outline" color={color} size={size} />),
                }} />
            </Tab.Navigator>
        </>
    )
}

export default function Navigator() {
    const globalContext = useContext(Context)
    const { isLoggedIn, userObj } = globalContext;

    return (
        <StackApp.Navigator initialRouteName="Login">
            {(!isLoggedIn || !userObj) ?
                <>
                    {/* <StackApp.Screen name="Landing" component={Landing} options={navOptionHandler} /> */}
                    <StackApp.Screen name="Login" component={Login} options={navOptionHandler} />
                    <StackApp.Screen name="Register" component={Register} />
                </>
                :
                <StackApp.Screen name="Tab" component={AppTab} options={navOptionHandler} />
            }
        </StackApp.Navigator>
    )
}