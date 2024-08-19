export const saveFile = async (content, filePath) => {
  try {
    const savedPath = await window.electronAPI.saveFile(content, filePath);
    return savedPath;
  } catch (error) {
    console.error('Error saving file:', error);
    return null;
  }
};

export const openFile = async () => {
  try {
    const result = await window.electronAPI.openFile();
    return result;
  } catch (error) {
    console.error('Error opening file:', error);
    return null;
  }
};
