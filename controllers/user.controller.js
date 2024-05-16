const user = require("../models").user;
const yup = require('yup');

class UserController {
    // index
    async index(req, res) {
        await user.findAll()
            .then(data => {
                res.json({
                    status: "success",
                    message: "All users retrieved successfully.",
                    data: data,
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: "error",
                    message: err.message || "Some error occurred while retrieving users."
                });
            });
    }

    async store(req, res) {
        const schema = yup.object().shape({
            name: yup.string().required('Name is required'),
            username: yup.string().required('Username is required'),
            password: yup.string().required('Password is required'),
        });
        
        await schema.validate(req.body, { abortEarly: false });
        const data = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        };
        await user.create(data)
            .then(data => {
                res.json({
                    status: "success",
                    message: "User created successfully.",
                    data: data,
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: "error",
                    message: err.message || "Some error occurred while creating the User."
                });
            });
    }

    async show(req, res) {
        const id = req.params.id;
        await user.findByPk(id)
            .then(data => {
                res.json({
                    status: "success",
                    message: "User retrieved successfully.",
                    data: data,
                });
            })
            .catch(err => {
                res.status(500).json({
                    status: "error",
                    message: err.message || `Error retrieving User with id=${id}`
                });
            });
    }

    async update(req, res) {
        const id = req.params.id;
        const schema = yup.object().shape({
            name: yup.string().required('Name is required'),
            username: yup.string().required('Username is required'),
            password: yup.string().required('Password is required'),
        });
        
        await schema.validate(req.body, { abortEarly: false });
        const data = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
        };
        await user.update(data, {
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.json({
                        status: "success",
                        message: "User updated successfully.",
                    });
                } else {
                    res.json({
                        status: "fail",
                        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    status: "error",
                    message: err.message || `Error updating User with id=${id}`
                });
            });
    }


    async destroy(req, res) {
        const id = req.params.id;
        await user.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.json({
                        status: "success",
                        message: "User deleted successfully.",
                    });
                } else {
                    res.json({
                        status: "fail",
                        message: `Cannot delete User with id=${id}. Maybe User was not found!`,
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    status: "error",
                    message: err.message || `Could not delete User with id=${id}`
                });
            });
    }
}

module.exports = new UserController();