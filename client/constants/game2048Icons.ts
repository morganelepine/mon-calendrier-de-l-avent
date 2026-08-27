import { MAX_TIER } from "@/utils/games2048/engine";
import { getCloudinaryImageUrl } from "@/services/cloudinary.service";
import { isOctober } from "@/constants/Dates";

// One Cloudinary public ID per tier (1 to MAX_TIER),
// plus a short label used as the image's accessibility text.
const GAME_2048_ICONS_CHRISTMAS: { image: string; label: string }[] = [
    { image: "1_dvecfx", label: "Bonhomme en pain d'épices" },
    { image: "2_shko2c", label: "Boule de sapin" },
    { image: "3_neb8cm", label: "Cadeau" },
    { image: "4_syk4ba", label: "Renne" },
    { image: "5_g1slun", label: "Sapin de Noël" },
    { image: "6_czpt8m", label: "Chaussette de Noël" },
    { image: "7_dyt9mu", label: "Bonhomme de neige" },
    { image: "8_dts07a", label: "Couronne de Noël" },
    { image: "9_s3yxkq", label: "Pull de Noël" },
    { image: "10_jnklib", label: "Clochette" },
    { image: "11_xarana", label: "Père Noël" },
];

const GAME_2048_ICONS_AUTUMN: { image: string; label: string }[] = [
    { image: "1_scuuxx", label: "Fantôme" },
    { image: "2_wtrbh7", label: "Pomme de pin" },
    { image: "3_bg7js0", label: "Citrouille" },
    { image: "5_v3codg", label: "Chapeau de sorcière" },
    { image: "6_hmj7b1", label: "Champignon" },
    { image: "7_ycfic1", label: "Potion magique" },
    { image: "8_vqqszo", label: "Feuille d'automne" },
    { image: "9_i56uwb", label: "Courge" },
    { image: "10_iwhlfc", label: "Oeil" },
    { image: "4_xpndqo", label: "Hibou" },
    { image: "11_tl5yrl", label: "Chaudron magique" },
];

export const GAME_2048_ICONS = isOctober
    ? GAME_2048_ICONS_AUTUMN
    : GAME_2048_ICONS_CHRISTMAS;

if (GAME_2048_ICONS.length !== MAX_TIER) {
    throw new Error(
        `GAME_2048_ICONS must have exactly ${MAX_TIER} entries (one per tier), found ${GAME_2048_ICONS.length}`,
    );
}

export const getIconForTier = (
    tier: number,
): { image: string; label: string } => GAME_2048_ICONS[tier - 1];

// Fixed size requested from Cloudinary for every tile icon.
// Comfortably crisp for a tile that never really exceeds ~150dp on screen.
// Kept as one constant (rather than deriving it from the measured cell size)
// so the prefetch call below and the tile's own render request the exact same URL:
// expo-image's cache key is the full URL, so any mismatch would mean the
// prefetch warms a URL that's never actually used and the tile still has to
// hit the network on first render.
export const GAME_2048_ICON_TRANSFORMATION = "w_200,h_200,c_fit";

export const getGame2048IconUrl = (tier: number): string =>
    getCloudinaryImageUrl(
        getIconForTier(tier).image,
        GAME_2048_ICON_TRANSFORMATION,
    );
