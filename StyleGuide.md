# Marseverse Website Best Practice Style Guide

Documentation for assisting developers in using best practices in conjunction with Marseverse's application development.

## Table of Contents

- [Reducers](#reducers)
- [CSS](#css)
- [Helper Modules](#helper-modules)

## React

### PropTypes

React components have their data passed to them as props. In our code base, we want to explicitly declare a component's [PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html). Our linting system is set up to warn about undeclared PropTypes.

### DefaultProps

There are two different ways to define default props depending on the type of React component you are using.

#### React Classes

[DefaultProps](https://reactjs.org/docs/typechecking-with-proptypes.html#default-prop-values) is a way to define defaults for props that are passed to a given component.

If you are using a React class component, it is recommended to use defaultProps. For instance, if a value named `isHidden` should normally be false but we want it to be overridden, we can do the following:

```
// Good Example:

class Foo extends Component {
  // code here
}

ComponentName.defaultProps = {
  isHidden: false
}
```

One anti-pattern to avoid is to default prop variables in the render() or other component functions. One reason for this is the example where a prop variable would have have a default and need to be used by more than one function inside of a React component.

```
// Bad Example:

class Foo extends Component {
  render() {
    const { isHidden = false } = this.props
  }
}
```

#### Stateless functions

When applying default props to stateless functions, object default values are recommended. DefaultProps on stateless functions will eventually be deprecated.

```
// Good Example

const Foo = ({isHidden = false}) => {
  // code here
}
```

```
// Bad Example

const Foo = ({isHidden}) => {
  // code here
}

Foo.defaultProps = {
  isHidden: false
}
```

### mapStateToProps

Redux is used to pass data as well as actions or functions to React componenents. Redux data is provided through [mapStateToProps](https://react-redux.js.org/using-react-redux/connect-mapstate) and [connect](https://react-redux.js.org/api/connect)

```
// Good Example
const mapStateToProps = state => ({
  foo: state.root.foo,
})

connect(
  mapStateToProps,
  null,
)(YourComponent)
```

It is also possible to inline mapStateToProps inside of connect

```
// Inline Example

connect(
  { foo: state.root.foo },
  null,
)(YourComponent)
```

### mapDispatchToProps

Redux is used to pass data as well as actions or functions to React components. Redux functions is provided through [mapDispatchToProps](https://react-redux.js.org/using-react-redux/connect-mapdispatch) and [connect](https://react-redux.js.org/api/connect)

```
// Good Example
const mapDispatchToProps = dispatch => ({
  dispatchHandleEvent: () => dispatch(handleEvent()),
})

connect(
  null,
  mapDispatchToProps,
)(YourComponent)
```

It is also possible to inline mapDispatchToProps inside of connect

```
// Inline Example

connect(
  null,
  { handleEvent1, dispatchHandleEvent: handleEvent2 }
)(YourComponent)
```

## Reducers

### List State Data

When storing data relating to lists of items with non trivial data or relational data, such as flight results with similar origin/destination info, it can be useful to use [normalized state](https://redux.js.org/recipes/structuring-reducers/normalizing-state-shape).

If we store this type of data using [functional reducers](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic) such as byId and allIds, we can easily store and retrieve concepts such as selected, filtered, or excluded items simply by storing respective ids rather than mutating the entire underlying object.

In order to get items out of the reducers and passed to React components for consumption, it is common to add helper functions in the reducers such as:

```javascript
export const getItem = (state, id) => state.byId[id]
export const getItems = state => state.allIds.map(id => getItem(state, id))
```

If you need to modify the data for components to consume, you can add memoized [selectors](https://github.com/reduxjs/reselect) to map/filter/reduce the list data.

When passing list data to a component, it is generally easier for a component to use the data as a list rather than an object map.

```javascript
// good example
data = [
  {
    id: ‘1’,
    name: ‘foo’
  }
]

// bad example
data = {
  ‘1’: {
    id: ‘1’,
    name: ‘foo’
  }
}
```

## CSS

### WithStyles

Generally speaking, in order to style our components, we should be using Material-UI's [withStyles](https://material-ui.com/styles/basics/#higher-order-component-api) to accomplish styling your components. This useful guide also shows how to apply theme styling as well as styles based on props. These style objects should generally live in the same file or folder as the component the styles are being applied to, if the styling is particularly complex. Please refrain from putting multiple style objects in a common file that is support multiple components.

### CSS Properties

There are certain CSS properties that we should generally refrain from declaring or using explicitly. The following list is a work in progress.

#### Typography Properties

The following properties should not be used and rather it is encouraged that we refer to the Typography components in order to accomplish the following:

- font-size (fontSize)
- font-weight (fontWeight)
- font-family (fontFamily)
- line-height (lineHeight)
- letter-spacing (letterSpacing)

### Color Properties

The following properties should be used sparingly. When possible, it is encouraged that we refer to the color mui theme in order to accomplish the following:

- color
- background-color (backgroundColor)

## Helper Modules

### clsx

It is common to want to combine different class names or apply class names conditionally to React components or html tags. [clsx](https://www.npmjs.com/package/clsx) helps with this process.

For example, instead of using string interpolation:

```
<div className={`${classes.foo} ${useBar ? classes.bar || ''}`} />
```

you can use the following:

```
<div className={cslx({classes.foo, classes.bar:useBar})} />
```

Please see the documentation linked above for addition use cases.
