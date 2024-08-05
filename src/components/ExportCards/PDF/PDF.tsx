import { Component } from 'react';
import { Page, Text, View, Document, Image, Line, Svg } from '@react-pdf/renderer';
import { styles } from "./PDFstyles";

type DocState = {

}

type DocProps = {
    title: string,
    description: string,
    finalCards: any[]
}

class Doc extends Component<DocProps, DocState> {

    constructor(props: DocProps) {
        super(props);
    
        this.state = { }
        console.log(this.props.finalCards)
    }
    

    render = (): JSX.Element  => {

        return (
            <Document>
                <Page style={styles.page} size="A4" wrap>
                    <View>
                        <Text style={styles.title}>{this.props.title}</Text>
                        <Svg height="20" width="475"><Line x1={0} x2={475} y1={0} y2={0} strokeWidth={2} stroke="rgb(0, 0, 0)"/></Svg>
                        <Text style={styles.description}>{this.props.description}</Text>
                        <Svg height="20" width="475"><Line x1={0} x2={475} y1={0} y2={0} strokeWidth={2} stroke="rgb(0, 0, 0)"/></Svg>
                        {this.props.finalCards.map((card: any, index: number) => {
                            return (
                                <View key={index} style={styles.card}>
                                    <View style={styles.imageContainer}>
                                        <Image src={card.image} style={styles.image}/>
                                    </View>
                                    <View style={styles.textContainer} wrap={false}>
                                        <Text style={styles.question}>{card.questions[0]}</Text>
                                        <Text style={styles.response}>{card.response}</Text>
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