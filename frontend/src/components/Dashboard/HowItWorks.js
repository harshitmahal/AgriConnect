import React from 'react';

const steps = [
  { title: "1. Farmers Register", description: "Farmers create an account and list their produce." },
  { title: "2. Buyers Browse & Order", description: "Buyers explore available produce and place orders." },
  { title: "3. Direct Delivery or Pickup", description: "Products are delivered or picked up directly." },
];

function HowItWorks() {
  return (
    <section id="how" className="py-16 px-6 bg-white text-center">
      <h3 className="text-3xl font-semibold mb-10">How It Works</h3>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-green-50 p-6 rounded shadow w-full md:w-1/3">
            <h4 className="text-xl font-bold mb-2">{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
