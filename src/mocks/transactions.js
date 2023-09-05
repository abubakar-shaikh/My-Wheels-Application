const transactions = [
  {
    section: '25 Febuary 2020',
    data: [
      {
        id: 1,
        type: 'debit',
        amount: 200,
        description: 'Order #1058099324',
        shopId: 4,
      },
      {
        id: 2,
        type: 'credit',
        amount: 4000,
        title: 'Top Up',
        description: 'Via Union Bank transfer',
      },
    ],
  },
  {
    section: '12 Febuary 2020',
    data: [
      {
        id: 3,
        type: 'debit',
        amount: 930,
        description: 'Order #4394190435',
        shopId: 3,
      },
      {
        id: 4,
        type: 'debit',
        amount: 493,
        description: 'Order #7339022433',
        shopId: 1,
      },
      {
        id: 5,
        type: 'credit',
        amount: 450,
        title: 'Top Up',
        description: 'Via Credit Card (4821)',
      },
      {
        id: 6,
        type: 'debit',
        amount: 20,
        description: 'Order #3401847261',
        shopId: 2,
      },
    ],
  },
  {
    section: '10 February 2020',
    data: [
      {
        id: 7,
        type: 'debit',
        amount: 739,
        description: 'Order #9471852091',
        shopId: 5,
      },
      {
        id: 8,
        type: 'debit',
        amount: 209,
        description: 'Order #3381694847',
        shopId: 2,
      },
    ],
  },
  {
    section: '1 February 2020',
    data: [
      {
        id: 9,
        type: 'credit',
        amount: 1200,
        title: 'Top Up',
        description: 'Via PayPal',
      },
    ],
  },
  {
    section: '27 January 2020',
    data: [
      {
        id: 8,
        type: 'debit',
        amount: 899,
        description: 'Order #4918194038',
        shopId: 4,
      },
      {
        id: 9,
        type: 'debit',
        amount: 120,
        description: 'Order #6281574837',
        shopId: 5,
      },
    ],
  },
];

export const getTransactions = () => transactions;
