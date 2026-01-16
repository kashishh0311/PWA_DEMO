import React from "react";

function FeatureCard({ title, desc }) {
  return (
    <div className="p-8 rounded-2xl bg-slate-700 hover:bg-slate-600 hover:-translate-y-2 transition-all duration-300 shadow-xl">
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-300">{desc}</p>
    </div>
  );
}

export default FeatureCard;
