import React from "react";

interface ReasonCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="p-3 mb-4 bg-blue-50 rounded-full">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-center text-gray-600">{description}</p>
    </div>
  );
};

export default ReasonCard; 