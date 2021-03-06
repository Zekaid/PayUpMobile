import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./Home.js";
import Assign from "./Assign.js";
import Calculate from "./Calculate.js";

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Home"
                    component={Home}
                />
                <Stack.Screen name="Assign" component={Assign} />
                <Stack.Screen name="Calculate" component={Calculate} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;