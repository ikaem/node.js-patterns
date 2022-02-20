import { Blog } from './blog.js';

async function main() {
  const blog = new Blog();
  await blog.initialize();

  const posts = await blog.getAllPosts();

  if (posts.length === 0) {
    console.log('No posts available');
  }

  for (const post of posts) {
    console.log(post.title);
    // this is a cool method that I always forget  - so this would repeat a string for some number of times
    console.log('-'.repeat(post.title.length));
    console.log(`Published on ${new Date(post.created_at).toISOString()}`);
    console.log(post.content);
  }
}

main().catch(console.error);
