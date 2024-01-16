// index.js

const monitors = ['suresh', 'deepank', 'abhik'];
let voteData = {};

function initializeVoteData() {
  for (const monitor of monitors) {
    voteData[monitor] = { _id: null, count: 0, voters: [] };
  }
}

initializeVoteData();

function vote() {
  const studentName = document.getElementById('studentName').value;
  const monitorSelect = document.getElementById('monitorSelect');
  const selectedMonitor = monitorSelect.options[monitorSelect.selectedIndex].value;

  if (!studentName) {
    alert('Please enter your name');
    return;
  }

  axios.post('https://crudcrud.com/api/3bd17842d46743b2a59aaeb8051fcc52/voteData', { studentName, selectedMonitor })
    .then(response => {
      voteData[selectedMonitor]._id = response.data._id;
      voteData[selectedMonitor].count++;
      voteData[selectedMonitor].voters.push({ _id: response.data._id, name: studentName });
      updateVoteList();
    })
    .catch(error => {
      console.error('Error submitting vote:', error);
    });
}

function deleteVote(studentId, selectedMonitor) {
  axios.delete(`https://crudcrud.com/api/3bd17842d46743b2a59aaeb8051fcc52/voteData/${studentId}`)
    .then(response => {
      const voterIndex = voteData[selectedMonitor].voters.findIndex(voter => voter._id === studentId);
      voteData[selectedMonitor].voters.splice(voterIndex, 1);
      voteData[selectedMonitor].count--;
      updateVoteList();
    })
    .catch(error => {
      console.error('Error deleting vote:', error);
    });
}

function updateVoteList() {
  const voteList = document.getElementById('voteList');
  voteList.innerHTML = '';

  for (const monitor of monitors) {
    const listItem = document.createElement('li');
    listItem.className = 'vote-item';
    listItem.innerHTML = `
      <div>${monitor}</div>
      <div>Total: ${voteData[monitor].count} 
        ${voteData[monitor].voters.map(voter => `<div>${voter.name} <button class="delete-button" onclick="deleteVote('${voter._id}', '${monitor}')">Delete</button></div>`).join('')}
      </div>
    `;
    voteList.appendChild(listItem);
  }

  const totalVotes = Object.values(voteData).reduce((acc, cur) => acc + cur.count, 0);
  document.getElementById('totalVotes').innerText = totalVotes;
}


