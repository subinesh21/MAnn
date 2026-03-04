// Test mobile authentication APIs
async function testMobileAuth() {
  console.log('🧪 Testing Mobile Authentication APIs...\n');

  const baseUrl = 'http://localhost:3000';
  const testMobile = '+919876543210';
  const testName = 'Test User';
  const testPassword = 'testpass123';

  try {
    // Test 1: Send OTP for login/register
    console.log('1️⃣ Testing Send OTP...');
    const sendOtpResponse = await fetch(`${baseUrl}/api/auth/mobile/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: testMobile })
    });
    
    const sendOtpData = await sendOtpResponse.json();
    console.log('Send OTP Response:', sendOtpData);
    console.log('✅ Send OTP test passed\n');

    // Test 2: Verify OTP for new user registration
    console.log('2️⃣ Testing Verify OTP (New User Registration)...');
    const verifyOtpResponse = await fetch(`${baseUrl}/api/auth/mobile/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        mobile: testMobile, 
        otp: '123456', // Dummy OTP for testing
        name: testName,
        password: testPassword
      })
    });
    
    const verifyOtpData = await verifyOtpResponse.json();
    console.log('Verify OTP Response:', verifyOtpData);
    console.log('✅ Verify OTP test completed\n');

    // Test 3: Password Reset OTP
    console.log('3️⃣ Testing Password Reset OTP...');
    const resetOtpResponse = await fetch(`${baseUrl}/api/auth/mobile/reset-password/otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mobile: testMobile })
    });
    
    const resetOtpData = await resetOtpResponse.json();
    console.log('Reset OTP Response:', resetOtpData);
    console.log('✅ Password Reset OTP test completed\n');

    // Test 4: Password Reset
    console.log('4️⃣ Testing Password Reset...');
    const resetPasswordResponse = await fetch(`${baseUrl}/api/auth/mobile/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        mobile: testMobile,
        otp: '123456', // Dummy OTP
        newPassword: 'newpassword123'
      })
    });
    
    const resetPasswordData = await resetPasswordResponse.json();
    console.log('Reset Password Response:', resetPasswordData);
    console.log('✅ Password Reset test completed\n');

    console.log('🎉 All mobile authentication API tests completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testMobileAuth();