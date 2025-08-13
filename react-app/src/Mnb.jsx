import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Mnb extends React.Component {
    state = {
        mnbData: []
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
    
    componentDidMount() {
        // load MNB data
        this.loadMnbData();
    }

    render() {
        return <Container>
            <Row>
                <Col>
                    <p>MNB</p>
                </Col>    
            </Row>        
        </Container>
    }
}