import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  sendContainer: {
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 10,
    backgroundColor: 'white',
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
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#3777f0',
    position: 'absolute',
    top: -3,
  },
  progress: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#3777f0',
  },
});

export default styles;
