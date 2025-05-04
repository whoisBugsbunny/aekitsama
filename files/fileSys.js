const tableContent = document.getElementById("tableContent");

const files = [
    {
        name: "aekit_resume_simple.pdf",
        type: "application/pdf",
        size: "85 KB",
        date: "2023-10-03",
        url: "/docs/",
        stared: false
    },
    {
        name: "ankit_sharma_resume_3.pdf",
        type: "pdf",
        size: "210 KB",
        date: "2023-10-03",
        url: "/docs/",
        stared: true
    },
    {
        name: "aekitsama_r.pdf",
        type: "pdf",
        size: "206 KB",
        date: "2023-10-04",
        url: "/docs/",
        stared: false
    },
    {
        name: "ankit_sharma_simple_resume_2.pdf",
        type: "pdf",
        size: "210 KB",
        date: "2023-10-03",
        url: "/docs/",
        stared: false
    },
    {
        name: "ankit_sharma_simple_resume.pdf",
        type: "pdf",
        size: "165 KB",
        date: "2023-10-04",
        url: "/docs/",
        stared: false
    },
    {
        name: "resume1.pdf",
        type: "pdf",
        size: "206 KB",
        date: "2023-10-03",
        url: "/docs/",
        stared: false
    }
];
function getFileIcon(type) {
    const fileIcons = {
        pdf: "fa-file-pdf",
        word: "fa-file-word",
        excel: "fa-file-excel",
        image: "fa-file-image",
        csv: "fa-file-csv",
        zip: "fa-file-zipper",
        ppt: "fa-file-powerpoint",
        txt: "fa-file-lines",
        other: "fa-file-circle-question"
    };
    return fileIcons[type] || fileIcons.other;
}

function setTableContent() {
    tableContent.innerHTML = ""; // Clear existing content

    files.forEach(file => {
        const tableRow = document.createElement("div");
        tableRow.className = "table-row";

        const row = document.createElement("div");
        row.className = file.stared ? "row stared" : "row";

        const col0 = document.createElement("div");
        col0.className = "col file-type-col";
        col0.innerHTML = `<i class="fa-solid ${getFileIcon(getFileType(file))}"></i>`;

        const col1 = document.createElement("div");
        col1.className = "col";

        const col1Child = document.createElement("span");
        col1Child.className = "file-name";
        col1Child.textContent = file.name;
        col1Child.title = file.name;
        col1Child.onclick = () => {
            const url = file.url ? file.url + file.name : file.name;
            window.open(url, "_blank");
        };
        col1.appendChild(col1Child);

        const col2 = document.createElement("div");
        col2.className = "col col-date-size";
        col2.textContent = file.size;

        const col3 = document.createElement("div");
        col3.className = "col col-date-size";
        col3.textContent = file.date;

        const colAction = document.createElement("div");
        colAction.className = "col col-action";

        const actionsDiv = document.createElement("div");
        actionsDiv.className = "actions";

        const starIcon = document.createElement("span");
        starIcon.className = file.stared ? "stared-icon star-icon" : "star-icon";
        starIcon.innerHTML = `<i class="fa-solid fa-star" ${file.stared ? "style='color:white'" : ""}></i>`;

        const deleteIcon = document.createElement("span");
        deleteIcon.className = "delete-icon";
        deleteIcon.innerHTML = '<i class="fa-solid fa-trash"></i>';

        actionsDiv.appendChild(starIcon);
        actionsDiv.appendChild(deleteIcon);

        colAction.appendChild(actionsDiv);

        row.appendChild(col0);
        row.appendChild(col1);
        row.appendChild(col2);
        row.appendChild(col3);
        row.appendChild(colAction);

        tableRow.appendChild(row);
        tableContent.appendChild(tableRow);
    });
}

const fileInput = document.getElementById("fileInput");
fileInput.addEventListener('change', handleFileSelect, false);

const uploadBtn = document.getElementById("uploadBtn");

function uploadFile(file) {
    uploadBtn.classList.remove("disabled");
    uploadBtn.onclick = () => {
        alert("File upload Not Supported Yet!\n" + file.name);
    };
}

function getFileType(file) {
    if (file.type.split('/')[0] == "image") {
        return ("image");
    }
    const fileExtension = file.name.split('.').pop().toLowerCase();

    return fileExtension;
}

