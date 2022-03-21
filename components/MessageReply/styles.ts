import { StyleSheet } from 'react-native';
import { BLACK, CHATBLUE } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  row: { flexDirection: 'row', alignItems: 'flex-end' },
  messageReply: {
    color: `${BLACK}6a`,
    padding: 5,
    borderRadius: 5,
  },
  containerLeft: {
    backgroundColor: CHATBLUE,
    marginLeft: 10,
    marginRight: 'auto',
  },
  containerRight: {
    backgroundColor: 'lightgrey',
    marginLeft: 'auto',
    alignItems: 'flex-end',
    marginRight: 10,
  },
});
export default styles;
