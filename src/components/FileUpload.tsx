import React, {useState} from 'react';
import {type SubmissionFileType} from "../types";
import { useAuthStore } from "../state";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

interface FileUploadProps {
    fileType: SubmissionFileType;
    taskId: string;
    buttonText?: string;
    onSubmission: boolean
}

const FileUpload: React.FC<FileUploadProps> = ({fileType, taskId, buttonText='Submit file', onSubmission}) => {
    const [drag, setDrag] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const token = useAuthStore(state => state.token);
    const navigate = useNavigate();

    function dragStartOverHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setDrag(true);
    }

    function dragLeave(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setDrag(false);
    }

    function onDropEventHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setDrag(false);
        const files = [...event.dataTransfer.files];
        if (files.length > 0) {
            setFile(files[0]);
        }
    }

    async function handleSubmitFile(event: React.FormEvent) {
        event.preventDefault();
        if (isSubmitting || !file || !token) {
            console.error(isSubmitting ? "Submission in progress" : !file ? "No file selected!" : "Token is missing!");
            return;
        }

        setIsSubmitting(true);
        setDrag(true);

        try {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('fileType', fileType.toString());

            // 1. Upload file and get sourceCodeFileId
            const uploadResponse = await fetch("http://localhost:8000/api/files/upload", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: uploadFormData,
            });

            if (!uploadResponse.ok) {
                throw new Error("File upload failed!");
            }

            const uploadData = await uploadResponse.json();
            const sourceCodeFileId = uploadData.id;

            // 2. Submit task
            const submissionBody = JSON.stringify({
                taskId: taskId,
                sourceCodeFileId: sourceCodeFileId
            });

            const submitResponse = await fetch("http://localhost:8000/api/tasks/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: submissionBody,
            });

            if (!submitResponse.ok) {
                throw new Error("Submission failed!");
            }

            const submitData = await submitResponse.json();
            const submissionId = submitData.id;

            if (onSubmission) {
                navigate(`/problemset/results/${taskId}`, {state: {submissionId}});
            } else {
                alert("File Submitted Successfully!");
            }


        } catch (error) {
            console.error("Submission error:", error);
            alert("Submission failed: " + (error instanceof Error ? error.message : "Unknown error"));
        } finally {
            setIsSubmitting(false);
            setDrag(false);
        }
    }

    return (
        <div>
            <div
                className={`flex mt-10 ml-60 w-50 h-40 items-center justify-center border-2 border-dashed ${drag ? "bg-gray-100" : ""}`}
                onDragStart={dragStartOverHandler}
                onDragLeave={dragLeave}
                onDragOver={dragStartOverHandler}
                onDrop={onDropEventHandler}
            >
                {drag ? "Drop the file to upload" : file ? file.name : "Move file here"}
            </div>

            <div className="flex ml-60 mt-3">
                <Button variant="dark" onClick={handleSubmitFile} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : buttonText}
                </Button>
            </div>
        </div>
    );
};

export default FileUpload;