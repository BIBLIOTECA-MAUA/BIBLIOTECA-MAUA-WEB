import { Router } from "express";
import { ProfileController } from "../../controllers/profileController.js";
import { handleValidatorAuth } from "../../validators/authValidator.js";
import { authenticateToken } from "../../middlewares/auth.js";
import { validationResult } from "express-validator";

const router = Router();
const profileController = new ProfileController();

// Middleware para verificar erros de validação
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: "Dados inválidos",
            errors: errors.array()
        });
    }
    next();
};

/**
 * @route   POST /auth/signin
 * @desc    Login da pessoa
 * @access  Public
 */
router.post("/signin", 
    handleValidatorAuth.signIn, 
    checkValidation,
    profileController.signIn
);

/**
 * @route   POST /auth/signup
 * @desc    Registrar nova pessoa
 * @access  Public
 */
router.post("/signup", 
    handleValidatorAuth.signUp, 
    checkValidation,
    profileController.signUp
);

/**
 * @route   GET /auth/me
 * @desc    Obter informações da pessoa autenticada
 * @access  Private
 */
router.get("/me", 
    authenticateToken,
    profileController.getMe
);

/**
 * @route   PUT /auth/change-password
 * @desc    Alterar senha do usuário
 * @access  Private
 */
router.put("/change-password", 
    authenticateToken,
    handleValidatorAuth.changePassword, 
    checkValidation,
    profileController.changePassword
);

export default router;