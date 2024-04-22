import userModel from '../models/userModel.js';

export default function users(server) {
    server.post('/api/users', async (req, res) => {
        const user = new userModel({
            email: req.body.email,
            password: req.body.password,
        });
        try {
            const existingUser = await userModel.findOne({
                email: req.body.email,
            })
            if (existingUser) {
                res.status(409).json({ message: 'This email address already has an account!' })
            }
            else {
                const result = await user.save();
                res.status(201).json({ message: 'Registration successful.' });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    server.get('/api/users/:id', async (req, res) => {
        let result = await userModel.findById(req.params.id);
        try {
            if (!result) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).send(result);
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    // server.get('/api/login', async (req, res) => {
    //     try {
    //         res.json(req.session);
    //     }
    //     catch (err) {
    //         res.status(500).json({ message: err.message });
    //     }
    // });

    server.post('/api/login', async (req, res) => {
        if (req.session.login) {
            res.status(409).json({ message: 'User already logged in' });
        } else {
            try {
                const user = await userModel.findOne({
                    email: req.body.email,
                });
                if (user) {
                    if (await user.matchPassword(req.body.password)) {

                        req.session.login = user._id;

                        res.status(200).json(user._id);
                        console.log(req.session);
                    }
                    else {
                        res.status(401).json({
                            message: `Password incorrect`,
                        });
                    }
                }
                else {
                    res.status(404).json({ message: 'User not found' });
                }
            }
            catch (err) {
                res.status(500).json({ message: err.message });
            }
        }
    });

    server.delete('/api/login', async (req, res) => {
        try {
            if (req.session.login) {
                req.session.destroy();
                res.status(200).json({ message: `Logged you out` });
            }
            else {
                res.status(404).json({ message: 'No user is logged in' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });
}