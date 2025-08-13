import React from "react";

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
                {this.props.data}
            </tbody>
        </Table>
    }
}