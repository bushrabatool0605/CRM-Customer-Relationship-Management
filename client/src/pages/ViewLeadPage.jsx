import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../utils/axios';

const ViewLeadPage = () => {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const { data } = await API.get(`/leads/${id}`);
        setLead(data);
      } catch (err) {
        setError('Failed to fetch lead details.');
      } finally {
        setLoading(false);
      }
    };

    fetchLead();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;

    try {
      await API.delete(`/leads/${id}`);
      navigate('/leads');
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) return (
    <Layout>
      <div className='loading'>Loading lead details...</div>
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className='error-message'>{error}</div>
    </Layout>
  );

  return (
    <Layout>
      <div className='page-header'>
        <h1>Lead Details</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            to={`/leads/edit/${id}`}
            className='btn btn-primary'
            style={{ width: 'auto' }}
          >
            Edit Lead
          </Link>
          <button
            className='btn btn-danger'
            style={{ width: 'auto' }}
            onClick={handleDelete}
          >
            Delete
          </button>
          <Link
            to='/leads'
            className='btn btn-secondary'
            style={{ width: 'auto' }}
          >
            ← Back
          </Link>
        </div>
      </div>

      <div className='detail-card'>
        <div className='detail-row'>
          <span className='detail-label'>Full Name</span>
          <span className='detail-value'>{lead.fullName}</span>
        </div>
        <div className='detail-row'>
          <span className='detail-label'>Email</span>
          <span className='detail-value'>{lead.email}</span>
        </div>
        <div className='detail-row'>
          <span className='detail-label'>Phone</span>
          <span className='detail-value'>{lead.phone}</span>
        </div>
        <div className='detail-row'>
          <span className='detail-label'>Company</span>
          <span className='detail-value'>{lead.company}</span>
        </div>
        <div className='detail-row'>
          <span className='detail-label'>Status</span>
          <span className='detail-value'>
            <span className={`badge ${getBadgeClass(lead.status)}`}>
              {lead.status}
            </span>
          </span>
        </div>
        <div className='detail-row'>
          <span className='detail-label'>Created On</span>
          <span className='detail-value'>{formatDate(lead.createdAt)}</span>
        </div>
        <div className='detail-row'>
          <span className='detail-label'>Last Updated</span>
          <span className='detail-value'>{formatDate(lead.updatedAt)}</span>
        </div>
      </div>
    </Layout>
  );
};

export default ViewLeadPage;