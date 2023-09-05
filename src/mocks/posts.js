import shuffle from 'lodash/shuffle';

const posts = [
  {
    id: 1,
    content: '✨✨ New products launching soon. Follow us for quick updates and special exclusive deals!',
    likes: 64,
    comments: 12,
    views: '11k views',
    images: [
      require('images/products/2/2_6.jpg'),
      require('images/products/1/1_3.jpg'),
      require('images/products/9/9_4.jpg'),
      require('images/products/7/7_1.jpg'),
      require('images/products/8/8_2.jpg'),
      require('images/products/6/6_2.jpg'),
      require('images/products/4/4_1.jpg'),
      require('images/products/3/3_3.jpg'),
      require('images/products/10/10_4.jpg'),
    ],
  },
  {
    id: 2,
    content: 'Today ONLY! Spend $20 to get free shipping worldwide.',
    likes: 614,
    comments: 42,
    views: '9.3k views',
    images: [],
  },
  {
    id: 3,
    content: 'Dear customers, we are experiencing delays for all shippings due to unforeseen circumstances. Please contact us if you do not receive your items by this Friday. 🙏',
    likes: 10,
    comments: 2,
    views: '900 views',
    images: [],
  },
  {
    id: 4,
    content: 'Arrived today! Grab now and enjoy 20% off storewide.',
    likes: 2,
    comments: 10,
    views: '12.4k views',
    images: [
      require('images/products/10/10_3.jpg'),
      require('images/products/1/1_3.jpg'),
      require('images/products/5/5_1.jpg'),
      require('images/products/3/3_1.jpg'),
    ],
  },
  {
    id: 5,
    content: 'TGIF sales happening soon. 😉',
    likes: 0,
    comments: 16,
    views: '30k views',
    images: [
      require('images/banners/2.jpg'),
    ],
  },
  {
    id: 6,
    content: 'Follow us and get $15 free voucher!',
    likes: 10,
    comments: 0,
    views: '258 views',
    images: [],
  },
  {
    id: 7,
    content: 'Minimalist essentials 👌',
    likes: 0,
    comments: 2,
    views: '15.1k views',
    images: [
      require('images/products/1/1_2.jpg'),
      require('images/products/7/7_4.jpg'),
      require('images/products/8/8_2.jpg'),
    ],
  },
  {
    id: 8,
    content: '50% OFF BLACK FRIDAY SALE',
    likes: 43,
    comments: 21,
    views: '3k views',
    images: [
      require('images/banners/3.jpg'),
    ],
  },
  {
    id: 9,
    content: 'Grab these for $10 while stock lasts.',
    likes: 0,
    comments: 0,
    views: '7.4k views',
    images: [
      require('images/products/7/7_6.jpg'),
      require('images/products/8/8_3.jpg'),
      require('images/products/6/6_5.jpg'),
      require('images/products/10/10_4.jpg'),
      require('images/products/9/9_2.jpg'),
      require('images/products/3/3_2.jpg'),

    ],
  },
  {
    id: 10,
    content: 'Apparels for sale. Grab these handpicked high quality t-shirts for less than $15 each.',
    likes: 13,
    comments: 2,
    views: '24.5k views',
    images: [
      require('images/products/10/10_4.jpg'),
      require('images/products/5/5_2.jpg'),
      require('images/products/6/6_2.jpg'),
      require('images/products/4/4_1.jpg'),
      require('images/products/6/6_5.jpg'),
      require('images/products/9/9_4.jpg'),
    ],
  },
];

export const getPosts = () => shuffle(posts);
