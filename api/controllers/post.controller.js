import Post from "../models/post.model";

export const addPost = async (req, res) => {
  try {
    const { userId, title, communityId, content, image, slug } = req.body;
    const newPost = new Post({
      userId,
      title,
      communityId,
      content,
      image,
      slug,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
