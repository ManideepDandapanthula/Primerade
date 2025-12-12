import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/products?limit=1000');
      const products = response.data.data.products;
      
      const totalProducts = products.length;
      const totalValue = products.reduce((sum, p) => sum + parseFloat(p.price || 0) * (p.stock || 0), 0);
      const lowStock = products.filter(p => p.stock < 10).length;

      setStats({ totalProducts, totalValue, lowStock });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      
      <div className="stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>
        <div className="stat-card">
          <h3>Total Inventory Value</h3>
          <p>${stats.totalValue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <p>{stats.lowStock}</p>
        </div>
      </div>

      <div className="card">
        <h2>Welcome, {user?.username}!</h2>
        <p>Email: {user?.email}</p>
        <p>Role: {user?.role === 'admin' ? 'Administrator' : 'User'}</p>
        <p style={{ marginTop: '20px' }}>
          Use the navigation menu to manage your products.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

