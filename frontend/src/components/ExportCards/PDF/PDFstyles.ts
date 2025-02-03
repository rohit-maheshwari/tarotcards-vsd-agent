import { Font, StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create(
  {
    page: {
      padding: 60,
      flexDirection: 'column',
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center'
    },
    description: {
      fontSize: 11,
      top: -3,
      marginBottom: 10,
    },
    takeaways: {
      fontSize: 9,
      top: -3,
      marginBottom: 10,
    },
    card: {
      flexDirection: 'row',
      marginBottom: 10,
    },
    imageContainer: {
      width: '25%',
      marginRight: 10,
    },
    image: {
      width: '100%',
      height: 'auto',
    },
    textContainer: {
      flexDirection: 'column',
      width: '70%',
    },
    question: {
      fontSize: 15,
      marginBottom: 5,
    },
    response: {
      fontSize: 11,
      marginTop: 5,
    },
  }
);