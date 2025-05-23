import React from "react";
interface UserAvatarProps {
    avatar?: string;
    name: string;
    size?: "sm" | "md" | "lg";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ avatar, name, size = "lg" }) => {
    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32",
    };

    return (
        <div className="flex flex-col items-center">
            {avatar && (
                <img
                    src={avatar}
                    alt={`${name}'s avatar`}
                    className={`${sizeClasses[size]} rounded-full object-cover border-2 border-gray-200`}
                />
            )}
        </div>
    );
};

export default UserAvatar;
