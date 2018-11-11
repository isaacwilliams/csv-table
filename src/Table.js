import React, { Component } from 'react';
import { isIncluded } from './util';

const TableHeader = ({ header, excludeCols }) => (
    <tr>
        {header
            .filter(isIncluded(excludeCols))
            .map((value, i) => <th key={i}>{value}</th>)}
    </tr>
);

const TableRow = ({ row, header, excludeCols }) => (
    <tr>
        {row
            .filter((_, i) => isIncluded(excludeCols)(header[i]))
            .map((value, i) => <td key={i}>{value}</td>)}
    </tr>
);

class Table extends Component {
    render() {
        const { header, body, excludeCols } = this.props;

        return (
            <div className="csv-table">
                <table>
                    <tbody>
                        <TableHeader header={header} excludeCols={excludeCols} />
                        {body.map((row, i) => (
                            <TableRow key={i} row={row} header={header} excludeCols={excludeCols} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
