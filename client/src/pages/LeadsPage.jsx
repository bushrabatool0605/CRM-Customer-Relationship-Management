import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../utils/axios';

const LeadsPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (status !== 'All') params.status = status;

      const { data } = await API.get('/leads', { params });
      setLeads(data);
    } catch (err) {
      setError('Failed to fetch leads.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [status]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      await API.delete(`/leads/${id}`);
      setLeads((prev) => prev.filter((lead) => lead._id !== id));
    } catch (err) {
      setError('Failed to delete lead.');
    }
  };

  const getBadgeClass = (status) => {
    const map = {
      New: 'badge-new',
      Contacted: 'badge-contacted',
      Qualified: 'badge-qualified',
      Won: 'badge-won',
      Lost: 'badge-lost',
    };
    return map[status] || 'badge-new';
  };

  return (
    <Layout>
      <div className='page-header'>
        <h1>Leads</h1>
        <Link
          to='/leads/create'
          className='btn btn-primary'
          style={{ width: 'auto' }}
        >
          + Add Lead
        </Link>
      </div>

      {error && <div className='error-message'>{error}</div>}

      {/* Search + Filter */}
      <form onSubmit={handleSearch} className='leads-controls'>
        <input
          type='text'
          className='search-input'
          placeholder='Search by name, email or company...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className='filter-select'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value='All'>All Statuses</option>
          <option value='New'>New</option>
          <option value='Contacted'>Contacted</option>
          <option value='Qualified'>Qualified</option>
          <option value='Won'>Won</option>
          <option value='Lost'>Lost</option>
        </select>

        <button type='submit' className='btn btn-secondary'>
          Search
        </button>
      </form>

      {/* Table */}
      {loading ? (
        <div className='loading'>Loading leads...</div>
      ) : leads.length === 0 ? (
        <div className='empty-state'>
          <p>No leads found.</p>
          <Link
            to='/leads/create'
            className='btn btn-primary'
            style={{ width: 'auto' }}
          >
            Create your first lead
          </Link>
        </div>
      ) : (
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={lead._id}>
                  <td>{index + 1}</td>
                  <td>{lead.fullName}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.company}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td>
                    <div className='actions'>
                      <Link
                        to={`/leads/${lead._id}`}
                        className='btn btn-secondary btn-sm'
                      >
                        View
                      </Link>
                      <Link
                        to={`/leads/edit/${lead._id}`}
                        className='btn btn-primary btn-sm'
                        style={{ width: 'auto' }}
                      >
                        Edit
                      </Link>
                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => handleDelete(lead._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};

export default LeadsPage;