import { useVersionCheck } from "@/hooks/useVersionCheck";
import ForceUpdateScreen from "@/components/utils/ForceUpdateScreen";
import { RecommendedUpdateModal } from "@/components/utils/RecommendedUpdateModal";

export function VersionGate({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const { status, dismissRecommended } = useVersionCheck();

    if (status.kind === "required") {
        return <ForceUpdateScreen message={status.message} />;
    }

    return (
        <>
            {children}
            <RecommendedUpdateModal
                visible={status.kind === "recommended"}
                message={
                    status.kind === "recommended" ? status.message : null
                }
                onClose={dismissRecommended}
            />
        </>
    );
}
