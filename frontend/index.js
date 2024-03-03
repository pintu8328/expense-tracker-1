function getData(){
    axios
    .get("http://localhost:4000/expenses")
    .then((res) => {
      console.log(res.data);
      displayExpensesOnScreen(res.data);
    })
    .catch((err) => {
      console.log("error is", err);
    });
}

function displayExpensesOnScreen(expenseDetails) {
    expenseDetails.map((e) => {
        const expenseItem = document.createElement("li");
        expenseItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        const expenseDetailsDiv = document.createElement("div");
        expenseDetailsDiv.innerHTML = `
            <span><strong>Amount:</strong> ${e.amount}</span>
            <span><strong>Description:</strong> ${e.description}</span>
            <span><strong>Category:</strong> ${e.category}</span>
        `;

        const actionButtonsDiv = document.createElement("div");
        actionButtonsDiv.classList.add("btn-group");

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("btn", "btn-danger", "delete-btn");
        deleteBtn.appendChild(document.createTextNode("Delete"));
        deleteBtn.addEventListener("click", () => deleteExpense(e.id));
        actionButtonsDiv.appendChild(deleteBtn);

        const editBtn = document.createElement("button");
        editBtn.classList.add("btn", "btn-primary", "edit-btn");
        editBtn.appendChild(document.createTextNode("Edit"));
        editBtn.addEventListener("click", () => populateFormForEdit(e.id, e.amount, e.description, e.category));
        actionButtonsDiv.appendChild(editBtn);

        expenseItem.appendChild(expenseDetailsDiv);
        expenseItem.appendChild(actionButtonsDiv);

        document.getElementById("append").appendChild(expenseItem);
    });
}


function deleteExpense(id){
    axios.delete(`http://localhost:4000/expenses/${id}`)
    .then((res)=>{
      document.getElementById("append").innerHTML=null;
          getData();
        console.log(res)
    })
    .catch((err)=>{
        console.log(err);
    });
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  console.log(formData)
  const expenseData = {
      amount: document.getElementById('amount').value,
      description: document.getElementById('description').value,
      category: document.getElementById('category').value
  };
  console.log(expenseData)

  axios.post('http://localhost:4000/expenses', expenseData) 
      .then((res) => {
        document.getElementById('amount').value = '';
        document.getElementById('description').value = '';
        document.getElementById('category').value = '';
        document.getElementById("append").innerHTML=null;
          getData();
          console.log('Data saved:', res.data);
      })
      .catch((err) => {
          console.error('Error saving data:', err);
      });
}

function populateFormForEdit(id, amount, description, category) {
  document.getElementById('amount').value = amount;
  document.getElementById('description').value = description;
  document.getElementById('category').value = category;
  deleteExpense(id)
}

getData();
