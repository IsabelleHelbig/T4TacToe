import React, { useEffect } from 'react';
import {  
    Image,
    StyleSheet,
    TouchableWithoutFeedback,} 
from 'react-native';
import SplashScreen from 'react-native-splash-screen'; 

export default function LandingScreen({navigation} : any) : React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <TouchableWithoutFeedback 
        style={styles.container} 
        onPress={() => navigation.navigate('Home')}>
        <Image 
            source={require('../../assets/LandingImage.png')}
            style={styles.image}
            resizeMode="cover"  />
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      image: {
        flex: 1,
        width: '100%',
        height: '100%',
      },
    }
);