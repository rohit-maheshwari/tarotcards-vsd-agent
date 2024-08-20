import React, { useState, Component } from 'react';
import { Page, Text, View, Document, Image, Line, Svg, PDFViewerProps, pdf } from '@react-pdf/renderer';
import './ExportCards.css';
import ProgressBar from '../NewProgressBar/ProgressBar';
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Doc from './PDF/PDF';
import Projects from '../Projects/Projects';
import Landing from '../Landing/Landing';

type CustomPDFViewerProps = {
    pdfData: string
}

type ExportCardsProps = {
    finalCards: any[],
    returnToPrevPage: () => void,
    returnToHomePage: () => void,
    user: any
    projectId: number | null;
}

type ExportCardsState = {
    title: string,
    description: string,
    takeaways: string,
    homePage: boolean
}

class ExportCards extends Component<ExportCardsProps, ExportCardsState> {
    constructor(props: ExportCardsProps) {
        super(props);

        this.state = { title: '', description: '', takeaways: '', homePage: false }
    }

    componentDidMount(): void {
        fetch('/api/project/get?projectId='+this.props.projectId, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        .then((data) => {
            this.setState({ title: data.title, description: data.description, takeaways: data.takeaways })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
            <div className='export-cards-body'>
                <ProgressBar step={4} />
                <div className='export-cards-header'>
                    <h1>Preview the Final Report</h1>
                    <h3>Here you can preview your pdf. If there is something you want to edit or change, you can also return to the previous page. This report can be used for ...</h3>
                </div>
                <div className='export-cards-pdf-container'>
                    <PDFViewer width='80%' height={600} showToolbar={false}>
                        <Doc title={this.state.title} description={this.state.description} takeaways={this.state.takeaways} finalCards={this.props.finalCards}/>
                    </PDFViewer>
                    <PDFDownloadLink className="export-cards-pdf-download" document={<Doc title={this.state.title} description={this.state.description} takeaways={this.state.takeaways} finalCards={this.props.finalCards}/>} fileName="tarotcards.pdf">
                        {({ blob, url, loading, error }) =>
                        loading ? 'Loading document...' : 'DOWNLOAD PDF'
                        }
                    </PDFDownloadLink>
                </div>
                <div className="export-cards-buttons">
                    <button onClick={() => this.props.returnToPrevPage()}>Back</button>
                    <button onClick={() => this.props.returnToHomePage()}>Home</button>
                </div>
            </div>
        )
    }
}

export default ExportCards;