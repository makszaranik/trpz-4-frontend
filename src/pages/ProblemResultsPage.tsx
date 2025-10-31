import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar.tsx";
import { Link, useLocation } from "react-router-dom";
import TabsNavigation from "../components/TabsNavigation.tsx";
import { Table, Badge, Modal, Button } from "react-bootstrap";

type SubmissionStatus =
    "SUBMITTED" |
    "COMPILING" |
    "COMPILATION_SUCCESS" |
    "COMPILATION_ERROR" |
    "WRONG_ANSWER" |
    "ACCEPTED" |
    "TIME_LIMIT_EXCEEDED" |
    "OUT_OF_MEMORY";

interface ISubmission {
    id: string;
    taskId: string;
    status: SubmissionStatus;
    createdAt: string;
    logs?: string;
    userId?: string;
}

const getBadgeVariant = (status: SubmissionStatus): string => {
    switch (status) {
        case "ACCEPTED": return "success";
        case "COMPILATION_SUCCESS": return "success"
        case "COMPILATION_ERROR": return "danger";
        case "WRONG_ANSWER": return "danger"
        case "TIME_LIMIT_EXCEEDED": return "danger"
        case "SUBMITTED": return "secondary";
        default: return "dark";
    }
}

const ProblemResultsPage: React.FC = () => {
    const location = useLocation();
    const { state } = location;
    const submissionIdToTrack: string | undefined = state?.submissionId;
    const taskId = location.pathname.split("/")[3];


    const [trackedSubmission, setTrackedSubmission] = useState<ISubmission | null>(
        submissionIdToTrack ? {
            id: submissionIdToTrack,
            taskId, status: "SUBMITTED",
            createdAt: new Date().toISOString()
        } : null
    );

    const [showLogsModal, setShowLogsModal] = useState(false);
    const handleCloseLogsModal = () => setShowLogsModal(false);
    const handleShowLogsModal = (submission: ISubmission) => {
        setTrackedSubmission(submission);
        setShowLogsModal(true);
    };


    useEffect(() => {
        if (!submissionIdToTrack) return;
        const eventSource = new EventSource(`http://localhost:8000/api/tasks/status?submissionId=${submissionIdToTrack}`);
        eventSource.onopen = () => console.log("SSE Connection opened.");
        eventSource.onmessage = (event) => {
            try {
                const updatedSubmission: ISubmission = JSON.parse(event.data);
                setTrackedSubmission(updatedSubmission);
            } catch (err) {
                console.error("Error parsing SSE data:", err);
            }
        };

        eventSource.onerror = (err) => {
            console.error("SSE Error:", err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
            console.log("SSE Connection cleanup.");
        };
    }, [submissionIdToTrack]);

    return (
        <>
            <Navbar/>
            <Link to='/problemset' className="decoration-none text-2xl ml-60 mt-2 font-bold text-black no-underline">
                CSES Problem Set
            </Link>

            <TabsNavigation options={[
                { value: 'tasks', path: '/problemset' },
                { value: 'submit', path: `/problemset/submit/${taskId}` },
                { value: 'result', path: `/problemset/results/${taskId}` },
                { value: 'statistics', path: `/problemset/statistics/${taskId}` },
            ]} />

            <div className="max-w-4xl mx-auto p-6">
                <h2 className="text-3xl font-semibold mb-4">Results for Task {taskId}</h2>

                <Table striped bordered hover responsive>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Submitted at</th>
                        <th>Logs</th>
                    </tr>
                    </thead>
                    <tbody>
                    {trackedSubmission && (
                        <tr style={{ cursor: 'pointer' }}>
                            <td>{trackedSubmission.id}</td>
                            <td><Badge bg={getBadgeVariant(trackedSubmission.status)}>{trackedSubmission.status}</Badge></td>
                            <td>{new Date(trackedSubmission.createdAt).toLocaleTimeString()}</td>
                            <td>{trackedSubmission.userId || "-"}</td>
                            <td>
                                <Button variant="dark" size="sm" onClick={() => handleShowLogsModal(trackedSubmission)}>
                                    Show
                                </Button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </Table>
            </div>

            <Modal show={showLogsModal} onHide={handleCloseLogsModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Execution Logs {trackedSubmission?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <pre className="p-3 bg-light border rounded" style={{ maxHeight: '500px', overflow: 'auto' }}>
                        {trackedSubmission?.logs || "No logs found."}
                    </pre>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleCloseLogsModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ProblemResultsPage;
