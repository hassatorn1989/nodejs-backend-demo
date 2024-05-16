const yup = require("yup");


class AuthController {
    async login(req, res) {
        const schema = yup.object().shape({
            username: yup.string().required('Username is required'),
            password: yup.string().required('Password is required'),
        });

        try {
            await schema.validate(req.body, { abortEarly: false });
            res.send("Login success");
        } catch (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while login.",
            });
        }
    }

    async register(req, res) {
        res.send("Register success");
    }
}

module.exports = new AuthController(); // export instance of AuthController