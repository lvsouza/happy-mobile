import React, { useCallback } from "react";
import { BorderlessButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

interface ICustomHeaderProps {
  title: string;
  showCancel?: boolean;
}
export const CustomHeader: React.FC<ICustomHeaderProps> = ({ title, showCancel = true }) => {
  const { goBack, navigate } = useNavigation();

  const handleNavigateToOrphanageMap = useCallback(() => {
    navigate('OrphanagesMap');
  }, []);

  return (
    <View style={styles.container}>
      <BorderlessButton onPress={goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>

      <Text style={styles.text}>{title}</Text>

      {showCancel &&
        <BorderlessButton onPress={handleNavigateToOrphanageMap} >
          <Feather name="x" size={24} color="#15b6d6" />
        </BorderlessButton>
      }

      {!showCancel && <View style={{ width: 24 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 44,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: '#dde3f0',
    backgroundColor: '#f9fafc',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
  }
});
