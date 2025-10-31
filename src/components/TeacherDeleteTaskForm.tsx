import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthStore } from "../state";

const TeacherDeleteTaskForm: React.FC = () => {
    const token = useAuthStore(s => s.token);
    const [taskId, setTaskId] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        if (!taskId) return alert("Enter task ID");
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/tasks/${taskId}/delete`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Delete failed");
            alert("Task deleted successfully!");
        } catch {
            alert("Error while deleting task");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border p-4 rounded shadow-sm mt-5">
            <h4>Delete Task</h4>
            <Form>
                <Form.Group className="mt-2">
                    <Form.Label>Task ID</Form.Label>
                    <Form.Control value={taskId} onChange={(e) => setTaskId(e.target.value)}/>
                </Form.Group>
                <div className="mt-4">
                    <Button variant="danger" disabled={loading} onClick={handleDelete}>
                        {loading ? "Deleting..." : "Delete Task"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default TeacherDeleteTaskForm;
