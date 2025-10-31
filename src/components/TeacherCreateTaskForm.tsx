import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuthStore } from "../state";
import FileUpload from "./FileUpload";
import {SubmissionFileType} from "../types";

const TeacherCreateTaskForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
    const token = useAuthStore(s => s.token);
    const [form, setForm] = useState({
        title: "",
        statement: "",
        memoryRestriction: 256,
        solutionTemplateFileId: "",
        testsFileId: "",
        lintersFileId: "",
        testsPoints: 50,
        lintersPoints: 50,
        submissionsNumberLimit: 3
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

    async function handleSubmit() {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:8000/api/tasks/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) throw new Error("Create failed");
            alert("Task created successfully!");
            onSuccess();
        } catch {
            alert("Error while creating task");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="border p-4 rounded shadow-sm">
            <h4>Create New Task</h4>
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

                <h6 className="mt-3">Solution Template File</h6>
                <FileUpload onSubmission={false} fileType={SubmissionFileType.SOLUTION} taskId="temp" buttonText="Upload solution template"/>

                <h6 className="mt-3">Tests File</h6>
                <FileUpload onSubmission={false} fileType={SubmissionFileType.TEST} taskId="temp" buttonText="Upload tests file"/>

                <h6 className="mt-3">Linters File</h6>
                <FileUpload onSubmission={false} fileType={SubmissionFileType.LINTER} taskId="temp" buttonText="Upload linters file"/>

                <Form.Group className="mt-3">
                    <Form.Label>Points for Tests</Form.Label>
                    <Form.Control type="number" name="testsPoints" value={form.testsPoints} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Points for Linters</Form.Label>
                    <Form.Control type="number" name="lintersPoints" value={form.lintersPoints} onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Submission Limit</Form.Label>
                    <Form.Control type="number" name="submissionsNumberLimit" value={form.submissionsNumberLimit} onChange={handleChange}/>
                </Form.Group>

                <div className="mt-4">
                    <Button variant="success" disabled={loading} onClick={handleSubmit}>
                        {loading ? "Creating..." : "Create Task"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default TeacherCreateTaskForm;
