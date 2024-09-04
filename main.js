textarea = document.getElementById("text-area");

const deftext = "Ankit Sharma a web developer, and a programmer loves designing";
let repeatedName = "";
for (let i = 0; i < 350; i++) {
    repeatedName += deftext + " ";
}
textarea.innerHTML = repeatedName;

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
    if (p.ss == "0") {
        p.ss = "loading.gif";
    }

    let urlbtn = `" onclick="window.open('${p.url}')">Goto <i class="fa-solid fa-arrow-up-right-from-square"></i>`;
    if (p.url == "NA") {
        urlbtn = ` disable-goto">Private Product <i class="fa-solid fa-lock"></i>`;
    }
    if (p.underdev) {
        urlbtn = `" onclick="window.open('${p.url}')">Under Development <i class="fa-solid fa-hammer"></i>`;
    }

    let arr_tags = p.tags.map((tag) => {
        return `<span class="skill">${tag}</span>`;
    }).join(" / ");

    let work_box_ele = `<div><div class="work-box">
                                <div>
                                    <h3 class="title">${p.title}</h3>
                                    <p class="work-about">${p.work}</p>
                                    <div class="work-skills">${arr_tags}</div>
                                    <div class="work-btns${urlbtn}</div>
                                </div>
                                <div>
                                    <div class="work-img" style="background-image: url(images/projects/${p.ss})">
                                    <div><img src="images/projects/${p.ss}" alt=""></div>
                                    </div>
                                </div>
                            </div></div>`;
    return work_box_ele;
}

let projects = [
    {
        title: "maheshpandey.com",
        tags: ["HTML", "CSS", "JS", "Firebase"],
        work: "Full Stack Portfolio Website of Mahesh Pandey.",
        ss: "1f.png",
        url: "https://maheshpandey.com"
    },
    {
        title: "File Manager",
        tags: ["EJS", "CSS", "NodeJS", "MongoDB"],
        work: "Full Stack File Manager for Global Vidyalay Overseas.",
        ss: "4f.png",
        url: "NA"
    },
    {
        title: "WebIpadPro",
        tags: ["HTML", "CSS", "JS"],
        work: "Workable UI design Inspired from IPad.",
        ss: "3f.png",
        url: "https://webipadpro.netlify.app"
    },
    {
        title: "Delicacy",
        tags: ["Java", "Swing", "MySQL"],
        work: "Full Stack Desktop Application for Restaurant.",
        ss: "5f.png",
        url: "https://github.com/whoisBugsbunny/delicacy"
    },
    {
        title: "Keralaedu",
        tags: ["HTML", "CSS", "JS", "Firebase"],
        work: "Full Stack Web Development Education Website.",
        ss: "2m.png",
        url: "https://keralascholars.netlify.app"
    },
    {
        title: "Code Endeavor",
        tags: ["HTML", "CSS", "JavaScript"],
        work: "Frontend Development Code Endeavor Website.",
        ss: "6f.png",
        url: "https://codeendeavor.com"
    }
    , {
        title: "Resume Builder",
        tags: ["HTML", "CSS", "JavaScript", "Firebase"],
        work: "Resume Builder with Firebase.",
        ss: "7f.png",
        url: "https://aeresume.netlify.app",
        underdev: true
    }
];

work_box_c = document.getElementById("work-box-c");

projects.forEach((project) => {
    work_box_c.innerHTML += workBoxEle(project);
});


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
    workBtn.classList.add('active');
    showPg(workPg);
});

contactBtn.addEventListener('click', () => {
    removeActiveClass();
    contactBtn.classList.add('active');
    showPg(contactPg);
});

shutterBack = document.getElementById("shutter-back-btn");

shutterBack.addEventListener('click', () => {
    shutter.scrollTop = 0;
});

