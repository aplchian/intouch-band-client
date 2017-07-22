var Validator = require("jsonschema").Validator
var v = new Validator()

var schema = {
  id: "Event",
  type: "object",
  properties: {
    _id: { type: "string", required: true },
    type: { type: "string", required: true },
    schedule: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          id: { type: "string", required: true },
          name: { type: "string", required: true },
          start: { type: "string" },
          end: { type: "string" },
          duration: { type: "string" }
        }
      }
    },
    contacts: {
      type: "array",
      required: true,
      items: {
        type: "object",
        properties: {
          id: { type: "string", required: true },
          type: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          name: { type: "string" }
        }
      }
    },
    date: {
      type: "string"
    },
    band: {
      type: "string",
      required: true
    },
    name: {
      type: "string",
      required: true
    },
    venue: {
      type: "object",
      properties: {
        name: { type: "string" },
        city: { type: "string" },
        state: { type: "string" },
        addressone: { type: "string" },
        addresstwo: { type: "string" },
        parking: { type: "string" },
        zipcode: { type: "number" }
      }
    },
    notes: {
      type: "string"
    },
    confirmed: {
      type: "boolean",
      required: true
    }
  }
}

const validateProvider = async event => {
  return v.validate(event, schema)
}

module.exports = validateProvider
