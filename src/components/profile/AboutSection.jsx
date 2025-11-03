import { useState } from "react"

import toast from "react-hot-toast"
import { handleupdateAboutSection } from "../../api/profile"

const AboutSection = ({
  profileData,
  setProfileData,
  displayUser,
  currentUser,
  isEditModalOpen,
  setIsEditModalOpen,
}) => {

  const [tempFormData, setTempFormData] = useState(profileData)

  const handleEditProfile = () => {
    setTempFormData(profileData)
    setIsEditModalOpen(true)
  }

  const handleSaveProfile = async() => {
    await handleupdateAboutSection(tempFormData)
    setProfileData(tempFormData)
    setIsEditModalOpen(false)
    toast.success("Profile updated successfully!")
  }

  const handleCancelEdit = () => {
    setTempFormData(profileData)
    setIsEditModalOpen(false)
  }

  const handleInputChange = (field, value) => {
    setTempFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <>
      <div className="py-6">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-3xl font-bold text-base-content">About</h3>
          {currentUser?._id === displayUser?._id && (
            <button onClick={handleEditProfile} className="btn btn-primary btn-sm gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              Edit Profile
            </button>
          )}
        </div>

        <div className="card bg-gradient-to-r from-primary/5 to-secondary/5 mb-8">
          <div className="card-body">
            <p className="text-lg text-base-content/80 leading-relaxed text-center">{profileData.bio}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Current Role", value: profileData.currentRole, icon: "💼" },
            { label: "Current Company", value: profileData.currentCompany, icon: "🏢" },
            { label: "Experience", value: profileData.experience, icon: "⏱️" },
            { label: "Education", value: profileData.education, icon: "🎓" },
            { label: "Location", value: profileData.location, icon: "📍" },
            { label: "Skills", value: profileData.skills, icon: "🛠️", span: true },
            { label: "Interests", value: profileData.interests, icon: "🎯", span: true },
            { label: "Headline", value: profileData.headline, icon: "🔧" },
          ].map((item, index) => (
            <div
              key={index}
              className={`card bg-base-100 shadow-md hover:shadow-lg transition-shadow ${item.span ? "md:col-span-2" : ""}`}
            >
              <div className="card-body p-6">
                <h4 className="font-semibold text-base-content flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </h4>
                <p className="text-base-content/70">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isEditModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto bg-base-100 shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-primary to-secondary -mx-6 -mt-6 px-6 py-4 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-2xl text-white">Edit Profile</h3>
                  <p className="text-sm text-white/80 mt-1">Update your professional information</p>
                </div>
                <button
                  className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20"
                  onClick={handleCancelEdit}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-6 text-black">
              {/* Bio Field */}
              <div className="bg-base-200/50 p-4 rounded-xl">
                <label className="block mb-3">
                  <span className="text-sm font-semibold text-base-content flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs">
                      📝
                    </span>
                    Bio
                  </span>
                  <span className="text-xs text-base-content/50">{tempFormData.bio.length}/500 characters</span>
                </label>
                <textarea
                  className="w-full p-3 rounded-lg border border-base-300 focus:border-primary focus:outline-none resize-none bg-base-100"
                  rows="4"
                  placeholder="Tell us about yourself..."
                  value={tempFormData.bio}
                  maxLength={500}
                  onChange={(e) => handleInputChange("bio", e.target.value)}
                />
              </div>

              {/* Other form fields */}
              {[
                { key: "currentRole", label: "Current Role", icon: "💼", placeholder: "e.g. Senior Software Engineer" },
                {
                  key: "currentCompany",
                  label: "Current Company",
                  icon: "🏢",
                  placeholder: "e.g. DevTinder Pvt. Ltd.",
                },
                { key: "experience", label: "Experience", icon: "⏱️", placeholder: "e.g. 3+ years in web development" },
                { key: "location", label: "Location", icon: "📍", placeholder: "e.g. San Francisco, CA" },
                { key: "headline", label: "Headline", icon: "🔧", placeholder: "reactJs | nextJs | node" },
                {
                  key: "education",
                  label: "Education",
                  icon: "🎓",
                  placeholder: "e.g. B.Tech in Computer Science, XYZ University",
                },
              ].map((field) => (
                <div key={field.key} className="bg-base-200/50 p-4 rounded-xl">
                  <label className="block mb-3">
                    <span className="text-sm font-semibold text-base-content flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs">
                        {field.icon}
                      </span>
                      {field.label}
                    </span>
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 rounded-lg border border-base-300 focus:border-primary focus:outline-none bg-base-100"
                    placeholder={field.placeholder}
                    value={tempFormData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                  />
                </div>
              ))}

              {/* Skills and Interests - textarea fields */}
              {[
                {
                  key: "skills",
                  label: "Skills",
                  icon: "🛠️",
                  placeholder: "JavaScript, React, Node.js, Python...",
                  note: "Separate with commas",
                },
                {
                  key: "interests",
                  label: "Interests",
                  icon: "🎯",
                  placeholder: "Open Source, Machine Learning, UI/UX Design...",
                },
              ].map((field) => (
                <div key={field.key} className="bg-base-200/50 p-4 rounded-xl">
                  <label className="block mb-3">
                    <span className="text-sm font-semibold text-base-content flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-xs">
                        {field.icon}
                      </span>
                      {field.label}
                    </span>
                    {field.note && <span className="text-xs text-base-content/50">{field.note}</span>}
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg border border-base-300 focus:border-primary focus:outline-none resize-none bg-base-100"
                    rows="3"
                    placeholder={field.placeholder}
                    value={tempFormData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="modal-action sticky bottom-0 bg-gradient-to-r from-primary/10 to-secondary/10 -mx-6 -mb-6 px-6 py-4 border-t border-base-300 mt-8">
              <div className="flex gap-3 w-full justify-end">
                <button className="btn btn-outline btn-error" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button className="btn btn-primary gap-2" onClick={handleSaveProfile}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AboutSection
