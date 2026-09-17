// Thin wrapper around the RevenueCat REST API (v1 subscribers endpoint).
// Used by the webhook handler to fetch the authoritative entitlement state
// for a user rather than trusting event payload fields alone - their shape
// and meaning vary across event types (e.g. TRANSFER moves an entitlement
// between app_user_ids without a clean "revoke" event on the old one).
// https://www.revenuecat.com/docs/api-v1

const REVENUECAT_API_URL = "https://api.revenuecat.com/v1";

// Must match the entitlement identifier configured in the RevenueCat
// dashboard, and PremiumContext.tsx on the client.
const ENTITLEMENT_ID = "premium";

export async function isPremiumEntitlementActive(
    appUserId: string,
): Promise<boolean> {
    const secretKey = process.env.REVENUECAT_SECRET_API_KEY;
    if (!secretKey) {
        throw new Error("Missing REVENUECAT_SECRET_API_KEY");
    }

    const res = await fetch(
        `${REVENUECAT_API_URL}/subscribers/${encodeURIComponent(appUserId)}`,
        { headers: { Authorization: `Bearer ${secretKey}` } },
    );

    // RevenueCat has no record for this user (never purchased) - not an error.
    if (res.status === 404) return false;
    if (!res.ok) {
        throw new Error(`RevenueCat API error ${res.status}`);
    }

    const json = await res.json();
    const entitlement = json?.subscriber?.entitlements?.[ENTITLEMENT_ID];
    if (!entitlement) return false;

    const expiresAt = entitlement.expires_date;
    // Our lifetime package never expires (expires_date is null) - the check
    // still covers a refunded/revoked entitlement coming back as expired.
    return !expiresAt || new Date(expiresAt).getTime() > Date.now();
}
