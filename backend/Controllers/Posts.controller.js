import Post from "../Models/Post.model.js";

//GETS ALL POSTS
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    if(posts.length === 0){
      return res.status(200).json({ message: 'There are no posts yet' });
    }

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json([]);
  }
};

//GETS A POST
export const getSinglePost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id);

    if(!post){
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.json({ error });
  }
};

//CREATES A POST
export const createPost = async (req, res) => {
  const  description  = req.body;
  const image  = req.body;

  try {

    const post = new Post(
      description,
      image
    );

   const newPost = await post.save();

    res.status(200).json({ newPost });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//UPDATES A POST
export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.user._id;
    const { description } = req.body;

    const postUpdated = await Post.findById(id);

    if (!postUpdated || postUpdated.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Permission denied or Post not found' });
    }

    postUpdated.description = [description];

    await postUpdated.save();

    res.status(200).json({ postUpdated });
  } catch (error) {
    res.json({ message: error });
  }
};

//UPDATES A POST PICTURE
export const imageUpdate = async(req, res) => {
  try {
    const id = req.params.id;
    const fileData = res.locals.data;
    const userId = req.user._id;

    const imageUpdate = await Post.findById(id);

    if (!imageUpdate || imageUpdate.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Permission denied or Post not found' });
    }
    
    imageUpdate.image = fileData.url;
    imageUpdate.fileId = fileData.fileId;
    imageUpdate.fileName = fileData.fileOriginalName;
    
    await imageUpdate.save();

    res.status(200).json({ imageUpdate });
  } catch (error) {
    res.json({ message: error });
  }
};

// DELETES A POST
export const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.user._id;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.postedBy.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Permission denied' });
    }
z

    await Post.deleteOne({_id: id});

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//GETS THE POSTS YOU HAVE POSTED
export const getUserPosts = async (req, res) => {
  try {
    const userIdToken = req.params.postedBy;

    const userPosts = await Post.find({ postedBy: userIdToken });

    if (userPosts.length === 0) {
      return res.status(200).json({ message: "No posts yet" });
    }

    res.status(200).json({ Posts: userPosts });
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
