import { StoryFn } from '@storybook/react';
import OrderDetails, { OrderDetailsProps } from './OrderDetails';

export default {
  title: 'Molecules/OrderDetails',
  component: OrderDetails,
};

const Template = (args: OrderDetailsProps) => <OrderDetails {...args} />;

export const Primary: StoryFn<OrderDetailsProps> = Template.bind ({});
Primary.args = {
  // column1: [
  //   {name: '', key: 'Purchase order', value: '092356'},
  //   {key: 'Retailer', value: 'Selfrdiges'},
  //   {key: 'Buyer name', value: 'Julie McKenzie'},
  //   {key: 'Email address', value: 'jem@selfridges.com'},
  // ],
  // column2: [
  //   {
  //     key: 'Billing address',
  //     value: `Yox Net-A-Porter Group SPA (DC4)
  //   C/O Class S.P.A NET-A-PORTER
  //   Inbound Stock
  //   Via Privata Paolo Baffi, 2
  //   Landriano (Pavia), 27015
  //   Italy`,
  //   },
  //   {
  //     key: 'Delivery address',
  //     value: `Yox Net-A-Porter Group SPA (DC4)
  //   C/O Class S.P.A NET-A-PORTER
  //   Inbound Stock
  //   Via Privata Paolo Baffi, 2
  //   Landriano (Pavia), 27015
  //   Italy`,
  //   },
  // ],
  // column3: [
  //   {key: 'Payment terms', value: 'Net 60'},
  //   {key: 'Delivery lead time', value: '09/03/2023 - 12/06/2023'},
  //   {key: 'Last updated', value: '09/03/2023'},
  //   {key: 'Last modified', value: 'Stephanie Lomal'},
  // ],
};
