import { createPostStatusCmd } from './create-post-status-cmd.js';
import { statusUpdateService } from './status-update-service.js';
import { Invoker } from './invoker.js';

// now we instnatiate the invokert
// we will use the invoker for all calls to invoke commands

const invoker = new Invoker();

// then we create a command
// we do need to post it the service, so it can call it stuff in htere
// service methods will be called inside the command creator
const command = createPostStatusCmd(statusUpdateService, 'Hi!');

// now, we can call stuff with the invoker
// we do need to pšass the command object to the invoker
invoker.run(command);

// we can also undo
invoker.undo(command);

// we can delay running of run()
invoker.delay(command, 1000 * 3);

// and we can call it remotely , to migrating the task to another machine there
invoker.runRemotely(command);
