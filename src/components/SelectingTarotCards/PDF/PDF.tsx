import React, { Component } from 'react';
import ProgressBar from '../../ProgressBar/ProgressBar';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 60 },
    title: { marginTop: "90%" },
    emphasis: { fontFamily: 'Helvetica-Bold', color: '#F22300' },
    div: { display: "flex", flexDirection: 'row', gap: 10, marginTop: 10, },
    breakable1: { width: '33%', height: 100, backgroundColor: 'green' },
    breakable2: { width: '33%', height: 100, backgroundColor: 'red' },
    breakable3: { width: '33%', height: 300, backgroundColor: 'blue' },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
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
                    <View style={styles.div}>
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
                    </View>
                    <Text style={styles.pageNumber}><ProgressBar allCards={this.props.allCards} finishedCards={this.props.finishedCards} /></Text>
                </Page>
            </Document>
        )
    };
}

export default Doc;