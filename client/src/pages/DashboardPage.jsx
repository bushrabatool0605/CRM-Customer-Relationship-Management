import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import API from '../utils/axios';

const DashboardPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const { data } = await API.get('/leads');
        setLeads(data);
      } catch (error) {
        console.error('Failed to fetch leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  const getCount = (status) =>
    leads.filter((lead) => lead.status === status).length;

  const stats = [
    { label: 'Total Leads',  value: leads.length,         color: '#667eea' },
    { label: 'New',          value: getCount('New'),       color: '#1677ff' },
    { label: 'Contacted',    value: getCount('Contacted'), color: '#fa8c16' },
    { label: 'Qualified',    value: getCount('Qualified'), color: '#52c41a' },
    { label: 'Won',          value: getCount('Won'),       color: '#722ed1' },
    { label: 'Lost',         value: getCount('Lost'),      color: '#ff4d4f' },
  ];

  const recentLeads = leads.slice(0, 5);

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
        <h1>Dashboard</h1>
        <Link to='/leads/create' className='btn btn-primary' style={{ width: 'auto' }}>
          + Add Lead
        </Link>
      </div>

      {loading ? (
        <div className='loading'>Loading...</div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className='stats-grid'>
            {stats.map((stat) => (
              <div className='stat-card' key={stat.label}>
                <h3>{stat.label}</h3>
                <div className='stat-number' style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Leads */}
          <div className='table-container'>
            <div style={{ padding: '20px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e1e2e' }}>
                Recent Leads
              </h2>
              <Link to='/leads' style={{ fontSize: '13px', color: '#667eea', fontWeight: '600' }}>
                View All →
              </Link>
            </div>

            {recentLeads.length === 0 ? (
              <div className='empty-state'>
                <p>No leads yet.</p>
                <Link to='/leads/create' className='btn btn-primary' style={{ width: 'auto' }}>
                  Create your first lead
                </Link>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead) => (
                    <tr key={lead._id}>
                      <td>{lead.fullName}</td>
                      <td>{lead.email}</td>
                      <td>{lead.company}</td>
                      <td>
                        <span className={`badge ${getBadgeClass(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          to={`/leads/${lead._id}`}
                          className='btn btn-secondary btn-sm'
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default DashboardPage;