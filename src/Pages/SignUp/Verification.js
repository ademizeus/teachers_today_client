import React, { useState } from 'react';

const Verification = ({ verificationId, setShowVerification, signInWithPhoneCode }) => {
    const [verificationCode, setVerificationCode] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithPhoneCode(verificationId, verificationCode);
    };

    return (
        <div>
            <h2>Enter Verification Code</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter verification code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                />
                <button type="submit">Submit Verification Code</button>
            </form>
            <button onClick={() => setShowVerification(false)}>Cancel</button>
        </div>
    );
};

export default Verification;
