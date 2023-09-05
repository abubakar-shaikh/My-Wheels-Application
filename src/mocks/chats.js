const chats = [
  {
    id: 1,
    datetime: '5 mins ago',
  },
  {
    id: 2,
    datetime: '1 day ago',
  },
  {
    id: 4,
    datetime: '3 days ago',
  },
  {
    id: 6,
    datetime: '1 week ago',
  },
  {
    id: 5,
    datetime: '22 March 2020',
  },
  {
    id: 7,
    datetime: '1 January 2020',
  },
];

const messages = [
  {
    _id: 1,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 1,
    },
  },
  {
    _id: 2,
    text: 'Aenean sed purus ligula.',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 2,
    },
  },
  {
    _id: 3,
    text: ' Nam et tincidunt nunc, rhoncus posuere orci.',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 2,
    },
  },
  {
    _id: 4,
    text: 'Quisque porta ullamcorper ultrices. Mauris quis hendrerit enim. Sed consequat ex id maximus sagittis.',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 2,
    },
  },
  {
    _id: 5,
    text: 'Pellentesque semper, nunc eget semper consectetur, risus ligula sollicitudin sem, eget dictum augue neque et velit.',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 1,
    },
  },
  {
    _id: 6,
    text: 'Phasellus id leo bibendum sapien lacinia sodales eget et sem.',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 1,
    },
  },
  {
    _id: 7,
    text: 'Phasellus ut elementum orci, in molestie ipsum.',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 2,
    },
  },
  {
    _id: 8,
    text: 'Morbi ut sem quis felis vulputate condimentum a non sem. Cras eget nisl id sem lacinia mattis. Nulla erat odio, auctor nec bibendum ut, convallis vel lectus. Mauris molestie tincidunt justo a rutrum.',
    createdAt: new Date(),
    sent: true,
    received: true,
    user: {
      _id: 1,
    },
  },
];

export const getChats = () => chats;
export const getMessages = () => messages;
