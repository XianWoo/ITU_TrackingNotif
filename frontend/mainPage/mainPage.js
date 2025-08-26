let timelineChart;
function fetchNoticeDate() {
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

    try {
        // This fetch call assumes a backend is running on port 5000
        const response = await fetch(`http://127.0.0.1:5000/get_notice_date?noticeId=${noticeId}`);
        const data = await response.json();

        if (response.ok) {
            statusMessageDiv.innerHTML = `✅ Notice ${data.noticeId} was recorded on: ${data.recordedDate}`;
            statusMessageDiv.classList.add('success');
            renderTimeline(data.recordedDate);
        } else {
            statusMessageDiv.innerHTML = `❌ Error: ${data.error}`;
            statusMessageDiv.classList.add('error');
        }
    } catch (error) {
        statusMessageDiv.innerHTML = '❌ An error occurred while connecting to the server.';
        statusMessageDiv.classList.add('error');
        console.error('Fetch error:', error);
    }
}

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
                borderColor: '#006BFF',
                backgroundColor: 'rgba(0, 107, 255, 0.1)',
                tension: 0.4,
                pointRadius: 6,
                pointBackgroundColor: '#006BFF',
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
