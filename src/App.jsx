import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { LayoutGrid, Globe, Plus, Edit2, Trash2, ArrowLeft, ExternalLink, X } from 'lucide-react'

const STORAGE_KEY = 'devappkavita_items'

const defaultItems = [
  {
    id: '1',
    title: 'Devapp Store',
    description: 'A modern app showcase and store platform built with React',
    category: 'website',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200',
    link: '#',
    createdAt: Date.now()
  },
  {
    id: '2',
    title: 'TaskMaster',
    description: 'Productivity app to manage your daily tasks efficiently',
    category: 'app',
    imageUrl: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200',
    link: '#',
    createdAt: Date.now()
  }
]

function getItems() {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : defaultItems
}

function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

function Home() {
  const [items, setItems] = useState(getItems())
  const [filter, setFilter] = useState('all')

  const filteredItems = filter === 'all' 
    ? items 
    : items.filter(item => item.category === filter)

  return (
    <div className="app-container">
      <header className="header">
        <Link to="/" className="logo">DevappKavita</Link>
        <nav className="nav-links">
          <a href="#apps">Apps</a>
          <a href="#websites">Websites</a>
          <a href="#about">About</a>
        </nav>
        <Link to="/admin" className="admin-btn">Dashboard</Link>
      </header>

      <section className="hero">
        <h1>Welcome to <span>DevappKavita</span></h1>
        <p>Your personal showcase for apps and websites. Discover my projects or manage them from the dashboard.</p>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-number">{items.filter(i => i.category === 'app').length}</div>
            <div className="stat-label">Apps</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{items.filter(i => i.category === 'website').length}</div>
            <div className="stat-label">Websites</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">{items.length}</div>
            <div className="stat-label">Total Projects</div>
          </div>
        </div>
      </section>

      <div className="tabs">
        <button 
          className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`tab-btn ${filter === 'app' ? 'active' : ''}`}
          onClick={() => setFilter('app')}
        >
          <LayoutGrid size={16} /> Apps
        </button>
        <button 
          className={`tab-btn ${filter === 'website' ? 'active' : ''}`}
          onClick={() => setFilter('website')}
        >
          <Globe size={16} /> Websites
        </button>
      </div>

      <div className="content-grid">
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className="card"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="card-icon">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} />
              ) : (
                item.category === 'app' ? <LayoutGrid size={24} /> : <Globe size={24} />
              )}
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="card-meta">
              <span className="category-badge">{item.category}</span>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="view-btn"
              >
                View <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="empty-state">
          <h3>No projects found</h3>
          <p>No {filter === 'all' ? '' : filter} projects yet. Add some from the dashboard!</p>
        </div>
      )}

      <footer className="footer">
        <p>© 2026 DevappKavita. Built with passion.</p>
      </footer>
    </div>
  )
}

function Admin() {
  const [items, setItems] = useState(getItems())
  const [showModal, setShowModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    saveItems(items)
  }, [items])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleAdd = (newItem) => {
    const item = {
      ...newItem,
      id: Date.now().toString(),
      createdAt: Date.now()
    }
    setItems([...items, item])
    setShowModal(false)
    showToast('Item added successfully!')
  }

  const handleEdit = (updatedItem) => {
    setItems(items.map(item => 
      item.id === editingItem.id ? { ...updatedItem, id: item.id, createdAt: item.createdAt } : item
    ))
    setEditingItem(null)
    setShowModal(false)
    showToast('Item updated successfully!')
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setItems(items.filter(item => item.id !== id))
      showToast('Item deleted successfully!')
    }
  }

  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">DevappKavita</div>
        <nav className="sidebar-nav">
          <Link to="/" className="sidebar-link">
            <LayoutGrid size={18} /> All Items
          </Link>
          <Link to="/" className="sidebar-link">
            <Globe size={18} /> View Site
          </Link>
        </nav>
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to Site
        </Link>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>Dashboard</h1>
          <button className="add-btn" onClick={() => { setEditingItem(null); setShowModal(true) }}>
            <Plus size={18} /> Add New
          </button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Category</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="table-icon">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} />
                    ) : (
                      item.category === 'app' ? <LayoutGrid size={20} /> : <Globe size={20} />
                    )}
                  </div>
                </td>
                <td>{item.title}</td>
                <td><span className="category-badge">{item.category}</span></td>
                <td>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)' }}>
                    {item.link.substring(0, 30)}...
                  </a>
                </td>
                <td>
                  <div className="table-actions">
                    <button 
                      className="action-btn"
                      onClick={() => { setEditingItem(item); setShowModal(true) }}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {items.length === 0 && (
          <div className="empty-state">
            <h3>No items yet</h3>
            <p>Click "Add New" to create your first project!</p>
          </div>
        )}
      </main>

      {showModal && (
        <ItemModal 
          item={editingItem}
          onSave={editingItem ? handleEdit : handleAdd}
          onClose={() => { setShowModal(false); setEditingItem(null) }}
        />
      )}

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

function ItemModal({ item, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    category: item?.category || 'app',
    imageUrl: item?.imageUrl || '',
    link: item?.link || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>{item ? 'Edit Item' : 'Add New Item'}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required 
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select 
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="app">App</option>
              <option value="website">Website</option>
            </select>
          </div>
          <div className="form-group">
            <label>Image URL</label>
            <input 
              type="url" 
              value={formData.imageUrl}
              onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="form-group">
            <label>Link URL</label>
            <input 
              type="url" 
              value={formData.link}
              onChange={e => setFormData({ ...formData, link: e.target.value })}
              required 
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="save-btn">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App