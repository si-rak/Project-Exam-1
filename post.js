// Some code borrowed from youtube channel, https://youtu.be/37vxWr0WgQk?si=6qKRyh3LYE0qVORW
async function loadBlogPost(postId) {
  const response = await fetch(`https://v2.api.noroff.dev/docs/static/index.html#/blog-posts/get_blog_posts__name___id_/${postId}`);
  const post = await response.json();

  document.getElementById('post-title').innerText = post.title;
  document.getElementById('post-author').innerText = post.author;
  document.getElementById('post-date').innerText = post.date;
  document.getElementById('post-image').src = post.image; 
  document.getElementById('post-content').innerHTML = post.content; 
  const postUrl = `${window.location.origin}/blog-post.html?id=${postId}`;
  document.getElementById('copy-link-button').setAttribute('data-url', postUrl);
}

function copyLinkToClipboard() {
  const copyButton = document.getElementById('copy-link-button');
  const shareableUrl = copyButton.getAttribute('data-url');
  navigator.clipboard.writeText(shareableUrl).then(() => {
      alert('Post URL copied to clipboard!');
  }).catch(err => {
      console.error('Error copying URL:', err);
  });
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id') || 'default-post-id'; 
loadBlogPost(postId);
document.getElementById('copy-link-button').addEventListener('click', copyLinkToClipboard);
document.querySelector('.share-button').addEventListener('click', () => {
  alert('Share functionality to be implemented!');
});
