# React Typist Component

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
npm install react-typist-component
# or
yarn add react-typist-component
```

## Example

```jsx
import Typist from 'react-typist-component';

const MyComponent = () => {
  return (
    <Typist cursor={<span className="cursor">|</span>}>
      This is a typo
      <Typist.Backspace count={4} />
      <Typist.Paste>react component</Typist.Paste>
      <Typist.Pause ms={1500} />
      <div>
        use
        <div>deeper div</div>
      </div>
    </Typist>
  );
};
```

## API reference

### `Typist`

| property          | required | type                        | default value            | description                                                                                                  |
| ----------------- | -------- | --------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| children          | yes      | `ReactNode`                 |                          | The contents that will be rendered with typewriter effect                                                    |
| typingInterval    | no       | `number`                    | `100`                    | The interval between each typing                                                                             |
| backspaceInterval | no       | `number`                    | `50`                     | The interval between each backspace                                                                          |
| loop              | no       | `boolean`                   | `false`                  | Loop the typewriter effect                                                                                   |
| cursor            | no       | `string or ReactElement`    |                          | The cursor will be appended after the last character                                                         |
| splitter          | no       | `(str: string) => string[]` | `(str) => str.split('')` | Use this function to split the string. It may be useful when you want to split your string in different way. |

### `Typist.Backspace`

| property | required | type     | default value | description                                   |
| -------- | -------- | -------- | ------------- | --------------------------------------------- |
| count    | yes      | `number` |               | The number of characters that will be deleted |

### `Typist.Pause`

| property | required | type     | default value | description                               |
| -------- | -------- | -------- | ------------- | ----------------------------------------- |
| ms       | yes      | `number` |               | The duration of the pause in milliseconds |

### `Typist.Paste`

| property | required | type        | default value | description                                                             |
| -------- | -------- | ----------- | ------------- | ----------------------------------------------------------------------- |
| children | yes      | `ReactNode` |               | Children inside this component will be pasted without typewriter effect |
