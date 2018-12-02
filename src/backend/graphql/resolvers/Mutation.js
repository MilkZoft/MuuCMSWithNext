import uuid from 'uuid/v4';

const Mutation = {
  createUser(parent, args, { db }, info) {
    const { data: { name, email, age } } = args;
    const emailTaken = db.users.some(user => user.email === email);

    if (emailTaken) {
      throw new Error('Email Taken');
    }

    const user = {
      id: uuid(),
      name,
      email,
      age
    };

    db.users.push(user);

    return user;
  },
  deleteUser(parent, args, { db }, info) {
    const { id } = args;
    const userIndex = db.users.findIndex(user => user.id === id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deletedUsers = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter(post => {
      const match = post.author === id;

      if (match) {
        db.comments = db.comments.filter(comment => comment.post === post.id);
      }

      return !match;
    });

    db.comments = db.comments.filter(comment => comment.author !== id);

    return deletedUsers[0];
  },
  updateUser(parent, args, { db }, info) {
    const { id, data: { name, email, age } } = args;
    const user = db.users.find(user => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    const emailTaken = db.users.some(user => user.email === email);

    if (emailTaken) {
      throw new Error('Email Taken');
    }

    user.email = email || user.email;
    user.name = name || user.name;
    user.age = age || user.age;

    return user;
  },
  createPost(parent, args, { db }, info) {
    const { data: { title, content, state, author } } = args;

    const userExists = db.users.some(user => user.id === author);

    if (!userExists) {
      throw new Error('User not found');
    }

    const post = {
      id: uuid(),
      title,
      content,
      state,
      author
    };

    db.posts.push(post);

    return post;
  },
  deletePost(parent, args, { db }, info) {
    const { id } = args;
    const postIndex = db.posts.findIndex(post => post.id === id);

    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const deletedPosts = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => comment.post !== id);

    return deletedPosts[0];
  },
  createComment(parent, args, { db }, info) {
    const { data: { text, author, post: postId } } = args;

    const userExists = db.users.some(user => user.id === author);
    const postExists = db.posts.some(post => post.id === postId);

    if (!userExists || !postExists) {
      throw new Error('Unable to find user and post');
    }

    const comment = {
      id: uuid(),
      text,
      author,
      post: postId
    };

    db.comments.push(comment);

    return comment;
  },
  deleteComment(parent, args, { db }, info) {
    const { id } = args;

    const commentIndex = db.comments.findIndex(comment => comment.id === id);

    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const deletedComments = db.comments.splice(commentIndex, 1);

    return deletedComments[0];
  }
};

export default Mutation;
