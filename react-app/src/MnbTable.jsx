import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';

export default class MnbTable extends React.Component {
    render() {
        return <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Currency</th>
                    <th>Unit</th>
                    <th>Rate</th>
                </tr>
            </thead>
            <tbody>
                {this.props.data.map(d=><tr key={d.id}>
                    <td>{d.id+1}</td>
                    <td>{d.currency}</td>
                    <td>{d.unit}</td>
                    <td>{d.value}</td>
                </tr>)}                                                                
            </tbody>
        </Table>
    }
}