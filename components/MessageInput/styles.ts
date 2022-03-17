import { StyleSheet } from 'react-native';
import { RED } from '../../constants/Colors';

const styles = StyleSheet.create({
  root: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  inputContainer: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#dedede',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 5,
  },
  sendContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
  },
  progressContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
  },
  progress: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#3777f0',
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
  },
  icon: {
    marginHorizontal: 5,
  },
  buttonContainer: {
    width: 40,
    height: 40,
    backgroundColor: RED,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 35,
  },
});

export default styles;
