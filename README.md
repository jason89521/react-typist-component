# React Typer Component

Create typewriter effect by setting up a component's children directly.

## Caveat ⚠⚠⚠

This package is not production-ready, Use it with caution.

## Features 🎈

- [x] Directly set up text inside a component
- [x] Allow nested elements
- [x] Custom cursor
- [x] Curstom string splitting
- [x] Support pasting text
- [x] Support pause
- [x] Support backspace

## Install

```bash
npm install react-typer-component
# or
yarn add react-typer-component
```

## Example

```jsx
import Typer from 'react-typer-component';

const MyComponent = () => {
  return (
    <Typer cursor={<span className="cursor">|</span>}>
      This is a typo
      <Typer.Backspace count={4} />
      <Typer.Paste>react component</Typer.Paste>
      <Typer.Pause ms={1500} />
      <div>
        use
        <div>deeper div</div>
      </div>
    </Typer>
  );
};
```

## API reference

### `Typer`

| property          | required | type                        | default value            | description                                                                                                  |
| ----------------- | -------- | --------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| children          | yes      | `ReactNode`                 |                          | The contents that will be rendered with typewriter effect                                                    |
| typingInterval    | no       | `number`                    | `100`                    | The interval between each typing                                                                             |
| backspaceInterval | no       | `number`                    | `50`                     | The interval between each backspace                                                                          |
| loop              | no       | `boolean`                   | `false`                  | Loop the typewriter effect                                                                                   |
| cursor            | no       | `string or ReactElement`    |                          | The cursor will be appended after the last character                                                         |
| splitter          | no       | `(str: string) => string[]` | `(str) => str.split('')` | Use this function to split the string. It may be useful when you want to split your string in different way. |

### `Typer.Backspace`

| property | required | type     | default value | description                                   |
| -------- | -------- | -------- | ------------- | --------------------------------------------- |
| count    | yes      | `number` |               | The number of characters that will be deleted |

### `Typer.Pause`

| property | required | type     | default value | description                               |
| -------- | -------- | -------- | ------------- | ----------------------------------------- |
| ms       | yes      | `number` |               | The duration of the pause in milliseconds |

### `Typer.Paste`

| property | required | type        | default value | description                                                             |
| -------- | -------- | ----------- | ------------- | ----------------------------------------------------------------------- |
| children | yes      | `ReactNode` |               | Children inside this component will be pasted without typewriter effect |
