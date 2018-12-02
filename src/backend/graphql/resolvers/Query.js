const Query = {
  me() {
    return {
      id: '12309n',
      name: 'Cris',
      email: 'hola@gmail.com'
    };
  },
  posts(parent, args, { db }, info) {
    if (!args.query) {
      return db.posts;
    }

    return db.posts.filter(post => {
      const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
      const isContentMatch = post.content.toLowerCase().includes(args.query.toLowerCase());

      return isTitleMatch || isContentMatch;
    });
  },
  post() {
    return {
      id: '123',
      title: 'mi titulo',
      body: 'mi body',
      published: false
    };
  },
  comments(parent, args, { db }, info) {
    return db.comments;
  },
  users(parent, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }

    return db.users.filter(user => user.name.toLowerCase().includes(args.query.toLowerCase()));
  }
};

export default Query;