async function handleFileSelect(event) {
    const files = event.target.files; // can do multiple files
    if (files.size > 10 * 1024 * 1024) { // limit 10MB
        alert("File size exceeds 10 MB limit.");
        return;
    }
    console.log(files);
    const fileArray = Array.from(files).map(file => ({
        name: file.name,
        type: getFileType(file),
        size: (file.size / 1024).toFixed(2) + ' KB',
        date: new Date().toLocaleDateString(),
        url: URL.createObjectURL(file),
        stared: false
    }));
    console.log(fileArray);

    const uploadDetailsArea = document.getElementById("uploadHeader");
    uploadDetailsArea.innerHTML = '';

    const uploadDetails = document.createElement("div");
    uploadDetails.className = "upload-details wh100";
    uploadDetails.innerHTML = `
        <i class="fa-solid ${getFileIcon(fileArray[0].type)}"></i>
        <div class="file-name-p">${fileArray[0].name}</div>
        <div class="file-type-p">${fileArray[0].type}</div>
        <div class="file-size-p">${fileArray[0].size}</div>
        <div class="file-date-p">${fileArray[0].date}</div>`;
    uploadDetailsArea.appendChild(uploadDetails);

    const previewBlock = document.getElementById("previewBlock");
    previewBlock.innerHTML = '';
    const uploadPreview = document.createElement("div");
    uploadPreview.className = "upload-preview wh100";
    previewBlock.appendChild(uploadPreview);

    const file = files[0]; // Get the first file for preview
    const fileDetails = {
        name: file.name,
        type: getFileType(file),
        size: (file.size / 1024).toFixed(2) + ' KB',
        date: new Date().toLocaleDateString(),
        url: URL.createObjectURL(file),
        stared: false
    };

    uploadFile(file); // Call the upload function (not implemented yet)

    // by AI
    // --- Handle Previews based on File Type ---
    if (fileDetails.type === 'image') {
        const img = document.createElement("img");
        img.className = "wh100";
        img.src = URL.createObjectURL(file);
        img.alt = "File Preview";
        uploadPreview.appendChild(img);

        // Clean up the object URL when the image is loaded (optional but good practice)
        img.onload = () => {
            URL.revokeObjectURL(img.src);
        };

    } else if (fileDetails.type === 'pdf') {
        const iframe = document.createElement("iframe");
        iframe.src = URL.createObjectURL(file);
        iframe.width = "100%";
        iframe.height = "100%"; // Adjust height as needed
        uploadPreview.appendChild(iframe);

    } else if (fileDetails.type === 'txt' || fileDetails.type === 'csv') {
        try {
            const textContent = await file.text(); // Read file as text
            const pre = document.createElement("pre"); // Use <pre> to preserve formatting
            pre.textContent = textContent.substring(0, 1000) + (textContent.length > 1000 ? '...' : ''); // Show first 1000 chars
            pre.style.whiteSpace = 'pre-wrap'; // Wrap long lines
            pre.style.maxHeight = '100%'; // Limit height
            pre.style.overflow = 'auto'; // Add scroll if content exceeds height
            uploadPreview.appendChild(pre);
            // No object URL to revoke here
        } catch (error) {
            console.error("Error reading text file:", error);
            uploadPreview.innerHTML = "<p>Could not read file content for preview.</p>";
        }

    } else if (fileDetails.type === 'audio') {
        const audio = document.createElement("audio");
        audio.controls = true; // Show browser controls
        audio.src = URL.createObjectURL(file);
        uploadPreview.appendChild(audio);

    } else if (fileDetails.type === 'video') {
        const video = document.createElement("video");
        video.controls = true; // Show browser controls
        video.src = URL.createObjectURL(file);
        video.style.maxWidth = '100%'; // Prevent video from overflowing
        video.style.maxHeight = '100%';
        uploadPreview.appendChild(video);

    } else {
        // For unsupported types (word, excel, ppt, zip, other)
        const img = document.createElement("img");
        img.className = "wh100";
        img.style.objectFit = "contain";
        img.style.backgroundColor = "#22272b";
        img.src = '/images/noPreview.png';
        img.alt = "File Preview Not Available";
        uploadPreview.appendChild(img);

    }

}

setTableContent();


// Terminal JS
const admin = 'aekitsama';

