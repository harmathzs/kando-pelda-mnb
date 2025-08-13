import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class Mnb extends React.Component {
    state = {
        mnbXml: '',
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
                    <p>
                        {this.state.mnbXml.length>0 ? this.state.mnbXml : 'MNB'}
                    </p>
                </Col>    
            </Row>        
        </Container>
    }
}