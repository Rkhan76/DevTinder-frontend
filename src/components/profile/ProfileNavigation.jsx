'use client'

const ProfileNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = ['timeline', 'about', 'friends']

  return (
    <div className="flex justify-center mb-8">
      <div className="tabs tabs-boxed bg-base-100 shadow-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab tab-lg capitalize ${
              activeTab === tab ? 'tab-active' : ''
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProfileNavigation
