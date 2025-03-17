import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

const seedFiles = [
  'seedAdminUser.ts',
  'seedBikeParks.ts',
  'seedTrails.ts',
  'seedEvents.ts'
];

async function runSeedFiles() {
  console.log('Starting database seeding process...\n');

  for (const file of seedFiles) {
    try {
      console.log(`Running ${file}...`);
      const { stdout, stderr } = await execAsync(`npx ts-node ${path.join(__dirname, file)}`);
      
      if (stdout) console.log(stdout);
      if (stderr) console.error(stderr);
      
      console.log(`Completed ${file}\n`);
    } catch (error) {
      console.error(`Error running ${file}:`, error);
      process.exit(1);
    }
  }

  console.log('All seed files completed successfully!');
}

runSeedFiles(); 