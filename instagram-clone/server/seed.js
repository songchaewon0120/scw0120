const userArgs = process.argv.slice(2);
const mongoose = require("mongoose");
const User = require('./models/User');
const Article = require('./models/Article');

if (!userArgs[0].startsWith('mongodb')) {
  console.log('ERROR: You need to specify a valid mongodb URL as the first argument.');
  return;
}

seedDatabase();

async function seedDatabase() {
  try {
    const MONGODB_URI = userArgs[0];
    await mongoose.connect(MONGODB_URI);

    const users = [
      {
        username: 'cat',
        email: 'cat@example.com',
        fullName: 'Kitty',
        avatar: 'cat.jpeg',
        bio: 'Meow',
      },
      {
        username: 'dog',
        email: 'dot@example.com',
        fullName: 'Mr.Loyal',
        avatar: 'dog.jpeg',
        bio: 'Bark',
      },
      {
        username: 'bird',
        email: 'bird@example.com',
        fullName: 'Blue and White',
        avatar: 'bird.jpeg',
        bio: '',
      }
    ]

    for (let i = 0; i < users.length; i++) {
      const user = new User();
      user.username = users[i].username;
      user.email = users[i].email;
      user.fullName = users[i].fullName;
      user.avatar = users[i].avatar;
      user.bio = users[i].bio;

      await user.save();

      console.log(user);
    }

    for (let i = 1; i <= 4; i++) {
      const user = await User.findOne({ username: 'cat' });

      const article = new Article();
      article.photos = [`${i}.jpeg`];
      article.description = `cat photos ${i}`;
      article.author = user._id;

      await article.save();

      console.log(article);
    }

    mongoose.connection.close();

  } catch (error) {
    console.error(error);
  }
}