const fileStructure = {
    "name": "root",
    "type": "folder",
    "children": [
        {
            "name": "docs",
            "type": "folder",
            "children": files
        },
        {
            "name": "files",
            "type": "folder",
            "children": [
                {
                    "name": "filesStyle.css",
                    "url": "/files/",
                    "type": "txt/css",
                    "size": "1 KB",
                    "date": "2023-10-03"
                },
                {
                    "name": "fileSys.js",
                    "url": "/files/",
                    "type": "txt/js",
                    "size": "2 KB",
                    "date": "2023-10-04"
                },
                {
                    "name": "index.html",
                    "url": "/files/",
                    "type": "txt/html",
                    "size": "2 KB",
                    "date": "2023-10-04"
                }
            ]
        }, {
            "name": "fonts",
            "type": "folder",
            "children": [
                {
                    "name": "TheSuavity.woff",
                    "url": "/fonts/",
                    "type": "txt/woff",
                    "size": "1 KB",
                    "date": "2023-10-03"
                }, {
                    "name": "TheSuavity.woff2",
                    "url": "/fonts/",
                    "type": "txt/woff2",
                    "size": "1 KB",
                    "date": "2023-10-03"
                },
            ]
        }, {
            "name": "images",
            "type": "folder",
            "children": [
                {
                    "name": "projects",
                    "type": "folder",
                    "children": [
                        {
                            "name": "1f.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "1m.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "1s.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "2m.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "3f.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "4f.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "5f.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "6f.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "7f.png",
                            "url": "/images/projects/",
                            "type": "image/png",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "loading.gif",
                            "url": "/images/projects/",
                            "type": "image/gif",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "NoImg.jpg",
                            "url": "/images/projects/",
                            "type": "image/jpg",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        },
                        {
                            "name": "toMension.txt",
                            "url": "/images/projects/",
                            "type": "txt",
                            "size": "1 KB",
                            "date": "2023-10-03"
                        }
                    ]
                },
                {
                    "name": "me_red2_circle.png",
                    "url": "/images/",
                    "type": "image/png",
                    "size": "1 KB",
                    "date": "2023-10-03"
                },
                {
                    "name": "me_red2n.png",
                    "url": "/images/",
                    "type": "image/png",
                    "size": "1 KB",
                    "date": "2023-10-03"
                },
                {
                    "name": "me_red2.png",
                    "url": "/images/",
                    "type": "image/png",
                    "size": "1 KB",
                    "date": "2023-10-03"
                },
                {
                    "name": "me0.png",
                    "url": "/images/",
                    "type": "image/png",
                    "size": "1 KB",
                    "date": "2023-10-03"
                },
                {
                    "name": "me1.png",
                    "url": "/images/",
                    "type": "image/png",
                    "size": "1 KB",
                    "date": "2023-10-03"
                },
                {
                    "name": "me1f.png",
                    "url": "/images/",
                    "type": "image/png",
                    "size": "1 KB",
                    "date": "2023-10-03"
                },
                {
                    "name": "noPreview.png",
                    "url": "/images/",
                    "type": "image/png",
                    "size": "1 KB",
                    "date": "2023-10-03"
                }
            ]
        }, {
            "name": "style.css",
            "url": "/",
            "type": "txt/css",
            "size": "1 KB",
            "date": "2023-10-03"
        },
        {
            "name": "main.js",
            "url": "/",
            "type": "txt/js",
            "size": "2 KB",
            "date": "2023-10-04"
        },
        {
            "name": "index.html",
            "url": "/",
            "type": "txt/html",
            "size": "2 KB",
            "date": "2023-10-04"
        }

    ]
};

const terminal = document.getElementById('terminal');
const inputElement = document.getElementById('terminalInput');
const cursorElement = document.getElementById('terminalCursor');

let isFocused = false;

// Focus when clicking inside
terminal.addEventListener('click', () => {
    isFocused = true;
    terminal.classList.add('focused'); // Optional styling if you want
});

// Blur when clicking outside
document.addEventListener('click', (e) => {
    if (!terminal.contains(e.target)) {
        isFocused = false;
        terminal.classList.remove('focused');
    }
});

// Capture typing
document.addEventListener('keydown', (e) => {
    if (!isFocused) return;

    if (e.key === 'Backspace') {
        e.preventDefault();
        inputElement.textContent = inputElement.textContent.slice(0, -1);
    } else if (e.key.length === 1) {
        // Only add printable characters
        inputElement.textContent += e.key;
    } else if (e.key === 'Enter') {
        e.preventDefault();
        const command = inputElement.textContent;
        executeCommand(command);
        inputElement.textContent = '';
    }
});

