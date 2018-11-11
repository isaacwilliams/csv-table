import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

const renderTableTo = document.querySelectorAll('[data-csv-url]')

renderTableTo.forEach((node) => {
    const url = node.dataset.csvUrl;
    const includeTable = node.dataset.csvTable === "true";
    const includeRoller = node.dataset.csvRoller === "true";
    const excludeCols = node.dataset.csvExclude && node.dataset.csvExclude.split(',').map(val => val.trim());
    const rollerType = node.dataset.csvRollerType || "linked";
    const rollerDice = node.dataset.csvRollerDice;
    const rollerButtonTitle = node.dataset.csvRollerButton;
    const rollerMaxResults = node.dataset.csvRollerMaxResults && parseInt(node.dataset.csvRollerMaxResults);

    ReactDOM.render(
        <App url={url}
            includeTable={includeTable}
            includeRoller={includeRoller}
            excludeCols={excludeCols}
            rollerType={rollerType}
            rollerDice={rollerDice}
            rollerMaxResults={rollerMaxResults}
            rollerButtonTitle={rollerButtonTitle} />,
    node);
});

// ReactDOM.render(<App url={url} />, document.getElementById('root'));
