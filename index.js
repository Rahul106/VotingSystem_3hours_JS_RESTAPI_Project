// index.js
let totalVotes = 0;
let voteData = {};
const monitors = ['suresh', 'deepank', 'abhik'];


function initializeVoteData() {
  for (const monitor of monitors) {
    voteData[monitor] = { _id: null, count: 0, voters: [] };
    console.log(voteData);
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

  totalVotes++;
  const payLoad = {
    studentName,
    selectedMonitor,
    monitorVoteCount: voteData[selectedMonitor].count + 1,
    //totalVotes: totalVotes
  }

  axios.post('https://crudcrud.com/api/9a8a2c751db4407683f2f202b74a30fe/voteData', payLoad)
    .then(response => {
      voteData[selectedMonitor]._id = response.data._id;
      voteData[selectedMonitor].count++;
      voteData[selectedMonitor].voters.push({ _id: response.data._id, name: studentName });
      updateVoteList();

      //console.log('Total Votes:', +totalVotes);
      //console.log('Monitor Vote : ' + voteData[selectedMonitor].count);
    })
    .catch(error => {
      console.error('Error submitting vote:', error);
    });
}


function deleteVote(studentId, selectedMonitor) {

  //templateliteral//stringtemplate //stringinterpolation
  axios.delete(`https://crudcrud.com/api/9a8a2c751db4407683f2f202b74a30fe/voteData/${studentId}`)
    .then(response => {
      const voterIndex = voteData[selectedMonitor].voters.findIndex(voter => voter._id === studentId);
      voteData[selectedMonitor].voters.splice(voterIndex, 1);
      voteData[selectedMonitor].count--;
      totalVotes--;
      updateVoteList();
    })
    .catch(error => {
      console.error('Error deleting vote:', error);
    });
}


async function refreshVotes() {

  try {

    const response = await axios.get('https://crudcrud.com/api/9a8a2c751db4407683f2f202b74a30fe/voteData');

    // Clear existing data
    initializeVoteData();

    // Update voteData with the latest data from the backend
    const savedCrudData = response.data;
    for (const monitor in savedCrudData) {
      let selectedCandidate = savedCrudData[monitor].selectedMonitor
      voteData[selectedCandidate]._id = savedCrudData[monitor]._id;
      voteData[selectedCandidate].voters.push({ _id: savedCrudData[monitor]._id, name: savedCrudData[monitor].studentName });
      voteData[selectedCandidate].count = savedCrudData[monitor].monitorVoteCount;
      totalVotes = savedCrudData[monitor].totalVotes;
    }

    // Update the UI with the refreshed data
    updateVoteList();

  } catch (error) {
    console.error('Error refreshing votes:', error);
  }
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

  //totalVotes = Object.values(voteData).reduce((acc, cur) => acc + cur.count, 0);
  document.getElementById('totalVotes').innerText = totalVotes;
}

document.addEventListener('DOMContentLoaded', refreshVotes);

