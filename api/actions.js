import { db, storage } from "@/app/config/firebase";
import { collection, getDocs, addDoc } from "@firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { formData } from "@/data/formData.js";
import { toast } from "react-toastify";

// upload form to firebase
export const uploadForm = async (formObj) => {
    try {
        const docRef = await addDoc(
            collection(db, "carsInspectionData"),
            formObj
        );
        return docRef;
        toast.success(
            "backend: document Uploaded Successfully, with id: " + docRef.id
        );
    } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("backend: Error adding document: " + error);
        throw error; // Handle the error as needed
    }
};

// uploading one file to firebase storage
export const uploadFileToStorage = async (selectedFile) => {
    // Create a storage reference with a unique name (e.g., a timestamp)
    const storageRef = ref(storage, `carImages/${selectedFile.name}`);

    try {
        // Upload the selected file to Firebase Storage
        const snapshot = await uploadBytes(storageRef, selectedFile);
        console.log("Uploaded a file:", snapshot.metadata.name);

        // Get the download URL of the uploaded file
        const downloadURL = await getDownloadURL(storageRef);
        toast.success("File uploaded successfully");

        return downloadURL; // Resolve the Promise with the download URL
    } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file: ");
        setIsUploaded(true);
        throw error; // Reject the Promise if there's an error
    }
};

// uploading multiple files to storage

export const uploadFilesToStorage = async (selectedFiles) => {
    const downloadURLs = [];

    for (const selectedFile of selectedFiles) {
        // Create a storage reference with a unique name (e.g., a timestamp)
        const storageRef = ref(storage, `carImages/${selectedFile.name}`);

        try {
            // Upload the selected file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, selectedFile);
            console.log("Uploaded a file:", snapshot.metadata.name);

            // Get the download URL of the uploaded file
            const downloadURL = await getDownloadURL(storageRef);
            toast.success(`File "${selectedFile.name}" uploaded successfully`);
            downloadURLs.push(downloadURL);
        } catch (error) {
            console.error(
                `Error uploading file "${selectedFile.name}":`,
                error
            );
            toast.error(
                `Error uploading file "${selectedFile.name}": ${error.message}`
            );
            // Handle the error if necessary, e.g., retry, show an error message, etc.
        }
    }

    return downloadURLs;
};

// Function to fetch data from Firestore
export const fetchAllResources = async () => {
    try {
        const resourcesData = [];
        const resourcesRef = collection(db, "resources");
        const querySnapshot = await getDocs(resourcesRef);

        querySnapshot.forEach((doc) => {
            resourcesData.push({ id: doc.id, ...doc.data() });
        });

        return resourcesData;
    } catch (error) {
        console.error("Error fetching resources: ", error);
        return [];
    }
};

// function to upload document to firestore

export const uploadDocumentToFirestore = async ({
    name,
    subject,
    courseCode,
    creator,
    tags,
    description,
    selectedUnits,
    downloadURL,

    docType = "pdf",
    downloads = 10,
    likes = 10,
    uploaderName = "temp uploader",
    uploaderRef = "temp uploader ref",
}) => {
    console.log("doclinks inside uploading funciton", downloadURL);
    try {
        const docRef = await addDoc(collection(db, "resources"), {
            docName: name,
            creator,
            docType,
            downloads,
            likes,
            subject,
            courseCode,
            tags,
            units: selectedUnits,
            uploaderName,
            uploaderRef,
            creator,
            description,
            docLinks: downloadURL,
            // docLinks: ['url1', 'url2', 'url3'],
        });
        return docRef; // Return the ID of the newly created document
    } catch (error) {
        console.error("Error adding document: ", error);
        throw error; // Handle the error as needed
    }
};
