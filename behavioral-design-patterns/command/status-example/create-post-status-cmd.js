export function createPostStatusCmd(service, status) {
  let postId = null;

  // this now is the acual command - the object that encapsulates info needed to invoke a call
  return {
    run() {
      postId = service.postUpdate(status);
    },
    undo() {
      if (postId) {
        service.destroyUpdate(postId);
        postId = null;
      }
    },
    serialize() {
      return {
        type: 'status',
        action: 'post',
        status,
      };
    },
  };
}
