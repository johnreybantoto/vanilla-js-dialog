class Modal {
  constructor(message = "Hello, this is a modal") {
    this.modalDiv = document.getElementById("modal");
    this.messageDiv = document.getElementById("message");
    this.btnConfirm = document.getElementById("btn-confirm");
    this.btnCancel = document.getElementById("btn-cancel");

    this.message = message;

    this.btnConfirm.addEventListener("click", () => {
      this.confirm();
    });

    this.btnCancel.addEventListener("click", () => {
      this.cancel();
    });
  }

  open(message) {
    this.message = message ? message : this.message;
    this.messageDiv.textContent = this.message;

    this.modalDiv.classList.add("modal-show");

    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  close() {
    this.modalDiv.classList.remove("modal-show");
  }

  confirm() {
    this.close();
    this.resolve('You just clicked "Yes"');
  }

  cancel() {
    this.close();
    this.reject('You just clicked "Cancel"');
  }
}

const btnTrigger = document.getElementById("btn-trigger");
const modalResult = document.getElementById("modal-result");

const modal = new Modal();

btnTrigger.addEventListener("click", async () => {
  let message = "";
  try {
    message = await modal.open("Are you sure you want to continue");
  } catch (error) {
    message = error;
  }
  modalResult.textContent = message;
});
