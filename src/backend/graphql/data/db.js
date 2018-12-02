const users = [
  {
    id: "1",
    name: "criss",
    email: "email1@gmail.com",
    age: 29
  },
  {
    id: "2",
    name: "carlos",
    email: "email2@gmail.com",
    age: 30
  },
  {
    id: "3",
    name: "lalo",
    email: "email3@gmail.com",
    age: 40
  }
];

const posts = [
  {
    id: '1',
    title: 'Post 1',
    content: '<p>Post 1</p>',
    state: 'Published',
    author: '1'
  },
  {
    id: '2',
    title: 'Post 2',
    content: '<p>Post 2</p>',
    state: 'Published',
    author: '1'
  },
  {
    id: '3',
    title: 'Post 3',
    content: '<p>Post 2</p>',
    state: 'Published',
    author: '2'
  },
];

const comments = [
  {
    id: '1',
    text: 'First comment',
    author: '1',
    post: 1
  },
  {
    id: '2',
    text: 'First comment reply',
    author: '2',
    post: 1
  }
];

const db = {
  users,
  posts,
  comments
};

export default db;
