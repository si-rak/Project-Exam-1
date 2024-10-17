// Some code borrowed from youtube channels, https://youtu.be/xXrs4j-p3yE?si=l_mnYH7VUpzOh3wc, https://youtu.be/Qw4s8IHDLkY?si=GSZ9vX_Wr90dqgLJ

async function fetchPostToEdit(postId) {
    const response = await fetch(`https://docs.noroff.dev/docs/v2/blog/posts#all-posts/${postId}`);
    if (!response.ok) {
        console.error('Error fetching post:', response.statusText);
        return;
    }
    const currentPostData = await response.json();
    document.getElementById('edit-post-title').value = currentPostData.title;
    document.getElementById('edit-post-content').value = currentPostData.body;
    document.getElementById('current-main-image').src = currentPostData.media.url;
    document.getElementById('preview-image').src = currentPostData.media.url;
}

async function uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'xag9yno'); // 

    const uploadResponse = await fetch( 'https: //api.cloudinary.com/v1_1/dgghnr8hs/image/upload', {
        method: 'POST',
        body: formData,
    });

    if (!uploadResponse.ok) {
        console.error('Error uploading image:', uploadResponse.statusText);
        return null;
    }

    const uploadResult = await uploadResponse.json();
    return uploadResult.secure_url; 
}

async function updatePost(postId) {
    const title = document.getElementById('edit-post-title').value;
    const body = document.getElementById('edit-post-content').value;

    const imageInput = document.getElementById('upload-main-image');
    let imageUrl = document.getElementById('current-main-image').src; 

    if (imageInput.files.length > 0) {
        const uploadedImageUrl = await uploadImage(imageInput.files[0]);
        if (uploadedImageUrl) {
            imageUrl = uploadedImageUrl; 
        }
    }

    const updatedPost = {
        title: title,
        body: body,
        media: {
            url: imageUrl,
            alt: 'Description of the image', 
        },
    };

    const response = await fetch(`https://docs.noroff.dev/docs/v2/blog/posts#all-posts/${postId}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
    });

    if (!response.ok) {
        console.error('Error updating post:', response.statusText);
        return;
    }

    alert('Post updated successfully!');
}

async function deletePost(postId) {
    const response = await fetch(`https://docs.noroff.dev/docs/v2/blog/posts#all-posts/${postId}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        console.error('Error deleting post:', response.statusText);
        return;
    }

    alert('Post deleted successfully!');
}

async function initializeEditPage(postId) {
    await fetchPostToEdit(postId);

    document.getElementById('update-post-button').addEventListener('click', () => {
        updatePost(postId);
    });

    document.getElementById('delete-post-button').addEventListener('click', () => {
        deletePost(postId);
    });
}

const postId = '3fa85f64-5717-4562-b3fc-2c963f66afa6'; 
initializeEditPage(postId);

