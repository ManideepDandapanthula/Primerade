/**
 * Database Seeder Script
 * Creates sample admin user and products for testing
 * 
 * Usage: node scripts/seed.js
 */

require('dotenv').config();
const { sequelize } = require('../config/database');
const User = require('../models/User');
const Product = require('../models/Product');

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database
    await sequelize.sync({ force: false });
    console.log('✅ Database synced');

    // Create admin user
    const [adminUser, adminCreated] = await User.findOrCreate({
      where: { email: 'admin@primetrade.com' },
      defaults: {
        username: 'admin',
        email: 'admin@primetrade.com',
        password: 'Admin123',
        role: 'admin',
        isActive: true
      }
    });

    if (adminCreated) {
      console.log('✅ Admin user created');
      console.log('   Email: admin@primetrade.com');
      console.log('   Password: Admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }

    // Create regular user
    const [regularUser, userCreated] = await User.findOrCreate({
      where: { email: 'user@primetrade.com' },
      defaults: {
        username: 'testuser',
        email: 'user@primetrade.com',
        password: 'User123',
        role: 'user',
        isActive: true
      }
    });

    if (userCreated) {
      console.log('✅ Regular user created');
      console.log('   Email: user@primetrade.com');
      console.log('   Password: User123');
    } else {
      console.log('ℹ️  Regular user already exists');
    }

    // Create sample products
    const sampleProducts = [
      {
        name: 'Laptop Pro 15',
        description: 'High-performance laptop with 16GB RAM and 512GB SSD',
        price: 1299.99,
        stock: 50,
        category: 'Electronics',
        userId: regularUser.id
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with long battery life',
        price: 29.99,
        stock: 200,
        category: 'Accessories',
        userId: regularUser.id
      },
      {
        name: 'Mechanical Keyboard',
        description: 'RGB mechanical keyboard with Cherry MX switches',
        price: 149.99,
        stock: 75,
        category: 'Accessories',
        userId: regularUser.id
      },
      {
        name: '4K Monitor',
        description: '27-inch 4K UHD monitor with HDR support',
        price: 399.99,
        stock: 30,
        category: 'Electronics',
        userId: regularUser.id
      }
    ];

    let productsCreated = 0;
    for (const productData of sampleProducts) {
      const [product, created] = await Product.findOrCreate({
        where: { 
          name: productData.name,
          userId: productData.userId
        },
        defaults: productData
      });
      if (created) productsCreated++;
    }

    console.log(`✅ Created ${productsCreated} sample products`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('   Admin: admin@primetrade.com / Admin123');
    console.log('   User:  user@primetrade.com / User123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();

