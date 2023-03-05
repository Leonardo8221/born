import { StoryFn } from '@storybook/react';
import TeamOverView, { TeamOverViewProps } from '..';
import { teams } from '../data';

export default {
  title: "Organisms/Team Overview Table",
  component: TeamOverView,
};

const Template = (args: TeamOverViewProps) => <TeamOverView {...args} />;

export const SimpleExample: StoryFn<TeamOverViewProps> = Template.bind({});

SimpleExample.args = {
  teams,
};
