import React, { useCallback, useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { Route, useNavigation, useRoute } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { LatLng } from 'react-native-maps';

import { OrphanagesService } from '../../services';

export const CreateOrphanage: React.FC = () => {
  const { params: { position } } = useRoute<Route<string, { position: LatLng }>>();
  const { navigate } = useNavigation();

  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [opening_hours, setOpeningHours] = useState('');
  const [instructions, setInstructions] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');

  const handleCreateOrphanage = useCallback(() => {

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('latitude', String(position?.latitude));
    data.append('longitude', String(position?.longitude));
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach((image, index) => {
      data.append('images', {
        name: `image_${index}.png`,
        type: 'image/png',
        uri: image,
      } as any);
    });

    OrphanagesService.createOrphanage(data).then(success => {
      if (success) {
        navigate('OrphanagesMap');
      } else {
        alert('Erro no cadastro!');
      }
    });

  }, [about, images, instructions, name, open_on_weekends, opening_hours, position]);

  const handleSelectImages = useCallback(async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert('Acesso negado!', 'Precisamos de permisão para acessar as suas fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    const { uri } = result;

    setImages(oldImages => [...oldImages, uri]);
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        style={styles.input}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        multiline
        value={about}
        onChangeText={setAbout}
        style={[styles.input, { height: 110 }]}
      />

      {/* 
      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        value={name}
        onChangeText={set }
        style={styles.input}
      /> */}

      <Text style={styles.label}>Fotos</Text>

      <ScrollView horizontal style={styles.uploadedImageContainer}>
        {images.map((imageUrl, index) => (
          <Image
            key={index}
            source={{ uri: imageUrl }}
            style={styles.uploadedImage}
          />
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        multiline
        value={instructions}
        onChangeText={setInstructions}
        style={[styles.input, { height: 110 }]}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpeningHours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch
          thumbColor="#fff"
          value={open_on_weekends}
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          onValueChange={value => setOpenOnWeekends(value)}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleCreateOrphanage}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },
  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },
  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },
  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  },
  uploadedImageContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  uploadedImage: {
    width: 64,
    height: 64,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 20,
  }
});
