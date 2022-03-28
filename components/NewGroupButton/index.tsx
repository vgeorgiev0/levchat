import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { BLACK, RED } from '../../constants/Colors';

type Props = {};

const NewGroupButton = (props: Props) => {
  return (
    <TouchableOpacity>
      <View style={styles.row}>
        <FontAwesome name="group" size={24} color={RED} />
        <Text style={styles.text}>New Group</Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewGroupButton;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: BLACK,
  },
});
