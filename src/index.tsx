import { definePlugin,  PanelSection, PanelSectionRow, ToggleField } from "@decky/ui";
import { FaGamepad } from "react-icons/fa";
import { useState } from "react";

const ToggleDemo = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <>      
            <PanelSection title="Demo">
                <PanelSectionRow>
                    <ToggleField
                        label="Activar Trackpad"
                        checked={enabled}
                        onChange={(val: boolean) => {
                            setEnabled(val);
                            console.log("Toggle cambiado:", val);
                        }}
                    />
                </PanelSectionRow>
            </PanelSection>
        </>
    );
};

export default definePlugin(() => {
    return {
        name: "Toggle Trackpad",
        title: <div>Toggle Trackpad TTL</div>,
        titleView: <div>Toggle Trackpad TBL</div>,
        content: <ToggleDemo />,   // 👈 aquí usamos el componente
        icon: <FaGamepad />,
        alwaysRender: true,
        onDismount() {
            console.log("Toggle Trackpad Plugin unmounted");
        },
    };
});
