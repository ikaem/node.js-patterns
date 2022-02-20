import { StackCalculator } from '../example.js';
import { safeCalculatorHandler } from './proxy-handler.js';

const calcualtor = new StackCalculator();
const safeCalculator = new Proxy(calcualtor, safeCalculatorHandler);

safeCalculator instanceof StackCalculator; // true
