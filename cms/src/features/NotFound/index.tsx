import { Button } from "@heroui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 className="text-2xl font-bold">404</h1>
      <p className="mt-2">Trang không tồn tại!</p>
     
      <button
        onClick={handleRedirect}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
        }}
      >
       Trở về trang chủ
      </button>
    </div>
  );
};

export default NotFound;
