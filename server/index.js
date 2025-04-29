const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); // Load environment variables from .env

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

// API endpoint to save survey responses
app.post('/api/survey', async (req, res) => {
    const {
        lifestyle, q2_choice, q2a_influence, q2aa_frequent, q2b_payment, q2b_affect,
        q3_payment_option, q4_payment_influence, q5_flex_fare, q5a_try_again, q5aa_fairness,
        q6_show_up_hope, q6a_take_chance, q6aa_reaction, q7_courtesy_impact, q8_coupon_choice,
        q9_weather, q10_likelihood, q11_family_preference, q12_age_group, location
    } = req.body;

    const response_id = uuidv4();

    try {
        await pool.query(
            `INSERT INTO survey_responses (
        response_id, lifestyle, q2_choice, q2a_influence, q2aa_frequent, q2b_payment, q2b_affect,
        q3_payment_option, q4_payment_influence, q5_flex_fare, q5a_try_again, q5aa_fairness,
        q6_show_up_hope, q6a_take_chance, q6aa_reaction, q7_courtesy_impact, q8_coupon_choice,
        q9_weather, q10_likelihood, q11_family_preference, q12_age_group, location
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)`,
            [
                response_id, lifestyle, q2_choice, q2a_influence, q2aa_frequent, q2b_payment, q2b_affect,
                q3_payment_option, q4_payment_influence, q5_flex_fare, q5a_try_again, q5aa_fairness,
                q6_show_up_hope, q6a_take_chance, q6aa_reaction, q7_courtesy_impact, q8_coupon_choice,
                q9_weather, q10_likelihood, q11_family_preference, q12_age_group, location
            ]
        );
        res.status(201).json({ message: 'Survey response saved successfully', response_id });
    } catch (error) {
        console.error('Error saving survey response:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});