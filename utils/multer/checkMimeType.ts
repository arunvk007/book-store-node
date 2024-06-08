import files from "../../config/files";


const checkMimeType = (file: any, cb: any) => {
    switch (file.fieldname) {

      case "image":
        if (files.uploads.image.supportedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(null, false);
        }

      // Add more cases if needed for other fieldname
      default:
        cb(null, false); // Default case when fieldname doesn't match any specific case
        break;
    }
  }
  export default checkMimeType