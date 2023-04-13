import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Stacks from './src/navigators/Stacks';
import store from './src/stores';


export default function App() {
  return (
    <Provider store={store} >   
     <NavigationContainer> 
        <Stacks/>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
