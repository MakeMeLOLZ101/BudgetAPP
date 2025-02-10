let budget = JSON.parse(localStorage.getItem('budget')) || 0;
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

const budgetInput = document.querySelector('#budget-input');
const expenseForm = document.querySelector('#expense-form');
const expenseNameInput = document.querySelector('#expense-name');
const expenseAmountInput = document.querySelector('#expense-amount');
const balanceDisplay = document.querySelector('#balance');
const expensesList = document.querySelector('#expenses-list');

budgetInput.value = budget;

function saveData() {
    localStorage.setItem('budget', JSON.stringify(budget));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function ferthatMoney(amount) {
    return '$' + amount.toFixed(2);
}

function updateDisplay() {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    
    const balance = budget - totalExpenses;
    
    balanceDisplay.textContent = ferthatMoney(balance);
    
    balanceDisplay.style.color = balance < 0 ? 'red' : 'green';
    
    expensesList.innerHTML = '';
    
    expenses.forEach((expense) => {
        const item = document.createElement('li');
        item.className = 'expense-item';
        
        item.innerHTML = `
            <span>${expense.name}</span>
            <span>${ferthatMoney(expense.amount)}</span>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        `;
        
        expensesList.appendChild(item);
    });
}

budgetInput.addEventListener('change', function() {
    budget = Number(budgetInput.value) || 0;
    
    saveData();
    updateDisplay();
});

expenseForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = expenseNameInput.value;
    const amount = Number(expenseAmountInput.value);
    
    if (name && amount > 0) {
        const newExpense = {
            id: Date.now(),
            name: name,
            amount: amount
        };
        
        expenses.push(newExpense);
        
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        
        saveData();
        updateDisplay();
    }
});

window.deleteExpense = function(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    
    saveData();
    updateDisplay();
};

updateDisplay();