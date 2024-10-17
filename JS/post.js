// Some code borrowed from youtube channel, https://youtu.be/37vxWr0WgQk?si=6qKRyh3LYE0qVORW
async function loadBlogPost(postId) {
  const response = await fetch(`https://docs.noroff.dev/docs/v2/blog/posts#all-posts/${postId}`);
  if (!response.ok) {
      console.error('Network response was not ok: ' + response.statusText);
      return; 
  }
  const post = await response.json();
  const postData = post.data;

  document.getElementById('post-title').innerText = postData.title;
  document.getElementById('post-author').innerText = postData.author.name;
  document.getElementById('post-date').innerText = new Date(postData.created).toLocaleDateString();
  document.getElementById('post-image').src = postData.media.url;
  document.getElementById('post-content').innerHTML = postData.body;

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
