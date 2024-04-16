import { Component } from 'react';
import { Page, Text, View, Document, Image, Line, Svg } from '@react-pdf/renderer';
import { tarotcards } from "../tarotcards";
import { styles } from "./PDFstyles";

const image = require('../../../images/FrontTarotCards/Scandal.png')

type TarotCardType = {
    title: string,
    image: string,
    questions: string[],
    color: string
}

type DocState = {
    finished: TarotCardType[]
}

type DocProps = {
    allCards: TarotCardType[],
    finishedCards: {[key: string]: boolean},
    responses: {[key: string]: string}
}

class Doc extends Component<DocProps, DocState> {

    constructor(props: DocProps) {
        super(props);
    
        this.state = { finished: [] }
    }

    render = (): JSX.Element  => {
        let f = []
        for (let key of Object.keys(this.props.finishedCards).filter(key => this.props.finishedCards[key])) {
            console.log(key)
            for (let card of tarotcards) {
                if (key === card.title) {
                    f.push(card);
                    break;
                }
            }
        }
        const orderMap = new Map(tarotcards.map((item, index) => [item.title, index]));

        f.sort((a, b) => {
            return (orderMap.get(a.title) || 0) - (orderMap.get(b.title) || 0);
          });

        return (
            <Document>
                <Page style={styles.page} size="A4" wrap>
                    <View>
                        <Text style={styles.title}>Project Title</Text>
                        <Svg height="20" width="475"><Line x1={0} x2={475} y1={0} y2={0} strokeWidth={2} stroke="rgb(0, 0, 0)"/></Svg>
                        {f.map((card: TarotCardType, index: number) => {
                            return (
                                <View key={index} style={styles.card}>
                                    <View style={styles.imageContainer}>
                                        <Image src={card.image} style={styles.image}/>
                                    </View>
                                    <View style={styles.textContainer} wrap={false}>
                                        <Text style={styles.question}>{card.questions[0]}</Text>
                                        <Text style={styles.response}>{this.props.responses[card.title]}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                </Page>
            </Document>

        )
    };
}

export default Doc;