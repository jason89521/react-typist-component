import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import GraphemeSplitter from 'grapheme-splitter';

import Typist, { TypistProps } from '../index';

export default {
  title: 'Typist',
  component: Typist,
} as ComponentMeta<typeof Typist>;

const defaultChildren = <div>React Typist Component</div>;

const Template: ComponentStory<typeof Typist> = ({
  children = defaultChildren,
  ...rest
}: TypistProps) => <Typist {...rest}>{children}</Typist>;

export const StyledChildren = Template.bind({});
StyledChildren.args = {
  children: (
    <div>
      <span style={{ color: 'red' }}>Red text</span>
      <br />
      <span style={{ color: 'green' }}>Green text</span>
    </div>
  ),
};

export const WithEmoji = Template.bind({});
WithEmoji.args = {
  loop: true,
  splitter: (str: string) => {
    return new GraphemeSplitter().splitGraphemes(str);
  },
  children: (
    <>
      😎🗑🥵⚠😀👍✌👨‍👨‍👧‍👦📏💡🚀🎂😓🎈💕😘
      <Typist.Backspace count={16} />
    </>
  ),
};

export const WithCursor = Template.bind({});
WithCursor.args = {
  children: (
    <div>
      <h1>cursor will be inserted after the last typed token</h1>
    </div>
  ),
  cursor: <span>|</span>,
};

export const DynamicChildren = () => {
  const [arr] = useState(['First', 'Second', 'Third']);
  const [index, setIndex] = useState(0);
  return (
    <Typist
      typingDelay={150}
      onTypingDone={() => setIndex(index === 2 ? 0 : index + 1)}
      restartKey={index}
    >
      {arr[index]}
    </Typist>
  );
};
