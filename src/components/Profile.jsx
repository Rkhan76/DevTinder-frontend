import coverimage from '../assets/mountain-background.jpg'
import BasicInfo from './BasicInfo'
import ProfileButton from './ProfileButton'
import UserFeed from './UserFeed'

const Profile = () => {
  return (
    <section className="flex justify-center w-full">
      <div className="w-full md:w-3/4 mt-5">
        <div>
          <img
            src={coverimage}
            className="w-full h-72 object-cover"
            alt="coverImage"
          />
        </div>
        <div className="flex justify-between">
          <div>
            <ProfileButton className="mr-3" text={'Timeline'} />
            <ProfileButton text={'About'} />
          </div>
          <div>
            <ProfileButton text={'Friends'} />
            <ProfileButton text={'Photos'} />
          </div>
        </div>
        <div className="w-full flex justify-between">
          <div className="w-3/12">
          <BasicInfo/>
          </div>
          <div className="w-8/12 ">
          <UserFeed/>
          </div>
        </div>
        {/* Add more profile content below */}
        <div className="p-4">
          <h1 className="text-xl font-semibold">User Name</h1>
          <p className="text-gray-600">Bio or other profile content...</p>
        </div>
      </div>
    </section>
  )
}

export default Profile
