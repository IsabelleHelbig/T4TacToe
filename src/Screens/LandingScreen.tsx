import React, { useEffect } from 'react';
import { 
    TouchableOpacity, 
    Image} 
from 'react-native';
import SplashScreen from 'react-native-splash-screen'; 

export default function LandingScreen({navigation} : any) : React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../assets/tictactoe.png')} />
    </TouchableOpacity>
  );
};
