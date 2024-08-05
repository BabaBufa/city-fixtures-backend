app.get('/fixtures', async (req, res) => {
    try {
        const response = await axios.get('https://api.football-data.org/v4/matches'); // Wstaw URL do API
        const fixtures = response.data;

        // Przykładowa struktura danych
        const formattedFixtures = fixtures.map(fixture => ({
            date: fixture.date,
            opponent: fixture.opponent,
            venue: fixture.venue
        }));

        res.json(formattedFixtures);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching fixtures' });
    }
});
