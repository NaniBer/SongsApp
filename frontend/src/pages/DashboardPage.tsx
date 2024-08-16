import React from "react";

interface DashboardPageProps {
  title: string;
  description: string;
  items: string[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  title,
  description,
  items,
}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
