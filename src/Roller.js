import React, { Component } from 'react';
import droll from 'droll';
import { isIncluded } from './util';

const DICE_NOTATION_REGEX = /(\d*d[/x+\d]+)/i;
const matchDiceNotation = (item) => item.match(DICE_NOTATION_REGEX);

const rollValue = (notation) => {
    const roll = droll.roll(notation);
    return roll.total;
};

const RollerResult = ({ rolls, body }) => (
    <div className="results">
        {rolls.map(([header, value], i) => (
            <span key={i}>
                <strong>{header}: </strong>
                {value}
                {' '}
            </span>
        ))}
    </div>
);

const getRowForRoll = (body) => (roll) => {
    const firstValue = body[0][0];

    if (typeof firstValue == 'number') {
        return body.find(([numberCol]) => numberCol === roll);
    }

    return body[Math.max(roll - 1, body.length - 1)];
};

class Roller extends Component {
    state = { results: [] }

    roll() {
        const { body, header, rollerType, rollerDice, excludeCols } = this.props;

        const diceRollRequest = rollerDice || header.find(matchDiceNotation) || `1d${body.length}`;

        let rolls = [];

        const getRow = getRowForRoll(body);

        if (rollerType === "linked") {
            const roll = rollValue(diceRollRequest);

            rolls = header.map((header, i) => [header, getRow(roll)[i]]);
        } else {
            rolls = header.map((header, i) => [header, getRow(rollValue(diceRollRequest))[i]]);
        }

        rolls = rolls.filter(([header, _]) => isIncluded(excludeCols)(header))

        const results = [...this.state.results, rolls];

        this.setState({ results })
    }

    render() {
        const { maxResults = 1 } = this.props;
        const { results } = this.state;

        return (
            <div className="csv-roller">
                <button onClick={() => this.roll()}>Roll</button>

                <div className="csv-roller-results">
                    {results.slice(-maxResults).reverse().map((rolls, i) => (
                        <RollerResult key={i + rolls[0]} rolls={rolls} />
                    ))}
                </div>

            </div>
        );
    }
}

export default Roller;
