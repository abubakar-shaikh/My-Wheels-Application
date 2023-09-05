import sample from 'lodash/sample';

const shops = [
  {
    id: 1,
    name: 'Lauren Paris',
    image: require('images/shops/1.jpg'),
    followers: 2440,
    isVerified: true,
    banner: require('images/banners/10.jpg'),
    rating: 4.5,
    tagline: 'Probably the best luxury in the world.',
    username: '@LaurenParis',
    postiveRating: '99%',
  },
  {
    id: 2,
    name: 'Vintage Fashion',
    image: require('images/shops/2.jpg'),
    followers: 155,
    isVerified: false,
    banner: require('images/banners/12.jpg'),
    rating: 5,
    tagline: 'The best part of waking up is vintage fashion in your cup.',
    username: '@VintageFashion',
    postiveRating: '90%',
  },
  {
    id: 3,
    name: 'The Old Hunter\'s Club',
    image: require('images/shops/3.jpg'),
    followers: 720,
    isVerified: true,
    banner: require('images/banners/11.jpg'),
    rating: 4.7,
    tagline: 'Tought on dirt, gentle on old hunter.',
    username: '@TheOldHuntersClub',
    postiveRating: '92%',
  },
  {
    id: 4,
    name: 'Gentlemen\'s Hats & Caps',
    image: require('images/shops/4.jpg'),
    followers: 78,
    isVerified: false,
    banner: require('images/banners/9.jpg'),
    rating: 3.8,
    tagline: 'The gentlemen of confidence since 1929.',
    username: '@GentlementsHatsAndCaps',
    postiveRating: '95%',
  },
  {
    id: 5,
    name: 'Apes Studio',
    image: require('images/shops/5.jpg'),
    followers: 308,
    isVerified: true,
    banner: require('images/banners/8.jpg'),
    rating: 4.8,
    tagline: 'This is the age of apes.',
    username: '@ApesStudio',
    postiveRating: '99%',
  },
];

export const getShops = () => shops;
export const getShopById = (id) => shops.find((shop) => shop.id === id);
export const getRandomShop = () => sample(shops);
