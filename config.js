const path = require('path');
const env = process.env.NODE_ENV || 'development';
module.exports = {
  env,
  public: path.join(__dirname, 'public'),
  title: "Anton Eprev",
  description: "My name’s Anton Eprev and I’m a web developer working as front-end engineer at Booking.com in Amsterdam, Netherlands",
  url: env === 'production' ? 'http://eprev.org' : 'https://localhost:4000',
  twitter: "eprev",
  // collections: {
  //   posts: {
  //     path: /^\/(\d{4})-(\d{2})-(\d{2})-([^/]+)\/\4.md$/,
  //   },
  //   pages: {
  //     path: /(\/([^/]+)\/\1.md|\/index.md)$/
  //   },
  // },
};
