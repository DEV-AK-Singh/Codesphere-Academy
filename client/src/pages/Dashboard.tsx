import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Mail, 
  Calendar,  
  Trash2, 
  ExternalLink,
  ChevronLeft,
  Moon,
  Sun,
  LayoutDashboard,
  LogOut,
  BookOpen,
  Plus,
  X,
  Menu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { type Lead } from '../types';
import { type Course } from '../constants';

interface DashboardProps {
  leads: Lead[];
  courses: Course[];
  onUpdateStatus: (id: string, status: Lead['status']) => void;
  onDeleteLead: (id: string) => void;
  onAddCourse: (course: Omit<Course, 'icon'>) => void;
  onDeleteCourse: (id: string) => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  onLogout: () => void;
}

export default function Dashboard({ 
  leads, 
  courses,
  onUpdateStatus, 
  onDeleteLead, 
  onAddCourse,
  onDeleteCourse,
  isDarkMode, 
  setIsDarkMode,
  onLogout
}: DashboardProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'leads' | 'courses'>('leads');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({
    id: '',
    title: '',
    description: '',
    techStack: '',
    nextBatch: ''
  });

  const handleAddCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddCourse({
      ...newCourse,
      techStack: newCourse.techStack.split(',').map(s => s.trim())
    });
    setNewCourse({ id: '', title: '', description: '', techStack: '', nextBatch: '' });
    setIsAddCourseOpen(false);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20';
      case 'contacted': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'enrolled': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-100 md:hidden"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`fixed top-0 left-0 bottom-0 w-72 z-101 p-6 flex flex-col md:hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-r border-white/5' : 'bg-white border-r border-slate-200 shadow-2xl'}`}
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-cyan-400 to-purple-600 flex items-center justify-center">
                    <LayoutDashboard className="text-white w-6 h-6" />
                  </div>
                  <span className="font-bold text-lg">Admin Hub</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-slate-100'}`}>
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-2 grow">
                <button 
                  onClick={() => { setActiveTab('leads'); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === 'leads' 
                      ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-900 text-white shadow-lg') 
                      : (isDarkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')
                  }`}
                >
                  <Users size={18} /> Leads
                </button>
                <button 
                  onClick={() => { setActiveTab('courses'); setIsMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                    activeTab === 'courses' 
                      ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-900 text-white shadow-lg') 
                      : (isDarkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')
                  }`}
                >
                  <BookOpen size={18} /> Courses
                </button>
              </nav>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:bg-white/5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />} 
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
                <button 
                  onClick={onLogout}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-red-500 hover:bg-red-500/10`}
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop */}
      <aside className={`hidden md:flex flex-col w-64 border-r p-6 sticky top-0 h-screen transition-colors duration-500 ${isDarkMode ? 'bg-slate-950/50 border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-cyan-400 to-purple-600 flex items-center justify-center">
            <LayoutDashboard className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-lg">Admin<span className="font-normal opacity-60">Hub</span></span>
        </div>

        <nav className="space-y-2 grow">
          <button 
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'leads' 
                ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-900 text-white shadow-lg') 
                : (isDarkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')
            }`}
          >
            <Users size={18} /> Leads
          </button>
          <button 
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'courses' 
                ? (isDarkMode ? 'bg-cyan-500/10 text-cyan-400' : 'bg-slate-900 text-white shadow-lg') 
                : (isDarkMode ? 'text-slate-400 hover:bg-white/5' : 'text-slate-600 hover:bg-slate-100')
            }`}
          >
            <BookOpen size={18} /> Courses
          </button>
        </nav>

        <div className="space-y-4 pt-6 border-t border-white/5">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all hover:bg-white/5 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />} 
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button 
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all text-red-500 hover:bg-red-500/10`}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className={`md:hidden p-4 border-b flex justify-between items-center z-50 sticky top-0 backdrop-blur-md ${isDarkMode ? 'bg-slate-950/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/5 text-white' : 'hover:bg-slate-100 text-slate-900'}`}
          >
            <Menu size={20} />
          </button>
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-cyan-400 to-purple-600 flex items-center justify-center">
            <LayoutDashboard className="text-white w-4 h-4" />
          </div>
          <span className="font-bold">Admin Hub</span>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)} 
            className={`p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="grow p-4 md:p-10 lg:p-16 max-w-7xl mx-auto w-full custom-scrollbar overflow-y-auto">
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <button 
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 text-xs font-semibold mb-4 hover:text-cyan-500 transition-colors ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}
            >
              <ChevronLeft size={14} /> Back to site
            </button>
            <h1 className="text-3xl md:text-4xl font-bold font-display">
              {activeTab === 'leads' ? 'Lead Management' : 'Course Management'}
            </h1>
            <p className={`mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {activeTab === 'leads' ? 'Manage and track course inquiries' : 'Manage your academy curriculum'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {activeTab === 'leads' ? (
              <>
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} size={18} />
                  <input 
                    type="text" 
                    placeholder="Search leads..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-12 pr-4 py-3 rounded-2xl border outline-none min-w-65 focus:border-cyan-400 transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-white border-slate-200 shadow-sm'}`}
                  />
                </div>
                <div className="relative">
                  <Filter className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} size={18} />
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className={`pl-12 pr-10 py-3 rounded-2xl border outline-none appearance-none focus:border-cyan-400 transition-all ${isDarkMode ? 'bg-slate-900 border-white/10 text-white' : 'bg-white border-slate-200 shadow-sm'}`}
                  >
                    <option value="all" className={isDarkMode ? 'bg-slate-900' : ''}>All Status</option>
                    <option value="new" className={isDarkMode ? 'bg-slate-900' : ''}>New</option>
                    <option value="contacted" className={isDarkMode ? 'bg-slate-900' : ''}>Contacted</option>
                    <option value="enrolled" className={isDarkMode ? 'bg-slate-900' : ''}>Enrolled</option>
                  </select>
                </div>
              </>
            ) : (
                <button 
                  onClick={() => setIsAddCourseOpen(true)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${isDarkMode ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-slate-900 text-white shadow-xl shadow-slate-900/10'}`}
                >
                  <Plus size={18} /> Add New Course
                </button>
            )}
          </div>
        </header>

        {activeTab === 'leads' ? (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
              {[
                { label: 'Total Leads', val: leads.length, color: 'text-white' },
                { label: 'New', val: leads.filter(l => l.status === 'new').length, color: 'text-cyan-500' },
                { label: 'Contacted', val: leads.filter(l => l.status === 'contacted').length, color: 'text-amber-500' },
                { label: 'Enrolled', val: leads.filter(l => l.status === 'enrolled').length, color: 'text-emerald-500' },
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-sm font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>{stat.label}</div>
                  <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.val}</div>
                </div>
              ))}
            </div>

            {/* Leads Table */}
            <div className={`rounded-3xl border overflow-hidden ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl shadow-slate-200/20'}`}>
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead>
                    <tr className={`border-b transition-colors ${isDarkMode ? 'border-white/5 bg-white/2' : 'border-slate-100 bg-slate-50/50'}`}>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest opacity-50">Lead Details</th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest opacity-50">Status</th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest opacity-50">Date</th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest opacity-50">Message</th>
                      <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest opacity-50 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <AnimatePresence>
                      {filteredLeads.map((lead) => (
                        <motion.tr 
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          key={lead.id} 
                          className={`group transition-colors ${isDarkMode ? 'hover:bg-white/2' : 'hover:bg-slate-50'}`}
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${isDarkMode ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}`}>
                                {lead.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-bold">{lead.name}</div>
                                <div className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                                  <Mail size={12} /> {lead.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select 
                              value={lead.status}
                              onChange={(e) => onUpdateStatus(lead.id, e.target.value as Lead['status'])}
                              className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border bg-transparent outline-none cursor-pointer ${getStatusColor(lead.status)}`}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="enrolled">Enrolled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`text-xs flex items-center gap-1 opacity-70`}>
                              <Calendar size={12} /> {new Date(lead.timestamp).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className={`text-xs max-w-50 truncate ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                              {lead.message}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => onDeleteLead(lead.id)}
                                className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                                title="Delete Lead"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                    {filteredLeads.length === 0 && (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center gap-4 opacity-30">
                            <Users size={48} />
                            <p className="font-medium">No leads found</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className={`p-6 rounded-3xl border transition-all hover:scale-[1.02] ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-md'}`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDarkMode ? 'bg-white/10' : 'bg-slate-100'}`}>
                    <course.icon size={24} className="text-cyan-500" />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onDeleteCourse(course.id)}
                      className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button className={isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-600'}><MoreVertical size={18} /></button>
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2">{course.title}</h3>
                <p className={`text-xs mb-6 line-clamp-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{course.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-500">{course.nextBatch}</div>
                    <div className={isDarkMode ? 'text-slate-500' : 'text-slate-400'}><ExternalLink size={14} /></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Course Modal */}
      <AnimatePresence>
        {isAddCourseOpen && (
          <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddCourseOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-lg rounded-3xl border p-8 md:p-10 transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-2xl'}`}
            >
              <button 
                onClick={() => setIsAddCourseOpen(false)}
                className={`absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 ${isDarkMode ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <X size={20} />
              </button>
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold font-display text-cyan-500">Add New Course</h3>
                <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Expand your academy with new curriculum.</p>
              </div>

              <form onSubmit={handleAddCourseSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className={`text-[10px] uppercase tracking-widest mb-2 block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Course Title</label>
                    <input 
                      required
                      value={newCourse.title}
                      onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                      type="text" 
                      placeholder="e.g. Master React Native" 
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} 
                    />
                  </div>
                  <div>
                    <label className={`text-[10px] uppercase tracking-widest mb-2 block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Description</label>
                    <textarea 
                      required
                      value={newCourse.description}
                      onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                      rows={2} 
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 transition-all resize-none text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`text-[10px] uppercase tracking-widest mb-2 block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Tech Stack (CSV)</label>
                      <input 
                        required
                        value={newCourse.techStack}
                        onChange={(e) => setNewCourse({...newCourse, techStack: e.target.value})}
                        type="text" 
                        placeholder="React, AWS, Node" 
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} 
                      />
                    </div>
                    <div>
                      <label className={`text-[10px] uppercase tracking-widest mb-2 block font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Next Batch Date</label>
                      <input 
                        required
                        value={newCourse.nextBatch}
                        onChange={(e) => setNewCourse({...newCourse, nextBatch: e.target.value})}
                        type="text" 
                        placeholder="June 15" 
                        className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:border-cyan-400 transition-all text-sm ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`} 
                      />
                    </div>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="w-full py-4 bg-cyan-500 text-black font-bold rounded-xl hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20 active:scale-[0.98]"
                >
                  Create Course
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
