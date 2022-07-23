// console.log('Hi backend!!!');
const { app, express } = require('../config/main');
const setTemplateEngine = require('../config/setTemplateEngine');

require('colors');
const dotenv = require('dotenv');
const path = require('path');
const envPath = path.join(__dirname, '..', 'config', '.env');

const sendEmail = require('./servises/sendEmail');

dotenv.config({ path: envPath });

const connectDB = require('../config/db');

setTemplateEngine();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { driversRoutes, authRoutes } = require('./routes');

const api = require('../config/version');

// add routes
app.use(api.version.path, driversRoutes);
app.use(api.version.path, authRoutes);

app.get('/contact', (req, res) => {
  res.status(200);
  res.render('contact');
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/', (req, res) => {
  res.render('home');
});

// app.post('/send', (req, res) => {
//   // console.log(req.body.name);
//   // console.log(req.body.email);
//   // console.log(req.body.password);
//   // res.send(req.body);
// });

// app.post('/send', (req, res) => {
//   if (!req.body.email) {
//     res.status(301);
//     return res.redirect('/');
//   }
//   res.send(req.body);
// });

// app.post('/send', (req, res) => {
//   res.render('contact', {
//     userName: 'Vadim Dudkevich',
//     msg: 'Form success',
//   });
// });

app.post('/send', async (req, res) => {
  const emailResult = await sendEmail(req.body.name, req.body.email);
  console.log(emailResult);
  if (emailResult) {
    res.render('contact', {
      userName: 'Vadim Dudkevich',
      msg: 'Email send success!',
    });
  } else {
    res.render('contact', {
      userName: 'Vadim Dudkevich',
      msg: 'Email error!',
    });
  }
});

app.use((req, res) => {
  res.status(404).send('Not found');
});

const { PORT } = process.env;
let server = app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`.cyan.bold.underline);
  } catch (error) {
    console.log(`Error: ${error.message}`.red);
    server.close(() => process.exit(1));
  }
});

//process.on("unhandledRejection", (error) => {
//  if (error) {
//    console.log(`Error: ${error.message}`.red);
//    server.close(() => process.exit(1));
//  }
//});
