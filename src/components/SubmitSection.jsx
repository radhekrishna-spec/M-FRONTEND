import { useState } from 'react';

export default function SubmitSection() {
  const [showModal, setShowModal] = useState(false);
  const [confessionText, setConfessionText] = useState('');
  const [loading, setLoading] = useState(false);

  const submitConfession = async () => {
    if (!confessionText.trim()) {
      alert('Please write your confession first');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        'http://localhost:5000/api/confessions/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: confessionText,
          }),
        },
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {
        setShowModal(true);
        setConfessionText('');
      } else {
        alert('Submission failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    submitConfession();
  };

  return (
    <>
      <div className="rounded-3xl backdrop-blur-lg bg-white/70 shadow-lg p-6">
        <h3 className="text-xl font-bold text-violet-700">Final Step</h3>

        <p className="mt-3 text-gray-600 leading-7">
          Once you submit, your secret becomes lighter 💜
        </p>

        <textarea
          value={confessionText}
          onChange={(e) => setConfessionText(e.target.value)}
          placeholder="Write your confession here..."
          rows={5}
          className="mt-4 w-full rounded-2xl border border-violet-200 p-4 outline-none focus:ring-2 focus:ring-violet-400"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-4 text-white font-semibold shadow-lg hover:scale-[1.02] transition disabled:opacity-50"
        >
          {loading ? 'Submitting...' : 'Pay ₹2 & Submit'}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-violet-700">
              💌 Submitted Successfully
            </h2>

            <p className="mt-3 text-gray-600">
              Your confession has been received.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-6 py-3 rounded-2xl bg-violet-600 text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
