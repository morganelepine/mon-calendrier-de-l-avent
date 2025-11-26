import { useVersionCheck } from "@/hooks/useVersionCheck";
import ForceUpdateScreen from "@/components/utils/ForceUpdateScreen";

export function VersionGate({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const requiresUpdate = useVersionCheck();

    if (requiresUpdate) return <ForceUpdateScreen />;

    return <>{children}</>;
}
