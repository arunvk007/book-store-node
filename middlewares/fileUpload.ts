import multer from "multer"
import files from "../config/files"
import formatFileName from "../utils/multer/formatFileName"
import createDirectoryIfNotExists from "../utils/multer/createDirectoryIfNotExists"
import checkMimeType from "../utils/multer/checkMimeType"

const storeBookCoverImage = multer.diskStorage({

    destination : (req, file, cb) => {
        const pathDirectory = `${files.uploads.root_directory}/${files.uploads.image.savedDirectory}`
        
        createDirectoryIfNotExists(pathDirectory)
        cb(null, pathDirectory)
    },
    filename : (req, file, cb) => {
        const filename = formatFileName(file.originalname)
        cb(
            null,
            filename
         )
    },
    
})
export const uploadBookCoverImage = multer({
    storage : storeBookCoverImage,
    limits : {
        fileSize : 1024 * 1024 * 10
    },
    fileFilter : (req, file, cb) => {
        checkMimeType(file,cb)
    }
})
