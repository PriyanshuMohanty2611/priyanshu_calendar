document.addEventListener('DOMContentLoaded', () => {
    let currentDate = new Date();
    const timeElement = document.getElementById('current-time');
    const monthElement = document.getElementById('current-month');
    const calendarBody = document.getElementById('calendar-body');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    // Show current time
    function updateTime() {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Render calendar
    function renderCalendar(date) {
        calendarBody.innerHTML = ''; // Clear previous content
        const year = date.getFullYear();
        const month = date.getMonth();
        monthElement.textContent = date.toLocaleDateString('default', { month: 'long', year: 'numeric' });
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Generate calendar cells
        let dateCell = 1;
        for (let i = 0; i < 6; i++) { // 6 rows
            const row = document.createElement('tr');
            for (let j = 0; j < 7; j++) { // 7 days
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.textContent = ''; // Empty cell
                } else if (dateCell > daysInMonth) {
                    break; // Stop loop
                } else {
                    cell.textContent = dateCell;
                    if (Math.random() > 0.9) { // Randomly mark some events for demo
                        cell.classList.add('event');
                        cell.title = 'Event';
                    }
                    dateCell++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
        }
    }

    // Navigation
    prevMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate); // Initial render
});
