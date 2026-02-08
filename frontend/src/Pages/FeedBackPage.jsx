import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ratings = [
  { value: 1, text: "Very Unsatisfactory", tone: "We sincerely regret the inconvenience." },
  { value: 2, text: "Needs Improvement", tone: "Your feedback helps us improve." },
  { value: 3, text: "Satisfactory", tone: "Thank you for sharing your experience." },
  { value: 4, text: "Very Good", tone: "We’re pleased you had a positive experience." },
  { value: 5, text: "Excellent", tone: "We’re delighted to have met your expectations." },
];

export default function PremiumReview() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const active = hovered || rating;

  const handleSubmit = () => {
    if (rating) setIsSubmitted(true);
  };

  const resetReview = () => {
    setRating(0);
    setHovered(0);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-xl font-semibold text-gray-900">
            Experience Review
          </h1>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6">
        {isSubmitted ? (
          /* SUCCESS CARD */
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10 text-center animate-fadeIn">
            <div className="text-4xl mb-4">
              {rating >= 4 ? "✓" : "✓"}
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Thank you for your feedback
            </h2>

            <p className="text-gray-600 mb-6">
              {ratings[rating - 1].tone}
            </p>

            <div className="bg-gray-50 border rounded-xl p-4 mb-8">
              <p className="text-sm text-gray-700 font-medium">
                Rating submitted
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {ratings[rating - 1].text}
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={resetReview}
                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Submit Another
              </button>
              <button
                onClick={()=>navigate('/user-dashboard')}
                className="px-5 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-black transition"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* REVIEW CARD */
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10 relative">
            {/* Soft accent */}
            <div
              className={`absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500 ${
                active ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute -top-24 -left-24 w-64 h-64 bg-yellow-200/30 blur-3xl rounded-full animate-glow" />
            </div>

            <div className="relative">
              <h2 className="text-xl font-semibold text-gray-900 text-center">
                How would you rate your experience?
              </h2>
              <p className="text-sm text-gray-600 text-center mt-2 mb-10">
                Your feedback helps us improve service quality.
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-4 mb-8">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className={`text-4xl transition-all duration-300 ${
                      active >= star
                        ? "text-yellow-500 scale-110"
                        : "text-gray-300 hover:text-yellow-400"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>

              {/* Feedback text */}
              <div className="min-h-[70px] text-center mb-8">
                {active ? (
                  <div className="animate-feedbackReveal">
                    <p className="text-base font-medium text-gray-800">
                      {ratings[active - 1].text}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {ratings[active - 1].tone}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    Select a rating to continue
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={!rating}
                className={`w-full py-3 rounded-lg text-sm font-medium tracking-wide transition
                  ${
                    rating
                      ? "bg-gray-900 text-white hover:bg-black"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
              >
                Submit Review
              </button>

              <p className="text-xs text-gray-500 mt-6 text-center">
                Feedback is confidential and used for quality improvement only.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-gray-500 text-center">
          © 2026 Company Name. All rights reserved.
        </div>
      </footer>

      {/* Animations */}
      <style>
        {`
          @keyframes glow {
            0%,100% { transform: scale(1); opacity: 0.6; }
            50% { transform: scale(1.2); opacity: 1; }
          }
          .animate-glow {
            animation: glow 5s ease-in-out infinite;
          }

          @keyframes feedbackReveal {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-feedbackReveal {
            animation: feedbackReveal 0.4s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}
      </style>
    </div>
  );
}
