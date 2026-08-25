import { Component, type ErrorInfo, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { CustomButton } from "@/components/utils/buttons/Button";
import { Colors } from "@/constants/Colors";
import { Sentry } from "@/services/sentry.service";

interface Props {
    children: ReactNode;
    message?: string;
}

interface State {
    hasError: boolean;
}

// Sentry.wrap() does NOT catch React rendering errors:
// it just adds a TouchEventBoundary/Profiler.
// Without this ErrorBoundary, a rendering crash would cause the app to crash
// without ever being logged to Sentry.
export class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
        console.error("Unhandled render error:", error);
        Sentry.captureException(error, {
            extra: { componentStack: errorInfo.componentStack },
        });
    }

    reset = () => this.setState({ hasError: false });

    render() {
        if (this.state.hasError) {
            return (
                <View
                    style={styles.container}
                    accessibilityLabel="Une erreur est survenue"
                >
                    <ThemedText style={styles.title} accessibilityRole="alert">
                        Une erreur est survenue
                    </ThemedText>
                    <ThemedText style={styles.message}>
                        {this.props.message ??
                            "Oops... quelque chose s'est mal passé. Réessayez !"}
                    </ThemedText>
                    <CustomButton onPress={this.reset}>Réessayer</CustomButton>
                </View>
            );
        }
        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        gap: 12,
        backgroundColor: Colors.blue,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: Colors.snow,
    },
    message: {
        fontSize: 14,
        textAlign: "center",
        color: Colors.snow,
    },
});
