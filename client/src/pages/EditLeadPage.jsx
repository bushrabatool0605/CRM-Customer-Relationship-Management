import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../utils/axios';

const EditLeadPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    status: 'New',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const { data } = await API.get(`/leads/${id}`);
        setFormData({
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          company: data.company,
          status: data.status,
        });
      } catch (err) {
        setError('Failed to fetch lead details.');
      } finally {
        setFetching(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await API.put(`/leads/${id}`, formData);
      navigate('/leads');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update lead.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <Layout>
      <div className='loading'>Loading lead details...</div>
    </Layout>
  );

  return (
    <Layout>
      <div className='page-header'>
        <h1>Edit Lead</h1>
        <Link to='/leads' className='btn btn-secondary' style={{ width: 'auto' }}>
          ← Back to Leads
        </Link>
      </div>

      <div className='form-card'>
        {error && <div className='error-message'>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <label>Full Name</label>
            <input
              type='text'
              name='fullName'
              placeholder='John Doe'
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label>Email Address</label>
            <input
              type='email'
              name='email'
              placeholder='john@company.com'
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label>Phone Number</label>
            <input
              type='text'
              name='phone'
              placeholder='03001234567'
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label>Company</label>
            <input
              type='text'
              name='company'
              placeholder='Tech Corp'
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>

          <div className='form-group'>
            <label>Status</label>
            <select
              name='status'
              value={formData.status}
              onChange={handleChange}
            >
              <option value='New'>New</option>
              <option value='Contacted'>Contacted</option>
              <option value='Qualified'>Qualified</option>
              <option value='Won'>Won</option>
              <option value='Lost'>Lost</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
            <Link
              to='/leads'
              className='btn btn-secondary'
              style={{ width: 'auto' }}
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditLeadPage;