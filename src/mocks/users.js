import shuffle from 'lodash/shuffle';
import sample from 'lodash/sample';
import sampleSize from 'lodash/sampleSize';

const users = [
  {
    id: 1,
    name: 'Ian B. Winburn',
    image: require('images/users/1.jpg'),
    username: '@IanWinburn',
  },
  {
    id: 2,
    name: 'Rachel M. Williams',
    image: require('images/users/2.jpg'),
    username: '@RachelWilliams',
  },
  {
    id: 3,
    name: 'Byron F. Young',
    image: require('images/users/3.jpg'),
    username: '@ByronYoung',
  },
  {
    id: 4,
    name: 'Robert K. Tuttle',
    image: require('images/users/4.jpg'),
    username: '@RobertTuttle',
  },
  {
    id: 5,
    name: 'Carolyn M. Witkowski',
    image: require('images/users/5.jpg'),
    username: '@CarolynWitkowski',
  },
  {
    id: 6,
    name: 'Ramon C. Fairley',
    image: require('images/users/6.jpg'),
    username: '@RamonFairley',
  },
  {
    id: 7,
    name: 'Sarah B. Miranda',
    image: require('images/users/7.jpg'),
    username: '@SarahMiranda',
  },
  {
    id: 8,
    name: 'Jennifer T. Lucero',
    image: require('images/users/8.jpg'),
    username: '@JenniferLucero',
  },
  {
    id: 9,
    name: 'Alissa J. Lundgren',
    image: require('images/users/9.jpg'),
    username: '@AlissaLundgren',
  },
  {
    id: 10,
    name: 'Thomas R. Fierro',
    image: require('images/users/10.jpg'),
    username: '@ThomasFierror',
  },
];

export const getUsers = () => shuffle(users);
export const getRandomUser = () => sample(users);
export const getNUsers = (n) => sampleSize(users, n);
export const getUserById = (id) => users.find((user) => user.id === id);
