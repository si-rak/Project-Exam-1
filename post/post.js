const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (!postId) {
  alert('No post ID found in the URL!');
  window.location.href = '/index.html';
}

// Load post from Noroff API
async function loadBlogPost(postId) {
  try {
    const response = await fetch(
      `https://v2.api.noroff.dev/blog/posts/sirakfinal/${postId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const post = await response.json();
    const postData = post.data;

    document.getElementById('post-title').innerText = postData.title;
    document.getElementById('post-author').innerText = postData.author.name;
    document.getElementById('post-date').innerText = new Date(
      postData.created
    ).toLocaleDateString();
    document.getElementById('post-image').src = postData.media.url;
    document.getElementById('post-image').alt =
      postData.media.alt || postData.title;
    document.getElementById('post-content').innerHTML = postData.body;

    const postUrl = window.location.href;
    document
      .getElementById('copy-link-button')
      .setAttribute('data-url', postUrl);
  } catch (error) {
    console.error('❌ Error loading post:', error);
    document.getElementById('post-content').innerHTML =
      '<p>Failed to load post. Please try again later.</p>';
  }
}

function copyLinkToClipboard() {
  const copyButton = document.getElementById('copy-link-button');
  const shareableUrl = window.location.href;

  navigator.clipboard
    .writeText(shareableUrl)
    .then(() => {
      alert('✅ Post URL copied to clipboard!');
    })
    .catch((err) => {
      console.error('❌ Error copying URL:', err);
      alert('❌ Could not copy the link.');
    });
}

// Init
loadBlogPost(postId);
document
  .getElementById('copy-link-button')
  .addEventListener('click', copyLinkToClipboard);

const shareButton = document.querySelector('.share-button');

if (navigator.share && shareButton) {
  shareButton.addEventListener('click', () => {
    navigator
      .share({
        title: document.getElementById('post-title').innerText,
        text: 'Check out this post!',
        url: window.location.href,
      })
      .catch((error) => console.error('Sharing failed', error));
  });
}
