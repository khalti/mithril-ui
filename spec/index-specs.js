import ui from "../index.js"

describe("index", () => {
  it("exports FormModel", () => {
    expect(ui.PasswordConfirmationField).toBeDefined()
  })

  it("exports Input", () => {
    expect(ui.Input).toBeDefined()
  })

  it("exports Field", () => {
    expect(ui.Field).toBeDefined()
  })

  it("exports TextField", () => {
    expect(ui.TextField).toBeDefined()
  })

  it("exports Checkbox", () => {
    expect(ui.Checkbox).toBeDefined()
  })

  it("exports PasswordField", () => {
    expect(ui.PasswordField).toBeDefined()
  })

  it("exports PasswordConfirmationField", () => {
    expect(ui.PasswordConfirmationField).toBeDefined()
  })
})