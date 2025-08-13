import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from 'react-bootstrap/Table';

export default class MnbTable extends React.Component {
    render() {
        <Table striped bordered hover variant="dark">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Currency</th>
                    <th>Unit</th>
                    <th>Rate</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        {this.props.data.length}
                    </td>
                    <td>
                        {this.props.data.length}
                    </td>
                    <td>
                        {this.props.data.length}
                    </td>
                    <td>
                        {this.props.data.length}
                    </td>                                                            
                </tr>        
            </tbody>
        </Table>
    }
}