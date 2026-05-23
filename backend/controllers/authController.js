const { generateToken } = require('../utils/jwt');
const bcrypt = require('bcrypt');
const authRepository = require('../repository/authRepository');

exports.registerUser = async (req, res) => {
  try {
    const username = req.body.username || req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone || req.body.mobile;

    if (!username || !email || !password || !phone) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await authRepository.createUser({
      username,
      email,
      password: hashedPassword,
      phone,
    });

    return res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: createdUser.id,
        username: createdUser.username,
        email: createdUser.email,
        phone: createdUser.phone,
      },
    });
  } catch (error) {
    console.error('Register error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      username: user.username,
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

