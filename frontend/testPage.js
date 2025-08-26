// This function simulates an API call to a backend server.
// It uses fake data to demonstrate the frontend functionality.
async function fetchNoticeDate() {
    const noticeId = document.getElementById('noticeIdInput').value;
    const statusMessageDiv = document.getElementById('status-message');
    const timelineSection = document.getElementById('timeline-section');

    statusMessageDiv.innerHTML = 'Searching...';
    statusMessageDiv.className = 'status-message';
    timelineSection.style.display = 'none';

    if (!noticeId) {
        statusMessageDiv.innerHTML = 'Please enter a Notice ID.';
        statusMessageDiv.classList.add('error');
        return;
    }

    // This section simulates a network request.
    // In a real application, you would replace this with a 'fetch' call to your backend.
    try {
        // Simulating an asynchronous operation with a 1-second delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        let responseData = {};

        // Use fake data for demonstration
        if (noticeId === "12345") {
            responseData = {
                ok: true,
                data: {
                    noticeId: noticeId,
                    recordedDate: "2024-07-15"
                }
            };
        } else {
            responseData = {
                ok: false,
                data: {
                    error: "No record found for the provided Notice ID."
                }
            };
        }

        if (responseData.ok) {
            statusMessageDiv.innerHTML = `✅ Notice ${responseData.data.noticeId} was recorded on: ${responseData.data.recordedDate}`;
            statusMessageDiv.classList.add('success');
            renderTimeline(responseData.data.recordedDate);
        } else {
            statusMessageDiv.innerHTML = `❌ Error: ${responseData.data.error}`;
            statusMessageDiv.classList.add('error');
        }

    } catch (error) {
        statusMessageDiv.innerHTML = '❌ An unexpected error occurred.';
        statusMessageDiv.classList.add('error');
        console.error('Fetch error:', error);
    }
}

let timelineChart;
function renderTimeline(recordedDate) {
    const date = new Date(recordedDate);
    const stages = [
        { name: 'Notice Recorded', date: date },
        { name: 'Processing', date: new Date(date.setDate(date.getDate() + 7)) },
        { name: 'Under Review', date: new Date(date.setDate(date.getDate() + 14)) },
        { name: 'Completed', date: new Date(date.setDate(date.getDate() + 21)) }
    ];

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
