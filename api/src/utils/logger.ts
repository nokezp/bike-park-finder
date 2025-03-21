// Logger utility for better debugging
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Log file paths
const errorLogPath = path.join(logsDir, 'error.log');
const infoLogPath = path.join(logsDir, 'info.log');
const debugLogPath = path.join(logsDir, 'debug.log');
const warnLogPath = path.join(logsDir, 'warn.log');

// Logger implementation
class Logger {
  static error(message: string, error?: Error | any) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${message}${error ? `\n${error.stack || JSON.stringify(error)}` : ''}`;
    
    console.error('\x1b[31m%s\x1b[0m', logMessage);
    
    // Write to file
    fs.appendFileSync(errorLogPath, `${logMessage}\n`);
  }
  
  static warn(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] WARN: ${message}`;
    
    console.warn('\x1b[33m%s\x1b[0m', logMessage);
    
    // Write to file
    fs.appendFileSync(warnLogPath, `${logMessage}\n`);
  }
  
  static info(message: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] INFO: ${message}`;
    
    console.info('\x1b[36m%s\x1b[0m', logMessage);
    
    // Write to file
    fs.appendFileSync(infoLogPath, `${logMessage}\n`);
  }
  
  static debug(message: string, data?: any) {
    if (process.env.NODE_ENV !== 'production') {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] DEBUG: ${message}${data ? `\n${JSON.stringify(data, null, 2)}` : ''}`;
      
      console.debug('\x1b[35m%s\x1b[0m', logMessage);
      
      // Write to file
      fs.appendFileSync(debugLogPath, `${logMessage}\n`);
    }
  }
}

export default Logger; 