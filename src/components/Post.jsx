import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const Post = ({ post }) => {
  return (
    <Card>
      <CardMedia component="img" alt={post.username} height="140" image={post.imageUrl} />
      <CardContent>
        <Typography variant="h6">{post.username}</Typography>
        <Typography variant="body2">{post.caption}</Typography>
        {/* Autres détails de la publication */}
      </CardContent>
    </Card>
  );
};

export default Post;