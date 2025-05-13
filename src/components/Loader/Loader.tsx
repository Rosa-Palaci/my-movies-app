import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-6" />
      <h1 className="text-white text-5xl font-bold">Cine Rosa</h1>
    </div>
  );
};

export default Loader;
