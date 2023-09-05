import shuffle from 'lodash/shuffle';
import sample from 'lodash/sample';
import sampleSize from 'lodash/sampleSize';

const comments = [
  {
    id: 1,
    content: 'Sometimes I wonder if I really can. But then I think to myself, maybe I can\'t. But if I could, that would be good. Maybe it\'s all a lie?',
    date: '24 January 2020',
  },
  {
    id: 2,
    content: 'Look! In the sky. It\'s a bird, it\'s a plane. Or is it a hellicopter? No actually I think it is a bird. Or maybe I\'m just seeing things. Who knows... After 10 shots of Whiskey things start to get a bit strange.',
    date: '12 December 2019',
  },
  {
    id: 3,
    content: 'From this day on I shall be known as Bob. For Bob is a good name and I am good. But if you want you can just call me Sally.',
    date: '5 March 2020',
  },

  {
    id: 4,
    content: 'I like to say things twice, say things twice. It can get annoying though, annoying though.',
    date: '18 July 2020',
  },
  {
    id: 5,
    content: 'I can drive 10 miles, walk 50 feet. Turn around and before I know it, I\'d be back home. Or would I? I\'m not sure but that\'s just how it is.',
    date: '1 June 2019',
  },
  {
    id: 6,
    content: 'If I roll once and you roll twice. What does that mean?',
    date: '22 August 2020',
  },
  {
    id: 7,
    content: 'I see you have something to talk about. Well, I have something to shout about. Infact something to sing about. But I\'ll just keep quiet and let you carry on.',
    date: '5 September 2020',
  },
  {
    id: 8,
    content: 'Please allow me to introduce myself I\'m a man of wealth and taste I\'ve been around for a long, long year Stole many a mans soul and faith And I was round when jesus christ Had his moment of doubt and pain.',
    date: '28 May 2019',
  },

  {
    id: 9,
    content: 'Now this is the story all about how My life got flipped, turned upside down And I\'d like to take a minute just sit right there I\'ll tell you how I became the prince of a town called Bel-air.',
    date: '1 April 2019',
  },

  {
    id: 10,
    content: 'Don\'t you find it Funny that after Monday(M) and Tuesday(T), the rest of the week says WTF?',
    date: '17 February 2020',
  },
  {
    id: 11,
    content: 'I am ready to meet my Maker. Whether my Maker is prepared for the great ordeal of meeting me is another matter.',
    date: '7 November 2020',
  },
  {
    id: 12,
    content: 'The human body was designed by a civil engineer. Who else would run a toxic waste pipeline through a recreational area?',
    date: '20 June 2019',
  },
  {
    id: 13,
    content: 'Thank you Facebook, I can now farm without going outside, cook without being in my kitchen, feed fish I don\'t have & waste an entire day without having a life.',
    date: '31 July 2020',
  },
  {
    id: 14,
    content: 'Girls have an unfair advantage over men: If they can\'t get what they want by being smart, they can get it by being dumb.',
    date: '2 March 2019',
  },
  {
    id: 15,
    content: 'Don\'t steal, don\'t lie, don\'t cheat, don\'t sell drugs. The government hates competition!',
    date: '29 April 2019',
  },
  {
    id: 16,
    content: 'Some people come into our lives and leave footprints on our hearts, while others come into our lives and make us wanna leave footprints on their face.',
    date: '3 March 2020',
  },
];

export const getComments = () => shuffle(comments);
export const getRandomComment = () => sample(comments);
export const getNComments = (n) => sampleSize(comments, n);
