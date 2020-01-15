import {Colors} from 'react-native/Libraries/NewAppScreen';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  contentBetweenAlignCenter:{
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  pl1: {
    paddingLeft: 5,
  },
  pr1: {
    paddingRight: 5,
  },
  w20: {
    width: '20%',
  },
  w30: {
    width: '30%',
  },
  w50: {
    width: '50%',
  },
  w70: {
    width: '70%',
  },
  w80: {
    width: '80%',
  },
  w90: {
    width: '90%',
  },
  w100: {
    width: '100%',
  },
});

export default styles;
