import { useState } from 'react';

export const useFileUpload = () => {
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0];
        if (selected) setFile(selected);
    };

    const uploadFile = async (url: string) => {
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            return await res.json();
        } finally {
            setIsUploading(false);
        }
    };

    return { file, isUploading, onFileChange, uploadFile };
};
