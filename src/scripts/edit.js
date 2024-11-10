document.querySelectorAll(".printBtn").forEach((btn) => {
    btn.onclick = () => {
        window.print();
    };
});
const colorInp = document.querySelector("#colorInp");
const bgColorInp = document.querySelector("#bgColorInp");
const bulletBtn = document.querySelector(".bulletBtn");
const actionBtns = document.querySelectorAll(".textaction");
const styleBtns = document.querySelectorAll(".textStyle");
const page = document.querySelector("#page");
let elem = document.createElement("p");
let selectedColor = "black";
let selection = null;
let selectedElem = null;
styleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const property = btn.getAttribute("data-property");
        styleElem(property, btn.getAttribute("data-ac"));
    });
});
actionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (selection && selection.isCollapsed) {
            styleElem(btn.getAttribute("data-style"), btn.getAttribute("data-value"));
        }
        else {
            setElem(btn.getAttribute("data-ac"));
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
        const selectElement = document.getElementById(id);
        if (selectElement) {
            selectElement.addEventListener("change", () => {
                styleElem(property, selectElement.value);
                selectElement.value = "";
            });
        }
    });
}
setupStyleDropdowns();
const styleElem = (property, styles) => {
    if (!selectedElem)
        return;
    selectedElem.style[property] = styles;
};
const setElem = (action) => {
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
    const parentElement = selection.anchorNode?.parentNode;
    if (parentElement.tagName.toLowerCase() === action.toLowerCase()) {
        parentElement.outerHTML = selectedText;
    }
    else {
        const element = document.createElement(action);
        element.innerText = selectedText;
        element.style.color = selectedColor;
        range.deleteContents();
        range.insertNode(element);
    }
};
page.addEventListener("mouseup", (e) => {
    const target = e.target;
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
            document.querySelector(".displaySelection").innerText = `${target.tagName.toLowerCase()} : ${target.innerText.substring(0, 20)}..`;
        }
    }
});
const paddPage = (input) => {
    const inputElem = document.querySelector(input);
    const action = inputElem.getAttribute("data-ac");
    inputElem.addEventListener("input", () => {
        if (parseInt(inputElem.value) > 60 || parseInt(inputElem.value) < 0) {
            inputElem.value = "10";
            return;
        }
        if (inputElem.classList.contains("paddPageInp")) {
            page.style[action] = inputElem.value + 'px';
        }
        else {
            if (!selectedElem) {
                console.log("no element");
                return;
            }
            selectedElem.style[action] = inputElem.value + 'px';
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
    document.querySelector(".displyColorHex").innerText = colorInp.value;
    selectedColor = colorInp.value;
    if (selectedElem)
        selectedElem.style.color = colorInp.value;
});
bgColorInp.addEventListener("input", () => {
    page.style.background = bgColorInp.value;
    document.querySelector(".displyBgHex").innerText = bgColorInp.value;
});
bulletBtn.onclick = () => {
    const element = document.createElement("span");
    element.innerHTML = "&bull;";
    page.appendChild(element);
};
// =======================  help pop up 
const okInstrBtn = document.querySelector(".okInstructions");
const helpBtn = document.querySelector("#help");
helpBtn.onclick = () => {
    document.querySelector(".helpPopup").style.display = "flex";
};
okInstrBtn.onclick = () => {
    document.querySelector(".helpPopup").style.display = "none";
};
export {};
