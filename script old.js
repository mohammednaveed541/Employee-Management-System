let employees = [];
let attendance = [];
let leaveRequests = [];
let goals = [];
let currentUser = '';
let currentRole = '';

function login() {
  const name = document.getElementById('username').value.trim();
  const role = document.getElementById('role').value;

  if (!name) {
    alert('Please enter a name');
    return;
  }

  currentUser = name;
  currentRole = role;
  document.getElementById('login-section').classList.add('hidden');

  if (role === 'admin') {
    document.getElementById('admin-dashboard').classList.remove('hidden');
    renderEmployees();
  } else if (role === 'manager') {
    document.getElementById('manager-dashboard').classList.remove('hidden');
    renderGoals();
  } else {
    document.getElementById('employee-dashboard').classList.remove('hidden');
    renderEmployeeProfile();
  }
}

function renderEmployees() {
  const list = document.getElementById('employee-list');
  list.innerHTML = '';
  employees.forEach((emp, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${emp.name}</strong> - ${emp.role}`;
    list.appendChild(li);
  });
}

function addOrUpdateEmployee() {
  const name = document.getElementById('emp-name').value.trim();
  const role = document.getElementById('emp-role').value.trim();

  if (!name || !role) {
    alert('Fill both name and role');
    return;
  }

  const index = employees.findIndex(e => e.name === name);
  if (index > -1) {
    employees[index].role = role;
    alert('Employee updated!');
  } else {
    employees.push({ name, role });
    alert('Employee added!');
  }

  document.getElementById('emp-name').value = '';
  document.getElementById('emp-role').value = '';
  renderEmployees();
}

function renderEmployeeProfile() {
  document.getElementById('empProfileName').innerText = currentUser;
  let emp = employees.find(e => e.name === currentUser);
  if (!emp) {
    emp = { name: currentUser, role: 'Employee' };
    employees.push(emp);
  }

  document.getElementById('empSelfRole').value = emp.role;
}

function updateSelf() {
  const newRole = document.getElementById('empSelfRole').value.trim();
  if (!newRole) {
    alert("Role cannot be empty.");
    return;
  }

  const emp = employees.find(e => e.name === currentUser);
  if (emp) {
    emp.role = newRole;
    alert("Your role has been updated!");
  }
}

function markAttendance(action) {
  const date = new Date();
  const empAttendance = {
    name: currentUser,
    action: action,
    date: date.toLocaleString()
  };
  attendance.push(empAttendance);
  alert(`${action === 'check-in' ? 'Checked-in' : 'Checked-out'} successfully`);
}

function applyLeave() {
  const leaveType = prompt("Enter leave type (Sick, Vacation, etc.):");
  const leaveDate = new Date().toLocaleDateString();
  leaveRequests.push({ name: currentUser, leaveType, date: leaveDate });
  alert('Leave request submitted!');
  renderLeaveHistory();
}

function renderLeaveHistory() {
  const list = document.getElementById('leave-history');
  list.innerHTML = '';
  leaveRequests.filter(req => req.name === currentUser).forEach(req => {
    const li = document.createElement('li');
    li.innerHTML = `${req.leaveType} - ${req.date}`;
    list.appendChild(li);
  });
}

function setGoal() {
  const goalName = document.getElementById('goal-name').value.trim();
  if (!goalName) {
    alert('Please enter a goal.');
    return;
  }

  goals.push({ name: currentUser, goal: goalName });
  alert('Goal set successfully!');
  renderGoals();
}

function renderGoals() {
  const list = document.getElementById('goal-list');
  list.innerHTML = '';
  goals.filter(g => g.name === currentUser).forEach(g => {
    const li = document.createElement('li');
    li.innerHTML = g.goal;
    list.appendChild(li);
  });
}
