import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import nodemailer from 'nodemailer';
import AWS from 'aws-sdk';

// Create a new express application instance
const app: express.Application = express();

const US_REGION = 'us-east-1';
const SG_REGION = 'ap-southeast-1';

app.get('/bcrypt', async (req, res) => {
  bcrypt.hashSync('HelloWorld1111@', bcrypt.genSaltSync(13));
  res.json({ msg: 'Hello World!' });
});

app.get('/us-email', async (req, res) => {
  console.log('Sending ', new Date());
  const mailer = nodemailer.createTransport({ SES: new AWS.SES({ region: US_REGION }) });
  await mailer.sendMail({ from: 'dev.minko@gmail.com', to: 'dev.minko@gmail.com', subject: 'test', html: '<div>test</div>' });
  console.log('Done ', new Date());
  res.json('ok');
});

app.get('/sg-email', async (req, res) => {
  console.log('Sending ', new Date());
  const mailer = nodemailer.createTransport({ SES: new AWS.SES({ region: SG_REGION }) });
  await mailer.sendMail({ from: 'dev.minko@gmail.com', to: 'dev.minko@gmail.com', subject: 'test', html: '<div>test</div>' });
  console.log('Done ', new Date());
  res.json('ok');
});

app.listen(3000, () => {
  new AWS.SharedIniFileCredentials({ profile: 'default' });
  console.log('Example app listening on port 3000!');
});
