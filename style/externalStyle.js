import { StyleSheet} from 'react-native'

const externalStyles = StyleSheet.create({
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center', 
  },
  img: {
    width: '120%', 
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginTop: -25,
    marginBottom: 30,
  },
  highlight: {
    color: '#00A8E8',
  },
  button: {
    backgroundColor: '#00A8E8', 
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  big: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  para: {
    color: '#717070',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 26,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeCircle: {
    backgroundColor: '#00A8E8',
  },
  inactiveCircle: {
    backgroundColor: '#B0B0B0',
  },
});

export default externalStyles;

