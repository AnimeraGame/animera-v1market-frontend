# Project Overview

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Copy default project settings

- `cp -R idea-default .idea` if using IntelliJ IDEA
- `cp -R vscode-default .vscode` if using Visual Studio

### Required Visual Studio Code Extensions

- Prettier
- Code Spell Checker
- VS Code Styled Components

(see also `vscode-default/extensions.json`)

## scripts

- `yarn` - Installs all npm dependencies
- `yarn dev` - to run the dev server
- `yarn build` - Produced a ready to deploy app assets under `.next` folder.
- `yarn start` - start the deployment server. Node environment should be available in the server to run the production code

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Directories

- `public` - Common Assets
- `pages` - file based routing - [Learn more at Next.js Documentation](https://nextjs.org/docs/routing/introduction)
- `src/components` visual components (global/generic components for pages)
- `src/containers` containers and higher-order-components
- `src/pageComponents` Redux-aware app pages
- `locales` - Localization files in their respective languages
- `src/lib` - Pure libraries (not UI or redux related)
- `src/state` - Modular Redux stores, reducers.

## State management

We follow ["ducks" model](https://github.com/erikras/ducks-modular-redux) with few adjustments for organizing redux and related state management artifacts.

Every logical piece of app state (e.g. "user profile" or "current trip") is placed in dedicated folder under `/state`, e.g. `/state/profile`. Every such folder contains all modules related to corresponding state management:

- Redux "duck" (a single file with action types, action creators and reducers);
- Selectors used to transform and extract data from state;
- GraphQL queries used to query and modify corresponding data;
- Unit Tests;

As a result, we achieve high level of cohesion, as everything related to e.g. user profile management is organized into a single folder and can be modified efficiently if needed.

Example of the state folder structure:

- /state
  - /profile
    - redux.js
    - redux.test.js
    - selectors.js
    - selectors.test.js

### GraphQL queries

By default, queries used in specific state "module" are placed under this module's `/queries` folder.

In case if same query is used in multiple state modules, it can be moved one level up in the folder hierarchy like so:

- /state
  - /queries
    - common_query.gql
  - /trip
  - /trip_history

A generic `query` and `mutation` epics can be used to avoid code duplication when creating actions that trigger GraphQL queries, e.g.:

```javascript
import getCalendarQuery from './queries/trips.gql'
import { GRAPHQL_QUERY } from '../graphql'

export const TRIPS_GET = `calendar/TRIPS_GET`
export const TRIPS_GET_SUCCESS = `calendar/TRIPS_GET_SUCCESS`
export const TRIPS_GET_FAILURE = `calendar/TRIPS_GET_FAILURE`

export const getTrips = () => ({
  type: GRAPHQL_QUERY, // this type is automatically picked up by generic query redux-observable epic
  types: [TRIPS_GET, TRIPS_GET_SUCCESS, TRIPS_GET_FAILURE],
  query: getCalendarQuery,
})
```

## Selectors

We use [reselect](https://github.com/reduxjs/reselect) library to create efficient (cached), composable redux state data transformations, keeping redux state simple and not UI-oriented (e.g. redux state stored pure, normalized data, without having to duplicate or modify data to suite UI needs).

All generic/reusable selectors must be placed under corresponding state module folder like so:

- /state
  - /trip
    - selectors.js

In case some page requires its unique selection logic, a selector can be placed under corresponding page folder:

- /pages
  - /Flight
    - selectors.js

Please avoid adding selection logic in other places (e.g. under `/lib`) or not using `reselect` to handle data selection.

_Example use case_:

A "flight details" card requires flight data to be passed as a simple flat JS object, while the flight data returned by API is scattered through a complex nested data structure. Create a selector that extracts required flight data shape from trip data returned by API and place it under `/state/trip/selectors.js`. Don't forget to add unit tests!

## Unit testing

As of now, we focus on testing state management and other "non-UI" code only. We do not add unit tests for react components as it could be troublesome and require a lot of effort for creating and maintaining such tests. We may reconsider this strategy later though.

All code under `/state` and `/lib` must be covered with unit tests.
Unit tests must be added to files next to the file with subject under test like so:

- module.js
- module.test.js

Example:

- /state
  - /trip
    - epic.js
    - epic.test.js

Useful links:

- [Jest expect API](https://jestjs.io/docs/en/expect.html)

## Theming

Project uses Material UI + styled-components theming support by defining a single them with common fonts, colors, margings etc. to be used through all app pages.

The theme is located under `/components/Theme`.

Please avoid using custom styles (fonts, colors etc.) inside react components and use corresponding values from the theme.

For example, directly:

```javascript
import theme from 'components/Theme'

const StyledDiv = styled.div`
  background-color: ${theme.colors.backgroundGray};
`
```

Or via [built-in theme provider](https://www.styled-components.com/docs/advanced#theming)

## Styled-Components

We use styled-components to adjust layout and styles of react components.

Useful links:

- [Material UI support for styled componnets](https://material-ui.com/guides/interoperability/#styled-components)
- [How to use styled components with Material UI react components](https://medium.com/sipios/use-styled-components-with-material-ui-react-e0759f9a15ce)
- [10 useful tips for styled components](https://medium.com/@pitipatdop/10-useful-tips-for-styled-components-b7710b021e6a)

When styling components with styled-components inside of the render function (class or pure) that component will be unmounted every time that render function is called, to prevent this move the scope of the styled-component higher up so that is not re-rendered unnecessarily

### Bad Example

```javascript
function BadExample({ children }) {
  const StyledButton = styled`background-color: red`
  return <StyledButton>{children}</StyledButton>
}
```

### Good Example

```javascript
const StyledButton = styled`background-color: red`

function GoodExample({ children }) {
  return <StyledButton>{children}</StyledButton>
}
```

## Pull Requests

- It's very time consuming to review large Pull Requests (PRs). So PRs should not contain more than 10 files. If it is larger try to break the functionality on several logical pieces and make a separate PRs
