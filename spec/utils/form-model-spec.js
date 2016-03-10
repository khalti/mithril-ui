var FormModel = require("../../utils/form-model.js")

describe("FormModel", function () {
  var formModel;
  var config = {
    username: {default: 'batman', presence: true},
    password: {}};
  beforeEach(function () {
    formModel = FormModel(config);
    });

  it("constructs an object", function () {
    expect(formModel).toBeDefined();
    });

  it("turns keys on config dict to the attributes of the returned object", function () {
    expect(formModel.username).toBeDefined();
    expect(formModel.password).toBeDefined();
    });

  it("attaches original config to ._config attribute of the object", function () {
    expect(formModel._config).toEqual(config);
    });

  it("sets default value to each attribute", function () {
    expect(formModel.username()).toEqual('batman');
    });

  it("sets empty .errors field", function () {
    expect(formModel.errors).toBeDefined();
    });

  it("sets .is_valid() method", function () {
    expect(formModel.is_valid).toBeDefined();
    });

  it("sets .is_dirty() method", function () {
    expect(formModel.is_dirty).toBeDefined();
    });

  describe(".aProp", function () {
    it("sets default value", function () {
      expect(formModel.username()).toEqual('batman');
      });

    it("is a getter and setter", function () {
      formModel.username('superman');
      expect(formModel.username()).toEqual('superman');
      });

    describe(".aProp.is_dirty()", function () {
      var aform = FormModel({username: {default: 'ausername', presence: true}});

      it("returns false if the value has not been altered", function () {
        expect(aform.username.is_dirty()).toEqual(false);
        });

      it("returns true if the value has been altered", function () {
        aform.username('busername');
        expect(aform.username.is_dirty()).toEqual(true);
        });
      });

    });

    describe(".aProp.is_valid()", function () {
      it("assigns errors on amodel.errors[aProp] field", function () {
        formModel.username("");
        formModel.username.is_valid()
        expect(formModel.errors.username).toBeDefined();
        });

      it("assigns errors to .errors attribute of itself too", function () {
        formModel.username("");
        formModel.username.is_valid()
        expect(formModel.username.errors).toBeDefined();
        });

      it("empties the error field if valid value is supplied", function() {
        formModel.username('spiderman');
        formModel.username.is_valid()
        expect(formModel.errors.username).not.toBeDefined();
        });

      it("validates against dependent field if equality is set", function () {
        var form = FormModel({
          password: {presence: true},
          confirmPassword: {equality: "password"}});

        form.password("flash");
        form.confirmPassword("quicksilver");
        form.confirmPassword.is_valid()
        expect(form.errors.confirmPassword).toBeDefined();

        form.confirmPassword("flash");
        form.confirmPassword.is_valid()
        expect(form.errors.confirmPassword).not.toBeDefined();
      })

      it("returns true if the property is valid", function () {
        formModel.username("batman")
        expect(formModel.username.is_valid()).toEqual(true)
      })

      it("returns false if the proerty is invalid", function () {
        formModel.username("")
        expect(formModel.username.is_valid()).toEqual(false)
      })

      it("does not set the errors if 'false' is passed", function () {
        formModel.username("batman")
        formModel.username.is_valid()
        formModel.username("")
        formModel.username.is_valid(false)
        expect(formModel.username.errors).not.toBeDefined()
      })
    })

  describe(".is_valid()", function () {
    var aform = FormModel({username: {presence: true, default: ""}});

    it("returns false if the form has not been altered", function () {
      expect(aform.is_valid()).toEqual(false);
      });

    it("returns true if form is valid", function () {
      aform.username("ausername");
      expect(aform.is_valid()).toEqual(true);
      });

    it("returns false if form is invalid", function () {
      aform.username("");
      expect(aform.is_valid()).toEqual(false);
      });

    it("sets errors if nothing is passed", function () {
      aform.username("")
      aform.is_valid()
      expect(aform.errors).toBeDefined()
    })

    it("does not change .errors if 'false' is passed", function () {
      aform.username("")
      aform.is_valid(false)
      expect(aform.errors).not.toBeDefined()
    })

    it("sets the .errors to undefined if form validates", function () {
      aform.username("aname")
      aform.is_valid()
      expect(aform.errors).not.toBeDefined()
    })

    it("it sets errors on individual properties", function () {
      fail("todo")
    })
  })

  describe(".is_dirty()", function () {
    var aform = FormModel({username: {presence: true, default: 'ausername'}});

    it("returns false if form has not been altered", function () {
      expect(aform.is_dirty()).toEqual(false);
      });

    it("returns true if form has been altered", function () {
      aform.username('busername')
      expect(aform.is_dirty()).toEqual(true);
      });
    });

  describe(".values", function () {
    var aform;
    beforeAll(function () {
      aform = FormModel(
        {username: {default: 'ausername'}, password: {default: 'apassword'}}
        );
      });

    it("returns the dict with key:value pair for each form field", function () {
      expect(aform.values()).toEqual({username: 'ausername', password: 'apassword'})
      });
    });

  });