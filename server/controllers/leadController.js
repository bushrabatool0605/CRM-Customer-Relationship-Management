const Lead = require('../models/Lead');

const getLeads = async (req, res) => {
  try {
    const { search, status } = req.query;

    // Admin sab leads dekh sakta hai
    let query = req.user.role === 'admin' ? {} : { createdBy: req.user._id };

    if (status && status !== 'All') {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
      ];
    }

    const leads = await Lead.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (req.user.role !== 'admin' && lead.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createLead = async (req, res) => {
  try {
    const { fullName, email, phone, company, status } = req.body;

    if (!fullName || !email || !phone || !company) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const lead = await Lead.create({
      fullName,
      email,
      phone,
      company,
      status: status || 'New',
      createdBy: req.user._id,
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (req.user.role !== 'admin' && lead.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedLead);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (req.user.role !== 'admin' && lead.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await lead.deleteOne();

    res.json({ message: 'Lead removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getLeads, getLead, createLead, updateLead, deleteLead };