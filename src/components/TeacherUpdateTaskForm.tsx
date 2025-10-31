import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthStore } from "../state";
import FileUpload from "./FileUpload";
import {SubmissionFileType} from "../types";

const TeacherUpdateTaskForm: React.FC<{ taskId: string }> = ({ taskId }) => {
    const token = useAuthStore(s => s.token);
    const [form, setForm] = useState({
        title: "",
        statement: "",
        memoryRestriction: 256
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    async function handleSubmit() {
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:8000/api/tasks/${taskId}/update`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) throw new Error("Update failed");
            alert("Task updated successfully!");
        } catch {
            alert("Error while updating task");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border p-4 rounded shadow-sm mt-5">
            <h4>Update Task</h4>
            <Form>
                <Form.Group className="mt-2">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" value={form.title} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Statement</Form.Label>
                    <Form.Control as="textarea" rows={3} name="statement" value={form.statement} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mt-2">
                    <Form.Label>Memory Restriction</Form.Label>
                    <Form.Control type="number" name="memoryRestriction" value={form.memoryRestriction} onChange={handleChange}/>
                </Form.Group>

                <h6 className="mt-3">Replace Files (optional)</h6>
                <FileUpload onSubmission={false} fileType={SubmissionFileType.SOLUTION} taskId={taskId} buttonText="Replace solution"/>
                <FileUpload onSubmission={false} fileType={SubmissionFileType.TEST} taskId={taskId} buttonText="Replace tests"/>
                <FileUpload onSubmission={false} fileType={SubmissionFileType.LINTER} taskId={taskId} buttonText="Replace linters"/>

                <div className="mt-4">
                    <Button variant="warning" disabled={loading} onClick={handleSubmit}>
                        {loading ? "Updating..." : "Update Task"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default TeacherUpdateTaskForm;
