"use client"

import { useState } from "react"
import {
  User,
  Lock,
  Shield,
  Bell,
  Eye,
  Trash2,
  Camera,
  Mail,
  Key,
  Globe,
  Users,
  MessageSquare,
  Smartphone,
  Monitor,
  LogOut,
  Sparkles,
} from "lucide-react"

export default function SettingsPage() {
  // Profile state
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about building scalable applications",
    title: "Senior Software Engineer",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    skills: ["React", "Node.js", "TypeScript", "Python"],
  })

  // Privacy state
  const [privacy, setPrivacy] = useState({
    profileVisibility: true,
    showEmail: false,
    showConnections: true,
    allowMessages: true,
    searchable: true,
  })

  // Notification state
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    connectionRequests: true,
    messages: true,
    postLikes: false,
    comments: true,
    mentions: true,
    newsletter: false,
  })

  // Security state
  const [security, setSecurity] = useState({
    twoFactorEnabled: false,
    activeSessions: 3,
  })

  const [activeTab, setActiveTab] = useState("profile")

  const handleSaveProfile = () => {
    alert("Profile updated successfully!")
  }

  const handleSavePrivacy = () => {
    alert("Privacy settings updated successfully!")
  }

  const handleSaveNotifications = () => {
    alert("Notification preferences updated successfully!")
  }

  const handleChangePassword = () => {
    alert("Check your email for password reset instructions.")
  }

  const handleEnable2FA = () => {
    setSecurity({ ...security, twoFactorEnabled: !security.twoFactorEnabled })
    alert(security.twoFactorEnabled ? "2FA disabled" : "2FA enabled")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-cyan-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-cyan-500 rounded-2xl blur-2xl opacity-20"></div>
          <div className="relative bg-gradient-to-r from-sky-500 to-cyan-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="h-8 w-8" />
              <h1 className="text-4xl font-bold">Settings</h1>
            </div>
            <p className="text-sky-100">Manage your account settings and preferences</p>
          </div>
        </div>

        {/* Tabs */}
        <div
          role="tablist"
          className="tabs tabs-boxed mb-6 flex-wrap gap-2 bg-white shadow-lg p-2 rounded-xl border-2 border-sky-200"
        >
          <button
            role="tab"
            className={`tab gap-2 rounded-lg transition-all ${
              activeTab === "profile"
                ? "bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-lg scale-105"
                : "hover:bg-sky-50"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline font-semibold">Profile</span>
          </button>
          <button
            role="tab"
            className={`tab gap-2 rounded-lg transition-all ${
              activeTab === "account"
                ? "bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-lg scale-105"
                : "hover:bg-sky-50"
            }`}
            onClick={() => setActiveTab("account")}
          >
            <Lock className="h-4 w-4" />
            <span className="hidden sm:inline font-semibold">Account</span>
          </button>
          <button
            role="tab"
            className={`tab gap-2 rounded-lg transition-all ${
              activeTab === "privacy"
                ? "bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-lg scale-105"
                : "hover:bg-sky-50"
            }`}
            onClick={() => setActiveTab("privacy")}
          >
            <Eye className="h-4 w-4" />
            <span className="hidden sm:inline font-semibold">Privacy</span>
          </button>
          <button
            role="tab"
            className={`tab gap-2 rounded-lg transition-all ${
              activeTab === "notifications"
                ? "bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-lg scale-105"
                : "hover:bg-sky-50"
            }`}
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline font-semibold">Notifications</span>
          </button>
          <button
            role="tab"
            className={`tab gap-2 rounded-lg transition-all ${
              activeTab === "security"
                ? "bg-gradient-to-r from-sky-500 to-cyan-600 text-white shadow-lg scale-105"
                : "hover:bg-sky-50"
            }`}
            onClick={() => setActiveTab("security")}
          >
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline font-semibold">Security</span>
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="card bg-white shadow-2xl border-2 border-sky-200 hover:border-sky-400 transition-all">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="card-title text-2xl bg-gradient-to-r from-sky-600 to-cyan-700 bg-clip-text text-transparent">
                    Profile Information
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">Update your public profile information</p>

                {/* Profile Picture */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="avatar">
                    <div className="w-24 rounded-full ring-4 ring-sky-500 ring-offset-4">
                      <img src="/developer-working.png" alt="Profile" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <button className="btn bg-gradient-to-r from-sky-500 to-cyan-600 text-white border-none hover:from-sky-600 hover:to-cyan-700 btn-sm gap-2 shadow-lg">
                      <Camera className="h-4 w-4" />
                      Change Photo
                    </button>
                    <p className="text-sm text-gray-600">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Name */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Full Name</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full border-2 border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                {/* Title */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Professional Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full border-2 border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    placeholder="e.g., Senior Software Engineer"
                  />
                </div>

                {/* Bio */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Bio</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered h-24 border-2 border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Brief description for your profile.</span>
                  </label>
                </div>

                {/* Location */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Location</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full border-2 border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>

                {/* Website */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Website</span>
                  </label>
                  <input
                    type="url"
                    className="input input-bordered w-full border-2 border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                {/* Skills */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Skills</span>
                  </label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {profile.skills.map((skill, index) => (
                      <div
                        key={index}
                        className="badge badge-lg bg-gradient-to-r from-sky-500 to-cyan-600 text-white border-none shadow-md"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full border-2 border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                    placeholder="Add a skill and press Enter"
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">Add your technical skills and expertise</span>
                  </label>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn bg-gradient-to-r from-sky-500 to-cyan-600 text-white border-none hover:from-sky-600 hover:to-cyan-700 shadow-lg"
                    onClick={handleSaveProfile}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Account Tab */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <div className="card bg-white shadow-2xl border-2 border-sky-200 hover:border-sky-400 transition-all">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                    <Lock className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="card-title text-2xl bg-gradient-to-r from-sky-600 to-cyan-700 bg-clip-text text-transparent">
                    Account Settings
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">Manage your account credentials</p>

                {/* Email */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-gray-700">Email Address</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      className="input input-bordered flex-1 border-2 border-sky-200 focus:border-sky-500 focus:ring-2 focus:ring-sky-200"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    />
                    <button className="btn btn-outline border-2 border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white gap-2">
                      <Mail className="h-4 w-4" />
                      Verify
                    </button>
                  </div>
                </div>

                <div className="divider"></div>

                {/* Password */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">Password</h3>
                    <p className="text-sm text-gray-600">Change your password to keep your account secure</p>
                  </div>
                  <button
                    className="btn btn-outline border-2 border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white gap-2"
                    onClick={handleChangePassword}
                  >
                    <Key className="h-4 w-4" />
                    Change Password
                  </button>
                </div>

                <div className="divider"></div>

                {/* Connected Accounts */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">Connected Accounts</h3>
                    <p className="text-sm text-gray-600">Link your social accounts for easier sign-in</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border-2 border-sky-200 rounded-lg hover:border-sky-400 transition-all bg-gradient-to-r from-sky-50 to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                          <Globe className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">GitHub</p>
                          <p className="text-sm text-gray-600">Not connected</p>
                        </div>
                      </div>
                      <button className="btn btn-sm bg-gradient-to-r from-sky-500 to-cyan-600 text-white border-none hover:from-sky-600 hover:to-cyan-700">
                        Connect
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 border-2 border-sky-200 rounded-lg hover:border-sky-400 transition-all bg-gradient-to-r from-sky-50 to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                          <Globe className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">LinkedIn</p>
                          <p className="text-sm text-gray-600">Not connected</p>
                        </div>
                      </div>
                      <button className="btn btn-sm bg-gradient-to-r from-sky-500 to-cyan-600 text-white border-none hover:from-sky-600 hover:to-cyan-700">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="card bg-white shadow-2xl border-2 border-red-300 hover:border-red-500 transition-all">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-red-700 rounded-lg">
                    <Trash2 className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="card-title text-2xl bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                    Danger Zone
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">Irreversible actions for your account</p>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Deactivate Account</p>
                    <p className="text-sm text-gray-600">Temporarily disable your account</p>
                  </div>
                  <button className="btn btn-outline border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white">
                    Deactivate
                  </button>
                </div>

                <div className="divider"></div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">Delete Account</p>
                    <p className="text-sm text-gray-600">Permanently delete your account and data</p>
                  </div>
                  <button className="btn bg-gradient-to-r from-red-600 to-red-800 text-white border-none hover:from-red-700 hover:to-red-900 gap-2 shadow-lg">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            <div className="card bg-white shadow-2xl border-2 border-sky-200 hover:border-sky-400 transition-all">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="card-title text-2xl bg-gradient-to-r from-sky-600 to-cyan-700 bg-clip-text text-transparent">
                    Privacy Settings
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">Control who can see your information</p>

                <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-sky-50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-sky-600" />
                      <label className="font-semibold text-gray-800">Public Profile</label>
                    </div>
                    <p className="text-sm text-gray-600">Make your profile visible to everyone</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                    checked={privacy.profileVisibility}
                    onChange={(e) => setPrivacy({ ...privacy, profileVisibility: e.target.checked })}
                  />
                </div>

                <div className="divider"></div>

                <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-sky-50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-sky-600" />
                      <label className="font-semibold text-gray-800">Show Email</label>
                    </div>
                    <p className="text-sm text-gray-600">Display your email on your profile</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                    checked={privacy.showEmail}
                    onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
                  />
                </div>

                <div className="divider"></div>

                <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-sky-50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-sky-600" />
                      <label className="font-semibold text-gray-800">Show Connections</label>
                    </div>
                    <p className="text-sm text-gray-600">Let others see your connections</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                    checked={privacy.showConnections}
                    onChange={(e) => setPrivacy({ ...privacy, showConnections: e.target.checked })}
                  />
                </div>

                <div className="divider"></div>

                <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-sky-50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-sky-600" />
                      <label className="font-semibold text-gray-800">Allow Messages</label>
                    </div>
                    <p className="text-sm text-gray-600">Let anyone send you messages</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                    checked={privacy.allowMessages}
                    onChange={(e) => setPrivacy({ ...privacy, allowMessages: e.target.checked })}
                  />
                </div>

                <div className="divider"></div>

                <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-sky-50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-sky-600" />
                      <label className="font-semibold text-gray-800">Searchable Profile</label>
                    </div>
                    <p className="text-sm text-gray-600">Allow your profile to appear in search results</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                    checked={privacy.searchable}
                    onChange={(e) => setPrivacy({ ...privacy, searchable: e.target.checked })}
                  />
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn bg-gradient-to-r from-sky-500 to-cyan-600 text-white border-none hover:from-sky-600 hover:to-cyan-700 shadow-lg"
                    onClick={handleSavePrivacy}
                  >
                    Save Privacy Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-6">
            <div className="card bg-white shadow-2xl border-2 border-sky-200 hover:border-sky-400 transition-all">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                    <Bell className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="card-title text-2xl bg-gradient-to-r from-sky-600 to-cyan-700 bg-clip-text text-transparent">
                    Notification Preferences
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">Choose what notifications you want to receive</p>

                <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-sky-50 transition-all">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-sky-600" />
                      <label className="font-semibold text-gray-800">Email Notifications</label>
                    </div>
                    <p className="text-sm text-gray-600">Receive notifications via email</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                    checked={notifications.emailNotifications}
                    onChange={(e) => setNotifications({ ...notifications, emailNotifications: e.target.checked })}
                  />
                </div>

                <div className="divider"></div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Activity Notifications</h3>

                  <div className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-sky-50 transition-all">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-800">Connection Requests</label>
                      <p className="text-sm text-gray-600">When someone wants to connect with you</p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                      checked={notifications.connectionRequests}
                      onChange={(e) => setNotifications({ ...notifications, connectionRequests: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-sky-50 transition-all">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-800">Messages</label>
                      <p className="text-sm text-gray-600">When you receive a new message</p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                      checked={notifications.messages}
                      onChange={(e) => setNotifications({ ...notifications, messages: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-sky-50 transition-all">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-800">Post Likes</label>
                      <p className="text-sm text-gray-600">When someone likes your post</p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                      checked={notifications.postLikes}
                      onChange={(e) => setNotifications({ ...notifications, postLikes: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-sky-50 transition-all">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-800">Comments</label>
                      <p className="text-sm text-gray-600">When someone comments on your post</p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                      checked={notifications.comments}
                      onChange={(e) => setNotifications({ ...notifications, comments: e.target.checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between py-2 px-4 rounded-lg hover:bg-sky-50 transition-all">
                    <div className="space-y-1">
                      <label className="font-semibold text-gray-800">Mentions</label>
                      <p className="text-sm text-gray-600">When someone mentions you in a post</p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                      checked={notifications.mentions}
                      onChange={(e) => setNotifications({ ...notifications, mentions: e.target.checked })}
                    />
                  </div>
                </div>

                <div className="divider"></div>

                <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-sky-50 transition-all">
                  <div className="space-y-1">
                    <label className="font-semibold text-gray-800">Newsletter</label>
                    <p className="text-sm text-gray-600">Receive our weekly newsletter with updates</p>
                  </div>
                  <input
                    type="checkbox"
                    className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                    checked={notifications.newsletter}
                    onChange={(e) => setNotifications({ ...notifications, newsletter: e.target.checked })}
                  />
                </div>

                <div className="card-actions justify-end mt-4">
                  <button
                    className="btn bg-gradient-to-r from-sky-500 to-cyan-600 text-white border-none hover:from-sky-600 hover:to-cyan-700 shadow-lg"
                    onClick={handleSaveNotifications}
                  >
                    Save Notification Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="card bg-white shadow-2xl border-2 border-sky-200 hover:border-sky-400 transition-all">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="card-title text-2xl bg-gradient-to-r from-sky-600 to-cyan-700 bg-clip-text text-transparent">
                    Security Settings
                  </h2>
                </div>
                <p className="text-gray-600 mb-4">Manage your account security and authentication</p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-sky-50 transition-all">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-sky-600" />
                        <label className="font-semibold text-gray-800">Two-Factor Authentication</label>
                      </div>
                      <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
                    </div>
                    <input
                      type="checkbox"
                      className="toggle toggle-lg border-2 border-sky-300 [--tglbg:theme(colors.sky.500)] checked:bg-sky-500 hover:bg-sky-100"
                      checked={security.twoFactorEnabled}
                      onChange={handleEnable2FA}
                    />
                  </div>
                  {security.twoFactorEnabled && (
                    <div className="alert bg-gradient-to-r from-sky-100 to-cyan-100 border-2 border-sky-300">
                      <Shield className="h-5 w-5 text-sky-600" />
                      <p className="text-sm text-gray-800">
                        Two-factor authentication is enabled. You'll need to enter a code from your authenticator app
                        when signing in.
                      </p>
                    </div>
                  )}
                </div>

                <div className="divider"></div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">Active Sessions</h3>
                    <p className="text-sm text-gray-600">Manage devices where you're currently signed in</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border-2 border-sky-200 rounded-lg hover:border-sky-400 transition-all bg-gradient-to-r from-sky-50 to-transparent">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-lg">
                          <Monitor className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Chrome on MacBook Pro</p>
                          <p className="text-sm text-gray-600">San Francisco, CA • Active now</p>
                        </div>
                      </div>
                      <div className="badge badge-lg bg-gradient-to-r from-sky-500 to-cyan-600 text-white border-none">
                        Current
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border-2 border-sky-200 rounded-lg hover:border-sky-400 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-200 rounded-lg">
                          <Smartphone className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Safari on iPhone</p>
                          <p className="text-sm text-gray-600">San Francisco, CA • 2 hours ago</p>
                        </div>
                      </div>
                      <button className="btn btn-ghost btn-sm gap-2 hover:bg-red-100 hover:text-red-600">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-4 border-2 border-sky-200 rounded-lg hover:border-sky-400 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-200 rounded-lg">
                          <Monitor className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Firefox on Windows PC</p>
                          <p className="text-sm text-gray-600">New York, NY • 1 day ago</p>
                        </div>
                      </div>
                      <button className="btn btn-ghost btn-sm gap-2 hover:bg-red-100 hover:text-red-600">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>

                  <button className="btn btn-outline w-full border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white">
                    Sign Out All Other Sessions
                  </button>
                </div>

                <div className="divider"></div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800">Recent Activity</h3>
                    <p className="text-sm text-gray-600">View your recent login activity</p>
                  </div>
                  <button className="btn btn-outline border-2 border-sky-500 text-sky-600 hover:bg-sky-500 hover:text-white">
                    View Login History
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
