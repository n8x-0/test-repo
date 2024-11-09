const templateObj = [
    {
        type: 1,
        resumeTemp(data) {
            return (`<div id="editPreview">
                    <div class="resume-intro">
                        <div>
                            <h1 id="print-username">${data.username}</h1>
                            <div class="contact">
                                <b>Contact:</b>
                                <span id="print-contact">${data.contact}</span>
                            </div>
                            <div class="email">
                                <b>Email:</b>
                                <span id="print-email">${data.email}</span>
                            </div>
                        </div>
                        ${data.image ? `<div class="imgBox" id="print-image-cont">
                            <img src="${data.image}" alt="profile-image" id="template2-img"/>
                        </div>` : ""}
                    </div>
                    <div class="resume-details">
                        <div class="legend">
                            <h2>Objective:</h2>
                            <h r>
                        </div>
                        <p id="print-objective">${data.objective}</p>

                        <div class="legend">
                            <h2>Skills:</h2>
                            <hr>
                        </div>
                        <div style="margin: 0.5rem 0; padding: 0 0.75rem">
                            <ul id="print-skills-list">${data.skills.map(list => `<li>${list}</li>`)}</ul>
                        </div>

                        <div class="legend">
                            <h2>Experience:</h2>
                            <hr>
                        </div>
                        <div style="margin: 0.5rem 0; padding: 0 0.75rem">
                            <ul id="print-exp-list">${data.experience.map(list => `<li>${list}</li>`)}</ul>
                        </div>
                        <div class="legend">
                            <h2>Education:</h2>
                            <hr>
                        </div>
                        <div style="margin: 0.5rem 0; padding: 0 0.75rem">
                            <ul id="print-edu-list">${data.education.map(list => `<li>${list}</li>`)}</ul>
                        </div>

                        <div class="legend">
                            <h2>Summary:</h2>
                            <hr>
                        </div>
                        <p id="print-summary">${data.summary}</p>
                    </div>
                </div>`);
        }
    },
    {
        type: 2,
        resumeTemp(data) {
            return (`
                <div id="template2" class="resume-template">
                    <div class="template2-container">
                        <aside class="template2-sidebar">
                            ${data.image ?
                `<div class="profile-img">
                                <img src="${data.image}" id="template2-img" alt="Profile Image">
                            </div>` : ""}
                            <div class="sidebar-info">
                                <h2 id="template2-username">${data.username}</h2>
                                <hr class="line"/>
                                <p id="template2-contact">${data.contact}</p>
                                <p id="template2-email">${data.email}</p>
                            </div>
                        </aside>
                        <main class="template2-main">
                            <section>
                                <h3>Objective</h3>
                                <p id="template2-objective">${data.objective}</p>
                            </section>
                            <section>
                                <h3>Skills</h3>
                                <ul id="template2-skills-list" class="skills-list">
                                    ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
                                </ul>
                            </section>
                            <section>
                                <h3>Experience</h3>
                                <ul id="template2-exp-list" class="experience-list">
                                    ${data.experience.map(exp => `<li>${exp}</li>`).join('')}
                                </ul>
                            </section>
                            <section>
                                <h3>Education</h3>
                                <ul id="template2-edu-list" class="education-list">
                                    ${data.education.map(edu => `<li>${edu}</li>`).join('')}
                                </ul>
                            </section>
                            <section>
                                <h3>Summary</h3>
                                <p id="template2-summary">${data.summary}</p>
                            </section>
                        </main>
                    </div>
                </div>`);
        }
    }
];
export default function printResume(template, data) {
    const filteredTemp = templateObj.find(temp => temp.type === template);
    const result = filteredTemp?.resumeTemp(data);
    return result;
}
