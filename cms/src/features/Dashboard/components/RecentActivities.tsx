import { Card, CardBody, Chip } from "@heroui/react";
import moment from "moment";
import { Activity } from "../types";

moment.locale("vi");

interface RecentActivitiesProps {
    data: Activity[];
}

const RecentActivities = ({ data }: RecentActivitiesProps) => {
    const getActivityIcon = (type: Activity["type"]) => {
        switch (type) {
            case "event":
                return "🎉";
            case "maintenance":
                return "🔧";
            case "meeting":
                return "📋";
            default:
                return "📅";
        }
    };

    const getActivityColor = (type: Activity["type"]) => {
        switch (type) {
            case "event":
                return "success" as const;
            case "maintenance":
                return "warning" as const;
            case "meeting":
                return "primary" as const;
            default:
                return "default" as const;
        }
    };

    const getActivityTypeText = (type: Activity["type"]) => {
        switch (type) {
            case "event":
                return "Sự kiện";
            case "maintenance":
                return "Bảo trì";
            case "meeting":
                return "Họp";
            default:
                return "Khác";
        }
    };

    return (
        <div className="h-full">
            <div className="space-y-3 max-h-80 overflow-auto">
                {data.map((activity) => (
                    <Card key={activity.id} className="shadow-sm hover:shadow-md transition-shadow">
                        <CardBody className="p-4">
                            <div className="flex items-start space-x-3">
                                <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-medium text-gray-800">
                                            {activity.title}
                                        </h4>
                                        <Chip
                                            color={getActivityColor(activity.type)}
                                            size="sm"
                                            variant="flat"
                                        >
                                            {getActivityTypeText(activity.type)}
                                        </Chip>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">
                                        {activity.description}
                                    </p>
                                    <div className="flex items-center text-xs text-gray-500">
                                        <span>📅 {moment(activity.date).format("DD/MM/YYYY")}</span>
                                        <span className="mx-2">•</span>
                                        <span>{moment(activity.date).fromNow()}</span>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default RecentActivities;
