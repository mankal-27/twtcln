import axios from 'axios';
import fs from 'fs';

// Load user data from JSON file or manually define the users
const users = JSON.parse(fs.readFileSync('backend/lib/utils/dummyData.json', 'utf-8')); // Or manually define an array of user objects

// Replace with your actual signup endpoint URL
const signupEndpoint = 'http://localhost:5000/api/auth/signup';

async function createUsers() {
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        try {
            const response = await axios.post(signupEndpoint, user);
            console.log(`User created: ${response.data.username}`);
        } catch (error) {
            console.error(`Error creating user ${user.username}: ${error.response?.data?.error || error.message}`);
        }
    }
}

createUsers();
