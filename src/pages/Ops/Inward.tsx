import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { useContextStore } from '../../store/useContextStore';
import { Plus, Search, Pencil, Trash2, X as CloseIcon } from 'lucide-react';

interface MaterialRow {
  id: string;
  type: string;
  grade: string;
  spec: string;
  qty: number;
  unit: string;
  price: number;
  total: number;
}

interface TruckRow {
  id: string;
  vehicleNo: string;
  freight: number;
}

export default function Inward() {
  const { user } = useAuthStore();
  const { activeOrg, activeDept, activeSubDept } = useContextStore();
  const [records, setRecords] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    entry_date: new Date().toISOString().split('T')[0],
    invoice_no: '',
    purchase_from: '',
    sale_to: '',
    payment_cycle: 'Immediate',
    labour: 0,
    other_expenses: 0,
    payment_status: 'Pending',
    remark: ''
  });

  const [materials, setMaterials] = useState<MaterialRow[]>([]);
  const [trucks, setTrucks] = useState<TruckRow[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);

  const resetForm = () => {
    setFormData({
      entry_date: new Date().toISOString().split('T')[0],
      invoice_no: '',
      purchase_from: '',
      sale_to: '',
      payment_cycle: 'Immediate',
      labour: 0,
      other_expenses: 0,
      payment_status: 'Pending',
      remark: ''
    });
    setMaterials([{ id: crypto.randomUUID(), type: '', grade: '', spec: '', qty: 0, unit: 'Kg', price: 0, total: 0 }]);
    setTrucks([{ id: crypto.randomUUID(), vehicleNo: '', freight: 0 }]);
  };

  useEffect(() => {
    if (user) fetchRecords();
  }, [user, activeOrg, activeDept, activeSubDept]);

  const fetchRecords = async () => {
    let query = supabase
      .from('rmt_ops_inward')
      .select('*, materials:rmt_ops_inward_materials(*), trucks:rmt_ops_inward_trucks(*)')
      .eq('organization', activeOrg)
      .eq('department', activeDept);

    if (activeSubDept) query = query.eq('sub_department', activeSubDept);

    const { data, error } = await query.order('created_at', { ascending: false });
    if (!error && data) {
      setRecords(data);
    }

    // Fetch suppliers (Sellers from Pipeline and Onboarded)
    const { data: bdeData } = await supabase
      .from('rmt_bde_calls')
      .select('company_name')
      .eq('organization', activeOrg)
      .eq('department', activeDept)
      .ilike('status', '%Interested%')
      .ilike('business_role', '%Seller%');

    const { data: clientsData } = await supabase
      .from('rmt_clients')
      .select('company_name')
      .eq('organization', activeOrg)
      .eq('department', activeDept)
      .ilike('business_role', '%Seller%');

    const allSuppliers = [...(bdeData || []), ...(clientsData || [])];
    const uniqueSuppliers = Array.from(new Set(allSuppliers.map(s => s.company_name))).filter(Boolean);
    setSuppliers(uniqueSuppliers);
  };

  const handleEdit = (r: any) => {
    setFormData({
      entry_date: r.entry_date,
      invoice_no: r.invoice_no || '',
      purchase_from: r.purchase_from,
      sale_to: r.sale_to || '',
      payment_cycle: r.payment_cycle || 'Immediate',
      labour: r.labour || 0,
      other_expenses: r.other_expenses || 0,
      payment_status: r.payment_status || 'Pending',
      remark: r.remark || ''
    });
    
    if (r.materials && r.materials.length > 0) {
      setMaterials(r.materials.map((m: any) => ({
        id: crypto.randomUUID(), type: m.material_type, grade: m.grade || '', spec: m.colour_spec_note || '', 
        qty: m.qty, unit: m.unit, price: m.price_per_kg, total: m.total
      })));
    } else {
      setMaterials([{ id: crypto.randomUUID(), type: '', grade: '', spec: '', qty: 0, unit: 'Kg', price: 0, total: 0 }]);
    }

    if (r.trucks && r.trucks.length > 0) {
      setTrucks(r.trucks.map((t: any) => ({
        id: crypto.randomUUID(), vehicleNo: t.vehicle_no, freight: t.freight
      })));
    } else {
      setTrucks([{ id: crypto.randomUUID(), vehicleNo: '', freight: 0 }]);
    }
    
    setEditingId(r.id);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);

    const payload = {
      ...formData,
      user_id: user.id,
      organization: activeOrg,
      department: activeDept,
      sub_department: activeSubDept,
      role: 'Ops',
      updated_at: new Date().toISOString()
    };

    try {
      let inwardId = editingId;
      
      if (editingId) {
        await supabase.from('rmt_ops_inward').update(payload).eq('id', editingId);
        await supabase.from('rmt_ops_inward_materials').delete().eq('inward_id', editingId);
        await supabase.from('rmt_ops_inward_trucks').delete().eq('inward_id', editingId);
      } else {
        const { data, error } = await supabase.from('rmt_ops_inward').insert([payload]).select().single();
        if (error) throw error;
        inwardId = data.id;
      }

      if (inwardId) {
        const matPayload = materials.filter(m => m.type || m.qty > 0).map(m => ({
          inward_id: inwardId,
          material_type: m.type,
          grade: m.grade,
          colour_spec_note: m.spec,
          qty: m.qty,
          unit: m.unit,
          price_per_kg: m.price,
          total: m.qty * m.price
        }));
        if (matPayload.length > 0) await supabase.from('rmt_ops_inward_materials').insert(matPayload);

        const truckPayload = trucks.filter(t => t.vehicleNo || t.freight > 0).map(t => ({
          inward_id: inwardId,
          vehicle_no: t.vehicleNo,
          freight: t.freight
        }));
        if (truckPayload.length > 0) await supabase.from('rmt_ops_inward_trucks').insert(truckPayload);
      }

      fetchRecords();
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert('Error saving record.');
    }
    setIsSubmitting(false);
  };

  const filtered = records.filter(r => 
    !search || 
    r.purchase_from.toLowerCase().includes(search.toLowerCase()) || 
    r.invoice_no?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', minHeight: 'calc(100vh - 140px)' }}>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '250px', background: 'var(--surface-bg)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
          <input 
            placeholder="Search invoice or vendor..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
          />
        </div>
        <button onClick={() => { resetForm(); setEditingId(null); setIsModalOpen(true); }} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--text-emerald)', color: 'white', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
           <Plus size={18} /> New Purchase Entry
        </button>
      </div>

      {/* Basic Table to view entries */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-light)', overflow: 'auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', minWidth: '1000px', flex: 1 }}>
          <thead>
            <tr style={{ background: 'var(--surface-bg)', borderBottom: '1px solid var(--border-light)' }}>
              {['Sr', 'Date', 'Invoice #', 'Purchase From', 'Material', 'Grade', 'Qty', 'Unit', 'Price/Kg (₹)', 'Total (₹)', 'Freight (₹)', 'Labour (₹)', 'Other (₹)', 'Payment', 'Status', 'Actions'].map((h, i) => (
                <th key={h} style={{ padding: '1rem 0.5rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: i < 15 ? '1px solid var(--border-light)' : 'none', whiteSpace: 'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody style={{ height: filtered.length === 0 ? '100%' : 'auto' }}>
            {filtered.length === 0 ? (
              <tr><td colSpan={16} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)', height: '100%', verticalAlign: 'middle' }}>No inward entries found.</td></tr>
            ) : (
              filtered.flatMap((r, idx) => {
                const materials = r.materials && r.materials.length > 0 ? r.materials : [{}];
                const totalFreight = r.trucks?.reduce((sum: number, t: any) => sum + Number(t.freight || 0), 0) || 0;
                
                return materials.map((m: any, mIdx: number) => (
                  <tr key={`${r.id}-${m.id || mIdx}`} style={{ borderBottom: mIdx === materials.length - 1 ? '1px solid var(--border-light)' : '1px solid #f1f5f9', background: mIdx > 0 ? '#fafafa' : 'transparent' }}>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>{mIdx === 0 ? idx + 1 : ''}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>{mIdx === 0 ? new Date(r.entry_date).toLocaleDateString('en-GB') : ''}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem' }}>{mIdx === 0 ? (r.invoice_no || '-') : ''}</td>
                    <td style={{ padding: '0.75rem 0.5rem', color: 'var(--text-emerald)', fontWeight: '500', fontSize: '0.85rem' }}>{mIdx === 0 ? r.purchase_from : ''}</td>
                    
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem' }}>{m.material_type || '-'}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem' }}>{m.grade || '-'}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem' }}>{m.qty ? m.qty.toLocaleString() : '-'}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{m.unit || '-'}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem' }}>{m.price_per_kg ? `₹${m.price_per_kg}` : '-'}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', fontWeight: '500' }}>{m.total ? `₹${m.total.toLocaleString()}` : '-'}</td>
                    
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{mIdx === 0 ? (totalFreight > 0 ? `₹${totalFreight.toLocaleString()}` : '-') : ''}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{mIdx === 0 ? (r.labour > 0 ? `₹${r.labour.toLocaleString()}` : '-') : ''}</td>
                    <td style={{ padding: '0.75rem 0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{mIdx === 0 ? (r.other_expenses > 0 ? `₹${r.other_expenses.toLocaleString()}` : '-') : ''}</td>
                    
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {mIdx === 0 && (
                        <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', background: r.payment_status === 'Paid' ? '#dcfce7' : '#fefce8', color: r.payment_status === 'Paid' ? '#16a34a' : '#eab308' }}>{r.payment_status}</span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {mIdx === 0 && (
                        <span style={{ padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '600', background: r.status === 'In Transit' ? '#eff6ff' : '#dcfce7', color: r.status === 'In Transit' ? '#3b82f6' : '#16a34a' }}>{r.status || 'In Transit'}</span>
                      )}
                    </td>
                    <td style={{ padding: '0.75rem 0.5rem' }}>
                      {mIdx === 0 && (
                        <button onClick={() => handleEdit(r)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><Pencil size={16}/></button>
                      )}
                    </td>
                  </tr>
                ));
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Relational UI Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, padding: '3rem 1rem', backdropFilter: 'blur(4px)', overflowY: 'auto' }}>
          <div style={{ background: 'white', borderRadius: '12px', maxWidth: '1000px', width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-light)', flexShrink: 0 }}>
              <h3 style={{ margin: 0, color: 'var(--text-heading)', fontSize: '1.25rem', fontWeight: '700' }}>{editingId ? 'Edit Purchase Entry' : 'New Purchase Entry'}</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><CloseIcon size={20} /></button>
            </div>
            
            <div>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Date <span style={{color: 'red'}}>*</span></label>
                  <input required type="date" value={formData.entry_date} onChange={e => setFormData({...formData, entry_date: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Invoice No.</label>
                  <input placeholder="Optional" value={formData.invoice_no} onChange={e => setFormData({...formData, invoice_no: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Purchase From <span style={{color: 'red'}}>*</span></label>
                <select required value={formData.purchase_from} onChange={e => setFormData({...formData, purchase_from: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none', backgroundColor: 'white' }}>
                  <option value="">-- Select Supplier --</option>
                  {suppliers.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Sale To <span style={{fontWeight: 'normal', color: 'var(--text-muted)'}}>(optional — selecting auto-creates linked sale)</span></label>
                <input placeholder="— Select buyer (optional) —" value={formData.sale_to} onChange={e => setFormData({...formData, sale_to: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Payment Cycle</label>
                <select value={formData.payment_cycle} onChange={e => setFormData({...formData, payment_cycle: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none', background: 'white' }}>
                  <option>Immediate</option>
                  <option>7 Days</option>
                  <option>15 Days</option>
                  <option>30 Days</option>
                </select>
              </div>

              {/* Materials Section */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', display: 'block', marginBottom: '0.75rem' }}>Materials</label>
                <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', overflowX: 'auto' }}>
                  <div style={{ minWidth: '900px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr 0.8fr 0.8fr 1fr 1fr 40px', background: '#f8fafc', padding: '0.75rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>
                    <div>MATERIAL TYPE</div>
                    <div>GRADE</div>
                    <div>COLOUR / SPEC NOTE</div>
                    <div>QTY</div>
                    <div>UNIT</div>
                    <div>PRICE/KG (₹)</div>
                    <div>TOTAL (₹)</div>
                    <div></div>
                  </div>
                  {materials.map((m, index) => (
                    <div key={m.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr 0.8fr 0.8fr 1fr 1fr 40px', padding: '0.75rem', borderBottom: '1px solid var(--border-light)', gap: '0.5rem', alignItems: 'center' }}>
                      <select required value={m.type} onChange={e => setMaterials(materials.map(mat => mat.id === m.id ? {...mat, type: e.target.value} : mat))} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box', backgroundColor: 'white' }}>
                        <option value="" disabled>Select type...</option>
                        {['PP', 'LDPE', 'HDPE', 'PVC', 'PET', 'Grinding', 'Industrial Waste'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      <input placeholder="— pick type first" value={m.grade} onChange={e => setMaterials(materials.map(mat => mat.id === m.id ? {...mat, grade: e.target.value} : mat))} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box' }} />
                      <input placeholder="e.g. Natural, Black, L" value={m.spec} onChange={e => setMaterials(materials.map(mat => mat.id === m.id ? {...mat, spec: e.target.value} : mat))} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box' }} />
                      <input type="number" step="0.01" value={m.qty || ''} onChange={e => setMaterials(materials.map(mat => mat.id === m.id ? {...mat, qty: parseFloat(e.target.value) || 0} : mat))} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box' }} />
                      <select value={m.unit} onChange={e => setMaterials(materials.map(mat => mat.id === m.id ? {...mat, unit: e.target.value} : mat))} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box', background: 'white' }}>
                        <option>Kg</option><option>Ton</option>
                      </select>
                      <input type="number" step="0.01" value={m.price || ''} onChange={e => setMaterials(materials.map(mat => mat.id === m.id ? {...mat, price: parseFloat(e.target.value) || 0} : mat))} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box' }} />
                      <div style={{ padding: '0.5rem', background: '#f8fafc', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box', color: 'var(--text-muted)' }}>{(m.qty * m.price).toLocaleString()}</div>
                      <button type="button" onClick={() => setMaterials(materials.filter(mat => mat.id !== m.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><CloseIcon size={16}/></button>
                    </div>
                  ))}
                  <div style={{ padding: '0.75rem', background: 'white' }}>
                    <button type="button" onClick={() => setMaterials([...materials, { id: crypto.randomUUID(), type: '', grade: '', spec: '', qty: 0, unit: 'Kg', price: 0, total: 0 }])} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', color: '#0f766e', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}>
                      <Plus size={16} /> Add Row
                    </button>
                  </div>
                </div>
              </div>
            </div>

              {/* Trucks Section */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>Trucks / Logistics</label>
                  <button type="button" onClick={() => setTrucks([...trucks, { id: crypto.randomUUID(), vehicleNo: '', freight: 0 }])} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: '#0f766e', color: 'white', border: 'none', padding: '0.3rem 0.75rem', borderRadius: '20px', fontWeight: '600', cursor: 'pointer', fontSize: '0.75rem' }}>
                    <Plus size={14} /> Add Truck
                  </button>
                </div>
                <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', overflowX: 'auto' }}>
                  <div style={{ minWidth: '500px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 40px', background: '#f8fafc', padding: '0.75rem', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-light)' }}>
                    <div>#</div>
                    <div>Vehicle No</div>
                    <div>Freight (₹)</div>
                    <div></div>
                  </div>
                  {trucks.map((t, index) => (
                    <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 40px', padding: '0.75rem', borderBottom: '1px solid var(--border-light)', gap: '0.5rem', alignItems: 'center' }}>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{index + 1}</div>
                      <input placeholder="MH-XX-XXXX" value={t.vehicleNo} onChange={e => setTrucks(trucks.map(tr => tr.id === t.id ? {...tr, vehicleNo: e.target.value} : tr))} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box' }} />
                      <input type="number" value={t.freight || ''} onChange={e => setTrucks(trucks.map(tr => tr.id === t.id ? {...tr, freight: parseFloat(e.target.value) || 0} : tr))} style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-light)', width: '100%', boxSizing: 'border-box' }} />
                      <button type="button" onClick={() => setTrucks(trucks.filter(tr => tr.id !== t.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><CloseIcon size={16}/></button>
                    </div>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 1fr 40px', padding: '0.75rem', background: '#f8fafc', fontWeight: '600', fontSize: '0.85rem' }}>
                    <div></div>
                    <div>Total</div>
                    <div>₹{trucks.reduce((sum, t) => sum + (t.freight || 0), 0).toLocaleString()}</div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>

              {/* Bottom Expenses & Status */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Labour Cost (₹)</label>
                  <input type="number" value={formData.labour || ''} onChange={e => setFormData({...formData, labour: parseFloat(e.target.value) || 0})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Other Expenses</label>
                  <input type="number" value={formData.other_expenses || ''} onChange={e => setFormData({...formData, other_expenses: parseFloat(e.target.value) || 0})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Payment Status</label>
                  <select value={formData.payment_status} onChange={e => setFormData({...formData, payment_status: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none', background: 'white' }}>
                    <option>Pending</option>
                    <option>Partial</option>
                    <option>Paid</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-main)' }}>Remark</label>
                  <input value={formData.remark} onChange={e => setFormData({...formData, remark: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'white', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ background: '#0f766e', color: 'white', border: 'none', padding: '0.75rem 2.5rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>
                  {isSubmitting ? 'Saving...' : 'Save Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
