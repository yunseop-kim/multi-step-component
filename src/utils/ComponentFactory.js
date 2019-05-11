export default function componentFactory(formType) {
    switch (formType) {
        case 1:
            return "CheckboxTemplate";
        case 2:
            return "RadioTemplate";
        case 3:
            return "TextInputTemplate";
        case 4:
            return "SelectboxTemplate";
        default:
            return "InputTemplate";
    }
};