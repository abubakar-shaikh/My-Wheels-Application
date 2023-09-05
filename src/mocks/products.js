import sampleSize from 'lodash/sampleSize';

const products = [
  {
    id: 1,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 2,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 3,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 4,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 5,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 6,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 7,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 8,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 9,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
  {
    id: 10,
    name: 'KIA Picanto 2021',
    price: 'PKR 2,400,00',
    images: [
      require('images/kia.jpg'),
      require('images/kia.jpg'),
    ],
  },
];

export const getProducts = () => products;
export const getNProducts = (n) => sampleSize(products, n);
export const getProductById = (id) => products.find((product) => product.id === id);
