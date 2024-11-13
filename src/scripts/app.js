import printResume from "./template.js";
function select(x) {
    return document.querySelector(x);
}
const defaultResume = {
    id: '',
    username: "Demo Username",
    contact: "+9012569845645",
    email: "your@mail.com",
    objective: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam dolorem, ipsum illum quas rem voluptate praesentium.",
    skills: ["Frontenf Engineer", "Teacher", "Example skills"],
    experience: ["4 years of experience as a lean web developer at iBcd.", "2 years of edititng experience using Adobe after effects", "your experiences goes here"],
    education: ["BS in etc in year 2059", "Cerification in GIAIC GenAI", "Your education goes here"],
    summary: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi cumque tempore vitae modi quidem cum eligendi quas. At tempore.",
    image: "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"
};
let isTogglerOpen = false;
const resumeForm = select('#createResumeForm');
const addSkillsBtn = select('#add-skills-btn');
const addExpBtn = select('#add-exp-btn');
const addEduBtn = select('#add-edu-btn');
const skillCaps = select("#skill-capsules-cont");
const expCaps = select("#exp-capsules-cont");
const eduCaps = select("#edu-capsules-cont");
let skillsArr = [];
let experienceArr = [];
let educationArr = [];
let createdResList = [];
const storedResArr = localStorage.getItem("createdResList");
const storedResList = storedResArr ? JSON.parse(storedResArr) : [];
let cvData;
let templateType = 1;
addSkillsBtn.onclick = () => addCapsuleData("#addSkillsInp", skillsArr, "#skill-capsules-cont", ".skillsErrorBox");
addExpBtn.onclick = () => addCapsuleData('#addExpInp', experienceArr, "#exp-capsules-cont", ".expErrorBox");
addEduBtn.onclick = () => addCapsuleData('#addEduInp', educationArr, "#edu-capsules-cont", ".eduErrorBox");
const addCapsuleData = (inpElem, arr, showToElem, errorBox) => {
    const elem = select(inpElem);
    if (elem.value === '') {
        select(errorBox).innerHTML = `<p style="color: red">Field is empty*</p>`;
        return;
    }
    if (arr.length > 9) {
        select(errorBox).innerHTML = `<p style="color: red">Maximum limit is 10*</p>`;
        return;
    }
    select(errorBox).innerHTML = '';
    arr.push(elem.value);
    updateCapsuleDisplay(arr, showToElem);
    elem.value = '';
};
const updateCapsuleDisplay = (arr, showToElem) => {
    let clutter = '';
    arr.forEach((data, index) => {
        clutter += `<span>
                      ${data}
                      <i class="fa-solid fa-trash" style="color: #f0f5ff; padding-left:6px" data-index="${index}"></i>
                    </span>`;
    });
    select(showToElem).innerHTML = `${clutter}<div class="capsule-faded-bottom"></div>`;
};
const updateResumeList = (arr, showToElem) => {
    let clutter = '';
    arr.forEach((data, index) => {
        clutter += `<div class="res-cards" data-id=${data.id}>
                        <div>
                            <div class="imgBox"><img
                                    src=${data.image ? data.image : "https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"}
                                    alt=""></div>
                            <p>${data.username}</p>
                        </div>
                        <div>
                           <i class="fa-solid fa-share shareButton scaler" style="color: #1991f0;" data-link="${data.sharelink}"></i>
                           <i class="fa-solid fa-trash deleteResumeBtn scaler" style="color: #1991F0; padding-left:6px" data-index="${index}"></i>
                        </div>
                    </div> `;
    });
    select(showToElem).innerHTML = clutter;
};
const listAddHelper = (listOf, addTo) => {
    let clutter = ``;
    listOf.forEach((data) => {
        clutter += `<li class="mx-6">${data}</li>`;
    });
    select(addTo).innerHTML = clutter;
};
// ================================= managing delete resumes and delete exp, edu, skills cells button
const delShareEvent = document.querySelectorAll(".applyDeleteAndShareEvent");
delShareEvent.forEach((cont) => {
    cont.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('fa-trash')) {
            const index = target.getAttribute('data-index');
            const showToElem = target.closest('div')?.getAttribute('id');
            if (showToElem === 'skill-capsules-cont') {
                skillsArr.splice(Number(index), 1);
                updateCapsuleDisplay(skillsArr, `#${showToElem}`);
            }
            else if (showToElem === 'exp-capsules-cont') {
                experienceArr.splice(Number(index), 1);
                updateCapsuleDisplay(experienceArr, `#${showToElem}`);
            }
            else if (showToElem === 'edu-capsules-cont') {
                educationArr.splice(Number(index), 1);
                updateCapsuleDisplay(educationArr, `#${showToElem}`);
            }
            else if (target.closest('.created-resume-list')) {
                storedResList.splice(Number(index), 1);
                createdResList = storedResList;
                localStorage.setItem("createdResList", JSON.stringify(createdResList));
                updateResumeList(storedResList, `.created-resume-list`);
                updateData();
            }
        }
        if (target.classList.contains('shareButton')) {
            const link = target.getAttribute("data-link");
            navigator.clipboard.writeText(link);
            alert(`Link copied to the clipboard: ${link}`);
        }
    });
});
// ============================== upload image to the resume form 
const imageInput = select('#imageInput');
const imagePreview = select('#imagePreview');
let img_src;
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};
const handleUploadImage = async (e) => {
    const target = e.target;
    const file = target.files?.[0];
    if (file?.type === "image/jpeg" || file?.type === "image/png") {
        const base64 = await convertToBase64(file);
        img_src = base64;
        imagePreview.innerHTML = `<img src="${base64}" class="object-cover w-full h-full" alt="Image Preview">`;
    }
};
imageInput.addEventListener("change", handleUploadImage);
imagePreview.onclick = () => imageInput.click();
// ============================= Resume form submit
resumeForm.onsubmit = (e) => {
    e.preventDefault();
    if (storedResList.length >= 6) {
        select('.limit-error-box').style.display = 'block';
        setTimeout(() => {
            select('.limit-error-box').style.display = 'none';
        }, 2000);
        return;
    }
    const form = e.target;
    const { username, contact, email, objective, summary } = form;
    const uniqueID = Math.floor(Date.now()).toString();
    cvData = {
        id: uniqueID,
        username: username.value,
        contact: contact.value,
        email: email.value,
        objective: objective.value,
        skills: skillsArr,
        experience: experienceArr,
        education: educationArr,
        summary: summary.value,
        image: img_src,
    };
    const link = shareableLink(cvData, "share");
    cvData.sharelink = link;
    storedResList.push(cvData);
    createdResList = storedResList;
    localStorage.setItem("createdResList", JSON.stringify(createdResList));
    resetFormFields(form);
    updateData();
    print();
};
const setTemplate = () => {
    const templates = document.querySelectorAll(".selectTemp");
    templates.forEach((temp) => {
        temp.addEventListener("click", () => {
            const type = temp.getAttribute("data-type");
            if (type)
                templateType = parseInt(type);
            updateData();
        });
    });
};
const renderResumeData = (data) => {
    const resumeHtml = printResume(templateType, data);
    if (resumeHtml)
        select("#print-content").innerHTML = resumeHtml;
};
const updateData = () => {
    if (storedResList.length === 0) {
        renderResumeData(defaultResume);
    }
    else {
        renderResumeData(storedResList[storedResList.length - 1]);
        updateResumeList(storedResList, ".created-resume-list");
    }
};
const resetFormFields = (form) => {
    const { username, contact, email, objective, summary } = form;
    select(".resume-actionBar-toggle-forMobile").classList.add("notification");
    [username, contact, email, objective, summary].forEach((field) => field.value = '');
    skillCaps.innerHTML = "";
    expCaps.innerHTML = "";
    eduCaps.innerHTML = "";
    skillsArr = [];
    experienceArr = [];
    educationArr = [];
    imagePreview.innerHTML = `<img src="https://i.pinimg.com/736x/58/51/2e/58512eb4e598b5ea4e2414e3c115bef9.jpg"/>`;
    img_src = undefined;
};
const shareableLink = (cvData, type) => {
    cvData.image = '';
    const serializedData = JSON.stringify({ cvData, templateType });
    const encodedData = encodeURIComponent(btoa(serializedData));
    cvData.image = img_src;
    let link;
    if (type == "share") {
        link = `https://resume-builder-underdev.vercel.app/view-resume.html?data=${encodedData}`;
        // link = `${window.origin}/src/view-resume.html?data=${encodedData}`;
        return link;
    }
    return link = `https://resume-builder-underdev.vercel.app/edit.html?data=${encodedData}`;
    // return link = `${window.origin}/src/edit.html?data=${encodedData}`;
};
setTemplate();
updateData();
// =========================== create, edit and print button functionality
const createNewResumeBtn = select('#createNewResumeBtn');
const editResumeBtn = select('#editResumeBtn');
const simpleEdit = select("#simpleEdit");
const printResumeBtn = select('#printResumeBtn');
simpleEdit.onclick = () => {
    select("#editPreview").setAttribute("contenteditable", "true");
    alert("now click the resume to edit");
};
if (window.innerWidth < 768) {
    editResumeBtn.style.display = 'none';
}
editResumeBtn.onclick = () => {
    if (cvData === undefined) {
        cvData = storedResList[storedResList.length - 1];
        window.location.href = shareableLink(cvData, "edit");
    }
    else {
        window.location.href = shareableLink(cvData, "edit");
    }
};
printResumeBtn.onclick = () => {
    print();
    select("#editPreview").removeAttribute("contentEditable");
};
createNewResumeBtn.onclick = () => {
    if (storedResList.length >= 6) {
        select('.limit-error-box').style.display = 'block';
        setTimeout(() => {
            select('.limit-error-box').style.display = 'none';
        }, 2000);
        return;
    }
    window.location.href = '#input-resume-data';
};
// =============================== filter resumes from list of resumes
select('.created-resume-list').addEventListener('click', (e) => {
    const target = e.target;
    const resumeCard = target.closest('.res-cards');
    if (resumeCard) {
        const resID = resumeCard.getAttribute("data-id");
        const filteredResData = storedResList.find((data) => data.id === resID);
        if (filteredResData) {
            cvData = filteredResData;
            renderResumeData(filteredResData);
        }
    }
});
select(".resume-actionBar-toggle-forMobile").onclick = () => {
    if (isTogglerOpen) {
        select(".resume-actions-bar").style.display = 'none';
        isTogglerOpen = false;
        return;
    }
    select(".resume-actions-bar").style.display = 'block';
    select(".resume-actionBar-toggle-forMobile").classList.remove("notification");
    isTogglerOpen = true;
};
