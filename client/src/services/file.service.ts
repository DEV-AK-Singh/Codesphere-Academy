import axiosInstance from '../config/axios';

export interface FileData {
  id: string;
  filename: string;
  url: string;
  size: number;
  mimeType: string;
  createdAt: string;
}

class FileService {
  async uploadFile(file: File, options?: { isImage?: boolean; optimize?: boolean }): Promise<FileData> {
    const formData = new FormData();
    formData.append('file', file);
    
    if (options?.isImage) formData.append('isImage', 'true');
    if (options?.optimize) formData.append('optimize', 'true');
    
    const response = await axiosInstance.post<{ file: FileData }>('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.file;
  }

  async uploadMultipleFiles(files: File[]): Promise<FileData[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    
    const response = await axiosInstance.post<{ files: FileData[] }>('/files/upload-multiple', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.files;
  }

  async getUserFiles(): Promise<FileData[]> {
    const response = await axiosInstance.get<{ files: FileData[] }>('/files/files');
    return response.data.files;
  }

  async deleteFile(fileId: string): Promise<void> {
    await axiosInstance.delete(`/files/file/${fileId}`);
  }

  getFileUrl(fileId: string): string {
    return `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/files/file/${fileId}`;
  }

  getDownloadUrl(fileId: string): string {
    return `${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/files/download/${fileId}`;
  }

  async downloadFile(fileId: string, filename: string): Promise<void> {
    const response = await axiosInstance.get(`/files/download/${fileId}`, {
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  }
}

export default new FileService();