const statusUpdates = new Map();

// this now is the target - this will be sending updates to the service
export const statusUpdateService = {
  postUpdate(status) {
    const id = Math.floor(Math.random() * 1000000);
    statusUpdates.set(id, status);
    console.log(`Status posted: ${status}`);
    return id;
  },

  destroyUpdate(id) {
    statusUpdates.delete(id);
    console.log(`Status removed: ${id}`);
  },
};
