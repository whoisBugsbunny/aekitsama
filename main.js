textarea = document.getElementById("text-area");

const deftext = "Ankit Sharma a web developer, and a programmer loves designing";
const repeatedText = Array(350).fill(deftext).join(" ");
textarea.textContent = repeatedText;

setTimeout(() => {
    textarea.classList.remove('flicker-animation-ts');
}, 3000);

document.addEventListener('click', (e) => {
    restartFlickerAnimation(textarea);
});

function wait(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function restartFlickerAnimation(ele) {
    ele.classList.remove('flicker-animation');
    setTimeout(() => {
        ele.classList.add('flicker-animation');
    }, 150);
}
// nametext = document.getElementById("name-text").querySelectorAll('span');

txt_jp = document.getElementsByName("jp");
txt_hi = document.getElementsByName("hi");

function setLang(txt_l) {
    hide = txt_l == txt_jp ? txt_hi : txt_jp;
    hide.forEach((ele) => {
        ele.style.display = "none";
    });
    txt_l.forEach((ele) => {
        ele.style.display = "inline-flex";
    });
}
setLang(txt_jp);

langOpt = document.getElementById("lang-opt").children[0].children;

langOpt[0].addEventListener('click', () => {
    langOpt[0].classList.toggle('active');
    langOpt[1].classList.toggle('active');
    setLang(txt_hi);
});
langOpt[1].addEventListener('click', () => {
    langOpt[0].classList.toggle('active');
    langOpt[1].classList.toggle('active');
    setLang(txt_jp);
});

grid_layer = document.getElementById("grid-container");
squarediv = '<div class="grid-square"></div>';
for (let i = 0; i < 550; i++) {
    grid_layer.innerHTML += squarediv;
}

function workBoxEle(p) {
    const workBox = document.createElement('div');
    workBox.className = 'work-box';

    const leftDiv = document.createElement('div');
    const title = document.createElement('h3');
    title.className = 'title';
    title.textContent = p.title;

    const about = document.createElement('p');
    about.className = 'work-about';
    about.textContent = p.work;

    const skills = document.createElement('div');
    skills.className = 'work-skills';
    skills.innerHTML = p.tags.map(tag => `<span class="skill">${tag}</span>`).join(' / ');

    const button = document.createElement('div');
    button.className = `work-btns${p.url ? '' : ' disable-goto'}`;
    button.innerHTML = p.url
        ? `Goto <i class="fa-solid fa-arrow-up-right-from-square"></i>`
        : `Private Product <i class="fa-solid fa-lock"></i>`;
    if (p.url) button.onclick = () => window.open(p.url);

    leftDiv.append(title, about, skills, button);

    const rightDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    imgDiv.className = 'work-img';
    imgDiv.style.backgroundImage = `url(images/projects/${p.ss || 'NoImg.jpg'})`;

    const img = document.createElement('img');
    img.src = `images/projects/${p.ss || 'NoImg.jpg'}`;
    img.alt = p.title;

    const imgContainer = document.createElement('div');
    imgContainer.appendChild(img);
    imgDiv.appendChild(imgContainer);
    rightDiv.appendChild(imgDiv);

    workBox.append(leftDiv, rightDiv);

    const workBoxEle = document.createElement('div');
    workBoxEle.appendChild(workBox);
    return workBoxEle;
}

let projects = [
    {
        title: "maheshpandey.com",
        tags: ["HTML", "CSS", "JS", "Firebase"],
        work: "Full Stack Portfolio Website of Mahesh Pandey.",
        ss: "1f.png",
        url: "https://maheshpandey.com",
        visible: true
    },
    {
        title: "File Manager",
        tags: ["EJS", "CSS", "NodeJS", "MongoDB"],
        work: "Full Stack File Manager for Global Vidyalay Overseas.",
        ss: "4f.png",
        url: "",
        visible: true
    },
    {
        title: "WebIpadPro",
        tags: ["HTML", "CSS", "JS"],
        work: "Workable UI design Inspired from IPad.",
        ss: "3f.png",
        url: "https://webipadpro.netlify.app",
        visible: true
    },
    {
        title: "Delicacy",
        tags: ["Java", "Swing", "MySQL"],
        work: "Full Stack Desktop Application for Restaurant.",
        ss: "5f.png",
        url: "https://github.com/whoisBugsbunny/delicacy",
        visible: true
    },
    {
        title: "Keralaedu",
        tags: ["HTML", "CSS", "JS", "Firebase"],
        work: "Full Stack Web Development Education Website.",
        ss: "2m.png",
        url: "https://keralascholars.netlify.app",
        visible: true
    },
    {
        title: "Code Endeavor",
        tags: ["HTML", "CSS", "JavaScript"],
        work: "Frontend Development Code Endeavor Website.",
        ss: "6f.png",
        url: "https://codeendeavor.com",
        visible: true
    }
    , {
        title: "Resume Builder",
        tags: ["HTML", "CSS", "JavaScript", "Firebase"],
        work: "Resume Builder with Firebase.",
        ss: "7f.png",
        url: "https://aeresume.netlify.app",
        underdev: true,
        visible: true
    }
];

work_box_c = document.getElementById("work-box-c");

function setWorks(Projects) { /* convert this function into single code if problem when go online & Projects to projects */
    work_box_c.innerHTML = '';
    Projects.forEach((project) => {
        if (project.visible) {
            work_box_c.appendChild(workBoxEle(project));
        }
    });
}

homeBtn = document.getElementById("home-btn");
homePg = document.getElementById("home-page");
workBtn = document.getElementById("work-btn");
workPg = document.getElementById("work-page");
contactBtn = document.getElementById("contact-btn");
contactPg = document.getElementById("contact-page");

function showPg(pg) {
    homePg.classList.add('not-active');
    workPg.classList.add('not-active');
    contactPg.classList.add('not-active');
    pg.classList.remove('not-active');
}

function removeActiveClass() {
    homeBtn.classList.remove('active');
    workBtn.classList.remove('active');
    contactBtn.classList.remove('active');
}

homeBtn.addEventListener('click', () => {
    removeActiveClass();
    homeBtn.classList.add('active');
    showPg(homePg);
});

workBtn.addEventListener('click', () => {
    removeActiveClass();
    setWorks(projects);
    workBtn.classList.add('active');
    showPg(workPg);
});

contactBtn.addEventListener('click', () => {
    removeActiveClass();
    setContacts(Contacts);
    contactBtn.classList.add('active');
    showPg(contactPg);
});

shutterBack = document.getElementById("shutter-back-btn");

shutterBack.addEventListener('click', () => {
    shutter.scrollTop = 0;
});

contactInfo = document.getElementById("contact-info");

let Contacts = [
    { url: "mailto:aankitsharmaa422@gmail.com", icon: "fa-solid fa-envelope", text: "aankitsharmaa422@gmail.com", visible: true },
    { url: "https://www.linkedin.com/in/aekit", icon: "fa-brands fa-linkedin-in", text: "aekit", visible: true },
    { url: "https://github.com/whoisbugsbunny", icon: "fa-brands fa-github", text: "whoisbugsbunny", visible: true },
    { url: "https://codepen.io/aekit", icon: "fa-brands fa-codepen", text: "aekit", visible: true },
    { url: "https://twitter.com/", icon: "fa-brands fa-x-twitter", text: "Ankit Sharma", visible: true }
]

function setContacts(Infos) {
    contactInfo.innerHTML = '';
    Infos.forEach((info) => {
        if (info.visible)
            contactInfo.appendChild(setContactsInfo(info))
    });
}

function setContactsInfo(info) {
    const contactOpt = document.createElement('div');
    contactOpt.className = 'contact-opt';

    const contactOuter = document.createElement('div');
    contactOuter.className = 'contact-outer';
    contactOuter.onclick = () => window.open(info.url);

    const contactIcon = document.createElement('span');
    contactIcon.className = 'contact-icon';
    contactIcon.innerHTML = `<i class="${info.icon}"></i>`;

    const contactText = document.createElement('span');
    contactText.className = 'contact-text';
    contactText.textContent = info.text;

    contactOuter.append(contactIcon, contactText);
    contactOpt.appendChild(contactOuter);

    return contactOpt;
}