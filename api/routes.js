import express from 'express';
import User from '../db/index.js';

const router = express.Router();

const response = {
  ok: true,
  msg: '',
  body: {}
};

router.get('/healthStatus', (req, res) => {
  response.ok = true;
  response.msg = 'ok';
  response.body = {};
  res.status(200).send(response);
});
router.get('/users', (req, res) => {
  User.findAll()
    .then((data) => {
      response.ok = true;
      response.msg = 'List of users';
      response.body = data;
      res.status(200).send(response);
    })
    .catch((error) => {
      response.ok = false;
      response.msg = 'Something went wrong';
      response.body = { error };
      res.status(400).send(response);
    });
});
router.post('/register', (req, res) => {
  User.create(req.body)
    .then(() => {
      response.ok = true;
      response.msg = 'User successfully created!';
      response.body = {
        email: req.body.email,
      };
      res.status(200).send(response);
    })
    .catch((error) => {
      response.ok = false;
      response.msg = 'Something went wrong';
      response.body = {
        error: error.errors[0].message,
      };
      res.status(400).send(response);
    });
});
router.post('/login', (req, res) => {
  User.findOne({ where: {
    email: req.body.email,
    password: req.body.password,
  }})
    .then((data) => {
      if (data) {
        response.ok = true;
        response.msg = `Welcome ${req.body.email}!`;
        response.body = {};
        res.status(200).send(response);
      } else {
        response.ok = false;
        response.msg = 'User not found';
        response.body = {};
        res.status(400).send(response);
      }
    })
    .catch((error) => {
      response.ok = false;
      response.msg = 'Something went wrong';
      response.body = { error };
      res.status(400).send(response);
    });
});
router.all('/*', (req, res) => {
  response.ok = false;
  response.msg = `Cannot ${req.method}: ${req.url}`;
  res.status(404).send(response);
});

export default router;
