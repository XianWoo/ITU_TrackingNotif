// This script runs when the resultsPage.html is loaded.
document.addEventListener('DOMContentLoaded', () => {
    // Get the notice ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const noticeId = urlParams.get('noticeId');

    if (noticeId) {
        document.title = `Notice Status: ${noticeId}`;
        document.getElementById('notice-id-display').innerText = noticeId;
        // Directly display the hardcoded results
        displayHardcodedResults(noticeId);
    } else {
        const statusMessageDiv = document.getElementById('status-message');
        statusMessageDiv.innerHTML = '❌ No Notice ID found in the URL.';
        statusMessageDiv.classList.add('error');
    }
});

function displayHardcodedResults(noticeId) {
    const statusMessageDiv = document.getElementById('status-message');
    const timelineSection = document.getElementById('timeline-section');
    const resultsTableSection = document.getElementById('results-table-section'); // Get the table section

    // Hardcoded data for demonstration
    const hardcodedDates = [
        "2025-01-02",
        "2025-06-27",
        "2025-08-20"
    ];

    // Assuming the last date is the completion date
    const finalDate = hardcodedDates[hardcodedDates.length - 1];
    const conclusion = "Finished";

    statusMessageDiv.innerHTML = `✅ **Success:** Notice **${noticeId}** is ${conclusion}. Last update: **${finalDate}**`;
    statusMessageDiv.classList.add('success');

    // Render the table
    renderResultsTable(noticeId, hardcodedDates, conclusion);

    // Render the timeline
    renderTimeline(hardcodedDates);

    // Show both sections
    timelineSection.style.display = 'block';
    resultsTableSection.style.display = 'block'; // Show the table
}

function renderResultsTable(noticeId, dates, conclusion) {
    const tableBody = document.querySelector('#results-table tbody');

    // Create a new row
    const newRow = document.createElement('tr');

    // Add the notice ID cell
    newRow.innerHTML += `<td>${noticeId}</td>`;

    // Add the date cells
    dates.forEach(date => {
        newRow.innerHTML += `<td>${date}</td>`;
    });

    // Add the conclusion cell
    newRow.innerHTML += `<td>${conclusion}</td>`;

    // Append the new row to the table body
    tableBody.appendChild(newRow);
}


let timelineChart;
function renderTimeline(dates) {
    const stages = dates.map((dateStr, index) => {
        const date = new Date(dateStr);
        let name = '';
        if (index === 0) {
            name = 'Notice Recorded';
        } else if (index === dates.length - 1) {
            name = 'Finished';
        } else {
            name = `Stage ${index}`;
        }
        return { name, date };
    });

    const labels = stages.map(s => s.name);
    const dataPoints = stages.map(s => s.date);

    const ctx = document.getElementById('timelineChart').getContext('2d');

    if (timelineChart) {
        timelineChart.destroy();
    }

    document.getElementById('timeline-section').style.display = 'block';

    timelineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Notice Progress Timeline',
                data: dataPoints,
                borderColor: '#2D62B7',
                backgroundColor: 'rgba(45, 98, 183, 0.2)',
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#2D62B7',
                pointBorderColor: 'white',
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Notice Progress',
                    font: {
                        size: 18,
                        weight: '600'
                    }
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        title: context => context[0].label,
                        label: context => `Date: ${new Date(context.raw).toLocaleDateString()}`
                    }
                }
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MMM d'
                        }
                    },
                    title: {
                        display: true,
                        text: 'Date',
                        color: '#333333'
                    },
                    grid: {
                        display: false
                    }
                },
                y: {
                    display: false,
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}