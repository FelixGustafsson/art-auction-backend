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
                res.status(200).json(result);
            }
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    });

    server.patch('/api/user/:id', async (req, res) => {
        try {
            const user = await userModel.findById(req.params.id);
            if (user) {
                req.body.username? user.username = req.body.username : null;
                req.body.name? user.name = req.body.name : null;
                req.body.lastname? user.lastname = req.body.lastname : null;
                req.body.password? user.password = req.body.password : null;
                const result = await user.save();
                console.log(result);
                res.status(200).json(result);
                }
            else {
                res.status(404).json({ message: 'User not found' });
            }          
        }
        catch (err) {
            console.log(err)
            res.status(500).json({ message: err.message });
        }
})

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