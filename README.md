# CSV Table

A lightweight react app for rendering tables & table rollers from a CSV url.

## Usage

The intended use of this app is to simply include the static script, then within a blog post, use a `<div>` tag to configure a CSV loader and render the table or roller.

### Including the script

### Using the table

Here is an example:

`<div data-csv-roller="true" data-csv-roller-type="unlinked" data-csv-exclude="d100" data-csv-url="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ-Gk5zIkpo2A9AwhSQKnCEprv-g2vk7vHP8qWxJFm-c6osL00jvjtR8gsCbxwlthulAJh3f5mXqSPk/pub?gid=674498928&single=true&output=csv"></div>`

#### Parameters

The div is configured using these data attributes. All attributes are optional except for **data-csv-url**, though you must include either **data-csv-table** or **data-csv-roller** to actually show a table or roller. Both can be true.

- **data-csv-url** *(required)*: The url of a CSV file to load and use for a table or roller.
- **data-csv-table**: Set this to "true" to render a table from the CSV.
- **data-csv-roller**: Set this to "true" to render a roller from the CSV.
- **data-csv-exclude**: A comma separated list of columns to exclude from the table or roller.
- **data-csv-roller-type**: Set this to "unlinked" to direct the roller to pick from each column independently, or "linked" to roll once and read across the table.
- **data-csv-roller-dice**: Set using standard dice notation to override the rolling behaviour. If this is not set the roller will look in the header row for a dice notation, and if this is not found will simply roll on the whole table.
