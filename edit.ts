(document.querySelector("#print") as HTMLButtonElement).onclick = () => {
    window.print();
};

const colorInp = document.querySelector("#colorInp") as HTMLInputElement;
const bgColorInp = document.querySelector("#bgColorInp") as HTMLInputElement;
const bulletBtn = document.querySelector(".bulletBtn") as HTMLButtonElement;

const actionBtns = document.querySelectorAll(".textaction") as NodeListOf<HTMLButtonElement>;
const styleBtns = document.querySelectorAll(".textStyle") as NodeListOf<HTMLButtonElement>;
const page = document.querySelector("#page") as HTMLElement;

let elem: HTMLElement = document.createElement("p");
let selectedColor: string = "black";
let selection: Selection | null = null;
let selectedElem: HTMLElement | null = null;

styleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const property = btn.getAttribute("data-property") as string;
        styleElem(property, btn.getAttribute("data-ac") as string);
    });
});

actionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (selection && selection.isCollapsed) {
            styleElem(btn.getAttribute("data-style") as string, btn.getAttribute("data-value") as string);
        } else {
            setElem(btn.getAttribute("data-ac") as string);
        }
    });
});

function setupStyleDropdowns() {
    const dropdowns = [
        { id: "fontFamilySelect", property: "fontFamily" },
        { id: "fontWeightSelect", property: "fontWeight" },
        { id: "fontSizeSelect", property: "fontSize" }
    ];

    dropdowns.forEach(({ id, property }) => {
        const selectElement = document.getElementById(id) as HTMLSelectElement;
        
        if (selectElement) {
            selectElement.addEventListener("change", () => {
                styleElem(property, selectElement.value);
                selectElement.value = ""
            });
        }
    });
}

setupStyleDropdowns();


const styleElem = (property: string, styles: string) => {
    if (!selectedElem) return;
    selectedElem.style[property as any] = styles;
};

const setElem = (action: string | null) => {
    if (!action) {
        elem = document.createElement("p");
        return;
    }
    if (!selection || selection.toString().trim() === "") {
        elem = document.createElement(action);
        return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
    const parentElement = selection.anchorNode?.parentNode as HTMLElement;

    if (parentElement.tagName.toLowerCase() === action.toLowerCase()) {
        parentElement.outerHTML = selectedText;
    } else {
        const element = document.createElement(action);
        element.innerText = selectedText;
        element.style.color = selectedColor;

        range.deleteContents();
        range.insertNode(element);
    }
};

page.addEventListener("mouseup", (e) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute("id") == "page") {
        selection = window.getSelection();
        page.addEventListener("input", () => {
            const selectedParent = selection?.anchorNode?.parentElement;
            if (selectedParent?.getAttribute("id") !== "page") {
                // if (selection?.anchorOffset <= 0) {
                // }
            }
        });
    }
    if (target.getAttribute("id") !== "page") {
        page.addEventListener("keypress", (e) => e.key === "Enter" ? selectedElem = null : selectedElem = target);
        selectedElem = target;

        if (selectedElem) {
            (document.querySelector(".displaySelection") as HTMLElement).innerText = `${target.tagName.toLowerCase()} : ${target.innerText.substring(0, 20)}..`;
        }
    }
});

const paddPage = (input: string) => {
    const inputElem = document.querySelector(input) as HTMLInputElement;
    const action = inputElem.getAttribute("data-ac") as string;

    inputElem.addEventListener("input", () => {
        if (parseInt(inputElem.value) > 60 || parseInt(inputElem.value) < 0) {
            inputElem.value = "10";
            return;
        }
        if (inputElem.classList.contains("paddPageInp")) {
            page.style[action as any] = inputElem.value + 'px';
        } else {
            if (!selectedElem) {
                console.log("no element");
                return;
            }
            selectedElem.style[action as any] = inputElem.value + 'px';
        }
    });
    inputElem.value = "";
};

paddPage(".pt-inp");
paddPage(".pb-inp");
paddPage(".pr-inp");
paddPage(".pl-inp");
paddPage(".paddPageInp");

colorInp.addEventListener("input", () => {
    (document.querySelector(".displyColorHex") as HTMLElement).innerText = colorInp.value;
    selectedColor = colorInp.value;
    if (selectedElem) selectedElem.style.color = colorInp.value;
});

bgColorInp.addEventListener("input", () => {
    page.style.background = bgColorInp.value;
    (document.querySelector(".displyBgHex") as HTMLElement).innerText = bgColorInp.value;
});

bulletBtn.onclick = () => {
    const element = document.createElement("span");
    element.innerHTML = "&bull;";
    page.appendChild(element);
};

// =======================  help pop up 

const okInstrBtn = document.querySelector(".okInstructions") as HTMLButtonElement;
const helpBtn = document.querySelector("#help") as HTMLButtonElement;

helpBtn.onclick = () => {
    (document.querySelector(".helpPopup") as HTMLElement).style.display = "flex";
};

okInstrBtn.onclick = () => {
    (document.querySelector(".helpPopup") as HTMLElement).style.display = "none";
};
