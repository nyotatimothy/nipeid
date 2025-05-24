'use client';
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { UserIcon, IdentificationIcon, DocumentTextIcon, CheckCircleIcon, ExclamationCircleIcon, AcademicCapIcon } from '@heroicons/react/24/solid';

const statusLabels: Record<string, string> = {
  UPLOADED: 'Uploaded',
  AWAITING_KIOSK_ACK: 'Awaiting Kiosk to Acknowledge',
  KIOSK_CONFIRMED: 'Kiosk Confirmed',
  CLAIMED: 'To collect',
  TO_COLLECT: 'To collect',
  DISPATCHED: 'Dispatched',
  ARCHIVED: 'Archived',
};

function maskName(name: string) {
  if (!name) return '';
  return name.slice(0, 2) + '*'.repeat(Math.max(0, name.length - 2));
}
function maskDocNumber(doc: string) {
  if (!doc) return '';
  if (doc.length <= 4) return doc[0] + '*'.repeat(doc.length - 2) + doc.slice(-1);
  return doc.slice(0, 2) + '*'.repeat(doc.length - 4) + doc.slice(-2);
}

export default function UserDashboard() {
  const { data: session, status } = useSession();
  const [docs, setDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDispute, setShowDispute] = useState<string | null>(null);
  const [disputeText, setDisputeText] = useState('');
  const [disputeSuccess, setDisputeSuccess] = useState(false);

  // Mock data for demo
  const mockUser = {
    name: 'Demo User',
    email: 'demo@myid.com',
    role: 'USER',
  };
  const mockDocs = [
    {
      id: '1',
      firstName: 'Timothy',
      middleName: 'Chege',
      lastName: 'Nyottah',
      documentNumber: '24112039',
      status: 'CLAIMED',
      type: 'ID Card',
      kiosk: { name: 'Central Kiosk', location: 'Nairobi CBD' },
    },
    {
      id: '2',
      firstName: 'Mary',
      middleName: 'Kinya',
      lastName: 'Kimani',
      documentNumber: '12007878',
      status: 'DISPATCHED',
      type: 'Passport',
      kiosk: { name: 'Westlands Kiosk', location: 'Westlands' },
    },
    {
      id: '3',
      firstName: 'Timothy',
      middleName: 'Chege',
      lastName: 'Nyottah',
      documentNumber: 'BC-2024-001',
      status: 'TO_COLLECT',
      type: 'Birth Certificate',
      kiosk: { name: 'Central Kiosk', location: 'Nairobi CBD' },
    },
    {
      id: '4',
      firstName: 'Timothy',
      middleName: 'Chege',
      lastName: 'Nyottah',
      documentNumber: 'A1234567',
      status: 'CLAIMED',
      type: 'Passport',
      kiosk: { name: 'Central Kiosk', location: 'Nairobi CBD' },
    },
  ];

  useEffect(() => {
    async function fetchDocs() {
      if (!session?.user?.email) {
        setDocs(mockDocs);
        setLoading(false);
        return;
      }
      setLoading(true);
      const res = await fetch('/api/user/claimed');
      const data = await res.json();
      setDocs(data.docs || []);
      setLoading(false);
    }
    fetchDocs();
    // eslint-disable-next-line
  }, [session]);

  if (status === 'loading') {
    return <main className="min-h-screen flex items-center justify-center">Loading...</main>;
  }

  // Use mock user if not logged in
  const user = session?.user || mockUser;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-0 bg-gradient-to-br from-blue-50 via-white to-purple-100">
      {/* Hero/Header */}
      <div className="w-full max-w-2xl mx-auto rounded-b-3xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg p-8 flex flex-col md:flex-row md:items-center md:justify-between mb-8 relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div className="bg-white bg-opacity-80 rounded-full p-2 shadow-lg">
            <UserIcon className="h-10 w-10 text-blue-600" />
          </div>
          <div>
            <div className="font-bold text-2xl text-white drop-shadow">Welcome{user.name ? `, ${user.name.split(' ')[0]}` : ''}!</div>
            <div className="text-blue-100">{user.email}</div>
            <div className="text-blue-200 text-sm mt-1">Role: <span className="inline-block bg-blue-200 bg-opacity-30 text-white px-2 py-0.5 rounded-full font-semibold">{(user && (user as any).role) || 'User'}</span></div>
          </div>
        </div>
        {session && <button onClick={() => signOut()} className="mt-6 md:mt-0 bg-white bg-opacity-80 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 shadow font-semibold">Sign out</button>}
      </div>
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center gap-2 mb-4">
          <DocumentTextIcon className="h-6 w-6 text-blue-700" />
          <h2 className="text-2xl font-bold text-blue-700">My Claimed Documents</h2>
        </div>
        {loading ? (
          <div className="text-blue-400 text-center font-sans">Loading documents...</div>
        ) : docs.length === 0 ? (
          <div className="text-gray-400 text-center font-sans">You have not claimed any documents yet.</div>
        ) : (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {docs.map((doc: any) => (
              <div key={doc.id} className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 flex flex-col gap-4 border border-gray-100 hover:shadow-2xl transition relative overflow-hidden">
                <div className="flex items-center gap-3 mb-2">
                  {doc.type === 'ID Card' && <IdentificationIcon className="h-7 w-7 text-blue-500" />}
                  {doc.type === 'Passport' && <AcademicCapIcon className="h-7 w-7 text-purple-500" />}
                  {doc.type === 'Birth Certificate' && <DocumentTextIcon className="h-7 w-7 text-green-500" />}
                  <div className="font-semibold text-lg text-gray-900">{`${doc.firstName} ${doc.middleName || ''} ${doc.lastName}`.trim()}</div>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded-full text-xs font-semibold">Doc #: {doc.documentNumber}</span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1">
                    {doc.type === 'ID Card' && <IdentificationIcon className="h-4 w-4" />}
                    {doc.type === 'Passport' && <AcademicCapIcon className="h-4 w-4" />}
                    {doc.type === 'Birth Certificate' && <DocumentTextIcon className="h-4 w-4" />}
                    {doc.type || 'ID Card'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1 ${doc.status === 'DISPATCHED' ? 'bg-green-100 text-green-700' : doc.status === 'TO_COLLECT' || doc.status === 'CLAIMED' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{doc.status === 'DISPATCHED' ? <CheckCircleIcon className="h-4 w-4" /> : <ExclamationCircleIcon className="h-4 w-4" />} {statusLabels[doc.status] || doc.status}</span>
                  {doc.kiosk && <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-semibold">{doc.kiosk.name} ({doc.kiosk.location})</span>}
                </div>
                <button className="mt-2 w-fit bg-yellow-600 text-white px-4 py-1 rounded-lg hover:bg-yellow-700 transition shadow font-semibold" onClick={() => setShowDispute(doc.id)}>Report Dispute</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Dispute Modal */}
      {showDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
            <h3 className="text-xl font-bold mb-2 text-red-700">Report Dispute</h3>
            {disputeSuccess ? (
              <div className="text-green-700 font-semibold mb-2">Dispute reported successfully!</div>
            ) : (
              <>
                <textarea
                  className="w-full border rounded p-2 mb-4 text-gray-900"
                  rows={4}
                  placeholder="Describe your issue..."
                  value={disputeText}
                  onChange={e => setDisputeText(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
                    onClick={() => { setDisputeSuccess(true); setTimeout(() => { setShowDispute(null); setDisputeSuccess(false); setDisputeText(''); }, 1500); }}
                  >
                    Submit
                  </button>
                  <button
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                    onClick={() => { setShowDispute(null); setDisputeText(''); }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
} 