// Check authentication
const token = localStorage.getItem('accessToken');
const userName = localStorage.getItem('userName');

if (!token || !userName) {
  alert('You must be logged in to edit posts.');
  window.location.href = '/account/login.html';
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

if (!postId) {
  alert('No post ID found in the URL!');
  window.location.href = '/index.html';
}

// API URL
const API_BASE = 'https://v2.api.noroff.dev/blog/posts';

// DOM
const titleInput = document.getElementById('edit-post-title');
const contentInput = document.getElementById('edit-post-content');
const imageUrlInput = document.getElementById('imageUrlInput');
const currentImage = document.getElementById('current-main-image');
const previewImage = document.getElementById('preview-image');

// Fetch current post
async function fetchPostToEdit() {
  try {
    const response = await fetch(`${API_BASE}/${userName}/${postId}`);
    const data = await response.json();

    const post = data.data;
    titleInput.value = post.title;
    contentInput.value = post.body;
    currentImage.src = post.media.url;
    previewImage.src = post.media.url;
    imageUrlInput.value = post.media.url;
  } catch (error) {
    console.error('Error fetching post:', error);
    alert('Failed to load post. Please try again.');
  }
}

// Update
async function updatePost() {
  let imageUrl = currentImage.src;
  const newImageUrl = imageUrlInput.value.trim();

  if (newImageUrl) {
    imageUrl = newImageUrl;
    currentImage.src = imageUrl;
    previewImage.src = imageUrl;
  }

  const updatedData = {
    title: titleInput.value.trim(),
    body: contentInput.value.trim(),
    media: {
      url: imageUrl,
      alt: imageUrl ? 'Image' : 'Post image',
    },
  };

  console.log('📦 Sending updated post data:', updatedData);

  try {
    const response = await fetch(`${API_BASE}/${userName}/${postId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    console.log('🔄 API Response status:', response.status);
    const result = await response.json();
    console.log('🧾 API Response body:', result);

    if (response.ok) {
      alert('✅ Post updated successfully!');
    } else {
      alert(
        `❌ Failed to update post.\n${
          result.errors?.[0]?.message || 'Unknown error'
        }`
      );
    }
  } catch (error) {
    console.error('❌ Error updating post:', error);
    alert('Something went wrong.');
  }
}

// Delete
async function deletePost() {
  const confirmDelete = confirm('Are you sure you want to delete this post?');
  if (!confirmDelete) return;

  try {
    const response = await fetch(`${API_BASE}/${userName}/${postId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      alert('🗑️ Post deleted successfully.');
      window.location.href = '/index.html';
    } else {
      alert('❌ Failed to delete post.');
    }
  } catch (error) {
    console.error('Error deleting post:', error);
    alert('Something went wrong.');
  }
}

// Init
fetchPostToEdit();

document
  .getElementById('update-post-button')
  .addEventListener('click', updatePost);
document
  .getElementById('delete-post-button')
  .addEventListener('click', deletePost);
