import { toaster } from "@decky/api";


export class DeckyDictationLogic {
    pressedAt: number = Date.now();
    enabled: boolean = false;
    dictating = false;
    pushToDictate = false;


    notify = async (message: string, duration: number = 1000, body: string = "") => {
        if (!body) {
            body = message;
        }
        toaster.toast({
            title: message,
            body: body,
            duration: duration,
            critical: true
        });
    }

    handleButtonInput = async (val: any[]) => {
        for (const inputs of val) {
            console.log("inputs");
            console.log(inputs);
            console.log("inputs.unControllerIndex");
            console.log(inputs.unControllerIndex);
            
            this.notify("Decky Dictation", 3000, "Starting speech to text input");
        }
    }
}

	// let logic = new DeckyDictationLogic();
	// let input_register = window.SteamClient.Input.RegisterForControllerStateChanges(logic.handleButtonInput);