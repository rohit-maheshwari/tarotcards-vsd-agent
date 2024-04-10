import { Component } from 'react';
import { Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { tarotcards } from "../tarotcards";

const image = require('../../../images/FrontTarotCards/Scandal.png')

const styles = StyleSheet.create({
    page: {
      padding: 60,
      flexDirection: 'column',
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },
    imageContainer: {
      width: '30%',
      marginRight: 10,
    },
    image: {
      width: '100%',
      height: 'auto',
    },
    textContainer: {
      flexDirection: 'column',
      width: '80%',
      justifyContent: 'center',
    },
    question: {
      fontSize: 12,
      marginBottom: 5,
    },
    response: {
      fontSize: 12,
      marginTop: 5,
    },
});

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