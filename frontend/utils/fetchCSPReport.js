import { backendUrl } from "./constant";

export async function fetchCSPReports() {
    try {
        const response = await fetch(`${backendUrl}/csp-report`);
        if (!response.ok) {
            throw new Error('Impossible de récupérer les rapports CSP.');
        }
        const reports = await response.json();
        displayReports(reports);
    } catch (error) {
        console.error(error);
    }
}