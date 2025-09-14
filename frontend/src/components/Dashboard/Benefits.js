import React from 'react';

const benefits = [
  {
    title: "For Farmers",
    points: [
      "Get fair prices",
      "Sell directly to consumers",
      "Eliminate middlemen"
    ]
  },
  {
    title: "For Buyers",
    points: [
      "Access fresh, local produce",
      "Support local farmers",
      "Track origin of food"
    ]
  }
];

function Benefits() {
  return (
    <section id="benefits" className="bg-green-100 py-16 px-6 text-center">
      <h3 className="text-3xl font-semibold mb-10">Benefits</h3>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {benefits.map((group, index) => (
          <div key={index} className="bg-white p-6 rounded shadow w-full md:w-1/3">
            <h4 className="text-xl font-bold mb-4">{group.title}</h4>
            <ul className="text-left list-disc list-inside space-y-2">
              {group.points.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Benefits;
