import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { OrphanagesMap, OrphanagesDetails, SelectMapPosition, CreateOrphanage } from './pages';
import { CustomHeader } from './components';

const { Navigator, Screen } = createStackNavigator();

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#f2f3f5' } }}>
        <Screen
          name="OrphanagesMap"
          component={OrphanagesMap}
        />

        <Screen
          name="CreateOrphanage"
          component={CreateOrphanage}
          options={{
            headerShown: true,
            header: () => <CustomHeader title="Informe os dados" />
          }}
        />

        <Screen
          name="SelectMapPosition"
          component={SelectMapPosition}
          options={{
            headerShown: true,
            header: () => <CustomHeader title="Selecione no mapa" showCancel={false} />
          }}
        />

        <Screen
          name="OrphanagesDetails"
          component={OrphanagesDetails}
          options={{
            headerShown: true,
            header: () => <CustomHeader title="Orfanato" />
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}
