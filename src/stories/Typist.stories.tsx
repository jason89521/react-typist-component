import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

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

export const Loop = Template.bind({});
Loop.args = {
  loop: true,
  startDelay: 1500,
  finishDelay: 1500,
};
