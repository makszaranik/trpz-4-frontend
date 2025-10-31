import React from "react";
import TeacherCreateTaskForm from "../components/TeacherCreateTaskForm";
import TeacherUpdateTaskForm from "../components/TeacherUpdateTaskForm";
import TeacherDeleteTaskForm from "../components/TeacherDeleteTaskForm";

const TeacherTasksPage: React.FC = () => {
    const refresh = () => window.location.reload();

    return (
        <div className="p-10">
            <h2 className="mb-4 text-xl font-semibold">Teacher Panel</h2>
            <TeacherCreateTaskForm onSuccess={refresh}/>
            <hr/>
            <TeacherUpdateTaskForm onSuccess={refresh}/>
            <hr/>
            <TeacherDeleteTaskForm onSuccess={refresh}/>
        </div>
    );
};

export default TeacherTasksPage;
