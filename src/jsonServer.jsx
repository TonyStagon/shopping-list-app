// jsonServer.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom route for registering a user
server.post('/users/register', (req, res) => {
  const { username, email, password, name, surname, cellNumber } = req.body;
  const users = router.db.get('users').value(); // Get existing users from db.json

  // Check if the user already exists
  const existingUser = users.find((user) => user.username === username || user.email === email);

  if (existingUser) {
    return res.status(400).json({ error: 'User already exists' });
  }

  // Add the new user
  const newUser = {
    id: users.length + 1, // Auto-increment ID
    username,
    email,
    password, // You may want to hash this for security
    name,
    surname,
    cellNumber,
  };

  router.db.get('users').push(newUser).write(); // Save new user to db.json
  res.status(201).json(newUser);
});

// Start JSON Server on port 5002
server.use(router);
server.listen(5002, () => {
  console.log('JSON Server is running on port 5002');
});
