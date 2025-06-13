'use client';

import { useState } from 'react';

export default function TestNotifications() {
  const [testEmail, setTestEmail] = useState('');
  const [testName, setTestName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const sendTestEmail = async () => {
    if (!testEmail || !testName) {
      setMessage('Please enter both email and name');
      setMessageType('error');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail,
          name: testName,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage('Test email sent successfully! Check your inbox.');
        setMessageType('success');
        setTestEmail('');
        setTestName('');
      } else {
        setMessage(result.message || 'Failed to send test email');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error occurred');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  const runBatchCheck = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/check-notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        setMessage(`Batch check completed! ${result.notificationsSent} notifications sent.`);
        setMessageType('success');
      } else {
        setMessage(result.message || 'Failed to run batch check');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error occurred');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Email Notification Testing
          </h1>
          <p className="text-gray-600">
            Test the MyID email notification system
          </p>
        </div>

        {/* Test Email Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            📧 Send Test Email
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Name
              </label>
              <input
                type="text"
                id="testName"
                value={testName}
                onChange={(e) => setTestName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter recipient name"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="testEmail" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="testEmail"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email address"
                disabled={isLoading}
              />
            </div>

            <button
              onClick={sendTestEmail}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Sending...' : 'Send Test Email'}
            </button>
          </div>
        </div>

        {/* Batch Check Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            🔍 Batch Notification Check
          </h2>
          
          <p className="text-sm text-gray-600 mb-4">
            Check all unnotified contact requests against existing documents and send notifications for matches.
          </p>

          <button
            onClick={runBatchCheck}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Running...' : 'Run Batch Check'}
          </button>
        </div>

        {/* Message Display */}
        {message && (
          <div className={`p-4 rounded-md ${
            messageType === 'success' 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {message}
          </div>
        )}

        {/* Email Configuration Info */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <h3 className="text-sm font-semibold text-yellow-800 mb-2">
            ⚙️ Email Configuration Required
          </h3>
          <p className="text-xs text-yellow-700 mb-2">
            To send emails, configure these environment variables:
          </p>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>EMAIL_HOST=smtp.gmail.com</div>
            <div>EMAIL_PORT=587</div>
            <div>EMAIL_USER=your-gmail@gmail.com</div>
            <div>EMAIL_PASS=your-app-password</div>
            <div>EMAIL_FROM="MyID Kenya &lt;your-gmail@gmail.com&gt;"</div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            ← Back to Homepage
          </a>
        </div>
      </div>
    </div>
  );
} 