import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { useContextStore } from '../store/useContextStore';
import { Plus, Trash2, Copy, CheckSquare, Square, ChevronDown, ChevronRight, Calendar as CalendarIcon, ChevronLeft } from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string | null;
  is_completed: boolean;
  parent_id: string | null;
  due_date: string | null;
  created_at: string;
}

export default function Workline() {
  const { user } = useAuthStore();
  const { activeOrg, activeDept, activeSubDept, activeRole } = useContextStore();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
  // UI states
  const [expandedTasks, setExpandedTasks] = useState<Set<string>>(new Set());
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [addingSubtaskId, setAddingSubtaskId] = useState<string | null>(null);
  const [subtaskTitle, setSubtaskTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  
  useEffect(() => {
    if (user) fetchTasks();
  }, [user, selectedDate, activeOrg, activeDept, activeSubDept, activeRole]);

  const fetchTasks = async () => {
    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(selectedDate);
    end.setHours(23, 59, 59, 999);

    let query = supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', user?.id)
      .eq('organization', activeOrg)
      .eq('department', activeDept)
      .eq('role', activeRole)
      .gte('due_date', start.toISOString())
      .lte('due_date', end.toISOString());
      
    if (activeSubDept) {
      query = query.eq('sub_department', activeSubDept);
    }

    const { data } = await query.order('created_at', { ascending: true });
    if (data) {
      setTasks(data);
      // Auto-expand parents that have incomplete subtasks
      const expanded = new Set<string>();
      data.forEach(t => {
        if (t.parent_id && !t.is_completed) expanded.add(t.parent_id);
      });
      setExpandedTasks(expanded);
    }
  };

  const addTask = async (parentId: string | null = null, title: string = newTaskTitle) => {
    if (!title.trim()) return;
    
    const { data } = await supabase.from('user_tasks').insert({
      user_id: user?.id,
      organization: activeOrg,
      department: activeDept,
      sub_department: activeSubDept,
      role: activeRole,
      title: title.trim(),
      parent_id: parentId,
      due_date: selectedDate.toISOString()
    }).select().single();

    if (data) {
      setTasks([...tasks, data]);
      if (!parentId) setNewTaskTitle('');
      else {
        setExpandedTasks(prev => new Set(prev).add(parentId));
      }
    }
  };

  const toggleTask = async (task: Task) => {
    const newStatus = !task.is_completed;
    setTasks(tasks.map(t => t.id === task.id ? { ...t, is_completed: newStatus } : t));
    await supabase.from('user_tasks').update({ is_completed: newStatus }).eq('id', task.id);
  };

  const confirmDeleteTask = async () => {
    if (!taskToDelete) return;
    const id = taskToDelete;
    
    setTasks(tasks.filter(t => t.id !== id && t.parent_id !== id));
    setTaskToDelete(null);
    await supabase.from('user_tasks').delete().eq('id', id);
  };

  const copyTaskToClipboard = (task: Task) => {
    let text = `${task.title}\n`;
    const subtasks = getSubtasks(task.id);
    subtasks.forEach(sub => {
      text += `- ${sub.title}\n`;
    });
    navigator.clipboard.writeText(text);
  };

  const copyAllTasksToClipboard = () => {
    let text = `Workline: ${format(selectedDate, 'MMM dd, yyyy')}\n\n`;
    rootTasks.forEach(task => {
      text += `${task.title}\n`;
      const subtasks = getSubtasks(task.id);
      subtasks.forEach(sub => {
        text += `- ${sub.title}\n`;
      });
      text += '\n';
    });
    navigator.clipboard.writeText(text.trim());
  };

  const saveEdit = async (id: string) => {
    if (!editTitle.trim()) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, title: editTitle.trim() } : t));
    setEditingTaskId(null);
    await supabase.from('user_tasks').update({ title: editTitle.trim() }).eq('id', id);
  };

  const toggleExpand = (id: string) => {
    const newSet = new Set(expandedTasks);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setExpandedTasks(newSet);
  };

  const rootTasks = tasks.filter(t => !t.parent_id);
  const getSubtasks = (parentId: string) => tasks.filter(t => t.parent_id === parentId);

  const renderTask = (task: Task, isSubtask = false) => {
    const subtasks = getSubtasks(task.id);
    const hasSubtasks = subtasks.length > 0;
    const isExpanded = expandedTasks.has(task.id);
    
    return (
      <div key={task.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: isSubtask ? 'clamp(1rem, 5vw, 2.5rem)' : '0' }}>
        
        <div style={{ 
          display: 'flex', alignItems: 'center', gap: '0.75rem', 
          background: 'white', padding: 'clamp(0.75rem, 2vw, 1rem)', borderRadius: '12px',
          border: '1px solid var(--border-light)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
          opacity: task.is_completed ? 0.6 : 1,
          transition: 'all 0.2s',
          flexWrap: 'wrap'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '200px' }}>
            {!isSubtask && (
              <button 
                onClick={() => toggleExpand(task.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0', color: 'var(--text-muted)', visibility: hasSubtasks ? 'visible' : 'hidden', display: 'flex' }}
              >
                {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>
            )}

            <button onClick={() => toggleTask(task)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: task.is_completed ? 'var(--text-emerald)' : 'var(--text-muted)', display: 'flex' }}>
              {task.is_completed ? <CheckSquare size={22} /> : <Square size={22} />}
            </button>

            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              {editingTaskId === task.id ? (
                <input 
                  autoFocus
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  onBlur={() => saveEdit(task.id)}
                  onKeyDown={e => e.key === 'Enter' && saveEdit(task.id)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid var(--text-emerald)', outline: 'none' }}
                />
              ) : (
                <span 
                  onClick={() => { setEditingTaskId(task.id); setEditTitle(task.title); }}
                  style={{ 
                    fontSize: '1rem', fontWeight: '500', cursor: 'text',
                    textDecoration: task.is_completed ? 'line-through' : 'none',
                    color: task.is_completed ? 'var(--text-muted)' : 'var(--text-main)',
                    wordBreak: 'break-word'
                  }}
                >
                  {task.title}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
            {!isSubtask && (
              <button title="Add Subtask" onClick={() => {
                setAddingSubtaskId(task.id);
                setSubtaskTitle('');
                setExpandedTasks(prev => new Set(prev).add(task.id));
              }} style={{ background: 'var(--surface-bg)', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-emerald)', display: 'flex' }}>
                <Plus size={16} />
              </button>
            )}
            <button title="Copy to Clipboard" onClick={() => copyTaskToClipboard(task)} style={{ background: 'var(--surface-bg)', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}>
              <Copy size={16} />
            </button>
            <button title="Delete Task" onClick={() => setTaskToDelete(task.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', border: 'none', padding: '0.4rem', borderRadius: '6px', cursor: 'pointer', color: '#ef4444', display: 'flex' }}>
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {addingSubtaskId === task.id && (
          <div style={{ marginLeft: isSubtask ? '0' : '1.5rem', marginTop: '0.25rem', marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}>
             <input 
               autoFocus
               placeholder="Subtask title..."
               value={subtaskTitle}
               onChange={e => setSubtaskTitle(e.target.value)}
               onKeyDown={e => {
                 if (e.key === 'Enter') {
                   addTask(task.id, subtaskTitle);
                   setAddingSubtaskId(null);
                   setSubtaskTitle('');
                 } else if (e.key === 'Escape') {
                   setAddingSubtaskId(null);
                 }
               }}
               style={{ flex: 1, minWidth: 0, padding: '0.65rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '0.9rem', outline: 'none' }}
             />
             <button onClick={() => { addTask(task.id, subtaskTitle); setAddingSubtaskId(null); setSubtaskTitle(''); }} style={{ background: 'var(--text-emerald)', color: 'white', border: 'none', padding: '0 1rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Add</button>
             <button onClick={() => setAddingSubtaskId(null)} style={{ background: 'none', border: 'none', padding: '0 0.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>Cancel</button>
          </div>
        )}

        {hasSubtasks && isExpanded && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.5rem', position: 'relative' }}>
             <div className="desktop-only" style={{ position: 'absolute', left: '-1.2rem', top: 0, bottom: '1rem', width: '2px', background: 'var(--border-light)' }} />
             {subtasks.map(sub => renderTask(sub, true))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-heading)', margin: '0 0 0.5rem 0' }}>Workline</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>Manage your tasks, subtasks, and daily workflows.</p>
      </div>

      {/* Control Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '-0.5rem' }}>
        {/* Date Navigator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.4rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
           <button onClick={() => setSelectedDate(subDays(selectedDate, 1))} style={{ background: 'var(--surface-bg)', border: 'none', padding: '0.4rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', color: 'var(--text-muted)' }}><ChevronLeft size={18} /></button>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', color: 'var(--text-heading)', minWidth: '130px', justifyContent: 'center', fontSize: '0.9rem' }}>
             <CalendarIcon size={16} color="var(--text-emerald)" />
             {format(selectedDate, 'MMM dd, yyyy')}
           </div>

           <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} style={{ background: 'var(--surface-bg)', border: 'none', padding: '0.4rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', color: 'var(--text-muted)' }}><ChevronRight size={18} /></button>
        </div>

        {/* Copy All Button (Only show if tasks exist) */}
        {rootTasks.length > 0 && (
          <button 
            onClick={copyAllTasksToClipboard}
            title="Copy Entire Workline"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-bg)', border: '1px solid var(--border-light)', padding: '0.6rem 1rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-main)', fontWeight: '500', transition: 'all 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--border-light)'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--surface-bg)'}
          >
            <Copy size={16} /> <span>Copy List</span>
          </button>
        )}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); addTask(); }} style={{ display: 'flex', gap: '1rem', background: 'white', padding: '1rem', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', flexWrap: 'wrap' }}>
        <input 
          placeholder="New task..."
          value={newTaskTitle}
          onChange={e => setNewTaskTitle(e.target.value)}
          style={{ flex: 1, minWidth: 0, padding: '0.75rem 1rem', borderRadius: '8px', border: 'none', background: 'var(--surface-bg)', fontSize: '0.95rem', outline: 'none' }}
        />
        <button type="submit" disabled={!newTaskTitle.trim()} style={{ background: newTaskTitle.trim() ? 'var(--text-emerald)' : '#cbd5e1', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: newTaskTitle.trim() ? 'pointer' : 'not-allowed', transition: 'all 0.2s', width: 'clamp(120px, 20vw, auto)' }}>
          Add Task
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingBottom: '4rem' }}>
        {rootTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <CheckSquare size={48} opacity={0.2} style={{ marginBottom: '1rem', display: 'inline-block' }} />
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-heading)' }}>All caught up!</h3>
            <p style={{ margin: 0 }}>You have no tasks in your workline. Add one above.</p>
          </div>
        ) : (
          rootTasks.map(task => renderTask(task))
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {taskToDelete && (() => {
        const ttd = tasks.find(t => t.id === taskToDelete);
        const hasChildren = tasks.some(t => t.parent_id === taskToDelete);
        return (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(2px)' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' }}>
              <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-heading)', fontSize: '1.25rem' }}>Confirm Deletion</h3>
              <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {hasChildren 
                  ? <>Are you sure you want to delete <strong>"{ttd?.title}"</strong> and all of its subtasks? This cannot be undone.</>
                  : <>Are you sure you want to delete <strong>"{ttd?.title}"</strong>? This cannot be undone.</>
                }
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button onClick={() => setTaskToDelete(null)} style={{ background: 'var(--surface-bg)', color: 'var(--text-main)', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background='var(--border-light)'} onMouseOut={e => e.currentTarget.style.background='var(--surface-bg)'}>No, Cancel</button>
                <button onClick={confirmDeleteTask} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity='0.9'} onMouseOut={e => e.currentTarget.style.opacity='1'}>Yes, Delete</button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
