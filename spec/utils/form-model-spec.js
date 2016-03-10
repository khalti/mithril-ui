var FormModel = require("../../utils/form-model.js")

describe("FormModel", function () {
  var formModel
  var config = {
    username: {default: 'batman', presence: true},
    password: {}}
  beforeEach(function () {
    formModel = FormModel(config)
    })

  it("constructs an object", function () {
    expect(formModel).toBeDefined()
    })

  it("turns keys on config dict to the attributes of the returned object", function () {
    expect(formModel.username).toBeDefined()
    expect(formModel.password).toBeDefined()
    })

  it("attaches original config to ._config attribute of the object", function () {
    expect(formModel._config).toEqual(config)
    })

  it("sets default value to each attribute", function () {
    expect(formModel.username()).toEqual('batman')
    })

  it("sets .errors field to 'undefined'", function () {
    expect(formModel.errors).not.toBeDefined()
    })

  it("sets .isValid() method", function () {
    expect(formModel.isValid).toBeDefined()
    })

  it("sets .isDirty() method", function () {
    expect(formModel.isDirty).toBeDefined()
    })

  describe(".aProp", function () {
    var aform
    beforeEach(function () {
      aform = FormModel({
        username: {presence: true},
        password: {}})})

    it("sets '' default value", function () {
      expect(aform.username()).toEqual('')})

    it("sets default value", function () {
      var aform = FormModel({username: {default: "batman"}})
      expect(aform.username()).toEqual("batman")})

    it("is a getter and setter", function () {
      aform.username('superman');
      expect(aform.username()).toEqual('superman')})

    describe(".aProp.isDirty()", function () {
      var aform = FormModel({username: {default: 'ausername', presence: true}})

      it("returns false if the value has not been altered", function () {
        expect(aform.username.isDirty()).toEqual(false)
        });

      it("returns true if the value has been altered", function () {
        aform.username('busername')
        expect(aform.username.isDirty()).toEqual(true)
        })
      })

    })

    describe(".aProp.isValid()", function () {
      it("assigns errors on amodel.errors[aProp] field", function () {
        formModel.username("")
        formModel.username.isValid()
        expect(formModel.errors.username).toBeDefined()
        })

      it("assigns errors to .errors attribute of itself too", function () {
        formModel.username("")
        formModel.username.isValid()
        expect(formModel.username.errors).toBeDefined()
        })

      it("empties the error field if valid value is supplied", function() {
        formModel.username('spiderman')
        formModel.username.isValid()
        expect(formModel.errors.username).not.toBeDefined()
        })

      it("validates against dependent field if equality is set", function () {
        var form = FormModel({
          password: {presence: true},
          confirmPassword: {equality: "password"}})

        form.password("flash")
        form.confirmPassword("quicksilver")
        form.confirmPassword.isValid()
        expect(form.errors.confirmPassword).toBeDefined()

        form.confirmPassword("flash")
        form.confirmPassword.isValid()
        expect(form.errors.confirmPassword).not.toBeDefined()
      })

      it("returns true if the property is valid", function () {
        formModel.username("batman")
        expect(formModel.username.isValid()).toEqual(true)
      })

      it("returns false if the proerty is invalid", function () {
        formModel.username("")
        expect(formModel.username.isValid()).toEqual(false)
      })

      it("does not set the errors if 'false' is passed", function () {
        formModel.username("batman")
        formModel.username.isValid()
        formModel.username("")
        formModel.username.isValid(false)
        expect(formModel.username.errors).not.toBeDefined()
      })
    })

  describe(".isValid()", function () {
    var aform
    beforeEach(function () {
      aform = FormModel({username: {presence: true}})
    })

    it("returns true if form is valid", function () {
      aform.username("ausername")
      expect(aform.isValid()).toEqual(true)
      })

    it("returns false if form is invalid", function () {
      aform.username("")
      expect(aform.isValid()).toEqual(false)
      })

    it("sets errors if nothing is passed", function () {
      aform.username("")
      aform.isValid()
      expect(aform.errors).toBeDefined()
    })

    it("does not change .errors if 'false' is passed", function () {
      aform.username("")
      aform.isValid(false)
      expect(aform.errors).not.toBeDefined()
    })

    it("sets the .errors to undefined if form validates", function () {
      aform.username("aname")
      aform.isValid()
      expect(aform.errors).not.toBeDefined()
    })

    it("it sets errors on individual properties", function () {
      aform = FormModel({
        username: {presence: true},
        password: {presence: true}})
      aform.username("")
      aform.password("hello")
      aform.isValid()
      expect(aform.username.errors).toBeDefined()
      expect(aform.password.errors).not.toBeDefined()
    })
  })

  describe(".isDirty()", function () {
    var aform = FormModel({username: {presence: true, default: 'ausername'}})

    it("returns false if form has not been altered", function () {
      expect(aform.isDirty()).toEqual(false)
      })

    it("returns true if form has been altered", function () {
      aform.username('busername')
      expect(aform.isDirty()).toEqual(true)
      })
    })

  describe(".values()", function () {
    var aform
    beforeAll(function () {
      aform = FormModel(
        {username: {default: 'ausername'}, password: {default: 'apassword'}}
        )
      })

    it("returns the dict with key:value pair for each form field", function () {
      expect(aform.values()).toEqual({username: 'ausername', password: 'apassword'})
      })
    })

  describe(".setAndValidate()", function () {
    var aform
    beforeEach(function () {
      aform = FormModel({username: {presence: true}})
    })

    it("sets the value", function () {
      aform.username.setAndValidate("ausername")
      expect(aform.username()).toEqual("ausername")
    })

    it("validates the value", function () {aform.username.setAndValidate("")
      expect(aform.username.errors).toBeDefined()
    })
  })
})