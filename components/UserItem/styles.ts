import { StyleSheet } from 'react-native';
import { BLACK, RED, WHITE } from '../../constants/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
  },
  rightContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  badgeContainer: {
    backgroundColor: RED,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 45,
    top: 10,
  },
  badge: { color: 'white', fontSize: 12 },
  image: {
    backgroundColor: WHITE,
    height: 50,
    width: 50,
    borderRadius: 50,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 3,
  },
  text: {
    color: 'grey',
  },
});
export default styles;
