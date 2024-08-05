const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Wstaw swój klucz API Football Data
const API_KEY = '4e21b9920a0a4955bc0068d9f0ca61ce';
const TEAM_ID = 65;

app.get('/fixtures', async (req, res) => {
    try {
        const response = await axios.get(`http://api.football-data.org/v4/teams/${TEAM_ID}/matches`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        const matches = response.data.matches;

            const fixtures = matches.map(match => ({
                date: match.utcDate,
                homeTeam: {
                    name: match.homeTeam.name,
                    crest: match.homeTeam.crest
                },
                opponent: {
                    name: match.awayTeam.name,
                    crest: match.awayTeam.crest
                },
                venue: match.venue || 'Unknown'
            }));

        res.json(fixtures);
    } catch (error) {
        console.error('Error fetching fixtures:', error);
        res.status(500).json({ message: 'Error fetching fixtures' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
