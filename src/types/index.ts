export default interface IProblem {
    id: string;
    title: string;
    statement: string;
    timeRestriction: number;
    memoryRestriction: number;
    solutionTemplateFileId: string;
    testsFileId: string;
    lintersFileId: string;
    testsPoints: number;
    lintersPoints: number;
    submissionsNumberLimit: number;
}
