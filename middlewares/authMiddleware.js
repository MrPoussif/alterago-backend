import { verifyToken } from "@clerk/backend";

export const requireAuth = async (req, res, next) => {
  try {
    // *** Vérifier présence du header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token manquant" });
    }

    // *** Extraire le token
    const token = authHeader.split(" ")[1];

    // *** Vérifier le token avec Clerk
    const payload = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });
    if (!payload) {
      // throw new Error("Invalid token");
      return res.status(401).json({ message: "Token invalide" });
    }

    // *** Récupérer le userId (sub = subject)
    req.userId = payload.sub;

    // 5️⃣ Continuer
    next();
  } catch (error) {
    console.error("Erreur auth :", error);
    return res.status(401).json({ message: "Token invalide" });
  }
};
