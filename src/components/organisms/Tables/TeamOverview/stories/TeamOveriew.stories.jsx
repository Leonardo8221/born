import { teams } from '../data';
import TeamOverTable from '..';

export default {
  title: "Organisms/Team Overview Table",
  component: TeamOverTable,
};

const Template = (args) => <TeamOverTable {...args} />;

export const SimpleExample = Template.bind({});

SimpleExample.args = {
  teams,
};
