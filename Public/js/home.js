const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.setItem("session");

let data = {
    transactions: []
}
document.getElementById("button-logout").addEventListener("click", logout);
document.getElementById("transactions-button").addEventListener("click", function())
      {
    window.location.href= "transactions.html"
}

//ADICIONAR LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e){
    e.preventDefault();

    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const date = document.getElementById("date-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transactions.unshift({
        value: value, type: type, description: description, date: date
    });

    saveData(data);
    e.target.reset();
    myModal.hide();

    alert("Lançamento adicionado com sucesso.");

});

checkLogged();

function checkLogged() {
    if(session) {
        sessionStorage.setItem("logged", session);
        logged = session;
    }

    if(!logged) {
        window.location.href = "index.html"
        return;
    }
    const dataUser = localStorage.getItem(logged);
    if(dataUser) {
        data = JSON.parse(dataUser);
    }

    getCashIn();
    getCashOut();
    getTotal();

}

function logout() {
    sessionStorage.removeItem("logged");
    localStorage.removeItem("session");

    window.location.href = "index.html";
}

function getCashIn() {
    const transactions = data.transactions 

    const CashIn = transactions.filter((item) => item.type === "1");

    if(CashIn.lenght) {
        let CashInHtml = '';
        let limit = 0;
    

    if(CashIn.lenght > 5) {
        limit = 5; 
    } else {
        limit = CashIn.length;
    }

    for (let index = 0; index < limit; index++) {
       CashInHtml += ''
       <div class="row mb-4">
                            <div class="col-6">
                                <div class="container p-0" id="cash-in-list">
                                    <div class="row mb4">
                                        <div class="col-12">
                                           <h3 class="fs-2"> ${CashIn[index].value.toFixed(2)}</h3>
                                           <p>${CashIn[index].description}</p>
                                           <div class="col-12 col-md-3 d-flex justify-content-end">
                                               ${CashIn[index].date}
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
    }
    
    document.getElementById("cash-in-list").innerHTML = CashInHtml;

}

}
function getTotal() {
    const transactions = data.transactions;

    transactions.forEach(item) => {
        if(item.type === "1") {
            total += item.value;
        } else{
            total -= item.value;
        }
    }
};

document.getElementById("total").innerHtml = 'R$ ${total.forFixed(2)}';

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data));
}