// Execute fake command
function executeCommand(command) {
    const terminalBody = document.getElementById('terminalBody');
    const outputLine = document.createElement('p');
    outputLine.classList.add('terminal-line');
    outputLine.innerHTML = `<span class="terminal-prompt">${admin}/home $ </span> ${command}`;

    const resultLine = document.createElement('p');
    resultLine.classList.add('terminal-line');

    switch (command) {
        case '':
            break;
        // case 'exit':
        //     resultLine.textContent = 'Exiting...';
        //     setTimeout(() => {
        //         window.close();
        //     }, 1000);
        //     break;
        case 'clear':
            outputLine.textContent = '';
            const elementsToRemove = terminalBody.querySelectorAll(':scope > p.terminal-line:not(:last-child)');
            if (elementsToRemove.length > 0) {
                elementsToRemove.forEach(element => {
                    element.remove();
                });
            }
            break;
        case 'help':
            resultLine.innerHTML = showHelpMenu();
            break;
        case 'dir':
            resultLine.innerHTML = showDirectoryContents();
            break;
        case 'ls':
            resultLine.innerHTML = showDirectoryContents();
            break;
        case 'tree':
            resultLine.innerHTML = `<p style="line-height:normal">${generateTreeListing(fileStructure, '', true, 0)}<p/>`;
            break;
        case 'url-tree':
            resultLine.innerHTML = `<p style="line-height:normal">${generateTreeListing(fileStructure, '', true, 1)}<p/>`;
            break;
        case 'cd':
            resultLine.textContent = 'Changed directory to home';
            break;
        default:
            resultLine.textContent = `Command "${command}" not found. Try "help" for a list of available commands.`;
            break;
    }

    // Insert before the current input line
    terminalBody.insertBefore(outputLine, terminalBody.lastElementChild);
    terminalBody.insertBefore(resultLine, terminalBody.lastElementChild);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function showHelpMenu() {
    let contents = `<pre>
<b>Available Commands:</b>
   help       Displays information about available commands.
   clear      Clears the terminal screen.
   tree       Displays the directory structure in a tree format.
   url-tree   Displays the directory structure in a tree format with file link.
   dir        Lists files and directories in the current location.
   ls         Lists files and directories in the current location.
   cd         Changes the current directory.
   exit       Exits the terminal session.
</pre>`;
    return contents;
}

function showDirectoryContents() {
    let contents = `<pre>
<b>Directory of ${admin}/home</b>
   23-08-2024   15:34   &ltDIR&gt         .         
   23-08-2024   15:34   &ltDIR&gt         .vscode   
   25-04-2025   17:43   &ltDIR&gt         docs      
   25-04-2025   17:58   &ltDIR&gt         files     
   26-08-2024   16:17   &ltDIR&gt         fonts     
   28-04-2025   01:21   &ltDIR&gt         images    
   06-03-2025   16:55            7777 index.html
   24-04-2025   15:52            8372 main.js   
   24-04-2025   16:20           15528 style.css 
    <pre/>`;
    return contents;
}

function generateTreeListing(item, prefix = '', isLast = true, cmdType = 0) {
    let output = '';
    const folderIcon = '├── ';
    const fileIcon = '└── '; // Use └── for files as they are always "last" in their immediate parent's listing if no more siblings after them
    const folderLastIcon = '└── ';
    const pipe = '│   ';
    const space = '    ';


    const connector = isLast ? folderLastIcon : folderIcon;

    if (item.name == "root") {
        output += `:${item.name}<br/>`;
    } else if ((item.type == "folder") || (cmdType == 0)) {
        output += `${prefix}${connector}${item.name}<br/>`;
    } else if (cmdType == 1) {
        output += `${prefix}${connector}<a href='${item.url}${item.name}' target='_blank'>${item.name}<a/><br/>`;
    }

    // If it's a folder with children, recursively process children
    if (item.type === 'folder' && item.children && item.children.length > 0) {
        const childPrefix = prefix + (isLast ? space : pipe); // Extend the prefix

        item.children.forEach((child, index) => {
            const isLastChild = index === item.children.length - 1;
            // Recursively call for the child, passing the new prefix and last status
            output += generateTreeListing(child, childPrefix, isLastChild, cmdType);
        });
    }

    return (output);
}