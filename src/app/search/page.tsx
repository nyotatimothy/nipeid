'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const statusLabels: Record<string, string> = {
  UPLOADED: 'Uploaded',
  AWAITING_KIOSK_ACK: 'Awaiting Kiosk to Acknowledge',
  KIOSK_CONFIRMED: 'Kiosk Confirmed',
  CLAIMED: 'Claimed',
  DISPATCHED: 'Dispatched',
  ARCHIVED: 'Archived',
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'fail' | null>(null);
  const [claimedDoc, setClaimedDoc] = useState<any>(null);
  const { data: session } = useSession();
  const router = useRouter();

  async function handleSearch(q: string) {
    setQuery(q);
    if (q.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: q }),
    });
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  }

  function handleClaim(doc: any) {
    if (!session) {
      router.push('/login');
      return;
    }
    setClaiming(doc.docNumber);
    setPaymentStatus(null);
    setClaimedDoc(doc);
  }

  function handlePayment(result: 'success' | 'fail') {
    setPaymentStatus(result);
    if (result === 'success') {
      // In a real app, call the claim API here
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-black">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 font-sans">Search for Your Lost Document</h2>
      <input
        type="text"
        placeholder="Enter your name or document number..."
        className="w-full max-w-md px-4 py-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 font-sans text-lg text-gray-900"
        value={query}
        onChange={e => handleSearch(e.target.value)}
      />
      <div className="w-full max-w-md bg-white rounded shadow p-4 min-h-[120px]">
        {loading ? (
          <div className="text-blue-400 text-center font-sans">Searching...</div>
        ) : results.length === 0 && query.length >= 2 ? (
          <div className="text-gray-400 text-center font-sans">No results found.</div>
        ) : (
          <ul className="divide-y">
            {results.map((doc, i) => (
              <li key={i} className="py-2 flex flex-col font-sans">
                <span className="font-semibold text-lg text-gray-800">{doc.name}</span>
                <span className="text-gray-600 text-base font-medium">Doc #: {doc.docNumber}</span>
                <span className="text-gray-500 text-base">Status: {statusLabels[doc.status] || doc.status}</span>
                <button
                  className="mt-2 w-fit bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => handleClaim(doc)}
                  disabled={doc.status !== 'UPLOADED' && doc.status !== 'KIOSK_CONFIRMED'}
                >
                  Claim
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* Payment Modal */}
      {claiming && claimedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-blue-700">Simulated Payment</h3>
            <p className="mb-4 text-gray-700">Pay a small fee to claim your document.</p>
            {!paymentStatus ? (
              <div className="flex gap-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handlePayment('success')}
                >
                  Simulate Success
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handlePayment('fail')}
                >
                  Simulate Fail
                </button>
              </div>
            ) : paymentStatus === 'success' ? (
              <div className="flex flex-col items-center">
                <p className="text-green-700 font-semibold mb-2">Payment successful!</p>
                <p className="text-gray-700">Kiosk Location: <b>Nairobi CBD (Central Kiosk)</b></p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => { setClaiming(null); setPaymentStatus(null); setClaimedDoc(null); }}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-red-700 font-semibold mb-2">Payment failed. Please try again.</p>
                <button
                  className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => { setClaiming(null); setPaymentStatus(null); setClaimedDoc(null); }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
} 