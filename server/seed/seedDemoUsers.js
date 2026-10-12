/**
 * Creates (or refreshes) one demo account per role.
 *
 * WHERE TO ADD: new file, drop it in server/seed/.
 *
 * RUN IT ONCE:
 *   1. Add this line to the "scripts" block in server/package.json:
 *        "seed:demo": "node seed/seedDemoUsers.js"
 *   2. npm run seed:demo
 *
 * OR SEED AUTOMATICALLY ON SERVER START - in server/server.js, right after connectDB():
 *   const { seedDemoUsers } = require('./seed/seedDemoUsers');
 *   if (process.env.ENABLE_DEMO_LOGIN === 'true') seedDemoUsers().catch(console.error);
 * (Mongoose queues the queries until the connection is ready, so no await is needed.)
 *
 * Keep names/emails in sync with client/src/config/demoUsers.js.
 * Password for every demo account: DEMO_PASSWORD from .env, default "Demo@1234".
 * Existing demo accounts keep their current password when re-seeded.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const DEMO_PASSWORD = process.env.DEMO_PASSWORD || 'Demo@1234';

const DEMO_USERS = [
  { role: 'technician', name: 'Ravi Sharma', email: 'technician@factoryiq.demo', title: 'Field technician, Unit 3' },
  { role: 'engineer', name: 'Anita Verma', email: 'engineer@factoryiq.demo', title: 'Maintenance and reliability engineer' },
  { role: 'safety_officer', name: 'Imran Qureshi', email: 'safety@factoryiq.demo', title: 'HSE and compliance officer' },
  { role: 'plant_manager', name: 'Meera Nair', email: 'manager@factoryiq.demo', title: 'Plant manager' },
  { role: 'admin', name: 'Karan Mehta', email: 'admin@factoryiq.demo', title: 'System administrator' },
];

async function seedDemoUsers() {
  for (const demo of DEMO_USERS) {
    const existing = await User.findOne({ email: demo.email });
    if (existing) {
      existing.name = demo.name;
      existing.role = demo.role;
      existing.title = demo.title;
      existing.isDemo = true;
      existing.isActive = true;
      await existing.save();
    } else {
      await User.create({ ...demo, password: DEMO_PASSWORD, isDemo: true });
    }
  }
  console.log(`Seeded ${DEMO_USERS.length} demo accounts`);
}

module.exports = { seedDemoUsers, DEMO_USERS };

// Allow "node seed/seedDemoUsers.js" from the command line
if (require.main === module) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(seedDemoUsers)
    .then(() => mongoose.disconnect())
    .catch((err) => {
      console.error('Seeding failed:', err.message);
      process.exit(1);
    });
}
