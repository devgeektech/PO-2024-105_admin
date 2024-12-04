import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { commonFileUpload } from "../redux/features/partner/_partnerAction";
function MyDropzone() {
    const dispatch: any = useDispatch();
    const onDrop = useCallback((acceptedFiles) => {
        const formData = new FormData();
        for (let i = 0; i < acceptedFiles.length; i++) {
            formData.append(`files${i}`, acceptedFiles[i])
        }
        dispatch(commonFileUpload(formData))
    }, []);


    const { getRootProps, acceptedFiles, getInputProps, isDragActive } = useDropzone({ onDrop });

    const filesData = () => {
        return acceptedFiles?.map((file: any) => (
            <li key={file.path}>
                {file.name}
            </li>
        ));
    }


    return (
        <section className="container-fluid px-0">
            <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag 'n' drop some files here, or click to select files</p>
                )}
            </div>
            <aside>
                {filesData()}
            </aside>
        </section>
    );
}

export { MyDropzone };
