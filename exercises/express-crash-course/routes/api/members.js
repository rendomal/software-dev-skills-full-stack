const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const members = require('../../Members');

// NOTE we can use the same ROUTE multiple times as long as its different METHOD ('/' we use .get() and .post() -- but cannot use .get() twice for eg '/')

// Note: using just '/' since "app.use('/api/members', require('./routes/api/members'));" gives us the /api/members

// Gets all members
router.get('/', (req, res) => res.json(members));

// Get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

// Create Member (you should use POST method) ('/' is again /api/members)
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'No name or email included' });
    }

    members.push(newMember);
    // res.json(members);
    res.redirect('/');
});

// Update Member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updateMember = req.body;

        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.email ? updateMember.email : member.email;

                res.json({ msg: "Member updated", member });
            }
        });
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

// Delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.json({ msg: 'Member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
    }
});

module.exports = router;