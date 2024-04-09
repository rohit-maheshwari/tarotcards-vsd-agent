import { Component } from 'react';
import { Page, Circle, View, Document, StyleSheet } from '@react-pdf/renderer';
import { tarotcards } from "../tarotcards";

const styles = StyleSheet.create({
    page: { padding: 60 },
    title: { marginTop: "90%" },
    emphasis: { fontFamily: 'Helvetica-Bold', color: '#F22300' },
    div: { display: "flex", flexDirection: 'row', gap: 10, marginTop: 10,  },
    breakable1: { width: '33%', height: 100, backgroundColor: 'green' },
    breakable2: { width: '33%', height: 100, backgroundColor: 'red' },
    breakable3: { width: '33%', height: 300, backgroundColor: 'blue' },
    circleWrap: {
      bottom: 30,
      left: 0,
      right: 0,
      display: "flex", 
      flexDirection: 'row', 
      justifyContent: 'center', 
      alignItems: 'center',
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

type ProgressBarPDFState = {

}

type ProgressBarPDFProps = {
    allCards: typeof tarotcards
    finishedCards: {[key: string]: boolean}
}

class ProgressBarPDF extends Component<ProgressBarPDFProps, ProgressBarPDFState> {
    constructor(props: ProgressBarPDFProps) {
        super(props);
    }

    handleDrawCircles = () : JSX.Element => {
        const circles: JSX.Element[] = [];
        console.log(this.props.finishedCards)
        for (let i: number = 0; i < this.props.allCards.length; i++) {
            const name = this.props.allCards[i].title;
            if (this.props.finishedCards[name]) {
                circles.push(<View style={{...styles.circle, backgroundColor: this.props.allCards[i].color}}/>);
            } else {
                circles.push(<View style={styles.circle}/>);
            }
        }

        
        return (
            <View>
                {circles.map((aCircle: JSX.Element, index: number) => {
                    console.log(aCircle);
                    return (aCircle);
                })}
            </View>
        )
    }

    
    render = (): JSX.Element => {
        return (
            this.handleDrawCircles()
        )
    };
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
                    <ProgressBarPDF allCards={this.props.allCards} finishedCards={this.props.finishedCards}/>
                </Page>
            </Document>

        )
    };
}

export default Doc;