var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators.PasswordMustHaveNumbers = function (control) {
        if (hasNumber(control.value)) {
            return null;
        }
        return {
            passwordMustHaveNumbers: 'Password without numbers are not allowed'
        };
    };
    CustomValidators.MatchPassword = function (control) {
        var password = control.get('password').value;
        var confirmPassword = control.get('confirmPassword').value;
        if (password !== confirmPassword) {
            control.get('confirmPassword').setErrors({ matchPassword: true });
        }
        else {
            return null;
        }
    };
    return CustomValidators;
}());
export { CustomValidators };
function hasNumber(myString) {
    return /\d/.test(myString);
}
//# sourceMappingURL=custom-validators.js.map