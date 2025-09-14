export const handleFileChange = async (e) => {
    const file = e.target.files[0];
    // return handleUpload(selectedFile);
    if (!file) return alert("Please select a file first");

    // 1. Ask backend for pre-signed URL
    const response = await fetch(
        `http://localhost:8000/presigned-url?filename=${file.name}&contentType=${file.type}`
    );
    const { uploadUrl, fileUrl } = await response.json();

    // 2. Upload directly to S3
    const upload = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
        },
        body: file,
    });

    if (upload.ok) {
        return(fileUrl);
        // alert("Upload successful!");
    } else {
        return ("error");
    }
};

