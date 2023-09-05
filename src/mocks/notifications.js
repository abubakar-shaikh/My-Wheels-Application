import shuffle from 'lodash/shuffle';

const activities = [
  {
    title: 'Order Confirmation',
    subtitle: 'Your order #ECP83820191 has been confirmed.',
    datetime: '24 January 2020, 9.32am',
    isRead: false,
    type: 'order',
  },
  {
    title: 'Package Delivered',
    subtitle: 'Your order #ECP83820191 has been delivered.',
    datetime: '4 March 2020, 4.19pm',
    isRead: true,
    type: 'package',
  },
  {
    title: 'Request Refund',
    subtitle: 'Your refund request for order #ECP83820191 has been requested.',
    datetime: '18 April 2020, 2.39pm',
    isRead: false,
    type: 'refund',
  },
  {
    title: 'Top Up Successful',
    subtitle: '100 coins (≈ $100) has been added to your wallet.',
    datetime: '7 December 2020, 10.02am',
    isRead: true,
    type: 'topup',
  },
  {
    title: 'You have one new follower',
    subtitle: 'Beth Harmon has started following you.',
    datetime: '29 May 2020, 12.26pm',
    isRead: true,
    type: 'user',
  },
  {
    title: 'Order Cancelled',
    subtitle: 'Your order #ECP83401018 has been successfully cancelled and coins will be refunded to your wallet.',
    datetime: '7 July 2020, 9.24am',
    isRead: false,
    type: 'cancel',
  },
  {
    title: 'You have one new follower',
    subtitle: 'John Williams has started following you.',
    datetime: '3 June 2020, 7.23pm',
    isRead: false,
    type: 'user',
  },
];

const news = [
  {
    title: 'Limited 50% vouchers to be grabbed!',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum eros lectus, sed varius lorem sodales et.',
    image: require('images/banners/2.jpg'),
  },
  {
    title: '12.12 Up to 50% off for all clothing items',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum eros lectus, sed varius lorem sodales et.',
    image: require('images/banners/3.jpg'),
  },
  {
    title: 'Storewide 70% discount until end of the month!',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum eros lectus, sed varius lorem sodales et.',
    image: require('images/banners/5.jpg'),
  },
  {
    title: 'New store opening alert!',
    subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc fermentum eros lectus, sed varius lorem sodales et.',
    image: require('images/banners/11.jpg'),
  },
];

export const getActivities = () => shuffle(activities);
export const getNews = () => shuffle(news);
