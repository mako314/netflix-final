import React from "react";

export default function ContinueLeftOff({ onClose, onContinue }) {
    return (
<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center px-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-auto">
        <h2 className="text-xl font-semibold mb-4">Continue Watching?</h2>
        <p className="mb-6">Do you want to continue where you left off?</p>
        <div className="flex justify-end items-center space-x-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={onClose}
          >
            No, thanks
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={onContinue}
          >
            Yes, continue
          </button>
        </div>
      </div>
    </div>
  )
  }