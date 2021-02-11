import React, { useCallback } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import { Images } from '../../images';

export const SelectMapPosition: React.FC = () => {
  const { navigate } = useNavigation();

  const handleNextStep = useCallback(() => {
    navigate('CreateOrphanage');
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          latitude: -29.6760828,
          longitude: -51.0845638,
        }}
        style={styles.mapStyle}
      >
        <Marker
          icon={Images.mapMarker}
          coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }}
        />
      </MapView>

      <RectButton style={styles.nextButton} onPress={handleNextStep}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </RectButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative'
  },

  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,

    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 40,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})
