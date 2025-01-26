import uuid from 'react-native-uuid';

export const db = [
  {
    id: '1a',
    uri: '',
    title: 'Forest',
    location: 'Kyiv Region, Ukraine',
    coords: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    likes: 1,
    comments: [
      {
        id: '3c',
        avatar: '',
        text: 'Such a beautiful view! Love the colors and atmosphere in this shot.',
        data: Date.now() - 2 * 100000,
      },
      {
        id: '4d',
        avatar: '',
        text: 'Such a beautiful view! Love the colors and atmosphere in this shot.',
        data: Date.now() - 3 * 1000000,
      },
    ],
  },
  {
    id: '2b',
    uri: '',
    title: 'Forest',
    location: 'Kyiv Region, Ukraine',
    coords: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    likes: 0,
    comments: [
      {
        id: '3c',
        avatar: '',
        text: 'Such a beautiful view! Love the colors and atmosphere in this shot.',
        data: Date.now() - 2 * 100000,
      },
      {
        id: '4d',
        avatar: '',
        text: 'Such a beautiful view! Love the colors and atmosphere in this shot.',
        data: Date.now() - 3 * 1000000,
      },
    ],
  },
];

export const getData = (postId, key) => {
  const index = db.findIndex(({ id }) => id === postId);
  return db[index][key];
};

export const addCommentToDB = (postId, text) => {
  const index = db.findIndex(({ id }) => id === postId);
  const data = {
    id: uuid.v4(),
    avatar: '',
    text: `New comment: ${text}`,
    data: Date.now(),
  };

  db[index].comments.push(data);
};

export const createPost = ({ image, title, location, coords }) => {
  db.push({
    id: uuid.v4(),
    uri: image,
    title,
    location,
    coords,
    likes: 0,
    comments: [],
  });
};
