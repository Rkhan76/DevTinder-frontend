import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Users, MessageSquare, Bell, Home } from 'lucide-react'

export function MyNetworkHeader() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="text-blue-600 font-bold text-xl">LinkedIn</div>

            <nav className="hidden md:flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1 text-blue-600"
              >
                <Users className="w-4 h-4" />
                <span>My Network</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-1"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Messaging</span>
              </Button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search"
                className="pl-10 bg-gray-100 border-none"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </header>
  )
}
