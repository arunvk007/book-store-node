import { Router } from "express";
import { addBook, edit, list, popular, remove, view } from "../../../controllers/v1/books/bookController";
import authCheck from "../../../middlewares/authCheck";
import { uploadBookCoverImage } from "../../../middlewares/fileUpload";
import { check } from "express-validator";


const router = Router() 

router.use(authCheck)

router.post('/list', list)

router.post('/popular', popular)

router.post('/view', [check('book_id').not().isEmpty()],  view)

router.post('/add', uploadBookCoverImage.single('image'), [
    check('name').not().isEmpty(),
    check('author').not().isEmpty(),
    check("genre").not().isEmpty(),
    check('star_rating').not().isEmpty(),
    check('published').not().isEmpty(),
    check('price').not().isEmpty(),
    check('language').not().isEmpty()
]
, addBook)

router.patch('/edit', [check('book_id').not().isEmpty()], edit)

router.delete('/remove', [check('book_id').not().isEmpty()], remove)


export default router