import { Component } from 'react';
import { Page, Circle, View, Document, StyleSheet } from '@react-pdf/renderer';
import { tarotcards } from "../tarotcards";

const styles = StyleSheet.create({
    page: { padding: 60 },
    title: { marginTop: "90%" },
    div: { display: "flex", flexDirection: 'row', gap: 10, marginTop: 10,  },
    circleWrap: {
        flexDirection: 'row'
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: '#ccc',
        flexDirection: 'row',
        margin: 25,
        justifyContent: 'center',
        alignItems: 'center',
      },
});

type TarotCardType = {
    title: string,
    image: string,
    questions: string[],
    color: string
}

type DocState = {

}

type DocProps = {
    allCards: TarotCardType[],
    finishedCards: {[key: string]: boolean}
}

class Doc extends Component<DocProps, DocState> {

    constructor(props: DocProps) {
        super(props);
    
        this.state = {}
    }

    render = (): JSX.Element  => {
        return (
            <Document>
                <Page style={styles.page} size="A4" wrap>
                    {/* <View style={styles.div}>
                        <View style={styles.breakable1} wrap={false} />
                        <View style={styles.breakable2} wrap={false} />
                        <View style={styles.breakable3} wrap={false} />
                    </View>
                    <View style={styles.div}>
                        <View style={styles.breakable1} wrap={false} />
                        <View style={styles.breakable2} wrap={false} />
                        <View style={styles.breakable3} wrap={false} />
                    </View>
                    <View style={styles.div}>
                        <View style={styles.breakable1} wrap={false} />
                        <View style={styles.breakable2} wrap={false} />
                        <View style={styles.breakable3} wrap={false} />
                    </View> */}
                </Page>
            </Document>
        )
    };
}

export default Doc;