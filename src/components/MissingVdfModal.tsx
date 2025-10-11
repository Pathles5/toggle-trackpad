import {
  ModalRoot,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ButtonItem,
} from "@decky/ui";

export function MissingVdfModal({ onClose }: { onClose: () => void }) {
  return (
    <ModalRoot>
      <ModalHeader>
        Missing Action Set
        <ModalCloseButton onClick={onClose} />
      </ModalHeader>
      <ModalBody>
        <p style={{ marginBottom: 12 }}>
          Trackpads cannot be disabled until you create an <strong>"Action Set"</strong> in the controller layout editor.
        </p>
        <p>
          This is required to apply local changes with minimal impact on the system.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Go to:</strong> Controller Settings → Edit Layout → Action Set → Create New Set
        </p>
        <ButtonItem layout="below" onClick={onClose}>
          Got it
        </ButtonItem>
      </ModalBody>
    </ModalRoot>
  );
}
