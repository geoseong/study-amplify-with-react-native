import { Colors } from 'react-native/Libraries/NewAppScreen';
import { StyleSheet } from 'react-native';

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
    marginVertical: 10,
    marginHorizontal: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.white,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
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
  chooseImgBtn: {
    fontSize: 20,
    color: 'red',
    borderRadius: 10,
    padding: 5,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  screenTopLine: {
    padding: 10,
    backgroundColor: '#FFC46D',
  },
  flex: {
    flex: 1,
  },
  flexRow: {
    // flex: 1,
    flexDirection: 'row',
  },
  flexColumn: {
    // flex: 1,
    flexDirection: 'column',
  },
  contentCenter: {
    justifyContent: 'center',
  },
  contentBetweenAlignCenter: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentCenterAlignCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  alignStretch: {
    alignItems: 'stretch',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  topLeftFix: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  topRightFix: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  fontBold: { fontWeight: 'bold' },
  bottomFix: {
    position: 'absolute',
    bottom: 10,
    left: 0,
  },
  p1: {
    padding: 5,
  },
  pl1: {
    paddingLeft: 5,
  },
  pr1: {
    paddingRight: 5,
  },
  pt1: {
    paddingTop: 5,
  },
  pb1: {
    paddingBottom: 5,
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
