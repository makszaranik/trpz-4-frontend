import React from 'react';
import { useAuthStore } from "../state";
import { Button } from "react-bootstrap";

interface TestsPageProps {
    solutionTemplateFileId?: string;
}

export const DownloadSolutionTemplate: React.FC<TestsPageProps> = ({solutionTemplateFileId}) => {
    const token = useAuthStore(state => state.token);
    const handleOnClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (!solutionTemplateFileId) return console.error("File ID not provided");

        try {
            const response = await fetch(`http://localhost:8000/api/files/download/${solutionTemplateFileId}`);
            if (!response.ok) throw new Error("Error downloading file");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "solution.zip";
            link.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>

            {token && (
                <div>
                    <Button onClick={handleOnClick} variant="dark" style={{ width: "100%" }}>
                        Download solution template
                    </Button>
                </div>
            )}
        </>
    );
};