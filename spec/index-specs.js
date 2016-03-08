var ui = require("../index.js")

describe("index", function () {
  it("exports FormModel", function () {
    expect(ui.PasswordConfirmationField).toBeDefined()
  })

  it("exports Input", function () {
    expect(ui.Input).toBeDefined()
  })

  it("exports Field", function () {
    expect(ui.Field).toBeDefined()
  })

  it("exports TextField", function () {
    expect(ui.TextField).toBeDefined()
  })

  it("exports Checkbox", function () {
    expect(ui.Checkbox).toBeDefined()
  })

  it("exports PasswordField", function () {
    expect(ui.PasswordField).toBeDefined()
  })

  it("exports PasswordConfirmationField", function () {
    expect(ui.PasswordConfirmationField).toBeDefined()
  })
})