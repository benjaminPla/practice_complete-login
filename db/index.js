import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'sqlite',
    host: ':memory:',
  });

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
});
await sequelize.sync({ force: true }).then(() => console.log('User sync successfully!'));

export default User;
