import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OrphanagesMap, OrphanagesDetails } from './pages';

const { Navigator, Screen } = createStackNavigator();

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="OrphanagesMap" component={OrphanagesMap} />
        <Screen name="OrphanagesDetails" component={OrphanagesDetails} />
      </Navigator>
    </NavigationContainer>
  );
}
