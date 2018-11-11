import React, { Component } from 'react';
import parse from 'csv-parse';

import Table from './Table';
import Roller from './Roller';

const csvParser = (options = { cast: true }) => (input) => new Promise((resolve, reject) => {
    parse(input, options, (err, output) => {
        if (err) return reject(err);
        resolve(output);
    });
});

const fetchCsvData = async (url) => {
    const data = await fetch(url);
    const text = await data.text();
    const parsedData = await csvParser()(text);

    return parsedData;
}

const Loader = () => (
    <div className="loader">Loading...</div>
);

class App extends Component {
    state = { isLoading: true }

    componentDidMount() {
        const { url } = this.props;

        fetchCsvData(url).then((data) => this.setState({
            isLoading: false,
            header: data[0],
            body: data.slice(1),
        }));
    }

    render() {
        const { includeRoller, includeTable } = this.props;
        const { isLoading, header, body } = this.state;

        if (isLoading || !header || !body || body.length === 0) return <Loader />;

        return [
            includeRoller && (
                <Roller key="roller" {...this.props} header={header} body={body} />
            ),
            includeTable && (
                <Table key="table" {...this.props} header={header} body={body} />
            )
        ];
    }
}

export default App;
