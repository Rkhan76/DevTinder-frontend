export const PostCard = ({ post }) => {
    console.log(post)
  return (
    <div
      key={post.id}
      className="bg-base-100 rounded-xl shadow p-4 flex flex-col gap-2"
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={
                'https://images.pexels.com/photos/1308881/pexels-photo-1308881.jpeg'
              }
              //   alt={post.user.name}
            />
          </div>
        </div>
        <div>
          <div className="font-semibold">{`Rakhshan Khan`}</div>{' '}
          //post.user.name
          <div className="text-xs text-base-content/60">{`1.45 am`}</div>{' '}
          //post.time
        </div>
      </div>
      <div className="text-base-content/90 whitespace-pre-line">
        {post.content}
      </div>
      {/* post.image */}
      {true && (
        <img
          src='https://images.pexels.com/photos/135940/pexels-photo-135940.jpeg'   // post.image
          alt="post"
          className="rounded-lg mt-2 max-h-72 object-cover w-full"
        />
      )}
    </div>
  )
}
