# React Typer Component

Create typewriter effect by setting up a component's children directly.

## Caveat ⚠⚠⚠

This package is not production-ready, Use it with caution.

## Features 🎈

- [x] Directly set up text inside a component
- [x] Allow nested elements
- [x] Custom cursor
- [ ] Curstom string splitting
- [x] Support pasting text
- [x] Support pause
- [x] Support backspace

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

The final result will look like:

```html
<div>
  This is a react component
  <div>
    use
    <div>
      deeper div
      <span className="cursor">|</span>
    </div>
  </div>
</div>
```
