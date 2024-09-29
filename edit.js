// Some code borrowed from youtube channels, https://youtu.be/xXrs4j-p3yE?si=l_mnYH7VUpzOh3wc, https://youtu.be/Qw4s8IHDLkY?si=GSZ9vX_Wr90dqgLJ

document.getElementById('upload-main-image').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
      const imageUrl = URL.createObjectURL(file);
      document.getElementById('current-main-image').src = imageUrl;
  }
});

document.getElementById('update-post-button').addEventListener('click', function() {
  const postId = '123'; 
  const title = document.getElementById('edit-post-title').value;
  const content = document.getElementById('edit-post-content').value;

  if (!title || !content) {
      alert('Please provide both a title and content for the post.');
      return;
  }

  const data = {
      title: title,
      content: content
  };

  fetch(`https://v2.api.noroff.dev/docs/static/index.html#/blog-posts/get_blog_posts__name___id_/${postId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then(response => {
      if (response.ok) {
          alert('Post updated successfully!');
      } else {
          alert('Failed to update the post.');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('An error occurred while updating the post.');
  });
});

document.getElementById('delete-post-button').addEventListener('click', function() {
  const postId = '123'; 

  if (confirm('Are you sure you want to delete this post?')) {
      fetch(`https://v2.api.noroff.dev/docs/static/index.html#/blog-posts/get_blog_posts__name___id_/${postId}`, {
          method: 'DELETE'
      })
      .then(response => {
          if (response.ok) {
              alert('Post deleted successfully!');
          } else {
              alert('Failed to delete the post.');
          }
      })
      .catch(error => {
          console.error('Error:', error);
          alert('An error occurred while deleting the post.');
      });
  }
});
