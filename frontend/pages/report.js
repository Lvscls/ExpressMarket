import { fetchCSPReports } from "../utils/fetchCSPReport";

function displayReports(reports) {
    const reportList = document.getElementById('reportList');

    if (reports.length === 0) {
        reportList.innerHTML = "<p class='text-gray-500'>Aucun rapport CSP n'a été trouvé.</p>";
        return;
    }

    const ul = document.createElement('ul');
    ul.classList.add('divide-y', 'divide-gray-200');
    reports.forEach(report => {
        const li = document.createElement('li');
        li.classList.add('py-4');
        li.textContent = `Document: ${report['document-uri']}, Bloqué: ${report['blocked-uri']}, Directive violée: ${report['violated-directive']}`;
        ul.appendChild(li);
    });

    reportList.appendChild(ul);
}

window.addEventListener('DOMContentLoaded', async () => {
    await fetchCSPReports()
        .then(reports => displayReports(reports))
        .catch(error => console.error(error));
});
