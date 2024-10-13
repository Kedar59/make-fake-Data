const faker = require('faker');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

async function generateFakeProfiles() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    // List of common country codes
    const countryCodes = ['+91', '+1', '+44', '+81', '+61', '+33', '+49', '+86'];
    
    try {
        await client.connect();
        const collection = client.db("trueCallerDB").collection("Profile");
        const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

        for (let i = 0; i < 100; i++) { // Adjust the number of profiles you want to generate
            let profile = {
                phoneNumber: faker.datatype.number({ min: 10000000, max: 9999999999 }).toString(), // 8 to 10-digit number as a string
                countryCode: getRandomElement(countryCodes), // Use the custom random element function
                name: faker.name.findName(),
                location: faker.address.city(),
                isVerified: true,
                numberOfSpamCallReports: 0,
                numberOfSpamSMSReports: 0,
                timestamp: new Date()
            };

            await collection.insertOne(profile);
        }

        console.log('Fake profiles generated successfully.');
    } finally {
        await client.close();
    }
}

generateFakeProfiles();
