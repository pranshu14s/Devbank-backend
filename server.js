const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory "database" just for demo purposes
const accounts = [
  { id: 1, name: 'Checking Account', balance: 5230.5 },
  { id: 2, name: 'Savings Account', balance: 18450.0 }
];

const transactions = [
  { id: 1, accountId: 1, type: 'debit', amount: 120.0, description: 'Grocery Store' },
  { id: 2, accountId: 1, type: 'credit', amount: 2500.0, description: 'Salary Deposit' },
  { id: 3, accountId: 2, type: 'credit', amount: 100.0, description: 'Interest' }
];

// Health check endpoint -- used by ECS/ALB to verify the container is alive
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'devbank-backend', timestamp: new Date().toISOString() });
});

// Root
app.get('/', (req, res) => {
  res.send('DevBank Backend API is running.');
});

// Get all accounts
app.get('/api/accounts', (req, res) => {
  res.json(accounts);
});

// Get a single account
app.get('/api/accounts/:id', (req, res) => {
  const account = accounts.find(a => a.id === parseInt(req.params.id));
  if (!account) return res.status(404).json({ error: 'Account not found' });
  res.json(account);
});

// Get transactions for an account
app.get('/api/accounts/:id/transactions', (req, res) => {
  const accountTransactions = transactions.filter(t => t.accountId === parseInt(req.params.id));
  res.json(accountTransactions);
});

// Get all transactions
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

app.listen(PORT, () => {
  console.log(`DevBank backend listening on port ${PORT}`);
});
