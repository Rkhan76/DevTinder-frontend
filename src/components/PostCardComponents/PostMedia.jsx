const PostMedia = ({ media }) => {
  if (!media || media.length === 0) return null;

  return (
    <div className="mt-3">
      {media.map((m) => {
        if (m.type === "image") {
          return (
            <img
              key={m._id}
              src={m.url}
              alt="post media"
              className="w-full"
            />
          );
        }

        if (m.type === "video") {
          return (
            <video
              key={m._id}
              controls
              className="w-full"
            >
              <source src={m.url} type="video/mp4" />
            </video>
          );
        }

        return null;
      })}
    </div>
  );
};

export default PostMedia;
