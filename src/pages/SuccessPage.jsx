import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!state) {
      navigate('/');
    }
  }, [state, navigate]);

  const handleViewDetails = () => {
    setShowLoader(true);
    setProgress(0);

    let value = 0;

    const interval = setInterval(() => {
      value += 10;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
        setShowLoader(false);
        setShowDetails(true);
      }
    }, 150);
  };

  if (!state) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-violet-600">
          💌 Submitted Successfully
        </h1>

        <p className="mt-4 text-gray-700">
          Your confession has been submitted successfully.
        </p>

        {!showDetails && !showLoader && (
          <>
            <button
              onClick={handleViewDetails}
              className="mt-6 w-full rounded-2xl bg-violet-600 py-3 text-white font-semibold hover:scale-[1.02] transition"
            >
              View Submission Details
            </button>

            <button
              onClick={() => navigate('/')}
              className="mt-3 w-full rounded-2xl border border-violet-600 py-3 text-violet-600 font-semibold hover:scale-[1.02] transition"
            >
              Submit Another Confession
            </button>
          </>
        )}

        {showLoader && (
          <div className="mt-6">
            <p className="text-sm text-gray-600 mb-2">
              Fetching your submission details...
            </p>

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-violet-600 h-3 transition-all duration-150"
                style={{ width: `${progress}%` }}
              />
            </div>

            <p className="mt-2 text-sm font-medium text-violet-600">
              {progress}%
            </p>
          </div>
        )}

        {showDetails && (
          <div className="mt-6 border-t pt-6 text-left">
            <p className="text-lg font-medium">
              💌 Confession No: #{state.confessionNo}
            </p>

            <p className="mt-2 text-gray-700">
              {state.queueAhead} confession
              {state.queueAhead !== 1 ? 's' : ''} before you
            </p>

            <p className="mt-2 text-gray-700">
              Expected post time: {state.eta}
            </p>

            <button
              onClick={() => navigate('/')}
              className="mt-6 w-full rounded-2xl bg-violet-600 py-3 text-white font-semibold hover:scale-[1.02] transition"
            >
              Submit Another Confession
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
