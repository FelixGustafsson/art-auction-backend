import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt'

export default function users(server) {
    server.post('/api/users', async (req, res) => {
        const user = new userModel({
            email: req.body.email,
            password: req.body.password,
        });
        const result = await user.save();
        res.json({ user: result, message: res.status });
    });

    server.get('/api/users/:id', async (req, res) => {
        let result = await userModel.findById(req.params.id);
        if (!result) {
            res.send('User not found').status(404);
        } else {
            res.send(result).status(200);
        }
    });

    server.get('/api/login', async (req, res) => {
        res.json(req.session);
    });

    server.post('/api/login', async (req, res) => {
        const salt = 1234567;
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = await userModel.findOne({
            email: req.body.email,
            password: hashedPassword
        });
        if (user) {
            req.session.login = user._id;
            res.json({
                message: `Login successful`,
            });
        } else {
            res.json({ message: 'User not found' });
        }
    });

    server.delete('/api/login', async (req, res) => {
        if (req.session.login) {
            const user = await userModel.findById(req.session.login);
            delete req.session.login;
            res.json({ message: `Logged you out, ${user.email}` });
        }
    });
}