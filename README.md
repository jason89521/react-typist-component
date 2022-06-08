# React Typist Component

Create typewriter effect by setting up a component's children directly.

## Caveat ⚠

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
    <Typist typingDelay={100} cursor={<span className="cursor">|</span>}>
      This is a typo
      <br />
      <Typist.Backspace count={5} />
      <Typist.Pause ms={1500} />
      react component
      <Typist.Paste>
        <div>
          use
          <div>deeper div</div>
        </div>
      </Typist.Paste>
    </Typist>
  );
};
```

## API reference

### `Typist`

```ts
type TypistProps = {
  children: React.ReactNode;
  typingDelay?: number;
  typingNoise?: number;
  cursor?: string | React.ReactElement;
  onTypingDone?: () => boolean;
  splitter?: (str: string) => string[];
};
```

#### `children`

The contents that will be rendered with typewriter effect.

Note that `Typist` treats the element whose children is undefined or null as a single character, that is, the element will be animated.

#### `typingDelay`

**Default**: `70`

The average delay between each character.

#### `typingNoise`

**Default**: `20`

For the delay between each character, the noise from `-typingNoise` to `<typingNoise` will be added to `typingDelay`.

#### `cursor`

Will be inserted after the last typed character.

#### `onTypingDone`

**Default**: `() => false`

This function will be called when the typing animation finishes. If it returns true, then `Typist` will restart the typing animation.

#### `splitter`

**Default**: `(str: string) => str.split('')`

Use this function to split the string. It may be useful when you want to split your string in different way. For example, you can use [grapheme-splitter](https://github.com/orling/grapheme-splitter) to split string if your string contains emoji.

### `Typist.Backspace`

```ts
type Props = {
  count: number;
};
```

#### `count`

The number of characters that will be deleted.

### `Typist.Pause`

```ts
type Props = {
  ms: number;
};
```

#### `ms`

The duration of the pause in milliseconds.

### `Typist.Paste`

```ts
type Props = {
  children: React.ReactNode;
};
```

#### `children`

Children inside this component will be pasted without typewriter effect
