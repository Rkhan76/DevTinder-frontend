import { Bookmark, Users, Mail, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom' // ✅ FIXED import

const menuItems = [
  {
    icon: <Bookmark className="w-5 h-5" />,
    label: 'Saved items',
    link: '/my-item/saved-posts',
  },
  {
    icon: <Users className="w-5 h-5" />,
    label: 'Groups',
    link: '/groups',
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: 'Newsletters',
    link: '/newsletters',
  },
  {
    icon: <Calendar className="w-5 h-5" />,
    label: 'Events',
    link: '/events',
  },
]

export default function SidebarMenu() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.link}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0"
        >
          <span className="text-slate-600">{item.icon}</span>
          <span className="font-medium text-sm">{item.label}</span>
        </Link>
      ))}
    </div>
  )
}
