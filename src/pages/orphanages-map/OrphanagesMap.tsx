import React, { useCallback } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import { Images } from './../../images';

export const OrphanagesMap: React.FC = () => {
  const { navigate } = useNavigation();

  const handleNavigateToOrphanageDetails = useCallback(() => {
    navigate('OrphanagesDetails');
  }, []);

  const handleNavigateToCreateOrphanage = useCallback(() => {
    navigate('SelectMapPosition');
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
          latitude: -29.6760828,
          longitude: -51.0845638,
        }}
      >
        <Marker
          icon={Images.mapMarker}
          calloutAnchor={{ x: 2.7, y: 0.8 }}
          coordinate={{ latitude: -29.6760828, longitude: -51.0845638 }}
        >
          <Callout tooltip onPress={handleNavigateToOrphanageDetails}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>Lar de testes</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>2 orfanatos encontrados</Text>

        <RectButton style={styles.createOrphanageButton} onPress={handleNavigateToCreateOrphanage}>
          <Feather name="plus" color="white" size={20} />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    borderRadius: 16,
    paddingHorizontal: 16,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  calloutText: {
    fontSize: 14,
    color: '#0089a5',
    fontFamily: 'Nunito_700Bold',
  },
  createOrphanageButton: {
    width: 56,
    height: 56,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15c3d6'
  },
  footer: {
    left: 24,
    right: 24,
    bottom: 32,
    height: 56,
    elevation: 3,
    paddingLeft: 24,
    borderRadius: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },
});
