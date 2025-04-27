const tableContent = document.getElementById("tableContent");

const files = [
    {
        name: "aekit_resume_simple.pdf",
        type: "pdf",
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
        col0.innerHTML = `<i class="fa-solid ${getFileIcon(file.type)}"></i>`;

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