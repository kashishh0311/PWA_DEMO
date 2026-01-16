import React from "react";
import FeatureCard from "./FeatureCard";

function FeatureGrid({ features }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-24 px-6">
      {features.map((item, index) => (
        <FeatureCard key={index} title={item.title} desc={item.desc} />
      ))}
    </section>
  );
}

export default FeatureGrid;
