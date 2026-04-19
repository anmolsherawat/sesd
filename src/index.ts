import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
// Enable CORS for frontend requests (from typical Vite dev port)
app.use(cors({ origin: ['http://localhost:5173'] }));
app.use(express.json());

// Root health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    name: 'ShopCore API',
    description: 'Premium Tech Accessories E-commerce System',
    status: 'online',
    version: '1.0.0'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 ShopCore API running on http://localhost:${PORT}`);
});

export default app;
