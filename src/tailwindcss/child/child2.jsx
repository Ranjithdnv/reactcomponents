import React, { useState } from "react";

// Reusable Section Component
const Section = ({ title, children }) => (
  <div className="bg-gray-100 p-6 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-3">{title}</h2>
    {children}
  </div>
);

const TailwindRareClassesDemo = () => {
  const [items, setItems] = useState([
    "Short Item",
    "Another Short Item",
    "Another Short Item",
    "Another Short Item",
    "Another Short Item",
    "A longer paragraph that takes up more space and tests column behavior.",
  ]);

  const addBigParagraph = () => {
    setItems((prev) => [
      ...prev,
      "This is a very large paragraph. ".repeat(20),
      "This is a very large paragraph. ".repeat(20),
      "This is a very large paragraph. ".repeat(30),
      "This is a very large paragraph. ".repeat(20), // Simulates a big paragraph
    ]);
  };
  return (
    <div className="p-10 space-y-10 max-w-3xl mx-auto">
      {/* Accent Checkbox */}
      <Section title="Accent Checkbox">
        <input
          type="checkbox"
          className="accent-pink-500 shadow-xl dark:accent-blue-500 w-6 h-6"
        />
      </Section>

      {/* Scroll Snap */}
      <Section title="Scroll Snap">
        <div className="snap-x snap-mandatory overflow-x-auto flex space-x-4 border p-4 rounded-lg">
          {["red", "green", "blue"].map((color) => (
            <div
              key={color}
              className={`snap-start w-60 h-60 bg-${color}-300 flex items-center justify-center rounded-lg shadow`}
            >
              {color.charAt(0).toUpperCase() + color.slice(1)} Box
            </div>
          ))}
        </div>
      </Section>

      {/* Writing Mode */}
      <Section title="Writing Mode">
        <div className="writing-mode-[vertical-rl] bg-gray-200 p-4 rounded-lg">
          Vertical Text!
        </div>
      </Section>

      {/* List Inside */}
      <Section title="List Inside">
        <ul className="list-disc list-inside bg-yellow-100 p-4 rounded-lg">
          <li>Inside marker</li>
          <li>Another item</li>
        </ul>
      </Section>

      {/* Isolate */}
      <Section title="Isolated Element">
        <div className="isolate bg-purple-300 p-4 rounded-lg">
          Isolated stacking context
        </div>
      </Section>

      {/* Break Inside Avoid */}
      <section>
        <h2 className="text-xl font-bold mb-2">Break Inside Avoid</h2>
        <button
          onClick={addBigParagraph}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Add Big Paragraph
        </button>
        <div className="columns-3 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="break-inside-avoid last:bg-black bg-yellow-300 p-4"
            >
              <div b className=" bg-white ">
                {" "}
                {item}
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Content Visibility */}
      <Section title="Content Visibility">
        <div className="content-visibility-auto bg-blue-200 p-4 rounded-lg">
          Content visibility optimizes rendering!
        </div>
      </Section>

      {/* Overscroll */}
      <Section title="Overscroll Contain">
        <div className="overscroll-contain h-40 overflow-auto border p-4 rounded-lg">
          Scroll inside me! The scroll won’t affect the parent. Scroll inside
          me! The scroll won’t affect the parent. Scroll inside me! The scroll
          won’t affect the parent. Scroll inside me! The scroll won’t affect the
          parent. Scroll inside me! The scroll won’t affect the parent. Scroll
          inside me! The scroll won’t affect the parent. Scroll inside me! The
          scroll won’t affect the parent. Scroll inside me! The scroll won’t
          affect the parent. Scroll inside me! The scroll won’t affect the
          parent. Scroll inside me! The scroll won’t affect the parent. Scroll
          inside me! The scroll won’t affect the parent. Scroll inside me! The
          scroll won’t affect the parent. Scroll inside me! The scroll won’t
          affect the parent. Scroll inside me! The scroll won’t affect the
          parent. Scroll inside me! The scroll won’t affect the parent. Scroll
          inside me! The scroll won’t affect the parent. Scroll inside me! The
          scroll won’t affect the parent. Scroll inside me! The scroll won’t
          affect the parent. Scroll inside me! The scroll won’t affect the
          parent. Scroll inside me! The scroll won’t affect the parent. Scroll
          inside me! The scroll won’t affect the parent. Scroll inside me! The
          scroll won’t affect the parent. Scroll inside me! The scroll won’t
          affect the parent. Scroll inside me! The scroll won’t affect the
          parent. Scroll inside me! The scroll won’t affect the parent. Scroll
          inside me! The scroll won’t affect the parent. Scroll inside me! The
          scroll won’t affect the parent. Scroll inside me! The scroll won’t
          affect the parent. Scroll inside me! The scroll won’t affect the
          parent. Scroll inside me! The scroll won’t affect the parent. Scroll
          inside me! The scroll won’t affect the parent. Scroll inside me! The
          scroll won’t affect the parent. Scroll inside me! The scroll won’t
          affect the parent. Scroll inside me! The scroll won’t affect the
          parent. Scroll inside me! The scroll won’t affect the parent. Scroll
          inside me! The scroll won’t affect the parent. Scroll inside me! The
          scroll won’t affect the parent. Scroll inside me! The scroll won’t
          affect the parent. Scroll inside me! The scroll won’t affect the
          parent. Scroll inside me! The scroll won’t affect the parent. Scroll
          inside me! The scroll won’t affect the parent. Scroll inside me! The
          scroll won’t affect the parent. Scroll inside me! The scroll won’t
          affect the parent. Scroll inside me! The scroll won’t affect the
          parent.
          <br />
          <br />
          More content to scroll...
          <br />
          Even more content...
        </div>
      </Section>
    </div>
  );
};

export default TailwindRareClassesDemo;
