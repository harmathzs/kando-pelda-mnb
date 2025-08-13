import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MnbTable from "./MnbTable";

export default class Mnb extends React.Component {
    state = {
        mnbXml: '',
        mnbData: [],
        rates: []
    }
    
    loadMnbData() {
        const endpoint = 'https://www.mnb.hu/arfolyamok.asmx';
        const reqBodyXml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.mnb.hu/webservices/"> <soapenv:Header/> <soapenv:Body> <web:GetCurrentExchangeRates/> </soapenv:Body></soapenv:Envelope>';
        fetch(endpoint, {
            method: 'POST',
            headers: {
                "Content-Type": 'text/xml; charset=utf-8', // SOAP
            },
            body: reqBodyXml,
            SOAPAction: "https://www.mnb.hu/webservices/GetCurrentExchangeRates",
            credentials: 'omit',
        })
        .then(res => {
            console.log(res);
            return res.text();
        })
        .then(xml=>{
            console.log(xml);
        })
        .catch(console.warn)
        .finally(()=>{});
    }

    loadMnbDataFromProxy() {
        fetch('/api/mnb', {method: 'POST'})
        .then(res=>{
            console.log(res);
            return res.text();
        })
        .then(xml=>{
            console.log(xml);
            this.setState({mnbXml: xml});

            // 1️⃣ Parse the outer SOAP XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xml, 'text/xml');

            // 2️⃣ Extract the inner escaped XML string
            const innerXmlText = xmlDoc.getElementsByTagName('GetCurrentExchangeRatesResult')[0]
                .textContent;

            // 3️⃣ Parse the inner XML into a DOM too
            const innerXmlDoc = parser.parseFromString(innerXmlText, 'text/xml');

            // 4️⃣ Extract <Rate> elements
            const rateNodes = innerXmlDoc.getElementsByTagName('Rate');

            // 5️⃣ Map them into JS objects
            const rates = Array.from(rateNodes).map((node, i) => ({
                id: i,
                currency: node.getAttribute('curr'),
                unit: Number(node.getAttribute('unit')),
                value: parseFloat(node.textContent.replace(',', '.')) // replace comma with dot
            }));

            console.log(rates); // ✅ Now you have usable JS objects!
            this.setState({rates: rates});
        })
        .catch(console.warn);
    }
    
    componentDidMount() {
        // load MNB data
        this.loadMnbDataFromProxy();
    }

    render() {
        return <Container>
            <Row>
                <Col>
                    {this.state.mnbXml.length>0 ? <MnbTable data={this.state.rates} /> : <p>'Loading MNB data...'</p>}
                </Col>    
            </Row>        
        </Container>
    }
}