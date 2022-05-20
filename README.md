# React Typer Component

A react component lets you create typewriter effect.

## Install

```bash
npm install react-typer-component
# or
yarn add react-typer-component
```

## How to use

```jsx
import Typer from 'react-typer-component';

const MyComponent = () => {
  return (
    <Typer>
      This is a typo
      <Typer.Backspace amount={4} />
      react component
      <Typer.Pause duration={1500} />
      <div>
        use
        <div>deeper div</div>
      </div>
    </Typer>
  );
};
```
