import { StyleSheet } from 'react-native';

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
  audioProgressBG: {
    height: 3,
    flex: 1,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    marginHorizontal: 20,
  },
  audioProgressFG: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: '#3777f0',
    top: -6,
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
    backgroundColor: '#3777f0',
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
