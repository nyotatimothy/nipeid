'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, UserIcon, ArrowRightOnRectangleIcon, DocumentPlusIcon, BuildingStorefrontIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';

const statusLabels: Record<string, string> = {
  UPLOADED: 'Uploaded',
  AWAITING_KIOSK_ACK: 'Awaiting Kiosk to Acknowledge',
  KIOSK_CONFIRMED: 'Kiosk Confirmed',
  CLAIMED: 'Claimed',
  DISPATCHED: 'Dispatched',
  ARCHIVED: 'Archived',
};

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [claiming, setClaiming] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'fail' | 'login' | null>(null);
  const [claimedDoc, setClaimedDoc] = useState<any>(null);
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [contactStep, setContactStep] = useState(false);
  const [loginPrompt, setLoginPrompt] = useState(false);
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
      setContactStep(true);
      setClaimedDoc(doc);
      setClaiming(doc.docNumber);
      setPaymentStatus(null);
      return;
    }
    setClaiming(doc.docNumber);
    setPaymentStatus(null);
    setClaimedDoc(doc);
    setContactStep(false);
  }

  function handleContactSubmit(e: any) {
    e.preventDefault();
    setContactStep(false);
  }

  function handlePayment(result: 'success' | 'fail' | 'login') {
    if (result === 'login') {
      setLoginPrompt(true);
      setPaymentStatus(null);
      return;
    }
    setPaymentStatus(result);
    if (result === 'success') {
      // In a real app, call the claim API here
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-400 via-teal-200 to-blue-100 p-0">
      {/* Hero Section */}
      <div className="w-full max-w-2xl mx-auto rounded-b-3xl bg-gradient-to-r from-blue-700 to-teal-500 shadow-lg p-8 flex flex-col items-center mb-8 relative overflow-hidden">
        <div className="flex items-center gap-4 mb-2">
          <MagnifyingGlassIcon className="h-10 w-10 text-white drop-shadow" />
          <h1 className="text-4xl font-extrabold text-white drop-shadow">MyID: Lost & Found Identity Documents</h1>
        </div>
        <p className="mb-4 text-lg text-blue-100 max-w-xl text-center">Helping you find and claim lost identity documents (ID cards, passports, birth certificates) securely and efficiently.</p>
      </div>
      {/* Embedded Search UI */}
      <div className="w-full max-w-lg mb-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <input
          type="text"
          placeholder="Search your name or document number..."
          className="w-full px-4 py-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 font-sans text-lg text-gray-900 shadow"
          value={query}
          onChange={e => handleSearch(e.target.value)}
        />
        <div className="bg-white/80 rounded-xl shadow p-4 min-h-[220px] w-full transition-all duration-300">
          {loading ? (
            <div className="text-blue-400 text-center font-sans">Searching...</div>
          ) : results.length === 0 && query.length >= 2 ? (
            <div className="text-gray-400 text-center font-sans">No results found.</div>
          ) : results.length === 0 && query.length < 2 ? (
            <div className="flex flex-col items-center justify-center h-32 text-gray-400">
              <MagnifyingGlassIcon className="h-10 w-10 mb-2 text-blue-300" />
              <span className="font-medium">Start your search above</span>
              <span className="text-sm">Enter a name or document number to find your lost ID.</span>
            </div>
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
      </div>
      {/* Payment Modal & Contact Step */}
      {claiming && claimedDoc && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
            {contactStep && !session ? (
              <>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Claim Document</h3>
                <form onSubmit={handleContactSubmit} className="w-full flex flex-col gap-3 mb-4">
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    className="w-full px-3 py-2 border rounded text-gray-900"
                    value={contact.email}
                    onChange={e => setContact({ ...contact, email: e.target.value })}
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number"
                    className="w-full px-3 py-2 border rounded text-gray-900"
                    value={contact.phone}
                    onChange={e => setContact({ ...contact, phone: e.target.value })}
                  />
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Continue to Payment</button>
                </form>
                <button className="text-gray-500 mt-2" onClick={() => { setClaiming(null); setClaimedDoc(null); setContactStep(false); setContact({ email: '', phone: '' }); }}>Cancel</button>
              </>
            ) : !paymentStatus && !loginPrompt ? (
              <>
                <h3 className="text-xl font-bold mb-2 text-blue-700">Simulated Payment</h3>
                <p className="mb-4 text-gray-700">Pay a small fee to claim your document.</p>
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex-1"
                      onClick={() => handlePayment('success')}
                    >
                      Simulate Success
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex-1"
                      onClick={() => handlePayment('fail')}
                    >
                      Simulate Fail
                    </button>
                  </div>
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-2"
                    onClick={() => handlePayment('login')}
                  >
                    Simulate: Doc Found, Login Required to See Location
                  </button>
                </div>
              </>
            ) : loginPrompt ? (
              <div className="flex flex-col items-center">
                <p className="text-blue-700 font-semibold mb-2">This document is in our system. Please log in or sign up to see the kiosk location.</p>
                <button
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => { setClaiming(null); setPaymentStatus(null); setClaimedDoc(null); setContactStep(false); setContact({ email: '', phone: '' }); setLoginPrompt(false); router.push('/login'); }}
                >
                  Login / Sign Up
                </button>
                <button
                  className="mt-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => { setClaiming(null); setPaymentStatus(null); setClaimedDoc(null); setContactStep(false); setContact({ email: '', phone: '' }); setLoginPrompt(false); }}
                >
                  Cancel
                </button>
              </div>
            ) : paymentStatus === 'success' ? (
              <div className="flex flex-col items-center">
                {session ? (
                  <>
                    <p className="text-green-700 font-semibold mb-2">Payment successful!</p>
                    <p className="text-gray-700">Kiosk Location: <b>Nairobi CBD (Central Kiosk)</b></p>
                  </>
                ) : (
                  <>
                    <p className="text-green-700 font-semibold mb-2">Thank you! You'll be emailed once your document is seen/verified.</p>
                  </>
                )}
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => { setClaiming(null); setPaymentStatus(null); setClaimedDoc(null); setContactStep(false); setContact({ email: '', phone: '' }); }}
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-red-700 font-semibold mb-2">Payment failed. Please try again.</p>
                <button
                  className="mt-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                  onClick={() => { setClaiming(null); setPaymentStatus(null); setClaimedDoc(null); setContactStep(false); setContact({ email: '', phone: '' }); }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Navigation for other roles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
        <Link href="/login" className="flex items-center gap-3 bg-green-600 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow hover:bg-green-700 transition"><ArrowRightOnRectangleIcon className="h-6 w-6" /> User: Login / Claim</Link>
        <Link href="/poster/upload" className="flex items-center gap-3 bg-yellow-500 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow hover:bg-yellow-600 transition"><DocumentPlusIcon className="h-6 w-6" /> Poster: Upload Found Document</Link>
        <Link href="/kiosk" className="flex items-center gap-3 bg-purple-600 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow hover:bg-purple-700 transition"><BuildingStorefrontIcon className="h-6 w-6" /> Kiosk Manager Dashboard</Link>
        <Link href="/admin" className="flex items-center gap-3 bg-blue-900 text-white py-4 px-6 rounded-xl text-lg font-semibold shadow hover:bg-blue-950 transition"><Cog6ToothIcon className="h-6 w-6" /> Admin Panel</Link>
      </div>
      <footer className="mt-8 text-gray-400 text-sm">&copy; {new Date().getFullYear()} MyID. All rights reserved.</footer>
    </main>
  );
}
