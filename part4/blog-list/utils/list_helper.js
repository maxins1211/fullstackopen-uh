const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs
        .map((blog) => blog.likes)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0;
    }
    const likesArr = blogs.map(blog => blog.likes);
    const hightestLike = Math.max(...likesArr);
    const blogWithHighestLike = blogs.find(blog => blog.likes === hightestLike);
    return blogWithHighestLike;
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};
