import React from "react";

const Footer = () => {
  const sections = [
    {
      title: "Company",
      links: ["About", "Careers", "Blog"],
    },
    {
      title: "Support",
      links: ["Help Center", "Contact", "Refund"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "Cookies"],
    },
  ];

  return (
    <footer className="bg-black text-white p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sections.map((sec, i) => (
          <div key={i}>
            <h2 className="font-bold mb-2">{sec.title}</h2>

            {sec.links.map((l, idx) => (
              <p key={idx} className="text-gray-300">
                {l}
              </p>
            ))}
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-gray-400">
        © 2026 MegaStore
      </p>
    </footer>
  );
};

export default Footer;