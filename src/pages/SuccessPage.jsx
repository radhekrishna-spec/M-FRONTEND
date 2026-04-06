import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialDetails = useMemo(() => {
    try {
      return (
        location.state ||
        JSON.parse(sessionStorage.getItem('confessionDetails')) ||
        null
      );
    } catch {
      return location.state || null;
    }
  }, [location.state]);

  const [details, setDetails] = useState(initialDetails);
  const [showLoader, setShowLoader] = useState(false);
  const [showDetails, setShowDetails] = useState(!!initialDetails);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!details) {
      navigate('/');
      return;
    }

    // keep session safe for reload
    sessionStorage.setItem(
      'confessionDetails',
      JSON.stringify(details)
    );
  }, [details, navigate]);

  const handleViewDetails = () => {
    setShowLoader(true);
    setShowDetails(false);
    setProgress(0);

    let value = 0;

    const interval = setInterval(() => {
      value += 5;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);

        try {
          const saved = JSON.parse(
            sessionStorage.getItem('confessionDetails')
          );

          if (saved) {
            setDetails(saved);
          }
        } catch {}

        setShowLoader(false);
        setShowDetails(true);
      }
    }, 80);
  };

  if (!details) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-100 via-white to-purple-100 px-4 py-10">
      <div className="relative bg-white/90 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl text-center max-w-md w-full border border-violet-100 overflow-hidden">

        {/* background glow */}
        <div className="absolute -top-10 -left-10 h-36 w-36 rounded-full bg-violet-300 opacity-20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-purple-300 opacity-20 blur-3xl" />

        {/* header */}
        <div className="relative z-10">
          <div className="text-6xl mb-3 animate-bounce">💌</div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Submitted Successfully
          </h1>

          <p className="mt-4 text-gray-700 leading-7">
            Your confession has been safely submitted and added to our secure
            processing queue.
          </p>

          <p className="mt-3 text-sm text-gray-500 leading-6">
            🔒 Your identity remains completely anonymous and protected.
          </p>
        </div>

        {/* pre details buttons */}
        {!showDetails && !showLoader && (
          <div className="relative z-10 mt-6">
            <div className="rounded-2xl bg-violet-50 border border-violet-100 p-4 text-sm text-gray-600 leading-6">
              ⏳ Tap below to check your confession number, queue position and
              estimated posting time.
            </div>

            <button
              onClick={handleViewDetails}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
            >
              View Submission Details
            </button>

            <button
              onClick={() => navigate('/')}
              className="mt-3 w-full rounded-2xl border border-violet-600 py-3 text-violet-600 font-semibold hover:bg-violet-50 transition"
            >
              Submit Another Confession
            </button>
          </div>
        )}

        {/* loader */}
        {showLoader && (
          <div className="relative z-10 mt-6">
            <p className="text-sm text-gray-600 mb-3">
              ✨ Preparing your details...
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
              <div
                className="bg-gradient-to-r from-violet-600 to-purple-600 h-3 transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-3 text-sm font-medium text-violet-600">
              {progress}% completed
            </p>
          </div>
        )}

        {/* details */}
        {showDetails && (
          <div className="relative z-10 mt-6 border-t border-violet-100 pt-6 text-left">
            <h2 className="text-lg font-semibold text-violet-700 mb-4 text-center">
              📋 Submission Details
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl bg-violet-50 p-4 border border-violet-100">
                <p className="text-sm text-gray-500">Confession Number</p>
                <p className="text-lg font-semibold text-violet-700">
                  #{details.confessionNo}
                </p>
              </div>

              <div className="rounded-2xl bg-purple-50 p-4 border border-purple-100">
                <p className="text-sm text-gray-500">Queue Ahead</p>
                <p className="text-lg font-semibold text-purple-700">
                  {details.queueAhead} confession
                  {details.queueAhead !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="rounded-2xl bg-indigo-50 p-4 border border-indigo-100">
                <p className="text-sm text-gray-500">Expected Post Time</p>
                <p className="text-lg font-semibold text-indigo-700">
                  {details.eta}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-2xl bg-green-50 border border-green-100 p-4 text-sm text-gray-600 leading-6">
              ✅ Your confession is securely added to the posting queue and will
              be published according to schedule.
            </div>

            <div className="mt-4 rounded-2xl bg-yellow-50 border border-yellow-100 p-4 text-sm text-gray-600 leading-6">
              💜 Thank you for trusting Confession Wallah. Your secret is safe
              with us.
            </div>

            <button
              onClick={() => navigate('/')}
              className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-purple-600 py-3 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
            >
              Submit Another Confession
            </button>
          </div>
        )}
      </div>
    </div>
  );
}