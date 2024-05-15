import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Splash from '../AUTH/screens/Splash';
import SignIn from '../AUTH/screens/SignIn';
import SignUp from '../AUTH/screens/SignUp';
import ForgotPass from '../AUTH/screens/ForgotPass';
import ResetPass from '../AUTH/screens/ResetPass';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPass" component={ForgotPass} />
        <Stack.Screen name="ResetPass" component={ResetPass} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
