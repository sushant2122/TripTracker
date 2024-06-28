import React from 'react'

import HomeScreen from '../screens/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpensesScreen from '../screens/TripExpensesScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SigninScreen from '../screens/SigninScreen';
import SignupScreen from '../screens/SignupScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../redux/Slices/user';

const Stack = createNativeStackNavigator();
function AppNavigation() {
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    onAuthStateChanged(auth, u => {
        console.log('got user:', u)
        dispatch(setUser(u));
    })

    if (user) {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
                    <Stack.Screen options={{ headerShown: false }} name="AddTrip" component={AddTripScreen} />
                    <Stack.Screen options={{ headerShown: false }} name="AddExpense" component={AddExpenseScreen} />
                    <Stack.Screen options={{ headerShown: false }} name="TripExpenses" component={TripExpensesScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        )

    }
    else {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Welcome">
                    <Stack.Screen options={{ headerShown: false }} name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="Signin" component={SigninScreen} />
                    <Stack.Screen options={{ headerShown: false, presentation: "modal" }} name="Signup" component={SignupScreen} />


                </Stack.Navigator>
            </NavigationContainer>
        )

    }

}

export default AppNavigation

