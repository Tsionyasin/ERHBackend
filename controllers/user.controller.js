const Inistitute = require('../models/admin.model');
const User = require('../models/user.model');
const External = require('../models/externalUser.model');
const Upload = require('../models/upload.model');
const Student = require('../models/student.model');

//get list of admins
exports.getAllAdmins = (req, res) => {
  
  User.find({'role':'admin'})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error:' + err));
}

//count admins
exports.countAdmins = (req, res) => {
  User.countDocuments({'role':'admin'})
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error:' + err));
}
//count user
exports.countUser = (req, res) => {
  User.countDocuments({'role':'user'})
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error:' + err));
}
//count post
exports.countPost = (req, res) => {
  Upload.countDocuments({'state':'post'})
  .then(post => res.json(post))
  .catch(err => res.status(400).json('Error:' + err));
}
//count approver
exports.countApprover = (req, res) => {
  User.countDocuments({'role':'approver'})
  .then(user => res.json(user))
  .catch(err => res.status(400).json('Error:' + err));
}
// created by "super-admin"
exports.createAdmin = async (req, res) => {
  let { name, username, password, passwordConfirm, role } = req.body;

  if (!name) {
    res.status(400).json({
      status:'fail',
      message:'name can not be blank'
    })
  }
  if (!username) {
    res.status(400).json({
      status: 'fail',
      message: 'Provide username'
    })
  } else if (!password || !passwordConfirm) {
    res.status(400).json({
      status: 'fail',
      message: 'Provide password'
    })
  } else if (!role) {
    res.status(400).json({
      status: 'fail',
      message: 'User type should be specified'
    })
  }


  if (password !== passwordConfirm) {
    res.status(400).json({
      status: 'fail',
      message: "Password should match"
    })
  }

  role = role.toLowerCase();

  if (role === "admin") {

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({
        status: 'fail',
        message: 'User already registered'
      })
    }


    let newUser = new User({ name, username, password, passwordConfirm, role });

    await newUser.save().then(() => {

      return res.status(200).json({
        status: 'succes',
        message: 'registration successful'

      })

    })
  }
}

exports.getAdminById = (req, res) => {
  const _id = req.params._id;
  User.findById(_id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "id not found" + _id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({
          message: "error retriving with id" +
            _id
        });
    });
}

exports.updateAdmin = (req, res) => {
  const { password, username, name } = req.body;
  const id = req.params.id;
  const newData = { password, username, name }

  User.updateOne({ _id: id }, newData).then(
    () => {
      res.status(201).json({
        message: 'updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

exports.deleteAdmin = async (req, res) => {
  await Student.deleteOne({ user: req.params.id })
  User.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}

//get External user request

exports.Getrequest = async(req, res)=>{
  const external = await External.findOne({'state' : 'requested'})
  res.json(external);


}
//accept external user

// exports.AcceptExternal = async (req, res) => {
//   const name = req.params.name; 
//   const {email,description,gender, phone, state }= req.body;

//   await External.updateOne({name: name}, {state: "accepted"});
//   const external = await External.findOne({name});
  
//   let newExteranl  = new External({name, email,  description,gender,phone,state})
  


//   newExteranl.external = external._id;
// external.External = newExteranl._id;
// await external.save();
// await newExteranl.save();
// res.status(200).json({
//   status: 'success',
//   message: 'External user successfuly registerd' 
// })
// }