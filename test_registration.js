import fetch from 'node-fetch';

const testRegistration = async () => {
    try {
        const randomEmail = `student${Date.now()}@university.edu`;

        console.log('📝 Testing registration with:', randomEmail);

        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: 'Test User',
                email: randomEmail,
                password: 'password123',
                role: 'Student'
            })
        });

        const data = await response.json();

        console.log('Response Status:', response.status);
        console.log('Response Data:', data);

        if (response.ok) {
            console.log('✅ Registration successful!');
        } else {
            console.log('❌ Registration failed:', data.message);
        }
    } catch (error) {
        console.error('❌ Error during test:', error.message);
    }
};

testRegistration();
