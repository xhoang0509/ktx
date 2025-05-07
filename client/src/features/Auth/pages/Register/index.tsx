import AuthWrapper from "@features/Auth/components/AuthWrapper";
import React from "react";
import { useNavigate } from "react-router";

const Register: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AuthWrapper>
      <div>
        <div className="text-2xl font-semibold mb-4">Đăng ký</div>
        <div></div>
        <div
          className="underline hover:text-secondary text-sm cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Đã có tài khoản?
        </div>
      </div>
    </AuthWrapper>
  );
};

export default Register;
