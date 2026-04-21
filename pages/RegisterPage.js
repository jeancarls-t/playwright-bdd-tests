class RegisterPage {
  constructor(page) {
    this.page = page;
    this.genderMale = page.locator('#gender-male');
    this.genderFemale = page.locator('#gender-female');
    this.firstName = page.locator('#FirstName');
    this.lastName = page.locator('#LastName');
    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.confirmPassword = page.locator('#ConfirmPassword');
    this.registerButton = page.locator('#register-button');
    this.resultMessage = page.locator('.result');
    this.errorMessage = page.locator('.validation-summary-errors');
  }

  async goto() {
    await this.page.goto('/register');
  }

  async fillForm(data) {
    if (data.Genero === 'Masculino') {
      await this.genderMale.check();
    } else if (data.Genero === 'Femenino') {
      await this.genderFemale.check();
    }
    await this.firstName.fill(data.Nombre);
    await this.lastName.fill(data.Apellido);
    await this.email.fill(data.Email);
    await this.password.fill(data.Password);
    await this.confirmPassword.fill(data.Password);
  }

  async submit() {
    await this.registerButton.click();
  }

  async getSuccessMessage() {
    return this.resultMessage;
  }

  async getErrorMessage() {
    return this.errorMessage;
  }
}

module.exports = { RegisterPage };