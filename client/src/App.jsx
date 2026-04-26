import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus, Trash2, Briefcase, Calendar, MapPin, Search } from 'lucide-react';
import { addApplication, removeApplication } from './store/slices/jobSlice';

function App() {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const applications = useSelector((state) => state.jobs.applications);
  const dispatch = useDispatch();

  const handleTrack = (e) => {
    e.preventDefault();
    if (!title || !company) return;
    
    dispatch(addApplication({
      id: Date.now(),
      title,
      company,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    }));
    setTitle('');
    setCompany('');
  };

  return (
    <div className="min-h-screen w-full bg-[#09090b] text-zinc-100 p-8 font-sans selection:bg-indigo-500/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>

      <main className="relative max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <header className="flex justify-between items-end border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              JobTrail
            </h1>
            <p className="text-zinc-500 mt-2">Track your career journey with precision.</p>
          </div>
          <div className="flex gap-4 text-right">
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-600 font-bold">Applications</p>
              <p className="text-2xl font-mono">{applications.length}</p>
            </div>
          </div>
        </header>

        {/* Input Form */}
        <form onSubmit={handleTrack} className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-6 rounded-3xl shadow-2xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                <Briefcase size={18} />
              </div>
              <input
                type="text"
                placeholder="Role Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-zinc-700"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                placeholder="Company Name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all placeholder:text-zinc-700"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-indigo-500/20"
          >
            <Plus size={20} />
            Add Application
          </button>
        </form>

        {/* List */}
        <div className="space-y-4">
          {applications.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-zinc-800 rounded-3xl">
              <Search className="mx-auto text-zinc-700 mb-4" size={48} strokeWidth={1} />
              <p className="text-zinc-500">Your trail starts here. Add your first application above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {applications.map((app, index) => (
                <div
                  key={app.id}
                  className="group bg-zinc-900/40 hover:bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 p-5 rounded-2xl flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/5 transition-colors">
                      <Briefcase className="text-zinc-500 group-hover:text-indigo-400" size={20} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{app.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1.5"><MapPin size={14} /> {app.company}</span>
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {app.date}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeApplication(index))}
                    className="p-3 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
