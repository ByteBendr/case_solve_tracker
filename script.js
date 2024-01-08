document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit();
    const clearListModal = document.getElementById('clearListModal');
    M.Modal.init(clearListModal); // Initialize the modal
  
    function addTicket() {
      const ticketNumber = document.getElementById('ticketNumber').value;
  
      if (ticketNumber.trim() !== '') {
        const ticketList = document.getElementById('ticketList');
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.textContent = `Case Number: ${ticketNumber}`;
        ticketList.appendChild(li);
  
        // Save ticket to localStorage
        const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets.push(ticketNumber);
        localStorage.setItem('tickets', JSON.stringify(tickets));
  
        // Update total ticket count
        updateTotalTickets();
  
        // Clear the input field
        document.getElementById('ticketNumber').value = '';
      }
    }
  
    function updateTotalTickets() {
      const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
      const totalTicketsElement = document.getElementById('totalTicketCount');
      totalTicketsElement.textContent = tickets.length;
    }
  
    function loadTickets() {
      const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
      const ticketList = document.getElementById('ticketList');
  
      tickets.forEach(ticketNumber => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.textContent = `Case Number: ${ticketNumber}`;
        ticketList.appendChild(li);
      });
  
      // Update total ticket count
      updateTotalTickets();
    }
  
    function clearTicketList() {
      // Clear the ticket list in the DOM
      const ticketList = document.getElementById('ticketList');
      ticketList.innerHTML = '';
  
      // Clear the ticket list in localStorage
      localStorage.removeItem('tickets');
  
      // Update total ticket count
      updateTotalTickets();
  
      // Close the modal
      const instance = M.Modal.getInstance(clearListModal);
      instance.close();
    }
  
    loadTickets();
  
    window.addTicket = addTicket;
    window.clearTicketList = clearTicketList;
  
    document.getElementById('ticketNumber').addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        addTicket();
      }
    });
  });
  