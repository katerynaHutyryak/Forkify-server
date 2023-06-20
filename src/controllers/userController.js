// const mongoose = require('mongoose');
// const User = require('../models/userModel');

// exports.createUser = (req, res) => {
//   const { name } = req.oidc.user.name;
//   const id = req.oidc.user.sub;
//   const user = new User({ auth0Id: id, name });
//   user.save((err) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({
//         error: 'Failed to create user',
//       });
//     }
//     return res.status(201).json({
//       message: 'User created successfully',
//       data: {
//         data: user,
//       },
//     });
//   });
// };
